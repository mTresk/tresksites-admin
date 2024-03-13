<script setup>
import { onMounted, ref, watch } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useHead } from 'unhead'
import Card from 'primevue/card'
import Editor from 'primevue/editor'
import Textarea from 'primevue/textarea'
import VForm from '@/modules/common/components/VForm.vue'
import VFormField from '@/modules/common/components/VFormField.vue'
import VPageHeader from '@/modules/common/components/VPageHeader.vue'
import { clone } from '@/helpers/clone'
import { useApi } from '@/composables/useApi'
import VFileUpload from '@/modules/common/components/VFileUpload.vue'

const title = 'Цены'

const breadcrumbs = [{ label: title }]

const errors = ref()

const field = ref({})

const { fetch, update, inProgress } = useApi()

const prices = ref({
	title: '',
	description: '',
	block: [],
})

const queryClient = useQueryClient()

async function getPrices() {
	const { data } = await fetch('prices')

	return data
}

const { isLoading, data: pricesData } = useQuery({
	queryKey: ['prices'],
	queryFn: getPrices,
})

const { mutate: mutateUpdate } = useMutation({
	mutationFn: async () => {
		errors.value = await update('prices/update', prices.value)
	},
	onSuccess: async () => {
		await queryClient.refetchQueries({ queryKey: ['prices'] })
	},
})

function addField() {
	prices.value.block.push(field.value)
	field.value = {}
}

function removeField(index) {
	prices.value.block.splice(index, 1)
}

function handleUpdate() {
	mutateUpdate()
}

function cloneData() {
	if (pricesData.value)
		prices.value = clone(pricesData.value)
}

watch(
	() => pricesData.value,
	() => cloneData(),
)

onMounted(() => {
	cloneData()
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
	</VPageHeader>
	<Card>
		<template #content>
			<VForm footer :is-loading="isLoading" single-column @form-submit="handleUpdate">
				<template #body>
					<VFormField wide="">
						<span class="p-float-label">
							<InputText
								id="title"
								v-model="prices.title"
								type="text"
								:class="{ 'p-invalid': errors?.title }"
								aria-describedby="text-error"
							/>
							<label for="title">Заголовок</label>
						</span>
						<small v-if="errors?.title" id="text-error" class="p-error">{{ errors?.title[0] || '&nbsp;' }}</small>
					</VFormField>
					<VFormField wide>
						<span class="p-float-label">
							<Textarea
								id="description"
								v-model="prices.description"
								type="text"
								:class="{ 'p-invalid': errors?.description }"
								aria-describedby="text-error"
							/>
							<label for="description">Описание</label>
						</span>
						<small v-if="errors?.description" id="text-error" class="p-error">{{ errors?.description[0] || '&nbsp;' }}</small>
					</VFormField>
					<Card class="card">
						<template #title>
							Цены
						</template>
						<template #content>
							<div v-for="(block, index) in prices.block" :id="index + 1" :key="index" class="card__item">
								<div class="card__line">
									<span class="p-float-label">
										<InputText
											id="service"
											v-model="prices.block[index].service"
											type="text"
											aria-describedby="text-error"
										/>
										<label for="service">Услуга</label>
									</span>
									<span class="p-float-label">
										<InputText
											id="price"
											v-model="prices.block[index].price"
											type="text"
											aria-describedby="text-error"
										/>
										<label for="price">Цена</label>
									</span>
								</div>

								<Button
									icon="pi pi-times"
									severity="danger"
									text
									rounded
									aria-label="Удалить"
									@click="removeField(index)"
								/>
							</div>
							<Button class="card__button" label="Добавить" severity="success" size="small" @click="addField" />
						</template>
					</Card>
				</template>
				<template #footer>
					<Button :loading="inProgress" type="submit" label="Сохранить" size="small" />
					<router-link :to="{ name: 'dashboard' }">
						<Button type="button" label="Отмена" severity="plain" outlined size="small" />
					</router-link>
				</template>
			</VForm>
		</template>
	</Card>
</template>
