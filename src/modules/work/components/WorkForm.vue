<script setup>
import { onMounted, ref, watch } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Editor from 'primevue/editor'
import { useRoute } from 'vue-router'
import InputSwitch from 'primevue/inputswitch'
import VFileUpload from '@/modules/common/components/VFileUpload.vue'
import VForm from '@/modules/common/components/VForm.vue'
import VFormField from '@/modules/common/components/VFormField.vue'
import { clone } from '@/helpers/clone'
import { useApi } from '@/composables/useApi'
import { slug } from '@/helpers/slug'

const props = defineProps({
	isLoading: Boolean,
	workProps: Object,
})

const errors = ref()

const route = useRoute()

const { update, create, inProgress } = useApi()

const field = ref({ data: {
	html: '',
} })

const work = ref({
	name: '',
	slug: '',
	label: '',
	url: '',
	isFeatured: false,
	list: '',
	content: [],
	galleryId: '',
})

const queryClient = useQueryClient()

const { mutate: mutateUpdate } = useMutation({
	mutationFn: async () => {
		errors.value = await update(`works/${route.params.id}`, work.value)
	},
	onSuccess: async () => {
		await queryClient.refetchQueries({ queryKey: ['works'] })
	},
})

function handleUpdate() {
	mutateUpdate()
}

const { mutate: mutateCreate } = useMutation({
	mutationFn: async () => {
		errors.value = await create('works', work.value, 'works')
	},
	onSuccess: async () => {
		await queryClient.invalidateQueries({ queryKey: ['works'] })
	},
})

function handleCreate() {
	mutateCreate()
}

function cloneProps() {
	if (props.workProps)
		work.value = clone(props.workProps)
}

function addField() {
	work.value.content.push(field.value)
	field.value = {
		data: {},
	}
}

function removeField(index) {
	work.value.content.splice(index, 1)
}

watch(
	() => props.workProps,
	() => cloneProps(),
)

watch(
	() => work.value.name,
	() => work.value.slug = slug(work.value.name),
)

onMounted(() => {
	cloneProps()
})
</script>

<template>
	<VForm :is-loading="isLoading" @form-submit="props.workProps?.id ? handleUpdate() : handleCreate()">
		<template #body>
			<VFormField wide>
				<label class="form__label" for="file">Основное изображение</label>
				<VFileUpload
					:model="work"
					:errors="errors"
					@url="
						(galleryId) => {
							work.galleryId = galleryId
						}
					"
				/>
				<small v-if="errors?.galleryId" id="text-error" class="p-error">{{ errors?.galleryId[0] || '&nbsp;' }}</small>
			</VFormField>
			<VFormField>
				<span class="p-float-label">
					<InputText
						id="name"
						v-model="work.name"
						type="text"
						:class="{ 'p-invalid': errors?.name }"
						aria-describedby="text-error"
					/>
					<label for="name">Название</label>
				</span>
				<small v-if="errors?.name" id="text-error" class="p-error">{{ errors?.name[0] || '&nbsp;' }}</small>
			</VFormField>
			<VFormField>
				<span class="p-float-label">
					<InputText
						id="name"
						v-model="work.slug"
						type="text"
						:class="{ 'p-invalid': errors?.slug }"
						aria-describedby="text-error"
					/>
					<label for="slug">Слаг</label>
				</span>
				<small v-if="errors?.slug" id="text-error" class="p-error">{{ errors?.slug[0] || '&nbsp;' }}</small>
			</VFormField>
			<VFormField>
				<span class="p-float-label">
					<InputText
						id="label"
						v-model="work.label"
						type="text"
						:class="{ 'p-invalid': errors?.label }"
						aria-describedby="text-error"
					/>
					<label for="label">Лейбл</label>
				</span>
				<small v-if="errors?.label" id="text-error" class="p-error">{{ errors?.label[0] || '&nbsp;' }}</small>
			</VFormField>
			<VFormField>
				<span class="p-float-label">
					<InputText
						id="url"
						v-model="work.url"
						type="text"
						:class="{ 'p-invalid': errors?.url }"
						aria-describedby="text-error"
					/>
					<label for="url">Ссылка</label>
				</span>
				<small v-if="errors?.url" id="text-error" class="p-error">{{ errors?.url[0] || '&nbsp;' }}</small>
			</VFormField>
			<VFormField>
				<label class="form__label" for="isFeatured">В подборке</label>
				<InputSwitch
					id="isFeatured"
					v-model="work.isFeatured"
					:class="{ 'p-invalid': errors?.isFeatured }"
					aria-describedby="text-error"
				/>

				<small v-if="errors?.isFeatured" id="text-error" class="p-error">{{ errors?.isFeatured[0] || '&nbsp;' }}</small>
			</VFormField>
			<VFormField wide>
				<Editor
					id="list"
					v-model="work.list"
					editor-style="font-size: 16px"
					:class="{ 'p-invalid': errors?.list }"
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
				<small v-if="errors?.list" id="text-error" class="p-error">{{ errors?.list[0] || '&nbsp;' }}</small>
			</VFormField>
			<Card class="card">
				<template #title>
					Содержимое
				</template>
				<template #content>
					<div v-for="(block, index) in work.content" :id="index + 1" :key="index" class="card__item">
						<div class="card__body p-card">
							<div class="card__block">
								<label class="form__label" for="file">Текст</label>
								<Editor
									id="list"
									:key="index"
									v-model="work.content[index].data.html"
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
							</div>
							<VFormField wide>
								<label class="form__label" for="file">Изображение</label>
								<VFileUpload
									:model="work.content[index].data"
									:errors="errors"
									@url="
										(url) => {
											work.content[index].data.galleryId = url
										}
									"
								/>
								<small v-if="errors?.url" id="text-error" class="p-error">{{ errors?.url[0] || '&nbsp;' }}</small>
							</VFormField>
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
			<router-link :to="{ name: 'works' }">
				<Button type="button" label="Отмена" severity="plain" outlined size="small" />
			</router-link>
		</template>
	</VForm>
</template>
