<script setup>
import UiSpinner from '@/modules/common/components/UiSpinner.vue'

defineProps({
	isLoading: Boolean,
})
</script>

<template>
	<div class="table">
		<UiSpinner v-if="isLoading" />
		<slot />
	</div>
</template>

<style lang="scss">
.table {
	position: relative;
	width: 100%;
	background-color: $whiteColor;
	border: 1px solid rgb(3 7 18 / 5%);
	border-radius: rem(15);

	@include adaptiveValue('padding-inline', 35, 15);
	@include adaptiveValue('padding-block', 35, 30);

	.dark & {
		color: $whiteColor;
		background-color: $darkColor;
	}

	// .table__header
	&__header {
		display: flex;
		gap: rem(20);
		align-items: center;
		justify-content: space-between;

		@media (max-width: em(570)) {
			flex-direction: column-reverse;

			.p-input-icon-left {
				width: 100%;

				input {
					width: 100%;
				}
			}
		}
	}

	.p-paginator-rpp-options,
	.p-paginator-last,
	.p-paginator-first {
		@media (max-width: $mobile) {
			display: none;
		}
	}
}
</style>
