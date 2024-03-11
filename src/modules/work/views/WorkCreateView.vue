<script setup>
import { useHead } from 'unhead'
import ConfigForm from '@/modules/work/components/WorkForm.vue'
import VPageHeader from '@/modules/common/components/VPageHeader.vue'

const title = 'Создание работы'

const breadcrumbs = [{ label: 'Работы', route: 'services' }, { label: title }]

useHead({
	title,
})
</script>

<template>
	<VPageHeader :breadcrumbs="breadcrumbs">
		<template #title>
			{{ title }}
		</template>
	</VPageHeader>
	<ConfigForm />
</template>
