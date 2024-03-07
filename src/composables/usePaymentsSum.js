import { computed } from 'vue'

export function usePaymentsSum(user) {
	const sum = computed(() => {
		let payments = null

		user?.value?.payments.forEach((payment) => {
			payments = payments + payment.amount
		})

		return payments
	})

	return sum
}
