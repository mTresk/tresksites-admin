<script setup>
import { onMounted, ref, watch } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useRoute } from 'vue-router'
import Textarea from 'primevue/textarea'
import Card from 'primevue/card'
import VFileUpload from '@/modules/common/components/VFileUpload.vue'
import VForm from '@/modules/common/components/VForm.vue'
import VFormField from '@/modules/common/components/VFormField.vue'
import { clone } from '@/helpers/clone'
import { useApi } from '@/composables/useApi'

const props = defineProps({
	isLoading: Boolean,
	orderProps: Object,
})

const order = ref({})

function cloneProps() {
	if (props.orderProps)
		order.value = clone(props.orderProps)
}

watch(
	() => props.orderProps,
	() => cloneProps(),
)

onMounted(() => {
	cloneProps()
})
</script>

<template>
	<Card>
		<template #content>
			<VForm>
				<template #body>
					<VFormField>
						<span class="p-float-label">
							<InputText
								id="name"
								v-model="order.name"
								type="text"
								aria-describedby="text-error"
							/>
							<label for="name">Имя</label>
						</span>
					</VFormField>
					<VFormField>
						<span class="p-float-label">
							<InputText
								id="name"
								v-model="order.phone"
								type="text"
								aria-describedby="text-error"
							/>
							<label for="name">Телефон</label>
						</span>
					</VFormField>
					<VFormField>
						<span class="p-float-label">
							<InputText
								id="email"
								v-model="order.email"
								type="text"
								aria-describedby="text-error"
							/>
							<label for="email">Email</label>
						</span>
					</VFormField>
					<VFormField>
						<span class="p-float-label">
							<Textarea
								id="message"
								v-model="order.message"
								type="text"
								aria-describedby="text-error"
							/>
							<label for="message">Сообщение</label>
						</span>
					</VFormField>
					<VFormField wide>
						<label class="form__label" for="file">Иконка</label>
						<VFileUpload
							:model="order"
						/>
					</VFormField>
				</template>
			</VForm>
		</template>
	</Card>
</template>
