<template>
	<div
		class="bg-green-100 shadow-md rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between transition max-h-[15rem]"
	>
		<div class="space-y-2 mb-4">
			<div
				class="text-xl md:text-xl flex items-center gap-2 font-semibold text-green-800 mb-3 border-b-2 border-green-200 pb-2 truncate"
			>
				<Icon
					name="mdi:book-open-page-variant-outline"
					size="27"
					class="text-green-600"
				/>
				{{ student.name }}
			</div>

			<span class="text-xl text-green-800 font-bold truncate text-wrap">
				{{ student.book_title }}
			</span>
		</div>

		<NuxtLink
			:to="`/books/${student.id}`"
			class="rounded-xl text-center w-full bg-green-500 text-white px-5 py-2 font-bold hover:bg-green-600 transition-all hover:shadow-lg"
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
