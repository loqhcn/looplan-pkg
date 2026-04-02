interface MessageItem {
    id: string | number
    type: MessageType
    content: string
    time?: string
    userId: string | number
    userName?: string
    avatar?: string
}
type MessageType = 'text' | 'img' | 'markdown'

interface MessageUser {
    id: string | number
    name: string
    avatar?: string
}


export type {
    MessageItem,
    MessageType,
    MessageUser
}
