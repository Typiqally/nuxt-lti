import {createError, H3Event, readBody} from "h3";
import _ from "lodash";
import crypto from "crypto";
import {useRuntimeConfig} from "#imports";
import {ModuleOptions} from "../../module";
import {LtiLaunch, LtiOidcCallback} from "~/src/runtime/types/launch";

const startLaunch = async (event: H3Event): Promise<string> => {
    const options = useRuntimeConfig().public.lti as ModuleOptions

    const body = await readBody(event)
    const launch = _.mapKeys(body, (_value, key) => _.camelCase(key)) as LtiLaunch
    const origin = event.headers.get("origin")

    if (launch.iss != "https://canvas.instructure.com" || origin == null) {
        throw createError({statusCode: 400, statusMessage: "Unsupported platform"})
    }

    const state = crypto.randomBytes(64).toString("base64url")
    const nonce = crypto.randomBytes(64).toString("base64url")

    const authorizeUrl = new URL(`${origin}/api/lti/authorize_redirect`)
    const query = {
        client_id: launch.clientId,
        response_type: "id_token",
        response_mode: "form_post",
        scope: "openid",
        redirect_uri: options.redirectUri,
        state: state,
        nonce: nonce,
        login_hint: launch.loginHint,
        prompt: "none",
        lti_message_hint: launch.ltiMessageHint
    }

    for (const [key, value] of Object.entries(query)) {
        authorizeUrl.searchParams.append(key, value)
    }

    return authorizeUrl.href
}

const readCallback = async (event: H3Event): Promise<LtiOidcCallback> => {
    const body = await readBody(event)

    return _.mapKeys(body, (value, key) => _.camelCase(key)) as LtiOidcCallback
}

export const useLti = () => {
    return {
        startLaunch,
        readCallback
    }
}

export default useLti
