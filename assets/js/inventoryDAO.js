import { query } from "~/assets/js/db.mjs";
import crypto from "crypto";
import { schema } from "~~/db/schema.mjs";
export const getProductsByUser = async ({ id, limit = 25, offset = 0 }) => {
	let response = await query(
		`select p.product_name, p.style, p.brand, i.sku from products p LEFT JOIN inventory i on p.id = i.product_id where p.admin_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3;`,
		[id, limit, offset]
	);
	return response.rows || null;
};
export const getProductCountByUser = async ({ id }) => {
	let response = await query(
		`select count(*) from products where admin_id = $1;`,
		[id]
	);
	const count = response.rows?.[0]?.count;
	return count;
};

export const addProductWithUser = async ({ id, total, ...fields }) => {
	//TODO: use user cookie to set creating user
	fields.admin_id = id;
	let valueString = "";
	const columns = Object.keys(schema.products).filter(
		(column) => !schema.products[column].includes(" ") && fields[column] != ""
	);
	const bindings = [];
	for (let i = 0; i < columns.length; i++) {
		const column = columns[i];
		bindings.push(fields[column]);
		//we'll be binding the values after the column names, so we add the length of the fieldkey array
		valueString += `$${i + 1}, `;
	}
	//remove the ', '
	valueString = valueString.slice(0, -2);
	const columnString = columns.join(", ");
	const queryString = `insert into products (${columnString}) values (${valueString});`;
	try {
		let response = await query(queryString, bindings);
		return true;
	} catch (e) {
		// console.error(e);
		console.error(queryString);
		console.error(bindings);
		return null;
	}
};
