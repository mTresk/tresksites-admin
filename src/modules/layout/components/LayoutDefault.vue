<script setup>
import TheHeader from '@/modules/layout/components/TheHeader.vue'
import TheSidebar from '@/modules/layout/components/TheSidebar.vue'
</script>

<template>
	<div class="body">
		<TheSidebar />
		<div class="content">
			<TheHeader />
			<main class="page">
				<div class="page__container">
					<slot />
				</div>
			</main>
		</div>
	</div>
</template>

<style lang="scss">
.body {
	display: flex;
	min-height: 100vh;
}

.content {
	width: 100%;
}

.page {
	width: 100%;
	margin-inline: auto;

	@include adaptiveValue('padding-top', 50, 30);
	@include adaptiveValue('padding-bottom', 50, 30);
}
</style>
