import { serviceRoutes } from '@/modules/service/routes'
import { dashboardRoutes } from '@/modules/dashboard/routes'

export const routes = [
	...serviceRoutes,
	...dashboardRoutes,
]
