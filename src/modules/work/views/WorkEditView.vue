<script setup>
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import Button from 'primevue/button'
import { useHead } from 'unhead'
import { useRoute } from 'vue-router'
import WorkForm from '@/modules/work/components/WorkForm.vue'
import PageHeader from '@/modules/common/components/VPageHeader.vue'
import { useApi } from '@/composables/useApi'

const title = 'Редактирование работы'

const breadcrumbs = [{ label: 'Работы', route: 'works' }, { label: title }]

const route = useRoute()

const { fetch, destroy } = useApi()

const queryClient = useQueryClient()

async function getWork() {
	const { data } = await fetch(`works/${route.params.slug}`)

	return data
}

const { isLoading, data: work } = useQuery({
	queryKey: ['works', route.params.slug],
	queryFn: getWork,
	refetchOnMount: true,
})

const { mutate: mutateDelete } = useMutation({
	mutationFn: async () => {
		await destroy(`works/${route.params.slug}`, 'works')
	},
	onSuccess: async () => {
		await queryClient.resetQueries({ queryKey: ['works'] })
	},
})

function deleteWork() {
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
			<Button severity="danger" label="Удалить" size="small" icon="pi pi-times" @click="deleteWork()" />
		</template>
	</PageHeader>
	<WorkForm :work-props="work" :is-loading="isLoading" />
</template>

<style lang="scss">
.filepond {
	&--credits {
		display: none;
	}
}
</style>
