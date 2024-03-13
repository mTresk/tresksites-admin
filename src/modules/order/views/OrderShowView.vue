<script setup>
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import Button from 'primevue/button'
import { useHead } from 'unhead'
import { useRoute } from 'vue-router'
import OrderForm from '@/modules/order/components/OrderForm.vue'
import PageHeader from '@/modules/common/components/VPageHeader.vue'
import { useApi } from '@/composables/useApi'

const title = 'Просмотр заказа'

const breadcrumbs = [{ label: 'Заказы', route: 'orders' }, { label: title }]

const route = useRoute()

const { fetch, destroy } = useApi()

const queryClient = useQueryClient()

async function getOrder() {
	const { data } = await fetch(`orders/${route.params.id}`)

	return data
}

const { isLoading, data: order } = useQuery({
	queryKey: ['orders', route.params.id],
	queryFn: getOrder,
	refetchOnMount: true,
})

const { mutate: mutateDelete } = useMutation({
	mutationFn: async () => {
		await destroy(`orders/${route.params.id}`, 'orders')
	},
	onSuccess: async () => {
		await queryClient.resetQueries({ queryKey: ['orders'] })
	},
})

function deleteOrder() {
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
			<Button severity="danger" label="Удалить" size="small" icon="pi pi-times" @click="deleteOrder()" />
		</template>
	</PageHeader>
	<OrderForm :order-props="order" :is-loading="isLoading" />
</template>

<style lang="scss">
.filepond {
	&--credits {
		display: none;
	}
}
</style>
