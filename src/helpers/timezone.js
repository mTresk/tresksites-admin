export function converToLocalDate(date) {
	date = new Date(date)
	date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
	return date
}

export function convertDate(date) {
	date = new Date(date)
	date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
	return date.toLocaleDateString('ru-RU')
}
