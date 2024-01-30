export enum ApiController {
  REGISTER = 'register',
  LOGOUT = 'logout',
  LOGIN = 'auth',
  REFRESH = 'refresh',
  CREATE_CHAT = 'createChat',
  ALL_USER_CHATS = 'allUserChats',
  CURRENT_USER_CHAT = 'currentUserChat',
  DELETE_CHAT_BY_ID = 'deleteChatById'
}

export enum SocketEndPoints {
  JOIN_ROOM = 'joinRoom',
  RECEIVE_MESSAGE = 'receiveMessage',
  SEND_MESSAGE = 'sendMessage',
  CREATE_NEW_CHAT = 'createNewChat',
  JOIN_USER = 'joinUser',
  RECEIVE_CHATS = 'receiveChats',
  DISCONNECT_ROOM = 'disconnectRoom',
  DISCONNECT_USER = 'disconnectUser'
}
