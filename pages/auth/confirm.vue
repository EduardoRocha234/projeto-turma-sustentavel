<template>
	<div class="flex flex-col items-center">
		<ProgressSpinner
			style="size: 90px"
			strokeWidth="3"
			fill="transparent"
			animationDuration=".9s"
			aria-label="Custom ProgressSpinner"
		/>
		<span class="font-semibold text-center">
			Aguarde enquanto confirmamos seu usuário...
		</span>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'admin',
})

const {$toast} = useNuxtApp()

const user = useSupabaseUser()

watch(
	user,
	() => {
		if (user.value) {
			$toast.success('Usuário autenticado com sucesso')
			return navigateTo('/admin/upload-books')
		}

		$toast.error('Não foi possivel autenticar')
		return navigateTo('/')
	},
	{immediate: true}
)
</script>
