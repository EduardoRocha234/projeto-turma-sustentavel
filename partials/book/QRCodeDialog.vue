<template>
	<LazyDialog
		v-model:visible="modalVisible"
		:style="{width: '40rem'}"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        class="h-screen md:h-auto"
        :base-z-index="9999999"
		modal
		close-on-escape
	>
		<template #header>
			<UiLogo />
		</template>
		<tamplate v-if="student">
			<div
				class="flex items-center justify-center bg-green-100 rounded-lg py-3 mb-4 shadow-sm"
			>
				<div class="flex flex-col items-center">
					<span class="text-lg font-bold text-green-800">
						{{ student?.book_title }}
					</span>
					<p class="text-md text-gray-700 mt-1">
						por {{ student?.name }} - {{ `${student?.class}º ano` }}
					</p>
				</div>
			</div>
			<div class="flex items-center justify-center">
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
			</div>
		</tamplate>
	</LazyDialog>
</template>

<script setup lang="ts">
import VueQrcode from 'vue-qrcode'
import type {IStudent} from '~/interfaces'

const props = defineProps<{student: IStudent | null}>()

const {student} = toRefs(props)

const modalVisible = ref<boolean>(false)

const toggleModal = () => {
	modalVisible.value = !modalVisible.value
}

const qrCodeUrl = computed(() => {
	if (!student.value) return ''

	return `${window.location.origin}/books/${student.value?.id}`
})

defineExpose({
	toggleModal,
})
</script>

<style scoped></style>
