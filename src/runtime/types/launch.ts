export type LtiLaunch = {
    iss: string,
    loginHint: string,
    deploymentId: string
    clientId: string,
    targetLinkUri: string,
    ltiMessageHint: string,
    ltiStorageTarget: string
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
