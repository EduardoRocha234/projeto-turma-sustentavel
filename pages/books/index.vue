<template>
	<div
		class="h-full min-h-[50rem] md:items-start px-5 md:px-[10rem] py-10 mt-16"
	>
		<h2
			class="text-lg md:text-2xl 2xl:text-3xl font-bold text-center text-green-700 mb-8"
		>
			Livros dos Alunos
		</h2>
		<div class="flex w-full justify-center md:justify-start">
			<span class="text-gray-600 text-sm md:text-lg">
				Clique na turma que você deseja visualizar os livros:</span
			>
		</div>
		<div v-if="status === 'pending'">
			<div class="flex gap-2 mb-5">
				<LazySkeleton
					height="40px"
					width="80px"
					class="rounded-full"
				/>
				<LazySkeleton
					height="40px"
					width="80px"
					class="rounded-full"
				/>
				<LazySkeleton
					height="40px"
					width="80px"
					class="rounded-full"
				/>
				<LazySkeleton
					height="40px"
					width="80px"
					class="rounded-full"
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
		<template v-else>
			<ClientOnly>
				<HeadlessTabGroup :default-index="0">
					<HeadlessTabList
						class="flex w-full justify-center md:justify-start gap-2 mt-2"
						v-slot="{selectedIndex}"
					>
						<HeadlessTab
							v-for="(tab, index) in tabs"
							:key="tab.key"
							class="border border-green-200 focus:border-green-400 focus:outline-0 ui-selected:bg-blue-500 text-green-600 rounded-full px-4 md:px-6 py-2 md:py-1 text-sm md:text-lg hover:bg-green-100 hover:text-green-900 transition-all"
							:class="{'bg-green-100': selectedIndex === index}"
						>
							{{ tab.label }}
						</HeadlessTab>
					</HeadlessTabList>

					<HeadlessTabPanels>
						<TransitionGroup name="fade">
							<HeadlessTabPanel
								v-for="(students, index) in data"
								:key="index"
								class="w-full"
							>
								<div
									class="mt-7"
									v-if="students.length > 0"
								>
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
											placeholder="Pesquisar aluno"
											v-model="search"
											class="w-full md:w-auto"
										/>
									</IconField>
								</div>
								<div
									class="grid grid-cols-1 mt-7 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
								>
									<template v-if="students.length > 0">
										<LazyUiCardBook
											v-for="student in filteredStudents(students)"
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
							</HeadlessTabPanel>
						</TransitionGroup>
					</HeadlessTabPanels>
				</HeadlessTabGroup>
			</ClientOnly>
		</template>
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

const groupAndOrderStudents = (
	students: IStudent[]
): Record<string, IStudent[]> => {
	const classes: Record<string, IStudent[]> = {
		'6': [],
		'7': [],
		'8': [],
		'9': [],
	}

	students.forEach((student) => {
		const _class = student.class.toString()

		if (!classes[_class]) {
			classes[_class] = []
		}

		classes[_class].push(student)
	})

	Object.keys(classes).forEach((_class) => {
		classes[_class].sort((a, b) => a.name.localeCompare(b.name))
	})

	return classes
}

const {data, status} = await useLazyFetch('/api/v1/student', {
	transform: groupAndOrderStudents,
})
</script>

<style scoped></style>
