import { ofetch } from 'ofetch'

export const api = ofetch.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	credentials: 'include',
})
