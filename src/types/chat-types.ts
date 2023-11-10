export interface Chat {
	_id?: string,
	chatName: string,
	consumer: string,
	supplier: string,
}

export interface ChatState {
	currentChat: Chat,
	allChats: Chat[]
}