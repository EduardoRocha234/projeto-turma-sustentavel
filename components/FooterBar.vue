<template>
	<footer
		class="bg-white flex items-center flex-col gap-5 justify-center py-16 md:px-[10rem] border-t"
	>
		<h1 class="md:text-2xl font-bold text-green-800">
			Obrigado(a) por visitar nosso site!
		</h1>
		<span class="text-green-800 text-sm md:text-lg mb-6">
			Desenvolvido com 💚 por
			<a
				href="https://eduardorocha.netlify.app/"
				target="_blank"
				class="underline hover:text-green-600"
				>Eduardo R. Aleixo</a
			></span
		>
		<ul
			class="flex gap-6 text-sm md:text-lg *:cursor-pointer font-bold *:text-green-600"
		>
			<li
				class="hover:text-green-800 transition-colors"
				@click="handleClickMenu('intro')"
			>
				Início
			</li>
			<li
				class="hover:text-green-800 transition-colors"
				@click="handleClickMenu('about')"
			>
				Sobre o projeto
			</li>
			<li
				class="hover:text-green-800 transition-colors"
				@click="handleClickMenu('books')"
			>
				Livros
			</li>
		</ul>
		<Divider />
		<div
			class="flex flex-col md:flex-row gap-8 items-center justify-center *:w-full *:text-center px-5 md:px-0"
		>
			<span
				class="font-bold font-indie-flower text-lg md:text-2xl text-green-600"
				>A Turma Sustentável</span
			>
			<span class="text-green-600 text-sm md:text-md"
				>© 2025 A Turma Sustentável. Todos os direitos reservados.</span
			>
			<span class="text-green-600 font-bold text-sm md:text-md"
				>Educação, Campo e Tecnologia de Forma Interligada</span
			>
		</div>
	</footer>
</template>

<script setup lang="ts">
const {scrollToSection} = useSection()

const route = useRoute()
const router = useRouter()

const handleClickMenu = async (link: string) => {
	if (route.path !== '/' || (link !== 'intro' && link !== 'about')) {
		if (link !== 'intro' && link !== 'about') {
			await navigateTo(link)
		} else {
			router.push(`/#${link}`)
		}
	}

	scrollToSection(link)
}
</script>
