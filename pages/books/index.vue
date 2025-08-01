<template>
	<div
		class="h-full min-h-[50rem] md:items-start px-5 md:px-[10rem] py-10 mt-16"
	>
		<h2
			class="text-lg md:text-2xl 2xl:text-3xl font-bold text-center text-green-700 mb-8"
		>
			Livros dos Alunos
		</h2>
		<div v-if="status === 'pending'">
			<div class="flex gap-2 mb-5">
				<LazySkeleton
					height="45px"
					width="300px"
				/>
			</div>
			<div
				class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl"
			>
				<LazySkeleton
					height="240px"
					class="mb-4"
				/>
				<LazySkeleton
					height="240px"
					class="mb-4"
				/>
				<LazySkeleton
					height="240px"
					class="mb-4"
				/>
				<LazySkeleton
					height="240px"
					class="mb-4"
				/>
			</div>
		</div>
		<div v-else>
			<div class="mt-7">
				<IconField>
					<InputIcon>
						<div class="-mt-0.5">
							<Icon
								name="mdi:search"
								size="20"
							/>
						</div>
					</InputIcon>
					<InputText
						placeholder="Pesquisar aluno..."
						v-model="search"
						class="w-full md:w-auto"
					/>
				</IconField>
				<div
					class="grid grid-cols-1 mt-7 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
				>
					<template v-if="data && data.length > 0">
						<LazyUiCardBook
							v-for="student in filteredStudents(data)"
							:key="student.id"
							:student
						/>
					</template>
					<template v-else>
						<div
							class="flex flex-col items-center justify-center w-full h-full"
						>
							<Icon
								name="mdi:book-open-page-variant-outline"
								size="50"
								class="text-green-400 mb-2"
							/>
							<span class="text-green-500 text-lg font-semibold">
								Em breve haverá livros dessa turma.
							</span>
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type {IStudent} from '~/interfaces'

const tabs = computed(() => {
	if (!data.value) return []

	return Object.keys(data.value).map((_class) => ({
		label: `${_class}º ano`,
		key: _class,
	}))
})

const search = ref<string>('')

const filteredStudents = (studentsList: IStudent[]) => {
	if (!search.value || search.value.trim() === '') return studentsList

	return studentsList.filter((student) => {
		const studentName = student.name.toLowerCase()
		const searchTerm = search.value.toLowerCase()

		return studentName.includes(searchTerm)
	})
}

const {data, status} = await useLazyFetch<IStudent[]>('/api/v1/student')
</script>

<style scoped></style>
