import LayoutDefault from '@/modules/layout/components/LayoutDefault.vue'

export const contactRoutes = [
	{
		path: '/contacts',
		name: 'contacts',
		meta: { layout: LayoutDefault },
		component: () => import('@/modules/contact/views/ContactEditView.vue'),
	},
]
