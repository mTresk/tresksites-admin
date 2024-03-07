<script setup>
import { onMounted, ref, watch } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useRoute } from 'vue-router'
import Textarea from 'primevue/textarea'
import VFileUpload from '@/modules/common/components/VFileUpload.vue'
import VForm from '@/modules/common/components/VForm.vue'
import VFormField from '@/modules/common/components/VFormField.vue'
import { clone } from '@/helpers/clone'
import { useApi } from '@/composables/useApi'

const props = defineProps({
	isLoading: Boolean,
	serviceProps: Object,
})

const errors = ref()

const route = useRoute()

const { update, create, inProgress } = useApi()

const service = ref({
	title: '',
	description: '',
	url: '',
})

const queryClient = useQueryClient()

const { mutate: mutateUpdate } = useMutation({
	mutationFn: async () => {
		errors.value = await update(`services/${route.params.id}`, service.value)
	},
	onSuccess: async () => {
		await queryClient.refetchQueries({ queryKey: ['services'] })
	},
})

function handleUpdate() {
	mutateUpdate()
}

const { mutate: mutateCreate } = useMutation({
	mutationFn: async () => {
		errors.value = await create('services', service.value, 'services')
	},
	onSuccess: async () => {
		await queryClient.invalidateQueries({ queryKey: ['services'] })
	},
})

function handleCreate() {
	mutateCreate()
}

function cloneProps() {
	if (props.serviceProps)
		service.value = clone(props.serviceProps)
}

watch(
	() => props.serviceProps,
	() => cloneProps(),
)

onMounted(() => {
	cloneProps()
})
</script>

<template>
	<VForm :is-loading="isLoading" @form-submit="props.serviceProps?.id ? handleUpdate() : handleCreate()">
		<template #body>
			<VFormField wide>
				<label class="form__label" for="file">Иконка</label>
				<VFileUpload
					:service="service"
					:errors="errors"
					@url="
						(url) => {
							service.url = url
						}
					"
				/>
				<small v-if="errors?.url" id="text-error" class="p-error">{{ errors?.url[0] || '&nbsp;' }}</small>
			</VFormField>
			<VFormField wide>
				<span class="p-float-label">
					<InputText
						id="title"
						v-model="service.title"
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
						v-model="service.description"
						type="text"
						:class="{ 'p-invalid': errors?.description }"
						aria-describedby="text-error"
					/>
					<label for="description">Описание</label>
				</span>
				<small v-if="errors?.description" id="text-error" class="p-error">{{ errors?.description[0] || '&nbsp;' }}</small>
			</VFormField>
		</template>
		<template #footer>
			<Button :loading="inProgress" type="submit" label="Сохранить" size="small" />
			<router-link :to="{ name: 'services' }">
				<Button type="button" label="Отмена" severity="plain" outlined size="small" />
			</router-link>
		</template>
	</VForm>
</template>
