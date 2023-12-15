import { User } from "./user-types"

export interface Chat {
	_id?: string,
	chatName: string,
	consumer: string,
	supplier: string,
}

export interface ChatState {
	currentChat: Chat | null,
	allChats: Chat[]
}

export interface Message {
	message: string,
	room: string | undefined,
	author: User,
	time: string,
	_id?: number
}