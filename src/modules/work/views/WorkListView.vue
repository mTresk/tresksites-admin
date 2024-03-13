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

const title = 'Работы'

const breadcrumbs = [{ label: title }]

const router = useRouter()

const { fetch } = useApi()

async function getWorks() {
	const { data } = await fetch('works')

	return data
}

const {
	isLoading,
	data: works,
} = useQuery({
	queryKey: ['works'],
	queryFn: getWorks,
	keepPreviousData: true,
})

function edit(event) {
	router.push({ name: 'works.edit', params: { slug: event.data.slug } })
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
			<router-link :to="{ name: 'works.create' }">
				<Button label="Создать" size="small" />
			</router-link>
		</template>
	</VPageHeader>
	<VTable :is-loading="isLoading">
		<DataTable
			selection-mode="single"
			:value="works?.data"
			data-key="id"
			@row-select="edit"
		>
			<Column header="Изображение">
				<template #body="{ data }">
					<img :alt="data.title" :src="data.files.original" style="width: auto; height: 46px; object-fit: cover;">
				</template>
			</Column>
			<Column field="name" header="Название" />
			<Column field="createdAt" header="Дата создания">
				<template #body="{ data }">
					<span>{{ data.createdAt ? convertDate(data.createdAt) : '-' }}</span>
				</template>
			</Column>
		</DataTable>
	</VTable>
</template>
