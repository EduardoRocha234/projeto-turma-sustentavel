<template>
	<div
		class="flex gap-2 flex-col items-center w-full h-full py-5 md:px-[10rem] px-4"
	>
		<div class="flex w-full justify-start cursor-pointer">
			<div
				class="flex items-center gap-2 text-green-700"
				@click="navigateTo('/admin/upload-books')"
			>
				<Icon
					name="material-symbols:arrow-back"
					size="22"
				/>
				Voltar
			</div>
		</div>
		<div
			class="bg-white rounded-lg w-full max-w-[25rem] flex flex-col gap-5 justify-between h-full md:h-[50rem] items-center py-5 shadow-lg border"
		>
			<div class="flex flex-col justify-between items-center w-full">
				<div class="flex flex-col items-center justify-between w-full px-5">
					<template v-if="status === 'pending'">
						<LazySkeleton
							height="20px"
							class="mb-4"
						/>
						<LazySkeleton
							height="240px"
							class="mb-4"
						/>
					</template>
					<template v-else>
						<span class="mb-2">Scaneie o qrcode abaixo para testar</span>
						<div class="border-2 rounded-lg mb-2">
							<ClientOnly>
								<VueQrcode
									:value="qrCodeUrl"
									type="image/jpeg"
									:color="{}"
									:scale="7"
								/>
							</ClientOnly>
						</div>
						ou
						<NuxtLink
							:to="qrCodeUrl"
							target="_blank"
							class=" rounded-full bg-green-400 hover:bg-green-600 text-white px-2 py-1 flex items-center gap-2 mt-2"
						>
						Clique aqui
						<Icon name="mdi:external-link" />
						</NuxtLink>
					</template>
					<Divider />
				</div>

				<div>
					<div class="flex flex-col items-center">
						<template v-if="status === 'pending'">
							<LazySkeleton
								width="70px"
								height="23px"
								class="mb-2"
							/>
							<LazySkeleton
								width="160px"
								height="23px"
								class="mb-2"
							/>
							<LazySkeleton
								width="160px"
								height="50px"
								class="mb-2"
							/>
							<LazySkeleton
								width="160px"
								height="50px"
							/>
						</template>
						<template v-else>
							Aluno:
							<span class="text-xl font-semibold flex items-center gap-2">
								<Icon
									name="mdi:pencil"
									@click="alterarNome = !alterarNome"
								/>
								<template v-if="!alterarNome">
									{{ form.name }}
								</template>
								<template v-else>
									<LazyInputText
										v-model="form.name"
										size="small"
									/>
								</template>
							</span>
						</template>
					</div>
					<div
						v-if="!alterarPDF && status === 'success'"
						class="flex flex-col"
					>
						<LazyButton
							severity="secondary"
							class="mt-10"
							@click="
								downloadFile(
									form?.book_url,
									`livro_${form?.name
										?.toLocaleLowerCase()
										.replaceAll(' ', '_')}`
								)
							"
						>
							<Icon name="material-symbols:download" />
							Baixar PDF</LazyButton
						>
						<LazyButton
							severity="secondary"
							class="mt-2"
							@click="alterarPDF = true"
						>
							<Icon name="mdi:pencil" />
							Alterar PDF
						</LazyButton>
					</div>
					<div
						v-else-if="status === 'success'"
						class="mt-2 overflow-y-auto max-h-40"
					>
						<LazyFileUpload
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
							<template #header="{chooseCallback, uploadCallback, files}">
								<div class="flex items-center gap-2">
									<LazyButton
										size="small"
										:disabled="files.length === 1"
										@click="chooseCallback"
									>
										<Icon name="mdi:plus" />
										Selecionar arquivo
									</LazyButton>
									<LazyButton
										size="small"
										outlined
										:disabled="files.length === 0"
										@click="uploadCallback"
									>
										Enviar
									</LazyButton>
									<Icon
										name="mdi:close"
										class="text-red-600"
										@click="alterarPDF = false"
									/>
								</div>
							</template>
							<template #empty>
								<span>Ou arraste e solte o pdf aqui</span>
							</template>
							<template
								#content="{
									files,
									messages,
									progress,
									removeFileCallback,
									uploadedFiles,
								}"
							>
								<ul>
									<li
										v-if="files"
										v-for="(file, idx) in concatFiles(files, uploadedFiles)"
										class="text-xs flex items-center justify-between border rounded-lg p-2 truncate"
									>
										<span class="flex flex-col gap-2">
											{{ file.name }}
											<LazyProgressBar
												v-if="progress"
												:value="progress"
												:showValue="false"
											></LazyProgressBar>
										</span>
										<LazyButton
											text
											severity="danger"
											@click="removeFileCallback(idx)"
										>
											<Icon name="mdi:close" />
										</LazyButton>
									</li>
								</ul>
							</template>
						</LazyFileUpload>
					</div>
				</div>
			</div>
			<div class="flex gap-2 w-full px-4">
				<template v-if="status === 'pending'">
					<LazySkeleton
						width="100%"
						height="50px"
					/>
					<LazySkeleton
						width="100%"
						height="50px"
					/>
				</template>
				<template v-else>
					<LazyButton
						size="small"
						severity="danger"
						label="Excluir"
						outlined
						fluid
						@click="openConfirmDeleteModal"
					/>
					<LazyButton
						size="small"
						label="Salvar alterações"
						fluid
						@click="onFormSubmit"
					/>
				</template>
			</div>
		</div>
	</div>
	<ConfirmDialog />
