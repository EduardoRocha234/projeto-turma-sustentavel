export const useSection = () => {
	const sectionSelected = useState<string>('sectionSelected', () => 'intro')

	const scrollToSection = (sectionId: string) => {
		const section = document.getElementById(sectionId)
		if (section) {
			sectionSelected.value = sectionId
			section.scrollIntoView({behavior: 'smooth'})
		}
	}

	return {
		scrollToSection,
		sectionSelected,
	}
}
