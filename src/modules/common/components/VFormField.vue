<script setup>
const props = defineProps({
	wide: Boolean,
})
</script>

<template>
	<div class="form__field" :class="{ 'form__field--wide': props.wide }">
		<slot />
	</div>
</template>
