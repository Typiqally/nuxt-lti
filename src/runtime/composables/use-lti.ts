import {ToolPlatform} from "~/src/runtime/lti";


const launch = (): string => {
    return ""
}

const validateToken = (): boolean => {
    return true
}

type LtiOptions = {
    getPlatform: (id: string) => ToolPlatform
}

export const useLti = (options: LtiOptions) => {
    const actions = {
        launch,
        validateToken
    }

    return {
        ...actions
    }
}

export default useLti
