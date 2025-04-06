<template>
	<button
		ref="scrollTopButton"
		@click="scrollToTop"
		aria-label="Scroll to Top Button"
		class="fixed bottom-4 right-4 bg-green-500 rounded-full p-2 size-12 opacity-70 hover:opacity-100 transition-all ease-in duration-200 z-[9999]"
	>
		<Icon
			name="mdi:chevron-up"
			size="30"
			class="text-white"
		/>
	</button>
</template>

<script setup lang="ts">
const scrollTopButton = ref<HTMLElement | null>(null)

const scrollToTop = () => {
	window.scrollTo({top: 0, behavior: 'smooth'})
}

const handleScroll = () => {
	if (window.scrollY > 0) {
		scrollTopButton.value?.classList.remove('!opacity-0')
	} else {
		scrollTopButton.value?.classList.add('!opacity-0')
	}
}

onMounted(() => {
	window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped></style>
