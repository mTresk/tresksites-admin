<script setup>
import Button from 'primevue/button'
import { useAuthStore } from '@/store/useAuthStore'
import { useSidebarStore } from '@/store/useSidebarStore'

const { logout } = useAuthStore()

const { toggleSidebar } = useSidebarStore()
</script>

<template>
	<header class="header">
		<div class="header__body">
			<button type="button" class="header__button icon-menu" @click="toggleSidebar">
				<span />
			</button>
			<div class="header__actions">
				<div class="header__logout">
					<Button size="small" @click="logout">
						Выйти
					</Button>
				</div>
			</div>
		</div>
	</header>
</template>

<style lang="scss" scoped>
.header {
	position: sticky;
	top: 0;
	left: 0;
	z-index: 100;
	width: 100%;
	min-height: rem(70);
	padding-top: rem(15);
	padding-bottom: rem(15);
	background-color: $whiteColor;
	box-shadow: 0 1px 0 0 rgb(0 0 0 / 10%);

	@include adaptiveValue('padding-left', 25, 20);
	@include adaptiveValue('padding-right', 25, 20);

	@media (max-width: $mobile) {
		padding-right: rem(15);
		padding-left: rem(15);
	}

	.dark & {
		background-color: $darkColor;
		box-shadow: none;
	}

	// .header__body
	&__body {
		display: flex;
		gap: rem(50);
		align-items: center;
		justify-content: space-between;
	}

	// .header__actions
	&__actions {
		margin-left: auto;
	}
}

.icon-menu {
	display: none;

	@media (max-width: $tablet) {
		position: relative;
		z-index: 5;
		display: block;
		width: rem(30);
		height: rem(18);

		@media (any-hover: none) {
			cursor: default;
		}

		&::before {
			top: 0;
		}

		&::after {
			bottom: 0;
		}

		span {
			top: calc(50% - rem(1));
		}

		span,
		&::before,
		&::after {
			position: absolute;
			right: 0;
			width: 100%;
			height: rem(2);
			content: '';
			background-color: $mainColor;
			transition: all 0.3s ease 0s;

			.dark & {
				background-color: $whiteColor;
			}
		}

		.menu-open & {
			span {
				width: 0;
			}

			&::before {
				top: calc(50% - rem(1));
				transform: rotate(-45deg);
			}

			&::after {
				bottom: calc(50% - rem(1));
				transform: rotate(45deg);
			}
		}
	}
}
</style>
