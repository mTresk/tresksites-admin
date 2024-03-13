import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'
import { routes } from '@/modules/common/router/routes'
import { useAuthStore } from '@/store/useAuthStore'

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach(async (to) => {
	const { user } = storeToRefs(useAuthStore())

	await useAuthStore().verifysession()

	if (!user.value && to.name !== 'login')
		return { name: 'login' }

	if (user.value && to.name === 'login')
		return { name: 'dashboard' }
})

export default router
