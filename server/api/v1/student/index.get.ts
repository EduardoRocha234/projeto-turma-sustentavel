import {serverSupabaseClient, serverSupabaseUser} from '#supabase/server'
import {H3Error} from 'h3'
import {IStudent} from '~/interfaces'

export default defineEventHandler(async (event) => {
	try {
		const client = await serverSupabaseClient(event)

		const {data, error} = await client.from('students').select().order('name')

		if (error) {
			throw createError({
				status: 500,
				message: error.message,
				stack: error.stack,
			})
		}

		return data as IStudent[]
	} catch (error) {
		if (error instanceof H3Error) {
			throw error
		}

		throw createError({
			status: 500,
			message: 'Erro ao buscar dados',
		})
	}
})
