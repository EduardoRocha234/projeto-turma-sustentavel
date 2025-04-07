import {serverSupabaseClient, serverSupabaseUser} from '#supabase/server'
import {H3Error} from 'h3'
import {IStudent} from '~/interfaces'

export default defineEventHandler(async (event) => {
	const {supabaseBucketName} = useRuntimeConfig(event)
	const id = getRouterParam(event, 'id')

	try {
		const user = await serverSupabaseUser(event)

		if (user?.aud !== 'authenticated') {
			throw createError({
				status: 401,
				message: 'Usuário não autenticado',
			})
		}

		// para economizar espaço no bucket, remover os livros dos alunos deletados
		const {book_id} = await event.$fetch<IStudent>(`/api/v1/student/${id}`)

		const client = await serverSupabaseClient(event)

		const {error: errorRemovePDF} = await client.storage
			.from(supabaseBucketName)
			.remove([`livros/${book_id}`])

		if (errorRemovePDF) {
			throw createError({
				status: 500,
				message: errorRemovePDF.message,
				stack: errorRemovePDF.stack,
			})
		}

		const {error} = await client.from('students').delete().eq('id', String(id))

		if (error) {
			throw createError({
				status: 500,
				message: error.message,
				stack: error.stack,
			})
		}

		return new Response(null, {status: 200})
	} catch (error) {
		if (error instanceof H3Error) {
			throw error
		}

		throw createError({
			status: 500,
			message: 'Erro ao remover registro',
		})
	}
})
