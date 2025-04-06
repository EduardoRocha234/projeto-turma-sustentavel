<template>
	<div
		class="h-full py-5 px-4 rounded-lg shadow-lg w-full max-w-[50rem] flex flex-col gap-4 items-center bg-white border"
	>
		<div class="flex justify-between w-full px-2 items-center">
			<span class="font-bold md:text-xl"> Listagem de alunos </span>
			<Button
				@click="openModal"
				size="small"
			>
				<Icon
					name="mdi:plus"
					size="20"
					class="hidden md:block"
				/>
				Adicionar
			</Button>
		</div>
		<div class="w-full px-2 -mb-3">
			<span class="text-sm md:text-md">
				Total de armazenamento de arquivos usados: {{ storage }}%</span
			>
			<ProgressBar :value="Number(storage || 0)"> </ProgressBar>
			<Divider />
		</div>
		<div class="w-full px-2 flex flex-col gap-1">
			<label for="turma">Turma</label>
			<Select
				v-model="selectedClass"
				:options="classOptions"
				name="class"
				placeholder="Turma"
				option-label="label"
				option-value="value"
				fluid
			/>
		</div>
		<ul
			class="px-2 bg-white min-h-64 h-full w-full mt-2 rounded-lg overflow-y-auto"
		>
			<li
				v-if="status === 'success'"
				v-for="student in students"
				class="w-full p-5 flex items-center justify-between gap-4 border text-sm md:text-lg first:rounded-t-lg last:rounded-b-lg hover:bg-slate-100 transition-colors"
			>
				<span class="truncate">
					{{ student.name }}
				</span>
				<div class="flex items-center gap-4 text-slate-600">
					<Icon
						name="mdi:trash"
						size="20"
						class="text-red-600 cursor-pointer"
						@click="openConfirmDeleteModal(student.id)"
					/>
					<Icon
						name="mdi:pencil"
						size="20"
						class="text-yellow-600 cursor-pointer"
						@click="openUpdateStudentModal(student)"
					/>
					<Icon
						name="uil:qrcode-scan"
						size="20"
						class="cursor-pointer text-slate-600"
						@click="navigateTo(`/admin/student/${student.id}`)"
					/>
				</div>
			</li>
			<LazySkeleton
				v-if="status === 'pending'"
				v-for="i in Array.from({length: 8}, (v, k) => k + 1)"
				:key="i"
				height="55px"
				class="my-0.5"
			/>
			<span
				v-if="status === 'success' && !data?.length"
				class="flex items-center justify-center font-bold text-lg text-slate-700 h-full"
				>Sem dados</span
			>
		</ul>
	</div>
	<LazyDialog
		v-model:visible="modalVisible"
		header="Cadastrar aluno"
		:style="{width: '30rem'}"
		modal
	>
		<div class="w-full h-full py-5">
			<LazyUiPartialStudentForm
				@refresh-data="onHandleRefresh"
				:student="studentToEdit"
			/>
		</div>
	</LazyDialog>
	<ConfirmDialog :style="{width: '30rem'}" />
</template>

<script setup lang="ts">
import type {IStudent} from '~/interfaces'
import {useConfirm} from 'primevue/useconfirm'

definePageMeta({
	layout: 'admin',
})

const {$toast} = useNuxtApp()

const modalVisible = ref<boolean>(false)
const studentToEdit = ref<IStudent>()

const openModal = () => {
	studentToEdit.value = undefined
	modalVisible.value = true
}

const confirm = useConfirm()

const openConfirmDeleteModal = (id: string) => {
	confirm.require({
		message: 'Deseja deletar esse registro?',
		header: 'Deletar registro',
		rejectLabel: 'Cancelar',
		rejectProps: {
			label: 'Cancelar',
			severity: 'secondary',
			outlined: true,
		},
		acceptProps: {
			label: 'Deletar',
			severity: 'danger',
		},
		accept: async () => {
			await onHandleDelete(id)
		},
	})
}

const openUpdateStudentModal = (student: IStudent) => {
	studentToEdit.value = student
	modalVisible.value = true
}

const onHandleDelete = async (id: string) => {
	const res = await $fetch.raw(`/api/v1/student/${id}`, {
		method: 'DELETE',
	})

	if (res.ok) {
		$toast.success('Registro deletado com sucesso!')
		await Promise.all([refresh(), refreshStoreUsage()])
		return
	}

	$toast.error('Ocorreu um erro ao tentar deletar o registro')
}

const classOptions = [
	{label: '6º ano', value: 6},
	{label: '7º ano', value: 7},
	{label: '8º ano', value: 8},
	{label: '9º ano', value: 9},
]

const selectedClass = ref<number>(6)

const students = computed(() => {
	if (!data.value) return []

	return data.value.filter((student) => student.class === selectedClass.value)
})

const onHandleRefresh = async () => {
	modalVisible.value = false
	await Promise.all([refresh(), refreshStoreUsage()])
}

const {data, refresh, status} = await useLazyFetch<IStudent[]>(
	'/api/v1/student'
)
const {data: storage, refresh: refreshStoreUsage} = await useLazyFetch<number>(
	'/api/v1/storage'
)
</script>
