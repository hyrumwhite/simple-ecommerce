import { getQuery, readBody, sendError, H3Error } from "h3";
import {
	getProductsByUser,
	getProductCountByUser,
	addProductWithUser,
} from "~~/assets/js/productsDAO";

const methods = {
	async GET(event) {
		let { id, limit, offset } = getQuery(event);
		let promises = [
			getProductCountByUser({ id }),
			getProductsByUser({ id, limit, offset }),
		];
		const [countResponse, productsResponse] = await Promise.all(promises);

		return { products: productsResponse, total: countResponse };
	},
	async POST(event) {
		const body = await readBody(event);
		try {
			const result = await addProductWithUser(body);
			//TODO: create triggers in the DB for timestamps and ids
			if (result) {
				return "CREATED";
			} else {
				const error = new H3Error("Server error");
				error.statusCode = 500;
				sendError(event, error);
			}
		} catch (e) {
			console.error(e);
			const error = new H3Error("Server error");
			error.statusCode = 500;
			sendError(event, error);
		}
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
