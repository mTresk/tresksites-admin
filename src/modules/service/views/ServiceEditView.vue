<script setup>
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import Button from 'primevue/button'
import { useHead } from 'unhead'
import { useRoute } from 'vue-router'
import ServiceForm from '@/modules/service/components/ServiceForm.vue'
import PageHeader from '@/modules/common/components/VPageHeader.vue'
import { useApi } from '@/composables/useApi'

const title = 'Редактирование услуги'

const breadcrumbs = [{ label: 'Услуги', route: 'services' }, { label: title }]

const route = useRoute()

const { fetch, destroy } = useApi()

const queryClient = useQueryClient()

async function getService() {
	const { data } = await fetch(`services/${route.params.id}`)

	return data
}

const { isLoading, data: service } = useQuery({
	queryKey: ['services', route.params.id],
	queryFn: getService,
	refetchOnMount: true,
})

const { mutate: mutateDelete } = useMutation({
	mutationFn: async () => {
		await destroy(`services/${route.params.id}`, 'services')
	},
	onSuccess: async () => {
		await queryClient.resetQueries({ queryKey: ['services'] })
	},
})

function deleteService() {
	mutateDelete()
}

useHead({
	title,
})
</script>

<template>
	<PageHeader :breadcrumbs="breadcrumbs">
		<template #title>
			{{ title }}
		</template>
		<template #button>
			<Button severity="danger" label="Удалить" size="small" icon="pi pi-times" @click="deleteService()" />
		</template>
	</PageHeader>
	<ServiceForm :service-props="service" :is-loading="isLoading" />
</template>

<style lang="scss">
.filepond {
	&--credits {
		display: none;
	}
}
</style>
