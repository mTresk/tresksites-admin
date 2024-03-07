<script setup>
import { onMounted, ref, watch } from 'vue'
import Button from 'primevue/button'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import { useHead } from 'unhead'
import { useQuery } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import VPageHeader from '@/modules/common/components/VPageHeader.vue'
import VTable from '@/modules/common/components/VTable.vue'
import { convertDate } from '@/helpers/timezone.js'
import { useApi } from '@/composables/useApi'

const title = 'Услуги'

const breadcrumbs = [{ label: title }]

const totalRecords = ref()

const lazyParams = ref({})

const filters = ref()

const router = useRouter()

const { fetch } = useApi()

const page = ref(1)

function initFilters() {
	filters.value = {
		global: { value: '', matchMode: 'contains' },
	}

	lazyParams.value = {
		sortField: 'createdAt',
		sortOrder: -1,
		filters: filters.value,
	}
}
initFilters()

async function getServices() {
	lazyParams.value.filters = filters.value

	if (!lazyParams.value.sortField)
		lazyParams.value.sortField = 'createdAt'

	if (![-1, 1].includes(lazyParams.value.sortOrder))
		lazyParams.value.sortOrder = -1

	const { data } = await fetch('services', lazyParams.value, ['name', 'email'])

	return data
}

const {
	isLoading,
	data: services,
	refetch,
} = useQuery({
	queryKey: ['services', page],
	queryFn: getServices,
	keepPreviousData: true,
})

function onPage(event) {
	page.value = event.page + 1
	lazyParams.value = event
}

function onSort(event) {
	lazyParams.value = event
	refetch()
}

function onFilter() {
	lazyParams.value.filters = filters.value
	refetch()
}

function onUpdateRows(event) {
	lazyParams.value.rows = event
	refetch()
}

function clearFilter() {
	initFilters()
	onFilter()
}

function edit(event) {
	router.push({ name: 'services.edit', params: { id: event.data.id } })
}

watch(
	() => services.value,
	() => {
		totalRecords.value = services.value?.total
	},
)

onMounted(() => {
	totalRecords.value = services.value?.total
})

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
			v-model:filters="filters"
			state-storage="session"
			state-key="config-list-session"
			:rows-per-page-options="[10, 50, 1000]"
			selection-mode="single"
			removable-sort
			lazy
			:value="services"
			filter-display="row"
			:paginator="totalRecords > 10 ? true : false"
			:total-records="totalRecords"
			:first="0"
			:rows="10"
			data-key="id"
			@row-select="edit"
			@page="onPage($event)"
			@sort="onSort($event)"
			@update:rows="onUpdateRows($event)"
		>
			<template #header>
				<div class="table__header">
					<Button type="button" icon="pi pi-filter-slash" label="Очистить" outlined @click="clearFilter()" />
					<span class="p-input-icon-left">
						<i class="pi pi-search" />
						<InputText v-model="filters.global.value" placeholder="Поиск" name="search" @keyup="onFilter" />
					</span>
				</div>
			</template>
			<Column field="images.original" header="Изображение">
				<template #body="{ data }">
					<img :alt="data.title" :src="data.images.original" style="width: 46px; height: 46px; object-fit: cover; border-radius: 50%;">
				</template>
			</Column>
			<Column field="title" header="Заголовок" sortable />
			<Column field="createdAt" header="Дата создания" sortable>
				<template #body="{ data }">
					<span>{{ data.createdAt ? convertDate(data.createdAt) : '-' }}</span>
				</template>
			</Column>
		</DataTable>
	</VTable>
</template>
