import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
	const isOpen = ref(false)

	const toggleSidebar = () => {
		isOpen.value = !isOpen.value
		document.body.classList.toggle('sidebar-open')

		isOpen.value ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto')
	}

	const closeSidebar = () => {
		isOpen.value = false
		document.body.classList.remove('sidebar-open')
		document.body.style.overflow = 'auto'
	}

	return { isOpen, closeSidebar, toggleSidebar }
})
