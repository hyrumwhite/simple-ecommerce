<template>
	<table class="w-full">
		<thead class="sticky -top-4 bg-white">
			<tr>
				<th
					v-for="header of headers"
					:key="header.value"
					:class="`th_${header.value} ${header.class} text-left`"
				>
					<slot :name="`th_${header.value}`">{{ header.text }}</slot>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-if="$slots['body_prepend']"
				:items="props.items"
				class="dark:text-layoutfont-300"
			>
				<td :colspan="props.headers.length" class="border-b">
					<slot name="body_prepend"></slot>
				</td>
			</tr>
			<tr v-for="item of items" :key="item[props.itemValue]">
				<td v-for="header of headers" :key="header.value" :class="header.class">
					<slot
						:name="`td_${header.value}`"
						:header="header"
						:item="item"
						:value="item[header.value]"
						>{{ item[header.value] }}</slot
					>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup>
const props = defineProps({
	headers: {
		type: Array,
		default: () => [],
	},
	items: {
		type: Array,
		default: () => [],
	},
	itemValue: {
		type: String,
		default: "id",
	},
	itemText: {
		type: String,
		default: "text",
	},
});
</script>

<style lang="scss" scoped>
</style>