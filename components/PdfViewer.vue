<template>
	<div
		ref="viewer"
		class="w-full h-screen rounded-md shadow-sm"
	/>
</template>

<script setup lang="ts">
const {url} = defineProps<{url: string}>()
const {pdfViewerLicenseKey} = useRuntimeConfig().public

const viewer = ref<any>(null)
const instance = ref<any>(null)

onMounted(() => {
	if (typeof window !== 'undefined' && url) {
		import('@pdftron/pdfjs-express').then(({default: WebViewer}) => {
			WebViewer(
				{
					path: '/lib',
					initialDoc: url,
					licenseKey: pdfViewerLicenseKey,
				},
				viewer.value
			).then((_instance: any) => {
				_instance.UI.setLanguage('pt_br')
				instance.value = _instance
			})
		})
	}
})

const goFullscreen = () => {
	if (instance) {
		instance.value?.UI.toggleFullScreen()
	}
}

defineExpose({
	goFullscreen,
})
</script>
