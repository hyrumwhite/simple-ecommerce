<template>
	<div class="w-full h-full flex md:items-stretch flex-col md:flex-row">
		<section
			class="
				flex flex-col
				gap-2
				px-4
				border-r border-slate-300
				bg-slate-100
				order-2
				md:order-1
			"
		>
			<h1 class="text-3xl py-4">Store Admin</h1>
			<div class="flex flex-col gap-1">
				<NuxtLink
					v-for="{ to, text } of routes"
					:key="text"
					:to="to"
					class="px-3 py-2 hover:bg-slate-200 rounded-md"
					active-class="bg-slate-200 text-blue-800"
					>{{ text }}</NuxtLink
				>
			</div>
			<span class="flex-1" />
			<span class="py-2 flex items-center gap-2">
				<span class="p-2 rounded-full border">👤</span>
				<span class="overflow-hidden text-ellipsis">{{
					currentUser.name
				}}</span>
			</span>
		</section>
		<div class="flex-1 overflow-auto p-8 order-1">
			<slot />
		</div>
	</div>
</template>

<script setup>
const { currentUser } = useUserStore();
const routes = [
	{ to: "/", text: "Products" },
	{ to: "/inventory", text: "Inventory" },
	{ to: "/orders", text: "Orders" },
];
</script>

<style lang="scss" scoped>
</style>