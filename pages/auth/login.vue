<template>
	<div class="bg-white border p-5 rounded-lg shadow-lg w-full max-w-96">
		<span class="w-full flex justify-center text-lg font-bold mb-4 text-green-800">Login</span>
		<LazyMessage
			v-if="message.visible"
			size="small"
			closable
			@close="message.visible = false"
			:severity="message.status"
			>{{ message.text }}</LazyMessage
		>
		<Form
			v-slot="$form"
			:initialValues
			:resolver
			@submit="signInWithOtp"
			class="flex flex-col items-center gap-4 w-full mt-4"
		>
			<div class="flex flex-col gap-1 w-full">
				<InputText
					name="email"
					type="email"
					placeholder="E-mail"
					:invalid="$form.email?.invalid"
					fluid
				/>
				<LazyMessage
					v-if="$form.email?.invalid"
					severity="error"
					size="small"
					variant="simple"
					>{{ $form.email.error?.message }}</LazyMessage
				>
			</div>
			<Button
				type="submit"
				fluid
				label="Enviar"
				:disabled="loading"
			/>
		</Form>
	</div>
</template>

<script setup lang="ts">
import type {FormResolverOptions, FormSubmitEvent} from '@primevue/forms/form'

definePageMeta({
	layout: 'admin',
})

const supabase = useSupabaseClient()

interface Form {
	email: string
}

const initialValues = reactive<Form>({
	email: '',
})

const message = ref({
	visible: false,
	status: 'success',
	text: '',
})
const loading = ref<boolean>(false)

const resolver = ({values}: FormResolverOptions) => {
	const errors = {} as any

	if (!values.email.trim().length) {
		errors.email = [{message: 'E-mail é obrigatório'}]
	}

	return {
		values, // (Optional) Used to pass current form values to submit event.
		errors,
	}
}

const signInWithOtp = async ({
	valid,
	values,
}: FormSubmitEvent<Record<string, any>>) => {
	if (!valid) return
	
	loading.value = true
	const {error} = await supabase.auth.signInWithOtp({
		email: values.email,
		options: {
			emailRedirectTo: `https://teste-projeto-livros.netlify.app/auth/confirm`,
		},
	})
	loading.value = false
	message.value.visible = true

	if (error) {
		message.value.status = 'error'
		message.value.text = 'E-mail não registrado.'
		return
	}

	message.value.status = 'success'
	message.value.text =
		'Solicitação de login efetuada com sucesso, um e-mail foi enviado para você.'
}
</script>
