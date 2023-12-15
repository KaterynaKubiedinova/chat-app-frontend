import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createLogo } from '../../../utils/create-logo';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { getCurrentUserChat, selectCurrentChat } from '../../../store/chats';
import './index.css';
import { useNavigate, useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { BASE_URL } from '../../../config/app-constants';
import { User } from '../../../types/user-types';
import { ConversationForm } from '../../../components/conversationForm/ConversationForm';
import { Message } from '../../../types/chat-types';
import { ChatMessage } from '../../../components/chatMessage/ChatMessage';
import { SocketEndPoints } from '../../../config/apiController.constants';




const socket = socketIOClient(BASE_URL);

export const CurrentChat = () => {
	const currentChat = useAppSelector(selectCurrentChat);
	const { chatName } = useParams();
	const dispatch = useAppDispatch();
	const storedUser = sessionStorage.getItem('user')
	const user: User = storedUser ? JSON.parse(storedUser) : {} as User;

	const [messagesList, setMessagesList] = useState<Message[]>([]);
	const navigate = useNavigate();


	useEffect(() => {
		!user.id && navigate('/', { state: { chatName: chatName } });

		if (chatName) {
			dispatch(getCurrentUserChat(chatName));
			socket.emit(SocketEndPoints.joinRoom, chatName);
			socket.on(SocketEndPoints.receiveMessage, (messagesList) => {
				setMessagesList(messagesList.messages);
			});
		}

		return () => {
			socket.emit(SocketEndPoints.disconnectRoom, chatName);
		}
	}, [chatName]);

	useEffect(() => {
		socket.on(SocketEndPoints.receiveMessage, (messagesList) => {
			setMessagesList(messagesList.messages);
		});

		return () => {
			socket.emit(SocketEndPoints.disconnectRoom, chatName);
		}

	}, [socket]);

	return (
		<div className='conversation'>
			<div className="conversation-header">
				<div className="header-content">
					<Avatar sx={{
						bgcolor: '#BDE6CD',
						color: '#253E82',
						marginRight: '25px'
					}}>
						{createLogo(currentChat?.consumer)}
					</Avatar>
						<div>{currentChat?.chatName}</div>
					</div>
				</div>
			<div className="conversation-body">
				{messagesList.map((message) => {
					const id = message.author.email === user.email ? 'you' : 'other';
					return (
						<ChatMessage message={message} id={id} key={message._id}/>
						)
				})}
			</div>
			<ConversationForm
				chatName={chatName}
				socket={socket}
				messagesList={messagesList}
				user={user}
			/>
		</div>
	)
}
