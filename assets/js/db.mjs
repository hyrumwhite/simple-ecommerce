import { config } from "dotenv";
config();

import pg from "pg";
const { Pool } = pg;
let pool = new Pool();

pool.on("error", (err, client) => {
	console.error("Unexpected error on idle client", err);
	pool = new Pool();
});

export const query = async (queryString, bindings) => {
	const res = await pool.query(queryString, bindings);
	return res;
};
