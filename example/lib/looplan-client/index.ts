import { LooplanClient } from './LooplanClient'

declare global {
    interface Window {
        looplanClient?: LooplanClient & {
            command: (name: string, data: any, options?: any) => Promise<any>
            commandStream: (name: string, data: any, handlers?: any) => Promise<any>
            abort: (requestId: string, handlers?: any) => Promise<any>
        }
    }
}

let currentClient: LooplanClient | null = null

function setupDevClient() {
    if (window.looplanClient) {
        return window.looplanClient
    }

    const client = new LooplanClient()
    currentClient = client
    window.looplanClient = client as any
    return window.looplanClient
}

function getDevClient() {
    return currentClient || window.looplanClient || setupDevClient()
}

export {
    LooplanClient,
    setupDevClient,
    getDevClient,
}
