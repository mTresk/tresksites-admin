import LayoutDefault from '@/modules/layout/components/LayoutDefault.vue'

export const dashboardRoutes = [
	{
		path: '/',
		name: 'dashboard',
		meta: { layout: LayoutDefault },
		component: () => import('@/modules/dashboard/views/DashboardView.vue'),
	},
]
