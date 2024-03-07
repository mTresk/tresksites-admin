<script setup>
import { useHead } from 'unhead'
import ConfigForm from '@/modules/service/components/ServiceForm.vue'
import VPageHeader from '@/modules/common/components/VPageHeader.vue'

const title = 'Создание услуги'

const breadcrumbs = [{ label: 'Услуги', route: 'services' }, { label: title }]

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
