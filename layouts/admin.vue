<template>
	<!-- <NuxtLink
		class="fixed top-3 right-5 text-green-600 hover:underline"
		to="/"
		>Home</NuxtLink
	> -->
	<UiNavBar />

	<div
		class="overflow-y-auto h-lvh mt-16 w-full flex items-center justify-center py-10 px-5"
	>
		<slot />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
