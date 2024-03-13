import { serviceRoutes } from '@/modules/service/routes'
import { dashboardRoutes } from '@/modules/dashboard/routes'
import { workRoutes } from '@/modules/work/routes'
import { contactRoutes } from '@/modules/contact/routes'
import { priceRoutes } from '@/modules/price/routes'
import { policyRoutes } from '@/modules/policy/routes'
import { orderRoutes } from '@/modules/order/routes'
import { loginRoutes } from '@/modules/auth/routes'

export const routes = [
	...serviceRoutes,
	...dashboardRoutes,
	...workRoutes,
	...contactRoutes,
	...priceRoutes,
	...policyRoutes,
	...orderRoutes,
	...loginRoutes,
]
