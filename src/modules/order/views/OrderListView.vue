<script setup>
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { useHead } from 'unhead'
import { useQuery } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import VPageHeader from '@/modules/common/components/VPageHeader.vue'
import VTable from '@/modules/common/components/VTable.vue'
import { convertDate } from '@/helpers/timezone.js'
import { useApi } from '@/composables/useApi'

const title = 'Заказы'

const breadcrumbs = [{ label: title }]

const router = useRouter()

const { fetch } = useApi()

async function getOrders() {
	const { data } = await fetch('orders')

	return data
}

const {
	isLoading,
	data: orders,
} = useQuery({
	queryKey: ['orders'],
	queryFn: getOrders,
	keepPreviousData: true,
})

function edit(event) {
	router.push({ name: 'orders.show', params: { id: event.data.id } })
}

useHead({
	title,
})
</script>

<template>
	<VPageHeader :breadcrumbs="breadcrumbs">
		<template #title>
			{{ title }}
		</template>
	</VPageHeader>
	<VTable :is-loading="isLoading">
		<DataTable
			selection-mode="single"
			:value="orders"
			data-key="id"
			@row-select="edit"
		>
			<Column field="name" header="Имя" />
			<Column field="phone" header="Телефон" />
			<Column field="createdAt" header="Дата создания">
				<template #body="{ data }">
					<span>{{ data.createdAt ? convertDate(data.createdAt) : '-' }}</span>
				</template>
			</Column>
		</DataTable>
	</VTable>
</template>
