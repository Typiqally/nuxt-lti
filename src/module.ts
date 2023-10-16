import {defineNuxtModule} from "@nuxt/kit";

export interface ModuleOptions {
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'nuxt-lti',
		configKey: 'lti',
	},
	defaults: {},
	setup(options, nuxt) {

	}
})
