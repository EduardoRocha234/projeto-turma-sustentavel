<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
provideHeadlessUseId(() => useId())
</script>

<style scoped></style>
