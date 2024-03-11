import LayoutDefault from '@/modules/layout/components/LayoutDefault.vue'

export const workRoutes = [
	{
		path: '/works',
		name: 'works',
		meta: { layout: LayoutDefault },
		component: () => import('@/modules/work/views/WorkListView.vue'),
	},
	{
		path: '/works/edit/:id',
		name: 'works.edit',
		meta: { layout: LayoutDefault },
		component: () => import('@/modules/work/views/WorkEditView.vue'),
	},
	{
		path: '/works/create',
		name: 'works.create',
		meta: { layout: LayoutDefault },
		component: () => import('@/modules/work/views/WorkCreateView.vue'),
	},
]
