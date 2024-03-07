<script setup>
import UiSpinner from '@/modules/common/components/UiSpinner.vue'

defineProps({
	isLoading: Boolean,
	singleColumn: Boolean,
	wide: Boolean,
})

defineEmits(['formSubmit'])
</script>

<template>
	<div class="form" :class="[singleColumn ? 'form--vertical' : '', wide ? 'form--wide' : '']">
		<UiSpinner v-if="isLoading" />
		<form class="form__form" @submit.prevent="$emit('formSubmit')">
			<slot name="header" />
			<div class="form__body">
				<slot name="body" />
			</div>
			<div class="form__footer">
				<slot name="footer" />
			</div>
		</form>
	</div>
</template>

<style lang="scss">
.form {
	position: relative;
	padding-top: rem(40);
	background-color: $whiteColor;
	border: 1px solid rgb(3 7 18 / 6%);
	border-radius: rem(15);

	@include adaptiveValue('padding-inline', 30, 15);
	@include adaptiveValue('padding-bottom', 40, 30);

	.dark & {
		background-color: $darkColor;
	}

	&:not(:last-child) {
		@include adaptiveValue('margin-bottom', 50, 30);
	}

	// .form__body
	&__body {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: rem(20);

		@include adaptiveValue('row-gap', 35, 30);

		@media (max-width: em(1100)) {
			grid-template-columns: 1fr;
		}
	}

	// .form__field
	&__field {
		position: relative;
		width: 100%;

		input,
		textarea,
		.p-calendar,
		.p-dropdown,
		.p-multiselect {
			width: 100%;
		}

		&--wide {
			grid-column: span 2;

			@media (max-width: em(1100)) {
				grid-column: span 1;
			}
		}
	}

	// .form__label
	&__label {
		position: absolute;
		top: -20px;
		left: 12px;
		font-size: rem(12);
		color: #708da9;

		.dark & {
			color: $darkPlaceholderColor;
		}
	}

	// .form__footer
	&__footer {
		display: flex;
		gap: rem(15);
		align-items: center;

		@include adaptiveValue('margin-top', 35, 30);
	}

	&--vertical {
		.form__body {
			grid-template-columns: 1fr !important;
		}
	}

	&--wide {
		width: 100%;

		@include adaptiveValue('padding-inline', 50, 20);
		@include adaptiveValue('padding-block', 50, 40);

		.form__footer {
			margin-top: rem(25);
		}
	}
}

.card {
	input {
		width: 100%;
	}

	@media (min-width: em(1101)) {
		grid-column: span 2;
	}

	&__item {
		display: flex;
		gap: rem(5);
		align-items: center;
		justify-content: space-between;
		width: 100%;

		&:not(:last-child) {
			margin-bottom: rem(15);
		}
	}

	&__label {
		width: 100%;

		input {
			width: 100%;
		}
	}

	&__button {
		margin-top: rem(10);
	}
}

.checkbox {
	display: flex;
	gap: rem(10);
	align-items: center;
	margin-top: rem(-10);

	// .checkbox__label
	&__label {
		@include adaptiveValue('font-size', 14, 12);
	}
}
</style>
