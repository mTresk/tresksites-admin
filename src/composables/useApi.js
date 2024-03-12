import { ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useRouter } from 'vue-router'
import { api } from '../utils/api'
import { useNotificationsStore } from '../store/useNotificationsStore'
import { useAuthStore } from '@/store/useAuthStore'

export function useApi() {
	const errors = ref()

	const isLoading = ref(false)

	const inProgress = ref(false)

	const router = useRouter()

	const notificationsStore = useNotificationsStore()

	const confirm = useConfirm()

	async function fetch(endpoint, lazyParams, serchableColumns) {
		let params

		if (lazyParams) {
			params = {
				params: {
					dt_params: JSON.stringify(lazyParams),
					searchable_columns: JSON.stringify(serchableColumns || ['name', 'email']),
				},
			}
		}
		try {
			errors.value = ''
			isLoading.value = true

			const data = await api(`/api/${endpoint}`, {
				...params,

				async onResponseError({ response }) {
					const { clearUser } = useAuthStore()

					if (response.status === 401 || response.status === 403) {
						clearUser()

						await router.push({
							name: 'login',
						})
					}
				},
			})

			isLoading.value = false

			return { data }
		}
		catch (error) {
			if (error.response.status !== 401) {
				notificationsStore.notify = {
					severity: 'error',
					summary: 'Ошибка!',
					detail: error.response._data.message ?? 'Что-то пошло не так',
				}
			}

			errors.value = error.response._data.errors
			isLoading.value = false

			return errors.value
		}
	}

	async function update(endpoint, payload) {
		try {
			errors.value = ''
			inProgress.value = true

			const response = await api(`/api/${endpoint}`, {
				method: 'PUT',
				body: payload,
			})

			notificationsStore.notify = {
				severity: 'success',
				summary: 'Успешно!',
				detail: response,
			}

			inProgress.value = false
		}
		catch (error) {
			notificationsStore.notify = {
				severity: 'error',
				summary: 'Ошибка!',
				detail: 'Проверьте введенные данные',
			}

			errors.value = error.response._data.errors
			inProgress.value = false
		}

		return errors.value
	}

	async function create(endpoint, payload, route) {
		try {
			errors.value = ''
			inProgress.value = true

			const response = await api(`/api/${endpoint}`, {
				method: 'POST',
				body: payload,
			})

			notificationsStore.notify = {
				severity: 'success',
				summary: 'Успешно!',
				detail: response,
			}

			inProgress.value = false

			await router.push({ name: route })
		}
		catch (error) {
			notificationsStore.notify = {
				severity: 'error',
				summary: 'Ошибка!',
				detail: 'Проверьте введенные данные',
			}

			errors.value = error.response._data.errors
			inProgress.value = false
		}

		return errors.value
	}

	async function destroy(endpoint, route) {
		try {
			confirm.require({
				message: 'Вы действительно хотите удалить запись?',
				header: 'Подтверждение',
				icon: 'pi pi-info-circle',
				acceptClass: 'p-button-danger',
				accept: async () => {
					const response = await api(`/api/${endpoint}`, { method: 'DELETE' })

					notificationsStore.notify = {
						severity: 'success',
						summary: 'Успешно!',
						detail: response,
					}

					router.push({ name: route })
				},
				reject: () => {

				},
			})
		}
		catch (error) {
			notificationsStore.notify = {
				severity: 'error',
				summary: 'Ошибка!',
				detail: 'Что-то пошло не так',
			}

			errors.value = error.response._data.errors
		}

		return errors.value
	}

	return { fetch, update, create, destroy, isLoading, inProgress }
}
