import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { createLogo } from '../../../utils/create-logo'
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { getCurrentUserChat, selectCurrentChat } from '../../../store/chats';
import SendIcon from '@mui/icons-material/Send';
import './index.css';
import { useNavigate, useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { BASE_URL } from '../../../config/app-constants';
import { User } from '../../../types/user-types';

interface Message {
	message: string,
	room: string | undefined,
	author: User,
	time: string,
	_id?: number
}

const socket = socketIOClient(BASE_URL);

export const CurrentChat = () => {
	const currentChat = useAppSelector(selectCurrentChat);
	const { chatName } = useParams();
	const dispatch = useAppDispatch();
	const storedUser = sessionStorage.getItem('user')
	const user: User = storedUser ? JSON.parse(storedUser) : {} as User;
	const jwt = sessionStorage.getItem('AccessToken');
	const [message, setMessage] = useState('');
	const [messagesList, setMessagesList] = useState<Message[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		!jwt && navigate('/', { state: { chatName: chatName } });

		if (chatName && jwt) {
			socket.emit('joinRoom', chatName);
			
			dispatch(getCurrentUserChat(chatName));
		}
	}, [chatName]);
	
	useEffect(() => {
		socket.on('chat message', (messagesList) => {
			setMessagesList(messagesList.messages);
		});

	}, [socket]);

	const sendMessage = async () => {
		if (message !== '') {
			const newMessage: Message = {
				message: message,
				room: currentChat.chatName,
				author: user,
				time:
					new Date(Date.now()).getHours() +
					':' +
					new Date(Date.now()).getMinutes(),
			};

			socket.emit('chat message', [newMessage, ...messagesList], chatName);
			setMessage('');
		};		
	};
	
	socket.on("new message", (data) => {
		setMessagesList((list) => [data.message, ...list]);
	});


	const printMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};

	return (
		<div className='conversation'>
			<div className="conversation-header">
				<div className="header-content">
					<Avatar sx={{
						bgcolor: '#BDE6CD',
						color: '#253E82',
						marginRight: '25px'
					}}>
						{createLogo(currentChat.consumer)}
					</Avatar>
						<div>{currentChat.chatName}</div>
					</div>
				</div>
			<div className="conversation-body">
				{messagesList.map((message) => {
					const id = message.author.email === user.email ? 'you' : 'other';
					return (
						<div id={id} className='message'
								key={message._id}>
								<div className="message-content">
									<div><p>{message.message}</p></div>
								</div>
								<div className="message-meta">
									<p>{message.time}</p>
									<p>{message.author.name} { message.author.surname}</p>
							</div>
						</div>)
				})}
			</div>
			<div className="conversation-form">
				<input 	className='conversation-input'
								type="text"
								value={message}
								onChange={printMessage}
								placeholder='Enter your message'/>
				<button className='conversation-button' onClick={sendMessage} >
					<SendIcon />
				</button>
			</div>
		</div>
	)
}
