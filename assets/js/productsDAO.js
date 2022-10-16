import { query } from "~/assets/js/db.mjs";

export const getProductsByUser = async ({ id, limit = 25, offset = 0 }) => {
	let response = await query(
		`select p.product_name, p.style, p.brand, i.sku from products p JOIN inventory i on p.id = i.product_id where p.admin_id = $1 LIMIT $2 OFFSET $3;`,
		[id, limit, offset]
	);
	return response.rows || null;
};
export const getProductCountByUser = async ({ id }) => {
	let response = await query(
		`select count(*) from products where admin_id = $1`,
		[id]
	);
	const count = response.rows?.[0]?.count;
	return count;
};
