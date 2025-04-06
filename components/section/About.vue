<template>
	<section
		id="about"
		class="flex flex-col items-center py-[5rem] md:py-[10rem]"
	>
		<h4 class="text-2xl 2xl:text-4xl text-green-700 font-bold">Sobre o projeto</h4>
		<div class="max-w-4xl mx-auto px-4 py-12 text-gray-800">
			<div
				class="bg-green-100 hover:shadow-md transtion-all duration-300 p-4 rounded-xl shadow-sm mb-4"
			>
				<p class="text-md  md:text-xl">
					Este projeto tem como objetivo primordial desenvolver ideias e
					reflexões críticas entre os estudantes do 6º ao 9º ano da
					<strong class="text-green-700 hover:underline">
						<a
							href="https://www.instagram.com/emef.pagung/"
							target="_blank"
						>
							Escola Municipal de Ensino Fundamental Augusto Peter Berthold
							Pagung
						</a> </strong
					>, com a proposta de introduzir o tema da sustentabilidade em uma
					intersecção enriquecedora entre o campo e a tecnologia.
				</p>
			</div>
			<div
				class="bg-green-100 hover:shadow-md transtion-all duration-300 p-4 rounded-xl mb-4 shadow-sm"
			>
				<p class="text-md  md:text-xl">
					A iniciativa visa não apenas conscientizar os alunos sobre a
					importância da preservação ambiental, mas também capacitá-los a se
					tornarem agentes de mudança em suas comunidades.
				</p>
			</div>
			<div
				class="bg-green-100 hover:shadow-md transtion-all duration-300 p-4 mb-4 rounded-xl shadow-sm"
			>
				<p class="text-md  md:text-xl">
					Por meio da elaboração de livros confeccionados pelos próprios alunos,
					os leitores terão a oportunidade de expandir sua visão em direção a um
					mundo mais consciente, promovendo a construção de um meio ambiente
					mais saudável e sustentável. Este processo criativo permitirá que os
					estudantes expressem suas ideias e soluções inovadoras, contribuindo
					para um diálogo construtivo sobre práticas sustentáveis.
				</p>
			</div>
			<div
				class="bg-green-100 hover:shadow-md transtion-all duration-300 p-4 mb-4 rounded-xl shadow-sm"
			>
				<p class="text-md  md:text-xl">
					Além disso, o projeto se propõe a apresentar soluções criativas que
					integrem tecnologias no campo, oferecendo aos agricultores
					alternativas viáveis para aprimorar sua produtividade e,
					consequentemente, sua qualidade de vida.
				</p>
			</div>
			<div
				class="bg-green-100 hover:shadow-md transtion-all duration-300 p-4 mb-4 rounded-xl shadow-sm"
			>
				<p class="text-md  md:text-xl">
					A introdução de ferramentas tecnológicas no contexto agrícola não
					apenas otimiza processos, mas também promove uma agricultura mais
					sustentável e responsável.
				</p>
			</div>
			<div
				class="bg-green-100 hover:shadow-md transtion-all duration-300 p-4 mb-4 rounded-xl shadow-sm"
			>
				<p class="text-md  md:text-xl">
					Com um enfoque inovador, buscamos enriquecer a formação dos
					estudantes, preparando-os para contribuir ativamente na construção de
					um futuro melhor para o nosso planeta. Este projeto não se limita ao
					ambiente escolar; almejamos expandir seu alcance para diversas regiões
					do Brasil e do mundo, aproveitando a tecnologia para promover uma
					educação mais inclusiva e participativa.
				</p>
			</div>
			<div
				class="bg-green-100 hover:shadow-md transtion-all duration-300 p-4 mb-4 rounded-xl shadow-sm"
			>
				<p class="text-md  md:text-xl">
					Acreditamos que, ao fomentar a colaboração entre estudantes,
					educadores e comunidades, poderemos criar um impacto significativo e
					duradouro na conscientização sobre a sustentabilidade e na promoção de
					práticas que respeitem o meio ambiente.
				</p>
			</div>
			<div
				class="bg-green-100 hover:shadow-md transtion-all duration-300 p-4 mb-4 rounded-xl shadow-sm"
			>
				<p class="text-md  md:text-xl">
					Em suma,
					<strong class="text-green-700">"A Turma Sustentável"</strong> é uma
					iniciativa que visa não apenas educar, mas também inspirar uma nova
					geração de cidadãos comprometidos com a preservação do nosso planeta,
					capacitando-os a enfrentar os desafios ambientais contemporâneos com
					criatividade e responsabilidade.
				</p>
			</div>
			<div
				class="bg-green-100 hover:shadow-md transtion-all duration-300 p-4 mb-4 rounded-xl shadow-sm"
			>
				<p class="text-md  md:text-xl">
					Assim, é imperativo que utilizemos a tecnologia da internet como uma
					poderosa ferramenta para disseminar conhecimento e aprimorar a
					educação, garantindo que todos tenham a oportunidade de se desenvolver
					e contribuir para a sociedade de maneira significativa.
				</p>
			</div>
		</div>
		<NuxtLink
			to="/books"
			class="rounded-full flex items-center gap-2 2xl:text-lg bg-green-500 text-white px-5 py-2 font-bold hover:bg-green-600 transition-all hover:shadow-lg hover:-translate-y-1"
		>
			<Icon
				name="mdi:book-open-page-variant-outline"
				size="26"
			/>
			Acessar os livros
		</NuxtLink>
	</section>
</template>

<script setup lang="ts"></script>
