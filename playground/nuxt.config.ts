import {readFileSync} from "fs";

const key = process.env.SSL_KEY_PATH
const certificate = process.env.SSL_CERT_PATH

export default defineNuxtConfig({
    modules: ['../src/module'],
    lti: {
        redirectUri: "https://localhost:3000"
    },
    devtools: {enabled: true},
    typescript: {
        strict: true
    },
    devServer: {
        https: {
            key: key ? readFileSync(key).toString() : undefined,
            cert: certificate ? readFileSync(certificate).toString() : undefined
        }
    },
    ssr: true,
    pages: true
})
