<script setup>
import { onMounted, ref, watch } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useHead } from 'unhead'
import Card from 'primevue/card'
import Editor from 'primevue/editor'
import VForm from '@/modules/common/components/VForm.vue'
import VFormField from '@/modules/common/components/VFormField.vue'
import VPageHeader from '@/modules/common/components/VPageHeader.vue'
import { clone } from '@/helpers/clone'
import { useApi } from '@/composables/useApi'
import VFileUpload from '@/modules/common/components/VFileUpload.vue'

const title = 'Контакты'

const breadcrumbs = [{ label: title }]

const errors = ref()

const field = ref({})

const { fetch, update, inProgress } = useApi()

const contacts = ref({
	name: '',
	inn: '',
	email: '',
	telegram: '',
	galleryId: '',
	block: [],
})

const queryClient = useQueryClient()

async function getContacts() {
	const { data } = await fetch('contacts')

	return data
}

const { isLoading, data: contactsData } = useQuery({
	queryKey: ['contacts'],
	queryFn: getContacts,
})

const { mutate: mutateUpdate } = useMutation({
	mutationFn: async () => {
		errors.value = await update('contacts/update', contacts.value)
	},
	onSuccess: async () => {
		await queryClient.refetchQueries({ queryKey: ['contacts'] })
	},
})

function handleUpdate() {
	mutateUpdate()
}

function addField() {
	contacts.value.block.push(field.value)
	field.value = {}
}

function removeField(index) {
	contacts.value.block.splice(index, 1)
}

function cloneData() {
	if (contactsData.value)
		contacts.value = clone(contactsData.value)
}

watch(
	() => contactsData.value,
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
								id="name"
								v-model="contacts.name"
								type="text"
								:class="{ 'p-invalid': errors?.name }"
								aria-describedby="text-error"
							/>
							<label for="name">Имя</label>
						</span>
						<small v-if="errors?.name" id="text-error" class="p-error">{{ errors?.name[0] || '&nbsp;' }}</small>
					</VFormField>
					<VFormField wide>
						<span class="p-float-label">
							<InputText
								id="inn"
								v-model="contacts.inn"
								type="text"
								:class="{ 'p-invalid': errors?.inn }"
								aria-describedby="text-error"
							/>
							<label for="inn">ИНН</label>
						</span>
						<small v-if="errors?.inn" id="text-error" class="p-error">{{ errors?.inn[0] || '&nbsp;' }}</small>
					</VFormField>
					<VFormField wide>
						<span class="p-float-label">
							<InputText
								id="email"
								v-model="contacts.email"
								type="text"
								:class="{ 'p-invalid': errors?.email }"
								aria-describedby="text-error"
							/>
							<label for="email">Email</label>
						</span>
						<small v-if="errors?.email" id="text-error" class="p-error">{{ errors?.email[0] || '&nbsp;' }}</small>
					</VFormField>
					<VFormField wide>
						<span class="p-float-label">
							<InputText
								id="telegram"
								v-model="contacts.telegram"
								type="text"
								:class="{ 'p-invalid': errors?.telegram }"
								aria-describedby="text-error"
							/>
							<label for="telegram">Телеграм</label>
						</span>
						<small v-if="errors?.telegram" id="text-error" class="p-error">{{ errors?.telegram[0] || '&nbsp;' }}</small>
					</VFormField>
					<VFormField wide>
						<small v-if="errors?.block" id="text-error" class="p-error">{{ errors?.block[0] || '&nbsp;' }}</small>
						<div v-for="(block, index) in contacts.block" :id="index + 1" :key="index" class="card__item">
							<VFormField wide>
								<Editor
									id="list"
									:key="index"
									v-model="contacts.block[index].content"
									editor-style="min-height: auto; font-size: 16px"
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
							</VFormField>

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
					</VFormField>
					<VFormField wide>
						<label class="form__label" for="file">Бриф</label>
						<VFileUpload
							:model="contacts"
							:errors="errors"
							@url="
								(galleryId) => {
									contacts.galleryId = galleryId
								}
							"
						/>
						<small v-if="errors?.galleryId" id="text-error" class="p-error">{{ errors?.galleryId[0] || '&nbsp;' }}</small>
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
</template>
