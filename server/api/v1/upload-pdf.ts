import {serverSupabaseClient, serverSupabaseUser} from '#supabase/server'
import {randomUUID} from 'node:crypto'
import {H3Error} from 'h3'

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

		const formData = await readFormData(event)

		const file = formData.get('file')

		if (!file || !(file instanceof File)) {
			return {
				success: false,
				error: 'No file provided or invalid file',
			}
		}

		if (
			!file.name.toLowerCase().endsWith('.pdf') ||
			file.type !== 'application/pdf'
		) {
			return {
				success: false,
				error: 'Only PDF files are allowed',
			}
		}

		const sanitizedName = file.name
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-zA-Z0-9.-]/g, '_')

		const uniqueFilename = `${randomUUID()}-${sanitizedName}`

		const {data, error} = await client.storage
			.from(`${supabaseBucketName}/livros`)
			.upload(uniqueFilename, file)

		if (error) {
			throw createError({
				status: 500,
				message: error.message,
				stack: error.stack,
			})
		}

		const {
			data: {publicUrl},
		} = client.storage
			.from(`${supabaseBucketName}/livros`)
			.getPublicUrl(uniqueFilename)

		return {
			fileId: uniqueFilename,
			originalName: file.name,
			path: data.path,
			publicUrl,
		}
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
