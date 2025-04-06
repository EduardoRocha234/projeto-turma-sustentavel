import {serverSupabaseClient, serverSupabaseUser} from '#supabase/server'
import {H3Error} from 'h3'
import {IStudent} from '~/interfaces'

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id')

	try {
		const client = await serverSupabaseClient(event)

		const {data, error} = await client
			.from('students')
			.select('*')
			.eq('id', String(id))
			.single()

		if (error) {
			throw createError({
				status: 500,
				message: error.message,
				stack: error.stack,
			})
		}

		return data as IStudent
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
