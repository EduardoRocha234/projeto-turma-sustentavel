<template>
	<div
		class="bg-green-100 shadow-md rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between transition"
	>
		<div>
			<h3 class="text-lg md:text-xl font-semibold text-green-800">
				{{ student.name }}
			</h3>

			<p class="md:text-lg text-green-800 mt-2 flex items-center gap-2">
				<Icon
					name="mdi:book-open-page-variant-outline"
					size="27"
					class="text-green-600"
				/>
				Título:
				<span class="font-medium truncate">{{ student.book_title }}</span>
			</p>

			<p class="md:text-lg text-green-800 mt-2 flex items-center gap-2 mb-4">
				<Icon
					name="mdi:google-classroom"
					size="27"
					class="text-green-600"
				/>
				Turma:
				<span class="font-medium">{{ student.class }}º ano</span>
			</p>
		</div>

		<NuxtLink
			:to="`/books/${student.id}`"
			class="rounded-full text-center w-full bg-green-500 text-white px-5 py-2 font-bold hover:bg-green-600 transition-all hover:shadow-lg"
		>
			Ler livro
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
import type {IStudent} from '~/interfaces'

defineProps<{student: IStudent}>()
</script>

<style scoped></style>
