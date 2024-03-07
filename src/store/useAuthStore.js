import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '../composables/useLocalStorage'
import { useNotificationsStore } from './useNotificationsStore'
import { api } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
	const inProgress = ref(false)

	const errors = ref()

	const router = useRouter()

	const notificationsStore = useNotificationsStore()

	const user = useLocalStorage('auth.user', null)

	let isSessionVerified = false

	async function login(form) {
		try {
			errors.value = ''
			inProgress.value = true

			await api('/login', {
				method: 'POST',
				body: form,

				async onResponse({ response }) {
					if (response.status === 200) {
						inProgress.value = false

						await getUser()

						notificationsStore.notify = {
							severity: 'success',
							summary: 'Успешно!',
							detail: `Добро пожаловать, ${user.value.name}!`,
						}

						await router.push({ name: 'dashboard' })
						errors.value = null
					}
				},
			})
		}
		catch (error) {
			notificationsStore.notify = {
				severity: 'error',
				summary: 'Ошибка!',
				detail: error.response._data.message ?? 'Проверьте введенные данные',
			}

			errors.value = error.response._data.errors
			inProgress.value = false
		}

		return errors.value
	}

	async function getUser() {
		isSessionVerified = true
		user.value = await api('/user')
	}

	async function logout() {
		await api('/logout', {
			method: 'POST',
		})

		localStorage.removeItem('auth.user')
		user.value = null
		await router.push({ name: 'login' })
	}

	async function verifysession() {
		if (user.value && !isSessionVerified) {
			try {
				await getUser()
			}
			catch (error) {
				user.value = null
			}
		}
	}

	function clearUser() {
		user.value = null
	}

	return { login, logout, verifysession, clearUser, inProgress, user }
})
