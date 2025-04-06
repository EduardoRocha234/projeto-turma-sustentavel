import {serverSupabaseClient, serverSupabaseUser} from '#supabase/server'
import {SupabaseClient} from '@supabase/supabase-js'
import {H3Error} from 'h3'
import {IStudent} from '~/interfaces'

export default defineEventHandler(async (event) => {
	const {supabaseBucketName} = useRuntimeConfig(event)

	try {
		const user = await serverSupabaseUser(event)

		if (user?.aud !== 'authenticated') {
			throw createError({
				status: 401,
				message: 'Usuário não autenticado',
			})
		}

		const client = await serverSupabaseClient(event)

		const storage = await getStorageUsage(client, supabaseBucketName)

		return storage
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

async function getStorageUsage(
	client: SupabaseClient<unknown, never, never>,
	bucketName: string
) {
	const {data, error} = await client.storage
		.from(`${bucketName}`)
		.list('livros')

	if (error) {
		throw new Error('Erro ao listar arquivos: ' + error)
	}

	const totalSize =
		data?.reduce((sum, file) => sum + (file.metadata?.size || 0), 0) || 0
	const totalSizeMB = (totalSize / 1024 / 1024)
    const percentageUsed = ((totalSizeMB / 1024) * 100).toFixed(2)
	// console.log(`Espaço utilizado: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)

	return percentageUsed
}
