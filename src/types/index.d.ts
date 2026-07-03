type LooplanClientInstance = {
    command: (name: string, data: any, options?: any) => Promise<any>
    commandStream: (name: string, data: any, options?: any) => Promise<any>
    [key: string]: any
}


declare global {
    interface Window {
        looplanClient?: LooplanClientInstance
    }
}