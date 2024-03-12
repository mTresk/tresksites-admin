import LayoutDefault from '@/modules/layout/components/LayoutDefault.vue'

export const policyRoutes = [
	{
		path: '/policy',
		name: 'policy',
		meta: { layout: LayoutDefault },
		component: () => import('@/modules/policy/views/PolicyEditView.vue'),
	},
]
