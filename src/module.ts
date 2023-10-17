import {defineNuxtModule} from "@nuxt/kit";
import defu from "defu";

export interface ModuleOptions {
    redirectUri: string
}

// noinspection JSUnusedGlobalSymbols, implicility called
export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'nuxt-lti',
        configKey: 'lti',
    },
    setup(options, nuxt) {
        // Inject module options in RuntimeConfig
        nuxt.options.runtimeConfig.public.lti = defu(nuxt.options.runtimeConfig.public.lti as ModuleOptions, {
            redirectUri: options.redirectUri
        })
    }
})
