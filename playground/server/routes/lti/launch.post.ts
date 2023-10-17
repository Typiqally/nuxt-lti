import {sendRedirect, defineEventHandler} from "h3"
import useLti from "../../../../src/runtime/composables/use-lti";

export default defineEventHandler(async (event) => {
    const {startLaunch} = useLti()
    const authorizeUrl = await startLaunch(event)

    // Fix Safari not redirecting with request parameters
    if (event.headers.get("user-agent")?.includes("Safari")) {
        return `<script>window.location.replace("${authorizeUrl}")</script>`
    }

    await sendRedirect(event, authorizeUrl)
})
