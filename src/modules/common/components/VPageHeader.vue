<script setup>
import Breadcrumb from 'primevue/breadcrumb'

defineProps({
	breadcrumbs: Array,
})

const home = {
	icon: 'pi pi-home',
	route: 'dashboard',
}
</script>

<template>
	<header class="page-header">
		<div v-if="breadcrumbs" class="page-header__breadcrumb breadcrumb">
			<Breadcrumb :home="home" :model="breadcrumbs">
				<template #item="{ item }">
					<router-link v-if="item.route" v-slot="{ href, navigate }" :to="{ name: item.route }" custom>
						<a :href="href" @click="navigate">
							<span class="text-color" :class="[item.icon]" />
							<span class="breadcrumb__label">{{ item.label }}</span>
						</a>
					</router-link>
					<a v-else :href="item.url" :target="item.target">
						<span class="breadcrumb__label breadcrumb__label--current">{{ item.label }}</span>
					</a>
				</template>
			</Breadcrumb>
		</div>
		<div class="page-header__body">
			<h1 class="page-header__title">
				<slot name="title" />
			</h1>
			<slot name="button" />
		</div>
	</header>
</template>

<style lang="scss" scoped>
.page-header {
	// .page-header__breadcrumb
	&__breadcrumb {
		margin-bottom: rem(20);

		@media (max-width: $mobile) {
			display: none;
		}
	}

	// .page-header__body
	&__body {
		display: flex;
		gap: rem(20);
		align-items: center;
		justify-content: space-between;

		@include adaptiveValue('margin-bottom', 35, 25);

		@media (max-width: $mobileSmall) {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	// .page-header__title
	&__title {
		font-weight: 700;
		line-height: 110%;
		letter-spacing: -0.025em;

		@include adaptiveValue('font-size', 30, 20);
	}
}

.breadcrumb {
	// .breadcrumb__label
	&__label {
		// .breadcrumb__label--current
		&--current {
			opacity: 0.5;
		}
	}
}
</style>
