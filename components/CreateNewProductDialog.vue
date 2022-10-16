<template>
	<Dialog
		:modelValue="props.modelValue"
		@update:model-value="closeDialog"
		@closed="initFields"
		class="w-[600px]"
	>
		<form class="flex flex-col gap-4" @submit.stop.prevent="createProduct">
			<div class="flex items-center justify-between">
				<h1 class="text-2xl">Add New Product</h1>
				<span>
					<span class="text-red-600">*</span> indicates a required field
				</span>
			</div>
			<div class="flex flex-col gap-2">
				<Input
					v-for="(field, index) of fields"
					v-model="field.value"
					:required="field.key === 'product_name'"
					:autofocus="index === 0"
					:key="field.key"
					:label="field.text"
					:name="field.key"
				/>
			</div>
			<div class="flex items-center justify-end gap-2">
				<Btn
					class="bg-transparent text-zinc-900 hover:bg-slate-100"
					@click.prevent.stop="closeDialog"
				>
					Cancel
				</Btn>
				<Btn>Create Product</Btn>
			</div>
		</form>
	</Dialog>
</template>

<script setup>
import { schema } from "~/db/schema.mjs";
import { toTitleCase } from "~/assets/js/toTitleCase";

const excludedKeys = ["id", "admin_id", "created_at", "updated_at"];
let editableKeys = Object.keys(schema.products).filter(
	(key) => !excludedKeys.includes(key)
);
const fields = ref([]);
const initFields = () => {
	fields.value = editableKeys.map((key) => ({
		text: toTitleCase(key),
		value: "",
		key,
	}));
};
initFields();

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
});
const emit = defineEmits(["update:modelValue", "productSubmitted"]);
const closeDialog = () => emit("update:modelValue", false);

const createProduct = () => {
	//need to trap 'enter' key better on this form, native dialog is not behaving as expected
	let productName = fields.value.find(({ key } = {}) => key === "product_name");
	if (productName && !productName.value) {
		return;
	}
	emit("productSubmitted", fields);
	closeDialog();
};
</script>

<style lang="scss" scoped>
</style>