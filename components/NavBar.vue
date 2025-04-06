<template>
	<div
		class="fixed transtion-all top-0 bg-white flex z-10 items-center justify-between px-6 md:px-[7rem] xl:px-[17rem] py-6 w-full"
		:class="{
			'xl:px-[6rem]': $route.path.includes('/admin') && isLogged,
		}"
	>
		<UiLogo />
		<Icon
			name="material-symbols:menu"
			size="31"
			class="block md:hidden text-green-800"
			@click="toggleMenu"
		/>
		<div class="hidden md:flex items-center gap-6 transtion-all">
			<ul
				class="transition-all flex gap-6 text-lg *:cursor-pointer font-bold *:text-green-600"
			>
				<li
					class="hover:text-green-800 transition-colors"
					:class="{
						'!text-green-800':
							sectionSelected === 'intro' && $route.path === '/',
					}"
					@click="handleClickMenu('intro')"
				>
					Início
				</li>
				<li
					class="hover:text-green-800 transition-colors"
					:class="{
						'!text-green-800':
							sectionSelected === 'about' && $route.path === '/',
					}"
					@click="handleClickMenu('about')"
				>
					Sobre o projeto
				</li>
				<li
					class="hover:text-green-800 transition-colors"
					:class="{'!text-green-800': $route.path === '/books'}"
				>
					<NuxtLink to="/books"> Livros </NuxtLink>
				</li>
				<li
					v-if="isLogged && !isAdmin"
					class="hover:text-green-800 transition-colors"
					:class="{'!text-green-800': $route.path.includes('/admin')}"
				>
					<NuxtLink to="/admin/upload-books"> Admin </NuxtLink>
				</li>
			</ul>
			<span
				v-if="isLogged && user && $route.path.includes('/admin')"
				class="hidden lg:block font-bold text-green-600"
			>
				Olá,
				{{ user.email }}
			</span>
		</div>
	</div>
	<LazyDrawer v-model:visible="menuVisible">
		<template #container="{closeCallback}">
			<div class="flex flex-col h-full">
				<div class="flex items-center justify-between px-6 pt-4 shrink-0">
					<span class="inline-flex items-center gap-2">
						<UiLogo />
					</span>
					<button
						class="border p-2 size-10 rounded-full hover:bg-slate-100 transition-colors"
						@click="closeCallback"
					>
						<Icon
							name="mdi:close"
							size="22"
						/>
					</button>
				</div>
				<div class="overflow-y-auto">
					<ul class="list-none p-4 m-0">
						<li>
							<div
								class="p-4 flex items-center justify-between text-surface-500 cursor-pointer border-b"
							>
								<span class="font-bold text-green-800">PÁGINAS</span>
								<i class="pi pi-chevron-down"></i>
							</div>
							<ul
								class="list-none p-0 m-0 overflow-hidden *:text-green-600 *:border-b"
							>
								<li
									@click="handleClickMenu('intro', toggleMenu)"
									class="flex items-center gap-2 cursor-pointer text-lg font-bold p-4"
								>
									<Icon
										name="mdi:home-outline"
										size="30"
									/>
									<span class="font-medium">Início</span>
								</li>
								<li
									@click="handleClickMenu('about', toggleMenu)"
									class="flex items-center gap-2 cursor-pointer text-lg font-bold p-4"
								>
									<Icon
										name="mdi:about-circle-outline"
										size="30"
									/>
									<span class="font-medium">Sobre o projeto</span>
								</li>
								<li
									@click="handleClickMenu('/books', toggleMenu)"
									class="flex items-center gap-2 cursor-pointer text-lg font-bold p-4"
								>
									<Icon
										name="mdi:book-open-page-variant-outline"
										size="30"
									/>
									<span class="font-medium">Livros</span>
								</li>
								<li
									v-if="isLogged && !isAdmin"
									@click="handleClickMenu('/admin/upload-books', toggleMenu)"
									class="flex items-center gap-2 cursor-pointer text-lg font-bold p-4"
								>
									<Icon
										name="mdi:account-secure-outline"
										size="30"
									/>
									<span class="font-medium">Admin</span>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</template>
	</LazyDrawer>
</template>

<script setup lang="ts">
const {scrollToSection, sectionSelected} = useSection()
const route = useRoute()
const router = useRouter()

const menuVisible = ref<boolean>(false)

const user = useSupabaseUser()

const isLogged = computed(() => user.value !== null)

const handleClickMenu = async (link: string, cb?: () => void) => {
	if (route.path !== '/' || (link !== 'intro' && link !== 'about')) {
		if (link !== 'intro' && link !== 'about') {
			await navigateTo(link)
		} else {
			router.push(`/#${link}`)
		}
	}

	scrollToSection(link)
	if (cb) cb()
}

const isAdmin = computed(() => {
	return route.path.includes('/admin')
})

const toggleMenu = () => {
	menuVisible.value = !menuVisible.value
}
</script>

<style scoped></style>
