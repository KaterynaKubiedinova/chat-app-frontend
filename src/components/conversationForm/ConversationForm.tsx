import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './index.css'
import { Socket } from 'socket.io-client';
import { Message } from '../../types/chat-types';
import { User } from '../../types/user-types';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Picker from '@emoji-mart/react';
import SendIcon from '@mui/icons-material/Send';
import { useFocus } from '../../hooks/focus-hook';
import { SocketEndPoints } from '../../config/apiController.constants';

export const ConversationForm: React.FC<{
	chatName: string | undefined,
	socket: Socket,
	messagesList: Message[],
	user: User,
}> = ({ chatName, socket, messagesList, user}) => {
	const [message, setMessage] = useState('');
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const { setFocus, htmlElRef } = useFocus();
	
	useEffect(() => {
		setFocus();
	}, [chatName])

	const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
	};
	
	const handleEmojiSelect = (emoji: { native: string }) => {
    setMessage((prevMessage) => prevMessage + emoji.native);
  };

	const sendMessage = async () => {
		if (message !== '') {
			const newMessage: Message = {
				message: message,
				room: chatName,
				author: user,
				time:
					new Date(Date.now()).getHours() +
					':' +
					new Date(Date.now()).getMinutes(),
			};

			socket.emit(SocketEndPoints.sendMessage, [newMessage, ...messagesList], chatName);
			
			setMessage('');
		};		
	};

	const printMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};

	return (
		<div className="conversation-form">
				<input 	className='conversation-input'
								value={message}
								onChange={printMessage}
								ref={htmlElRef}
								placeholder='Enter your message'
				/>
				<div className='emoji-picker-block'>
					{showEmojiPicker && (
						<div className="emoji-picker" onMouseLeave={toggleEmojiPicker}>
							<Picker onEmojiSelect={handleEmojiSelect}  />
						</div>
				)}
					<button
						className='emoji-button'
						onMouseEnter={toggleEmojiPicker}
					>
							<SentimentSatisfiedAltIcon />
					</button>
    	</div>
				<button className='conversation-button' onClick={sendMessage} >
					<SendIcon />
				</button>
			</div>
	)
}
