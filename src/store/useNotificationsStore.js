import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationsStore = defineStore('notificationStore', () => {
	const notify = ref({
		severity: '',
		summary: '',
		detail: '',
	})

	return { notify }
})
