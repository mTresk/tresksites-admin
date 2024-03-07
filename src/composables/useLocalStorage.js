import { onScopeDispose, ref, watch } from 'vue'

export function useLocalStorage(key, defautValue) {
	const value = ref(defautValue)

	const storageVal = localStorage.getItem(key)

	if (storageVal)
		value.value = JSON.parse(storageVal)

	function handleStorageEvent(event) {
		if (event.key === key)
			value.value = JSON.parse(event.newValue || 'null')
	}

	window.addEventListener('storage', handleStorageEvent)

	onScopeDispose(() => {
		window.removeEventListener('storage', handleStorageEvent)
	})

	watch(
		value,
		(newValue) => {
			localStorage.setItem(key, JSON.stringify(newValue))
		},
		{ deep: true },
	)

	return value
}
