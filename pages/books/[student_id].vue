<template>
	<div class="h-full mt-16 py-10 md:px-[10rem] px-4">
		<div class="flex w-full justify-between mb-4">
			<div
				class="flex items-center gap-2 text-green-700 hover:text-green-900 transition-colors cursor-pointer"
				@click="$router.back()"
			>
				<Icon
					name="material-symbols:arrow-back"
					size="22"
				/>
				Voltar
			</div>
			<div
				v-if="status === 'success'"
				class="flex items-center gap-4"
			>
				<Icon
					name="mdi:arrow-expand-all"
					size="22"
					class="text-green-700 hover:text-green-900 transition-colors cursor-pointer"
					title="Vizualizar em tela cheia"
					@click="pdfViewerRef?.goFullscreen()"
				/>
				<Icon
					name="mdi:share-variant-outline"
					size="22"
					class="text-green-700 hover:text-green-900 transition-colors cursor-pointer"
					title="Compartilhar"
					@click="startShare"
				/>
				<Icon
					v-if="isSupported"
					name="mdi:qrcode-scan"
					size="22"
					class="text-green-700 hover:text-green-900 transition-colors cursor-pointer"
					title="Gerar QR Code de compartilhamento"
					@click="qrCodeDialogRef?.toggleModal()"
				/>
				<Icon
					name="mdi:tray-download"
					size="22"
					class="text-green-700 hover:text-green-900 transition-colors cursor-pointer"
					title="Baixar livro"
					@click="
						downloadFile(
							student?.book_url,
							`livro_${student?.name?.toLocaleLowerCase().replaceAll(' ', '_')}`
						)
					"
				/>
			</div>
		</div>
		<div v-if="status === 'pending'">
			<LazySkeleton
				height="80px"
				class="mb-4"
			/>
			<LazySkeleton
				height="400px"
				class="mb-4"
			/>
		</div>
		<template v-else-if="status === 'success'">
			<div
				class="flex items-center justify-center bg-green-100 rounded-lg py-3 mb-4 shadow-sm"
			>
				<div class="flex flex-col items-center">
					<span class="text-xl md:text-3xl font-bold text-green-800">
						{{ student?.book_title }}
					</span>
					<p class="text-lg text-gray-700 mt-1">
						por {{ student?.name }} - {{ `${student?.class}º ano` }}
					</p>
				</div>
			</div>
			<LazyUiPdfViewer
				ref="pdfViewerRef"
				:url="student?.book_url || ''"
			/>
		</template>
		<template v-else>
			<div class="flex flex-col items-center justify-center min-h-[30rem]">
				<Icon
					name="mdi:book-remove-outline"
					class="text-red-800"
					size="50"
				/>
				<span class="text-2xl md:text-3xl font-bold text-red-800">
					Erro ao carregar o livro
				</span>
				<p class="text-lg text-center text-gray-700 mt-1">
					Oops. Isso não era pra acontecer... Por favor tente novamente mais
					tarde.
				</p>
			</div>
		</template>
	</div>
	<LazyUiPartialBookQRCodeDialog
		ref="qrCodeDialogRef"
		:student
	/>
</template>

<script setup lang="ts">
import type {IStudent} from '~/interfaces'
import {useShare} from '@vueuse/core'

const route = useRoute()
const pdfViewerRef = useTemplateRef('pdfViewerRef')
const qrCodeDialogRef = useTemplateRef('qrCodeDialogRef')

const {data: student, status} = await useLazyFetch<IStudent>(
	`/api/v1/student/${route.params.student_id}`
)

const {share, isSupported} = useShare()

const startShare = () => {
	share({
		title: `Leia o livro "${student.value?.book_title}"`,
		text: `Conheça o livro "${student.value?.book_title}", escrito por ${student.value?.name}, aluno do projeto A Turma Sustentável. Um convite à reflexão sobre sustentabilidade, tecnologia e o campo! 📚🌱`,
		url: location.href,
	})
}
</script>

<style scoped></style>
