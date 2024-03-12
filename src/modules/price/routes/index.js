import LayoutDefault from '@/modules/layout/components/LayoutDefault.vue'

export const priceRoutes = [
	{
		path: '/prices',
		name: 'prices',
		meta: { layout: LayoutDefault },
		component: () => import('@/modules/price/views/PriceEditView.vue'),
	},
]
