import { sendRedirect, setCookie, getQuery } from "h3";
import {
	getProductsByUser,
	getProductCountByUser,
} from "~~/assets/js/productsDAO";

export default defineEventHandler(async (event) => {
	let { id, limit, offset } = getQuery(event);
	let promises = [
		getProductCountByUser({ id }),
		getProductsByUser({ id, limit, offset }),
	];
	const [countResponse, productsResponse] = await Promise.all(promises);

	return { products: productsResponse, total: countResponse };
});
