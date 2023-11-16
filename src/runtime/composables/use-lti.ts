import {createError, H3Event, readBody} from "h3"
import _ from "lodash"
import {type LtiOidcCallback, type LtiOidcInitiation} from "~/src/runtime/types/launch"
import {jwtDecode} from "jwt-decode"
import type {LtiMessage} from "~/src/runtime/types/message"
import {useAsyncData, useRequestEvent} from "#app";

const prepareLaunch = async (
	event: H3Event,
	redirectUri: string
): Promise<string> => {
	const body = await readBody(event)

	const launch = _.mapKeys(body, (_v, key) =>
		_.camelCase(key)
	) as LtiOidcInitiation
	const origin = event.headers.get("origin")

	if (launch.iss != "https://canvas.instructure.com" || origin == null) {
		throw createError({
			statusCode: 400,
			statusMessage: "Unsupported platform",
		})
	}

	const authorizeUrl = new URL(`${origin}/api/lti/authorize_redirect`)
	const query = {
		client_id: launch.clientId,
		response_type: "id_token",
		response_mode: "form_post",
		scope: "openid",
		redirect_uri: redirectUri,
		login_hint: launch.loginHint,
		prompt: "none",
		lti_message_hint: launch.ltiMessageHint,
	}

	for (const [key, value] of Object.entries(query)) {
		authorizeUrl.searchParams.append(key, value)
	}

	return authorizeUrl.href
}

const launch = async (redirectUri: string) => {
	const {data} = await useAsyncData(async () => {
		if (!process.server) {
			return
		}

		const event = useRequestEvent()

		return await prepareLaunch(event, redirectUri)
	})

	if (process.client) {
		if (data.value != null) {
			redirectLaunch(data.value)
		} else {
			throw createError({
				statusCode: 400,
				statusMessage: "Something went wrong when launching LTI"
			})
		}
	}
}

const redirectLaunch = (authorizeUrl: string): void => {
	const _authorizeUrl = new URL(authorizeUrl)

	function csrf(key: string): void {
		const token = window.crypto.randomUUID()
		window.sessionStorage.setItem(key, token)
		_authorizeUrl?.searchParams.append(key, token)
	}

	csrf("state")
	csrf("nonce")

	window.location.replace(_authorizeUrl.href)
}

const readCallback = async (event: H3Event): Promise<LtiOidcCallback> => {
	const body = await readBody(event)
	return _.mapKeys(body, (_v, key) => _.camelCase(key)) as LtiOidcCallback
}

const validateCallback = (callback: LtiOidcCallback): boolean => {
	const storedState = window.sessionStorage.getItem("state")
	if (storedState != callback?.state) {
		throw Error("State mismatch")
	}

	const storedNonce = window.sessionStorage.getItem("nonce")
	const jwt = jwtDecode(callback.idToken) as LtiMessage

	if (storedNonce != jwt.nonce) {
		throw Error("Nonce mismatch")
	}

	return true
}

const handleCallback = async (): Promise<LtiOidcCallback | null> => {
	const {data} = await useAsyncData(async () => {
		if (!process.server) {
			return
		}

		const event = useRequestEvent()
		return await readCallback(event)
	})

	if (process.client && data.value?.idToken) {
		const callback = data.value
		const validation = validateCallback(callback)

		if (validation) {
			return callback
		} else {
			throw createError({
				statusCode: 400,
				statusMessage: "Token validation failed"
			})
		}
	}

	return null
}

export const useLti = (): {
	handleCallback: () => Promise<LtiOidcCallback | null>
	launch: (redirectUri: string) => Promise<void>
	prepareLaunch: (event: H3Event, redirectUri: string) => Promise<string>
	readCallback: (event: H3Event) => Promise<LtiOidcCallback>
	redirectLaunch: (authorizeUrl: string) => void
	validateCallback: (callback: LtiOidcCallback) => boolean
} => {
	return {
		handleCallback,
		launch,
		prepareLaunch,
		readCallback,
		redirectLaunch,
		validateCallback,
	}
}

export default useLti
