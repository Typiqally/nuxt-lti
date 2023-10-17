import {JwtPayload} from "jsonwebtoken";

export interface LtiMessage extends JwtPayload {
    type: MessageType,
    version: string,
    deploymentId: string,
    resourceLink: ResourceLink
    targetLinkUrl: URL,
    lis: LearningInformationServices,
    context: Context,
    toolPlatform: ToolPlatformReference,
    launchPresentation: LaunchPresentation,
    role: string[],
    deepLinkingSettings: DeepLinkingSettings | undefined
    custom: { [key: string]: string }
}

type MessageType = "LtiResourceLinkRequest" | "LtiDeepLinkingRequest" | "LtiSubmissionReviewRequest"

type ResourceLink = {
    id: string,
    title: string,
    description: string | undefined
}

type LearningInformationServices = {
    personSourceId: string | undefined,
    courseOfferingSourcedId: string | undefined,
    courseSectionSourcedId: string | undefined
}

type Context = {
    id: string,
    label: string,
    title: string,
    type: ContextType[]
}

type ContextType = "http://purl.imsglobal.org/vocab/lis/v2/course#CourseTemplate"
    | "http://purl.imsglobal.org/vocab/lis/v2/course#CourseOffering"
    | "http://purl.imsglobal.org/vocab/lis/v2/course#CourseSection"
    | "http://purl.imsglobal.org/vocab/lis/v2/course#Group";

type ToolPlatformReference = {
    guid: string,
    name: string,
    version: string,
    productFamilyCode: string
}

type LaunchPresentation = {
    documentTarget: DocumentTarget,
    width: number,
    height: number,
    locale: string,
    returnUrl: string
}

type DocumentTarget = "iframe" | "window";

type DeepLinkingSettings = {
    deepLinkReturnUrl: string,
    acceptTypes: string[],
    acceptPresentationDocumentTargets: string[],
    acceptMediaTypes: string,
    autoCreate: boolean,
    acceptMultiple: boolean
}


export type LtiLaunch = {
    iss: string,
    loginHint: string,
    deploymentId: string
    clientId: string,
    targetLinkUri: string,
    ltiMessageHint: string,
    ltiStorageTarget: string
}

export type ToolPlatform = {
    name: string,
    issuer: string,
    clientId: string,
    clientSecret: string,
    accessTokenUrl: string,
    authorizeUrl: string,
    jwkSetUrl: string,
    keyId: string
}


export interface CanvasLtiOidcLaunch extends LtiLaunch {
    canvasEnvironment: string,
    canvasRegion: string
}

export type LtiOidcCallback = {
    authenticityToken: string,
    error: string | undefined,
    errorDescription: string | undefined
    idToken: string,
    state: string,
    ltiStorageTarget: string
}
