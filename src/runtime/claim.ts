export type Context = "https://purl.imsglobal.org/spec/lti/claim/context"
export type Custom = "https://purl.imsglobal.org/spec/lti/claim/custom"
export type DeepLinkingSettings = "https://purl.imsglobal.org/spec/lti/claim/deep_link_settings"
export type DeploymentId = "https://purl.imsglobal.org/spec/lti/claim/deployment_id"
export type LaunchPresentation = "https://purl.imsglobal.org/spec/lti/claim/launch_presentation"
export type Lis = "https://purl.imsglobal.org/spec/lti/claim/lis"
export type ResourceLink = "https://purl.imsglobal.org/spec/lti/claim/resource_link"
export type Roles = "https://purl.imsglobal.org/spec/lti/claim/roles"
export type TargetLinkUri = "https://purl.imsglobal.org/spec/lti/claim/target_link_uri"
export type ToolPlatform = "https://purl.imsglobal.org/spec/lti/claim/tool_platform"
export type MessageType = "https://purl.imsglobal.org/spec/lti/claim/message_type"
export type Version = "https://purl.imsglobal.org/spec/lti/claim/version"

export type Claim =
    Context
    | Custom
    | DeepLinkingSettings
    | DeploymentId
    | LaunchPresentation
    | Lis
    | ResourceLink
    | Roles
    | TargetLinkUri
    | ToolPlatform
    | MessageType
    | Version
