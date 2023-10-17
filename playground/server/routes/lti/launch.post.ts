import crypto from "crypto"
import {LtiLaunch} from "../../../../src/runtime/lti"
import _ from "lodash"

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const launch: LtiLaunch = _.mapKeys(body, (value, key) => _.camelCase(key)) as LtiLaunch

	const origin = event.headers.get("origin")

	if (launch.iss != "https://canvas.instructure.com" || origin == null) {
		throw createError({statusCode: 400, statusMessage: "Unsupported platform"})
	}

	const state = crypto.randomBytes(64).toString("base64url")
	const nonce = crypto.randomBytes(64).toString("base64url")

	const authorizeUrl = new URL(`${origin}/api/lti/authorize_redirect`)
	const authorizeQuery = {
		client_id: launch.clientId,
		response_type: "id_token",
		response_mode: "form_post",
		scope: "openid",
		redirect_uri: "https://localhost:3000/lti/callback",
		state: state,
		nonce: nonce,
		login_hint: launch.loginHint,
		prompt: "none",
		lti_message_hint: launch.ltiMessageHint
	}

	for (const [key, value] of Object.entries(authorizeQuery)) {
		authorizeUrl.searchParams.append(key, value)
	}

	console.log(authorizeUrl.href)

	// Safari fix
	if (event.headers.get("user-agent")?.includes("Safari")) {
		return `<script>window.location.replace("${authorizeUrl.href}")</script>`
	}

	await sendRedirect(event, authorizeUrl.href)
})
