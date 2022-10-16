import { query } from "~/assets/js/db.mjs";
import { schema } from "~~/db/schema.mjs";
export const getInventoryByUser = async ({
	id,
	productId = null,
	sku = null,
	limit = 25,
	offset = 0,
}) => {
	let queryString = "";
	let bindings = [];
	//TODO: refactory this condition. It's bad, just running out of mental juice
	if (productId == null && sku == null) {
		queryString = `select p.product_name, i.size, i.price_cents, i.cost_cents, i.color, i.quantity, i.sku from products p JOIN inventory i on p.id = i.product_id where p.admin_id = $1 ORDER BY quantity DESC LIMIT $2 OFFSET $3;`;
		bindings = [id, limit, offset];
	} else if (productId) {
		queryString = `select p.product_name, i.size, i.price_cents, i.cost_cents, i.color, i.quantity, i.sku from products p JOIN inventory i on p.id = i.product_id where p.admin_id = $1 and product_id = $4 ORDER BY quantity DESC LIMIT $2 OFFSET $3;`;
		bindings = [id, limit, offset, productId];
	} else if (sku) {
		queryString = `select p.product_name, i.size, i.price_cents, i.cost_cents, i.color, i.quantity, i.sku from products p JOIN inventory i on p.id = i.product_id where p.admin_id = $1 and sku = $4 ORDER BY quantity DESC LIMIT $2 OFFSET $3;`;
		bindings = [id, limit, offset, sku];
	} else if (sku && productId) {
		queryString = `select p.product_name, i.size, i.price_cents, i.cost_cents, i.color, i.quantity, i.sku from products p JOIN inventory i on p.id = i.product_id where p.admin_id = $1 and sku = $4 and product_id = $5 ORDER BY quantity DESC LIMIT $2 OFFSET $3;`;
		bindings = [id, limit, offset, sku, productId];
	}
	let response = await query(queryString, bindings);
	return response.rows || null;
};
export const getInventoryCountByUser = async ({ id }) => {
	let response = await query(
		`select count(*) from inventory i JOIN products p on p.id = i.product_id where p.admin_id = $1;`,
		[id]
	);
	const count = response.rows?.[0]?.count;
	return count;
};
