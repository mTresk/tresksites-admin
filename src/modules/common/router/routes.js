import { serviceRoutes } from '@/modules/service/routes'
import { dashboardRoutes } from '@/modules/dashboard/routes'
import { workRoutes } from '@/modules/work/routes'
import { contactRoutes } from '@/modules/contact/routes'

export const routes = [
	...serviceRoutes,
	...dashboardRoutes,
	...workRoutes,
	...contactRoutes,
]
