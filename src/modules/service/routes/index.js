import LayoutDefault from '@/modules/layout/components/LayoutDefault.vue'

export const serviceRoutes = [
	{
		path: '/services',
		name: 'services',
		meta: { layout: LayoutDefault },
		component: () => import('@/modules/service/views/ServiceListView.vue'),
	},
	{
		path: '/services/edit/:id',
		name: 'services.edit',
		meta: { layout: LayoutDefault },
		component: () => import('@/modules/service/views/ServiceEditView.vue'),
	},
	{
		path: '/services/create',
		name: 'services.create',
		meta: { layout: LayoutDefault },
		component: () => import('@/modules/service/views/ServiceCreateView.vue'),
	},
]
