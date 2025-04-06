import * as vt from 'vue-toastification'
import {POSITION, type PluginOptions} from 'vue-toastification'
// import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
	const options: PluginOptions = {
		timeout: 5000,
		position: POSITION.TOP_RIGHT,
		transition: 'Vue-Toastification__fade',
		toastClassName: 'ctgi-toast',
	}

	nuxtApp.vueApp.use(vt.default as any, options)

	return {
		provide: {
			toast: vt.useToast(),
		},
	}
})
