import { toRaw } from 'vue'

export function clone(obj) {
	return structuredClone(toRaw(obj))
}
