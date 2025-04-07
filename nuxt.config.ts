import Lara from '@primeuix/themes/lara'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: {enabled: true},
	components: [
		{path: 'components/', prefix: 'Ui'},
		{path: 'partials/', prefix: 'UiPartial'},
	],
	app: {
		head: {
			htmlAttrs: {
				lang: 'pt-BR',
			},
			meta: [{name: 'google-site-verification', content: 'TBJ0z-bEYoYBxk9c_cdvpCcpvg6qonFmR57OvfLs2rA'}],
		},
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@nuxtjs/supabase',
		'@primevue/nuxt-module',
		'@nuxt/icon',
		'@vueuse/nuxt',
		'@nuxtjs/google-fonts',
		'nuxt-headlessui',
		'@nuxt/image',
	],
	supabase: {
		redirectOptions: {
			login: '/auth/login',
			callback: '/auth/confirm',
			exclude: ['/auth(/*)?', '/', '/books(/*)?'],
			include: ['/admin(/*)?'],
		},
	},
	runtimeConfig: {
		supabaseBucketName: '',
		public: {
			pdfViewerLicenseKey: '',
		},
	},
	primevue: {
		options: {
			theme: {
				preset: Lara,
				options: {
					prefix: 'p',
					darkModeSelector: '.dark-mode',
					cssLayer: false,
				},
			},
		},
	},
	tailwindcss: {
		editorSupport: true,
	},
	headlessui: {
		prefix: 'Headless',
	},
	css: ['@/assets/css/main.css', 'vue-toastification/dist/index.css'],
	build: {
		transpile: ['vue-toastification'],
	},
	googleFonts: {
		families: {
			Roboto: true,
			Inter: [400, 700],
			'Josefin+Sans': true,
			Lato: [100, 300],
			Raleway: {
				wght: [100, 400],
				ital: [100],
			},
			'Indie Flower': [400],
		},
	},
})
