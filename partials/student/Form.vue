<template>
	<div class="w-full h-full">
		<div class="flex flex-col gap-4 w-full h-full">
			<div class="flex flex-col gap-1">
				<InputText
					v-model="form.name"
					name="name"
					type="text"
					placeholder="Nome do aluno"
					:invalid="!!errors.name"
					fluid
				/>
				<Message
					v-if="!!errors.name"
					severity="error"
					size="small"
					variant="simple"
					>{{ errors.name }}</Message
				>
			</div>
			<div class="flex flex-col gap-1">
				<LazySelect
					v-model="form.class"
					:options="classOptions"
					name="class"
					placeholder="Turma"
					option-label="label"
					option-value="value"
					:invalid="!!errors.class"
				/>
				<Message
					v-if="!!errors.class"
					severity="error"
					size="small"
					variant="simple"
					>{{ errors.class }}</Message
				>
			</div>
			<div class="flex flex-col gap-1">
				<InputText
					v-model="form.book_title"
					name="book_title"
					type="text"
					placeholder="Título do livro"
					:invalid="!!errors.book_title"
					fluid
				/>
				<Message
					v-if="!!errors.book_title"
					severity="error"
					size="small"
					variant="simple"
					>{{ errors.book_title }}</Message
				>
			</div>
			<div class="flex flex-col">
				<label
					for="file"
					class="text-slate-600"
					>Livro em PDF:</label
				>
				<FileUpload
					name="file"
					mode="advanced"
					url="/api/v1/upload-pdf"
					chooseLabel="Selecionar arquivo"
					cancelLabel="Cancelar"
					accept="application/pdf"
					:multiple="false"
					:previewWidth="10"
					:maxFileSize="1000000"
					@upload="upload"
					@removeUploadedFile="form.book_url = undefined"
				>
					<template
						#header="{chooseCallback, clearCallback, uploadCallback, files}"
					>
						<div class="flex gap-2">
							<Button
								size="small"
								@click="chooseCallback"
							>
								<Icon name="mdi:plus" />
								Selecionar arquivo
							</Button>
							<Button
								size="small"
								outlined
								:disabled="files.length === 0"
								@click="uploadCallback"
							>
								Enviar
							</Button>
						</div>
					</template>
					<template #empty>
						<span>Ou arraste e solte o pdf aqui</span>
					</template>
					<template
						#content="{files, progress, removeFileCallback, uploadedFiles}"
					>
						<ul class="">
							<li
								v-if="files"
								v-for="(file, idx) in concatFiles(files, uploadedFiles)"
								class="text-xs flex items-center justify-between border rounded-lg p-2 truncate"
							>
								<span class="flex flex-col gap-2">
									{{ file.name }}
									<ProgressBar
										v-if="progress"
										:value="progress"
										:showValue="false"
									></ProgressBar>
								</span>
								<Button
									text
									severity="danger"
									@click="removeFileCallback(idx)"
								>
									<Icon
										name="mdi:close"
										size=""
									/>
								</Button>
							</li>
						</ul>
					</template>
				</FileUpload>
			</div>
			<Message
				v-if="!!errors.book_url"
				severity="error"
				size="small"
				variant="simple"
				>{{ errors.book_url }}</Message
			>
		</div>
		<Button
			@click="onFormSubmit"
			type="submit"
			class="mt-4"
			fluid
		>
			<Icon
				name="mdi:loading"
				class="animate-spin"
				v-if="carregando"
			/>
			Salvar
		</Button>
	</div>
</template>

<script setup lang="ts">
import type {IStudent} from '~/interfaces'
import type {FileUploadUploadEvent} from 'primevue/fileupload'

const props = defineProps<{student?: IStudent}>()

const emits = defineEmits<{
	(event: 'refreshData'): void
}>()

const {$toast} = useNuxtApp()

const carregando = ref<boolean>(false)

const initialValues: Partial<IStudent> = {
	id: undefined,
	name: undefined,
	class: undefined,
	book_title: undefined,
	book_url: undefined,
}

const form = reactive<Partial<IStudent>>({
	...initialValues,
})

const classOptions = [
	{label: '6º ano', value: 6},
	{label: '7º ano', value: 7},
	{label: '8º ano', value: 8},
	{label: '9º ano', value: 9},
]

const errors = ref<Partial<IStudent>>({})

const validate = (form: Partial<IStudent>) => {
	if (!form.name || form.name?.trim().length === 0) {
		errors.value.name = 'Nome é obrigatório'
	} else {
		errors.value.name = undefined
	}

	if (!form.class) {
		;(errors.value as any).class = 'Turma é obrigatório'
	} else {
		errors.value.class = undefined
	}

	if (!form.book_title || form.book_title?.trim().length === 0) {
		errors.value.book_title = 'Título do livro é obrigatório'
	} else {
		errors.value.book_title = undefined
	}

	if (!form.book_url) {
		errors.value.book_url = 'Arquivo é obrigatório'
	} else {
		errors.value.book_url = undefined
	}
}

watch(form, (nv) => {
	validate(nv)
})

const onFormSubmit = async () => {
	validate(form)

	if (errors.value.name || errors.value.book_url) return

	carregando.value = true

	const url = form.id ? `/api/v1/student/${form.id}` : '/api/v1/student'
	const res = await $fetch.raw(url, {
		method: form.id ? 'PUT' : 'POST',
		body: form,
		ignoreResponseError: true,
	})
	carregando.value = false

	if (res.ok) {
		if (form.id) {
			$toast.success('Registro atualizado com sucesso')
		} else {
			$toast.success('Registro cadastrado com sucesso')
			Object.assign(form, initialValues)
		}
		emits('refreshData')
		return
	}

	$toast.error(
		`Ocorreu um erro ao tentar ${
			form.id ? 'atualizar' : 'cadastrar'
		} registro`
	)
}

const upload = ({xhr}: FileUploadUploadEvent) => {
	$toast.success('Arquivo enviado com sucesso')
	const response = JSON.parse(xhr.response)
	form.book_url = response.publicUrl
	form.book_id = response.fileId
}

const concatFiles = (files: File[], filesUploaded: File[]) =>
	files.concat(filesUploaded)

onMounted(() => {
	if (props.student) {
		Object.assign(form, props.student)
	}
})
</script>
