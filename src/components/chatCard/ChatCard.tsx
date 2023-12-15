import React from 'react';
import { Avatar } from '@mui/material';
import { createLogo } from '../../utils/create-logo';
import { Chat } from '../../types/chat-types';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import './index.css';
import { useAppDispatch } from '../../hooks/store-hooks';
import { getAllChatsForUser } from '../../store/chats';

export const ChatCard: React.FC<{
	selectChat: (chatName: string) => void,
	deleteChat: (id: string) => void,
	chat: Chat
}> = ({ selectChat, chat, deleteChat}) => {
	const dispatch = useAppDispatch();

	const handleSelectChat = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		selectChat(chat.chatName);
	}

	const handleDeleteChat = (e: React.MouseEvent) => {
		e.stopPropagation();
		chat._id && deleteChat(chat._id);
		dispatch(getAllChatsForUser(chat.supplier));
	}

	return (
		<div className="chat-icon" onClick={handleSelectChat}>
			<Avatar sx={{ bgcolor: '#BDE6CD', color: '#253E82', marginRight: '25px' }}>{ createLogo(chat.consumer) }</Avatar>
			<div>
				<p className='chat-name'>{chat.chatName}</p>
			</div>
			<DeleteTwoToneIcon sx={{cursor: 'pointer'}} onClick={handleDeleteChat} />
		</div>			
	)
}
