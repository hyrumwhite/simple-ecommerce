import { getQuery, sendError, H3Error } from "h3";
import {
	getInventoryByUser,
	getInventoryCountByUser,
} from "~~/assets/js/inventoryDAO";

const methods = {
	async GET(event) {
		let { id, limit, offset, sku = "", productId = 0 } = getQuery(event);
		let searchParams = { id, limit, offset };
		if (sku && sku != "") {
			searchParams.sku = sku;
		}
		if (productId != 0) {
			searchParams.productId = productId;
		}
		let promises = [
			getInventoryCountByUser({ id }),
			getInventoryByUser(searchParams),
		];
		const [countResponse, inventoryResponse] = await Promise.all(promises);
		//TODO: account for count when sku and productid are present
		return { inventory: inventoryResponse, total: countResponse };
	},
};

export default defineEventHandler(async (event) => {
	const { method } = event.req;
	if (methods[method]) {
		return methods[method](event);
	} else {
		const error = new H3Error("Server error");
		error.statusCode = 400;
		sendError(event, error);
	}
});
