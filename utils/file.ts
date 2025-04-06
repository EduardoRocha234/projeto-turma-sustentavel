export const downloadFile = (url?: string, nomeArquivo = 'livro.pdf') => {
	if (!url) return

	fetch(url)
		.then((response) => response.blob())
		.then((blob) => {
			const link = document.createElement('a')
			link.href = URL.createObjectURL(blob)
			link.download = nomeArquivo
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
			URL.revokeObjectURL(link.href)
		})
		.catch((error) => console.error('Erro ao baixar o PDF:', error))
}
