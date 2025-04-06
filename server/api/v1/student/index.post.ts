import {serverSupabaseClient, serverSupabaseUser} from '#supabase/server'
import {H3Error} from 'h3'

export default defineEventHandler(async (event) => {
	try {
		const body = (await readBody(event)) as Record<string, string>

		if (!body.name || !body.book_url) {
			throw createError({
				status: 400,
				message: 'Formulário inválido',
			})
		}

		const user = await serverSupabaseUser(event)

		if (user?.aud !== 'authenticated') {
			throw createError({
				status: 401,
				message: 'Usuário não autenticado',
			})
		}

		const client = await serverSupabaseClient(event)

		const {error} = await client.from('students').insert([body] as any)

		if (error) {
			throw createError({
				status: 500,
				message: error.message,
				stack: error.stack,
			})
		}

		return new Response(null, {status: 201})
	} catch (error) {
		if (error instanceof H3Error) {
			throw error
		}

		throw createError({
			status: 500,
			message: 'Erro ao fazer upload do arquivo',
		})
	}
})
