import { config } from "dotenv";
config();
import { __dirname } from "./dirname.mjs";
import pg from "pg";
const { Client } = pg;
import extract from "extract-zip";
import fs from "fs/promises";
import { join } from "path";
import { schema } from "./schema.mjs";

console.info("\nDatabase Initialization\n");
console.info(
	"1. Install postgresql, see: https://www.postgresqltutorial.com/postgresql-getting-started/\n"
);
console.info("2. Connect to your database with: sudo -u postgres psql");
console.info('3. Update the password for the default "postgres" user:');
console.info(`  alter role postgres with password 'postgres'\n`);
console.info("4. Create your database");
console.info(
	`5. Create a .env file in the root of this project with the following:`
);
console.info(`  PGUSER=postgres
  PGHOST=localhost
  PGPASSWORD=yourpassword
  PGDATABASE=yourdbname
  PGPORT=5432`);

if (!process.env.PGHOST) {
	console.info(
		"Missing postgres env vars. Please create a .env file and try again"
	);
}

let client = null;
try {
	client = new Client();
	await client.connect();
} catch (e) {
	console.error("Failed to connect to the DB");
	console.error(e);
	process.exit();
}

const initializeTables = async (dir) => {
	const fileNames = await fs.readdir(dir);
	for (let csv of fileNames) {
		const [tableName, extension] = csv.split(".");
		if (extension === "csv") {
			let createQuery = `CREATE TABLE ${tableName} (\n`;
			let tableSchema = schema[tableName];
			for (let key of Object.keys(tableSchema)) {
				createQuery += `${key} ${tableSchema[key]},\n`;
			}
			createQuery = createQuery.slice(0, -2);
			createQuery += ");";
			await client.query(createQuery);
			let importQuery = `
				COPY ${tableName}
				FROM '${join(__dirname, "data", csv)}'
				WITH NULL as 'NULL'
				DELIMITER ','
				CSV HEADER;
			`;
			await client.query(importQuery);
		}
	}
};

try {
	await extract(join(__dirname, "data.zip"), { dir: __dirname });
	await initializeTables(join(__dirname, "data"));
	console.log("Initialized database!");
} catch (e) {
	console.error("Something went wrong while extracting zipped data");
	console.error(e);
	process.exit();
}
client.end();
