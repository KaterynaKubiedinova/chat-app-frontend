export enum ApiController {
  register = 'register',
  logout = 'logout',
	login = 'auth',
	refresh = 'refresh',
	createChat = 'createChat',
	allUserChats = 'allUserChats',
	currentUserChat = 'currentUserChat',
	deleteChatById = 'deleteChatById',
}

export enum SocketEndPoints {
	joinRoom = 'joinRoom',
	receiveMessage = 'receiveMessage',
	sendMessage = 'sendMessage'
}
