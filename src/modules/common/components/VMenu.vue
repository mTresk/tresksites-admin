<script setup>
import { useSidebarStore } from '@/store/useSidebarStore'

const sidebarStore = useSidebarStore()

const menuItems = [
	{
		label: '',
		items: [
			{
				label: 'Работы',
				icon: 'pi pi-briefcase',
				route: 'works',
			},
			{
				label: 'Услуги',
				icon: 'pi pi-th-large',
				route: 'services',
			},
			{
				label: 'Цены',
				icon: 'pi pi-dollar',
				route: 'prices',
			},
			{
				label: 'Контакты',
				icon: 'pi pi-id-card',
				route: 'contacts',
			},
		],
	},
]
</script>

<template>
	<div class="menu">
		<nav v-for="(menuItem, index) in menuItems" :key="index" class="menu__body">
			<div v-if="menuItem.label" class="menu__label">
				{{ menuItem.label }}
			</div>
			<ul class="menu__list">
				<li
					v-for="(item, key) in menuItem.items"
					:key="key"
					class="menu__item"
					@click="sidebarStore.closeSidebar()"
				>
					<router-link :to="{ name: item.route }" class="menu__link">
						<i :class="item.icon" style="font-size: 1.4rem" />
						<span>{{ item.label }}</span>
					</router-link>
				</li>
			</ul>
		</nav>
	</div>
</template>

<style lang="scss" scoped>
.menu {
	// .menu__body
	&__body {
		&:not(:last-child) {
			margin-bottom: rem(30);
		}
	}

	// .menu__label
	&__label {
		padding-left: rem(8);
		margin-bottom: rem(10);
		font-size: rem(14);
		font-weight: 600;
		color: $grayColor;
	}

	// .menu__item
	&__item {
		&:not(:last-child) {
			margin-bottom: rem(5);
		}
	}

	// .menu__link
	&__link {
		display: flex;
		gap: rem(15);
		align-items: center;
		padding: rem(8);
		font-size: rem(14);
		font-weight: 600;
		border-radius: rem(8);

		@media (any-hover: hover) {
			&:hover {
				background-color: #f3f4f6;

				.dark & {
					background-color: #ffffff24;
				}
			}
		}

		&.router-link-active {
			color: $accentColor;
			background-color: #f3f4f6;

			.dark & {
				background-color: #ffffff24;
			}
		}

		@media (max-width: $mobileSmall) {
			font-size: rem(16);
		}
	}
}
</style>
