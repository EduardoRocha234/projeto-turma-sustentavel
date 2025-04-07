<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
provideHeadlessUseId(() => useId())

useSeoMeta({
	title: 'A Turma Sustentável',
	ogTitle: 'A Turma Sustentável',
	description: 'Um projeto que une estudantes, sustentabilidade e inovação',
	ogDescription: 'Educação, Campo e Tecnologia de Forma Interligada',
	charset: 'utf-8',
	themeColor: 'green',
})
</script>

<style scoped></style>
