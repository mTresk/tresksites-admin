<script setup>
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css'
import 'filepond-plugin-get-file/dist/filepond-plugin-get-file.min.css'
import { ref, watch } from 'vue'
import FilePondPluginFilePoster from 'filepond-plugin-file-poster'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginGetFile from 'filepond-plugin-get-file'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import vueFilePond from 'vue-filepond'
import { api } from '@/utils/api'

const props = defineProps({
	errors: [Object, String],
	model: [Object, String],
})

const emit = defineEmits(['url'])

const FilePond = vueFilePond(
	FilePondPluginFileValidateType,
	FilePondPluginImagePreview,
	FilePondPluginFilePoster,
	FilePondPluginGetFile,
)

const baseUrl = import.meta.env.VITE_BACKEND_URL

const files = ref([])

function uploadFile(response) {
	if (!props.model?.galleryId)
		emit('url', response)
}

function revertFile(source, load) {
	api(`/api/files/upload/${props.model?.url}`, {
		method: 'DELETE',
	})
	emit('url', null)
	load()
}

function removeFile(source, load) {
	emit('url', null)
	load()
}

function loadFiles(source, load) {
	api(source).then((response) => {
		load(response)
	})
}

watch(
	() => props.model,
	() => {
		files.value = [
			{
				source: props.model.files?.original,
				options: {
					type: 'local',
					metadata: {
						poster: props.model.files?.original,
					},
				},
			},
		]
	},
)

if (props.model.files) {
	files.value = [
		{
			source: props.model.files?.original,
			options: {
				type: 'local',
				metadata: {
					poster: props.model.files?.original,
				},
			},
		},
	]
}

watch(
	() => props.model.attachment,
	() => {
		files.value = [
			{
				source: props.model.attachment,
				options: {
					type: 'local',
					metadata: {
						poster: props.model.attachment,
					},
				},
			},
		]
	},
)
</script>

<template>
	<FilePond
		name="file"
		class-name="my-pond"
		label-idle="Перенесите файл сюда..."
		:allow-file-type-validation="false"
		allow-multiple="false"
		max-files="1"
		:file-poster-max-height="300"
		:files="files"
		:server="{
			url: `${baseUrl}/api/files`,
			process: {
				url: '/upload',
				method: 'POST',
				onload: uploadFile,
				withCredentials: true,
			},
			load: loadFiles,
			remove: removeFile,
			revert: revertFile,
		}"
	/>
</template>

<style lang="scss">
.filepond {
	&--credits {
		display: none;
	}
}
</style>
