import LayoutEmpty from '@/modules/layout/components/LayoutEmpty.vue'

export const loginRoutes = [
	{
		path: '/login',
		name: 'login',
		meta: { layout: LayoutEmpty },
		component: () => import('@/modules/auth/views/LoginView.vue'),
	},
]