</template>

<script setup lang="ts">
import {useConfirm} from 'primevue/useconfirm'
import type {IStudent} from '~/interfaces'
import VueQrcode from 'vue-qrcode'
import type {FileUploadUploadEvent} from 'primevue/fileupload'

definePageMeta({
	layout: 'admin',
})

const {$toast} = useNuxtApp()

const route = useRoute()
const confirm = useConfirm()

const openConfirmDeleteModal = () => {
	confirm.require({
		message: 'Deseja deletar esse registro?',
		header: 'Deletar livro do aluno',
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
			await onHandleDelete()
		},
	})
}

const {data, status} = await useLazyFetch<IStudent>(
	`/api/v1/student/${route.params.id}`,
	{
		onResponse: ({response}) => {
			Object.assign(form, response._data)
		},
	}
)

const qrCodeUrl = computed(() => {
	if (!data.value) return ''

	return `${window.location.origin}/books/${data.value?.id}`
})

const alterarNome = ref<boolean>(false)
const alterarPDF = ref<boolean>(false)

const form = reactive<Partial<IStudent>>({
	...data.value,
})

const onFormSubmit = async () => {
	const res = await $fetch.raw(`/api/v1/student/${data.value?.id}`, {
		method: 'PUT',
		body: form,
		ignoreResponseError: true,
	})

	if (res.ok) {
		$toast.success('Dados alterados com sucesso')
		await refreshNuxtData()
		await navigateTo('/admin/upload-books')
		return
	}

	$toast.error('Erro ao tentar alterar dados do aluno')
}

const onHandleDelete = async () => {
	const res = await $fetch.raw(`/api/v1/student/${data.value?.id}`, {
		method: 'DELETE',
	})

	if (res.ok) {
		$toast.success('Registro deletado com sucesso!')
		await refreshNuxtData()
		await navigateTo('/admin/upload-books')
		return
	}

	$toast.error('Ocorreu um erro ao tentar deletar o registro')
}

const concatFiles = (files: File[], filesUploaded: File[]) =>
	files.concat(filesUploaded)

const upload = ({xhr}: FileUploadUploadEvent) => {
	const response = JSON.parse(xhr.response)
	form.book_url = response.publicUrl

	alterarPDF.value = false
}
</script>

<style scoped></style>
