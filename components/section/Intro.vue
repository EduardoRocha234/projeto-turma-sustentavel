<template>
	<section
		id="intro"
		class="flex flex-col h-full md:flex-row w-full items-center justify-between gap-6 px-[2rem] md:px-[7rem] 2xl:px-[12rem] py-20 2xl:py-28 md:py-6"
	>
		<div
			class="max-w-[40rem] flex flex-col items-center md:items-start gap-16 md:gap-6"
		>
			<h1
				class="text-2xl 2xl:text-6xl text-center md:text-5xl text-green-600 font-indie-flower md:text-start w-full"
			>
				<strong>A Turma Sustentável</strong> <br />
				Educação, Campo e Tecnologia de Forma Interligada
			</h1>
			<h6
				class="text-green-800 md:text-lg text-md text-center md:text-start px-4 md:px-0 2xl:text-2xl"
			>
				Um projeto que une estudantes, sustentabilidade e inovação! Por meio da
				criação de livros autorais, os alunos do 6º ao 9º ano exploram soluções
				criativas para transformar o campo com o uso consciente da tecnologia. A
				iniciativa forma cidadãos críticos e engajados, promovendo práticas
				sustentáveis e construindo um futuro melhor para todos.
			</h6>
			<button
				class="rounded-full 2xl:text-lg bg-green-500 text-white px-4 py-2 font-bold hover:bg-green-600 transition-all hover:shadow-lg hover:-translate-y-1"
				@click="scrollToSection('about')"
			>
				Conhecer o projeto
			</button>
		</div>
		<div class="xl:flex hidden flex-col items-center gap-6">
			<NuxtImg
				src="/sustainability-image.webp"
				alt="Imagem representando a sustentabilidade"
				class="rounded-full size-[25rem] 2xl:size-[30rem] object-cover shadow-sm"
			/>
			<div class="shadow-picture"></div>
		</div>
	</section>
</template>

<script setup lang="ts">
const {scrollToSection} = useSection()
</script>

<style scoped>
.shadow-picture {
	width: 180px;
	height: 30px;
	background: rgba(0, 0, 0, 0.3);
	border-radius: 50%;
	filter: blur(10px);
}
</style>
