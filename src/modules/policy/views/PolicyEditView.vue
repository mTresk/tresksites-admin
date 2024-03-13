<script setup>
import { onMounted, ref, watch } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import Button from 'primevue/button'
import Editor from 'primevue/editor'
import { useHead } from 'unhead'
import Card from 'primevue/card'
import VForm from '@/modules/common/components/VForm.vue'
import VFormField from '@/modules/common/components/VFormField.vue'
import VPageHeader from '@/modules/common/components/VPageHeader.vue'
import { clone } from '@/helpers/clone'
import { useApi } from '@/composables/useApi'

const title = 'Политика конфиденциальности'

const breadcrumbs = [{ label: title }]

const errors = ref()

const { fetch, update, inProgress } = useApi()

const policy = ref({
	content: '',
})

const queryClient = useQueryClient()

async function getPolicy() {
	const { data } = await fetch('policy')

	return data
}

const { isLoading, data: policyData } = useQuery({
	queryKey: ['policy'],
	queryFn: getPolicy,
})

const { mutate: mutateUpdate } = useMutation({
	mutationFn: async () => {
		errors.value = await update('policy/update', policy.value)
	},
	onSuccess: async () => {
		await queryClient.refetchQueries({ queryKey: ['policy'] })
	},
})

function handleUpdate() {
	mutateUpdate()
}

function cloneData() {
	if (policyData.value)
		policy.value = clone(policyData.value)
}

watch(
	() => policyData.value,
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
	<div>
		<VPageHeader :breadcrumbs="breadcrumbs">
			<template #title>
				{{ title }}
			</template>
		</VPageHeader>
		<Card>
			<template #content>
				<VForm footer :is-loading="isLoading" single-column @form-submit="handleUpdate">
					<template #body>
						<VFormField>
							<Editor
								id="answer"
								v-model="policy.content"
								editor-style="height: 320px; font-size: 16px"
								:class="{ 'p-invalid': errors?.answer }"
							>
								<template #toolbar>
									<span class="ql-formats">
										<select class="ql-header">
											<option selected />
											<option value="1" />
											<option value="2" />
											<option value="3" />
										</select>
									</span>
									<span class="ql-formats">
										<button class="ql-bold" />
										<button class="ql-italic" />
										<button class="ql-underline" />
									</span>
									<span class="ql-formats">
										<button class="ql-list" value="ordered" />
										<button class="ql-list" value="bullet" />
										<button class="ql-link" />
									</span>
								</template>
							</Editor>
							<small v-if="errors?.content" id="text-error" class="p-error">{{ errors?.content[0] || '&nbsp;' }}</small>
						</VFormField>
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
	</div>
</template>
