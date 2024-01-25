import { UserDTO } from "./userTypes"

export interface Chat {
	chatName: string,
	consumer: string,
	supplier: string,
}

export interface ChatDTO extends Chat {
	id: string,
};

export type ChatState = {
	currentChat: ChatDTO | null,
	chats: ChatDTO[]
}

export interface Message {
	message: string,
	room: string | undefined,
	author: UserDTO | null,
	time: string,
}

export interface MessageDTO extends Message {
	id: string,
};