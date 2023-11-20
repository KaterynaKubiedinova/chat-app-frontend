import React, { useEffect } from 'react';
import './index.css'
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import {
	deleteChatById,
	getAllChatsForUser,
	getAllUserChats,
	getCurrentUserChat,
	selectAllChats,
	selectCurrentChat
} from '../../store/chats';
import UserComponent from '../../components/user/user';
import FormDialog from '../../components/dialogForm/dialogForm';
import { Outlet, useNavigate } from 'react-router-dom';
import { ChatCard } from '../../components/chatCard/ChatCard';
import { User } from '../../types/user-types';
import socketIOClient from 'socket.io-client';
import { BASE_URL } from '../../config/app-constants';

const socket = socketIOClient(BASE_URL);

export default function ChatPage() {
	const allChats = useAppSelector(selectAllChats);
	const currentChat = useAppSelector(selectCurrentChat);
	const storedUser = sessionStorage.getItem('user')
	const user: User = storedUser ? JSON.parse(storedUser) : {} as User;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		socket.emit('joinUser', user.email);
		socket.on('receiveChats', (chatsList) => {
			dispatch(getAllUserChats(chatsList));
		});
		
		// dispatch(getAllChatsForUser(user.email));
	}, [socket]);

	const selectChat = (chatName: string) => {
		dispatch(getCurrentUserChat(chatName));
		navigate(chatName);
	};

	const deleteChat = (id: string) => {
		dispatch(deleteChatById(id));
		if (currentChat._id === id) {
			navigate(`/chat/${user.id}`);
		}
	};

	return (
		<div className='chat-page'>
			<div className='menu'>
				<UserComponent user={user} />
				<FormDialog user={user} socket={socket} />
				<div className="all-chats">
					{
						allChats?.map((chat) => {
							return (
								<ChatCard
									key={chat._id}
									selectChat={selectChat}
									chat={chat}
									deleteChat={deleteChat}
								/>)
						})
					}
					</div>
			</div>
			<Outlet />
		</div>
	)
}
