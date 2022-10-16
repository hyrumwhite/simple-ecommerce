import { defineStore } from "pinia";
export default defineStore("inventory-store", () => {
	const inventoryList = ref([]);
	const totalInventory = ref(0);
	const filter = ref({
		offset: 0,
		limit: 25,
		sku: "",
		productId: null,
	});
	const getInventory = async ({
		id,
		offset = 0,
		limit = 25,
		sku = null,
		productId = null,
	} = {}) => {
		filter.value.offset = offset;
		filter.value.limit = limit;
		if (sku != null && typeof productId != "undefined") {
			filter.value.sku = sku;
		}
		if (productId != null && typeof productId != "undefined") {
			filter.value.productId = productId;
		}
		const params = new URLSearchParams({
			id,
			offset: filter.value.offset,
			limit: filter.value.limit,
		});
		if (filter.value.sku && filter.value.sku != "") {
			params.append("sku", filter.value.sku);
		}
		if (filter.value.productId != null && filter.value.productId != "") {
			params.append("productId", filter.value.productId);
		}
		let currencyFormatter = new Intl.NumberFormat(navigator.language, {
			style: "currency",
			currency: "USD",
		});
		const { inventory, total } = await $fetch(`/api/inventory?${params}`);
		for (let item of inventory) {
			item.costDisplay = currencyFormatter.format(item.cost_cents / 100);
			item.priceDisplay = currencyFormatter.format(item.price_cents / 100);
		}
		totalInventory.value = total;
		inventoryList.value = inventory;
	};

	return { inventoryList, totalInventory, filter, getInventory };
});
