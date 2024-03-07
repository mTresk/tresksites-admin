<script setup>
import ConfirmDialog from 'primevue/confirmdialog'
import DynamicDialog from 'primevue/dynamicdialog'
import Toast from 'primevue/toast'
import { provide } from 'vue'
import { useDark } from '@vueuse/core'
import { useToast } from 'primevue/usetoast'
import { useSidebarStore } from './store/useSidebarStore'
import { useNotificationsStore } from '@/store/useNotificationsStore'

const notificationsStore = useNotificationsStore()

const sidebarStore = useSidebarStore()

const toast = useToast()

notificationsStore.$subscribe((mutation, state) => {
	const { severity, summary, detail } = state.notify
	toast.add({ severity, summary, detail, life: 3000 })
})

provide('toastNotify', (args) => {
	const { severity, summary, detail } = args
	notificationsStore.notify = { severity, summary, detail }
})

useDark()
</script>

<template>
	<div>
		<div class="wrapper">
			<div class="overlay" @click="sidebarStore.closeSidebar()" />
			<component :is="$route.meta.layout">
				<router-view />
			</component>
			<Toast />
			<DynamicDialog />
			<ConfirmDialog />
		</div>
	</div>
</template>

<style lang="scss">
.wrapper {
	position: relative;
	min-height: 100vh;
	background-color: rgb(249 250 251 / 100%);

	.dark & {
		background-color: $blackColor;
	}
}

.overlay {
	position: fixed;
	inset: 0;
	z-index: 150;
	width: 100%;
	height: 100%;
	visibility: hidden;
	background-color: rgb(0 0 0 / 80%);
	opacity: 0;
	transition: all 0.3s ease-in-out;

	.sidebar-open & {
		visibility: visible;
		opacity: 1;
	}
}

.text-green {
	color: $greenColor;
}

.text-red {
	color: $redColor;
}

.page-block {
	&:not(:last-child) {
		@include adaptiveValue('margin-bottom', 50, 30);
	}
}
</style>
