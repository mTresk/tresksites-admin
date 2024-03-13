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

const title = 'Услуги'

const breadcrumbs = [{ label: title }]

const router = useRouter()

const { fetch } = useApi()

async function getServices() {
	const { data } = await fetch('services')

	return data
}

const {
	isLoading,
	data: services,
} = useQuery({
	queryKey: ['services'],
	queryFn: getServices,
	keepPreviousData: true,
})

function edit(event) {
	router.push({ name: 'services.edit', params: { id: event.data.id } })
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
		<template #button>
			<router-link :to="{ name: 'services.create' }">
				<Button label="Создать" size="small" />
			</router-link>
		</template>
	</VPageHeader>
	<VTable :is-loading="isLoading">
		<DataTable
			selection-mode="single"
			:value="services"
			data-key="id"
			@row-select="edit"
		>
			<Column header="Изображение">
				<template #body="{ data }">
					<img :alt="data.title" :src="data.files.original" style="width: 46px; height: 46px; object-fit: cover;">
				</template>
			</Column>
			<Column field="title" header="Заголовок" />
			<Column field="createdAt" header="Дата создания">
				<template #body="{ data }">
					<span>{{ data.createdAt ? convertDate(data.createdAt) : '-' }}</span>
				</template>
			</Column>
		</DataTable>
	</VTable>
</template>
