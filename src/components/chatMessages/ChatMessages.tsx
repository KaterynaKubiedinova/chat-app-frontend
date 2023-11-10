import React from 'react'
import { Socket } from 'socket.io-client'
import { Chat } from '../../types/chat-types'

export const ChatMessages: React.FC<{socket: Socket, chat: Chat}> = ({socket, chat}) => {
	return (
		<div>
			
		</div>
	)
}
