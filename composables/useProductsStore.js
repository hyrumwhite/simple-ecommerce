import { defineStore } from "pinia";
export default defineStore("products-store", () => {
	const productsList = ref([]);
	const totalProducts = ref(0);
	const filter = ref({
		offset: 0,
		limit: 25,
	});
	const getProducts = async ({ id, offset = 0, limit = 25 }) => {
		filter.value.offset = offset;
		filter.value.limit = limit;
		const params = new URLSearchParams({
			id,
			offset: filter.value.offset,
			limit: filter.value.limit,
		});
		const { products, total } = await $fetch(`/api/products?${params}`);
		//note this will fail if called from an ssr context
		let dateFormatter = new Intl.DateTimeFormat(navigator.language, {
			year: "numeric",
			month: "short",
			day: "2-digit",
		});
		let currencyFormatter = new Intl.NumberFormat(navigator.language, {
			style: "currency",
			currency: "USD",
		});
		for (let product of products) {
			let createdDate = new Date(product.created_at);
			let updatedDate = new Date(product.updated_at);

			product.createdDisplayDate = dateFormatter.format(createdDate);
			product.updatedDisplayDate = dateFormatter.format(updatedDate);
			product.shippingPriceDisplay = currencyFormatter.format(
				product.shipping_price / 100
			);
		}
		totalProducts.value = total;
		productsList.value = products;
	};

	return { productsList, totalProducts, getProducts };
});
