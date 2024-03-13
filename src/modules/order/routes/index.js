import LayoutDefault from '@/modules/layout/components/LayoutDefault.vue'

export const orderRoutes = [
	{
		path: '/orders',
		name: 'orders',
		meta: { layout: LayoutDefault },
		component: () => import('@/modules/order/views/OrderListView.vue'),
	},
	{
		path: '/orders/show/:id',
		name: 'orders.show',
		meta: { layout: LayoutDefault },
		component: () => import('@/modules/order/views/OrderShowView.vue'),
	},
]
