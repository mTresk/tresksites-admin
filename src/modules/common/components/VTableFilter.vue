<script setup>
import SelectButton from 'primevue/selectbutton'

defineProps({
	options: Array,
	optionValue: String,
	optionLabel: String,
})

const modelValue = defineModel()
</script>

<template>
	<div class="tab-filter">
		<SelectButton
			v-model="modelValue"
			:option-label="optionLabel"
			:options="options"
			:option-value="optionValue"
			aria-labelledby="basic"
		/>
	</div>
</template>

<style lang="scss">
.tab-filter {
	display: flex;
	align-items: center;
	justify-content: center;

	@include adaptiveValue('margin-bottom', 40, 20);
}
</style>
