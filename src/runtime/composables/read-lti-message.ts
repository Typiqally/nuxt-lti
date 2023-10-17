import jwt, {JwtPayload} from "jsonwebtoken"
import {LtiMessage, LtiOidcCallback} from "../lti"
import {H3Event, readBody} from "h3";
import _ from "lodash";

export const readLtiMessage = async (event: H3Event): Promise<LtiMessage> => {
    const body = await readBody(event)
    const callback = _.mapKeys(body, (value, key) => _.camelCase(key)) as LtiOidcCallback
    const decoded = jwt.decode(callback.idToken) as JwtPayload

    return {
        ...decoded,
        context: decoded["https://purl.imsglobal.org/spec/lti/claim/context"],
        custom: decoded["https://purl.imsglobal.org/spec/lti/claim/custom"],
        deepLinkingSettings: decoded["https://purl.imsglobal.org/spec/lti/claim/deep_link_settings"],
        deploymentId: decoded["https://purl.imsglobal.org/spec/lti/claim/deployment_id"],
        launchPresentation: decoded["https://purl.imsglobal.org/spec/lti/claim/launch_presentation"],
        lis: decoded["https://purl.imsglobal.org/spec/lti/claim/lis"],
        resourceLink: decoded["https://purl.imsglobal.org/spec/lti/claim/message_type"],
        role: decoded["https://purl.imsglobal.org/spec/lti/claim/roles"],
        targetLinkUrl: decoded["https://purl.imsglobal.org/spec/lti/claim/target_link_uri"],
        toolPlatform: decoded["https://purl.imsglobal.org/spec/lti/claim/tool_platform"],
        type: decoded["https://purl.imsglobal.org/spec/lti/claim/message_type"],
        version: decoded["https://purl.imsglobal.org/spec/lti/claim/version"]
    }
}
