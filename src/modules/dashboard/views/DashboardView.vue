<script setup>
import { onMounted, ref, watch } from 'vue'
import { useHead } from 'unhead'
import { useQuery } from '@tanstack/vue-query'
import UiSpinner from '@/modules/common/components/UiSpinner.vue'
import VPageHeader from '@/modules/common/components/VPageHeader.vue'
import { clone } from '@/helpers/clone'
import { useApi } from '@/composables/useApi'

const title = 'Инфопанель'

const statsData = ref()

const { fetch, isLoading } = useApi()

async function getStats() {
	const { data } = await fetch('chart/stats')

	return data
}

const { data: paymentStats } = useQuery({
	queryKey: ['chart/stats'],
	queryFn: getStats,
})

function cloneStats() {
	statsData.value = clone(paymentStats.value)
}

watch(
	() => paymentStats.value,
	() => cloneStats(),
)

onMounted(() => {
	cloneStats()
})

useHead({
	title,
})
</script>

<template>
	<VPageHeader>
		<template #title>
			{{ title }}
		</template>
	</VPageHeader>
	<div>
		<UiSpinner v-if="isLoading" />
		<div v-show="!isLoading" class="dashboard">
			<div class="dashboard__cards">
				<div v-for="(data, index) in statsData" :key="index" class="dashboard-card">
					<div class="dashboard-card__header">
						{{ data.header.title }}
					</div>

					<div class="dashboard-card__value">
						{{ data.header.value }}
					</div>

					<div class="dashboard-card__footer" :class="data.content.value > 0 ? 'dashboard-card__footer--green' : ''">
						{{ data.content.title }}
						<span>{{ data.content.value }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.dashboard {
	@media (max-width: $mobile) {
		max-width: rem(500);
		margin-inline: auto;
	}

	// .dashboard__cards
	&__cards {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: rem(20);
		margin-bottom: rem(20);

		@media (max-width: $mobile) {
			grid-template-columns: 1fr;
		}
	}

	// .dashboard__charts
	&__charts {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: rem(20);

		@media (max-width: $mobile) {
			grid-template-columns: 1fr;
		}
	}
}

.dashboard-card {
	display: grid;
	gap: rem(15);
	background-color: $whiteColor;
	border: 1px solid rgb(3 7 18 / 7%);
	border-radius: rem(15);

	@include adaptiveValue('padding', 25, 20);

	.dark & {
		background-color: $darkColor;
	}

	// .dashboard-card__header
	&__header {
		font-size: rem(14);
		color: $grayColor;
		white-space: nowrap;

		.dark & {
			color: $darkPlaceholderColor;
		}
	}

	// .dashboard-card__value
	&__value {
		font-size: rem(30);
		font-weight: 700;
		white-space: nowrap;
	}

	// .dashboard-card__footer
	&__footer {
		font-size: rem(14);
		color: $grayColor;
		white-space: nowrap;

		&--green {
			color: $greenColor;
		}

		.dark & {
			color: $darkPlaceholderColor;

			&--green {
				color: $greenColor;
			}
		}
	}
}

.dashboard-chart {
	grid-column: span 1 / span 1;
	background-color: $whiteColor;
	border: 1px solid rgb(3 7 18 / 7%);
	border-radius: rem(15);

	@include adaptiveValue('padding', 25, 20);

	.dark & {
		background-color: $darkColor;
	}

	canvas {
		width: 100% !important;
		height: 100% !important;
	}
}
</style>
