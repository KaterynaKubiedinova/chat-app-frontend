import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Message } from '../../types/chatTypes';
import { UserDTO } from '../../types/userTypes';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Picker from '@emoji-mart/react';
import SendIcon from '@mui/icons-material/Send';
import { useFocus } from '../../hooks/focus-hook';
import { SocketEndPoints } from '../../config/apiController.constants';
import { ConversationButton, ConversationFormDiv, ConversationInput, EmojiButton, EmojiPicker, EmojiPickerBlock } from './styledComponents';

export const ConversationForm: React.FC<{
	chatName: string | undefined,
	socket: Socket,
	messagesList: Message[],
	user: UserDTO | null,
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
				time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
			};

			socket.emit(SocketEndPoints.SEND_MESSAGE, [newMessage, ...messagesList], chatName);
			
			setMessage('');
		};		
	};

	const printMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};

	return (
		<ConversationFormDiv>
				<ConversationInput
					value={message}
					onChange={printMessage}
					ref={htmlElRef}
					placeholder='Enter your message'
				/>
				<EmojiPickerBlock>
					{showEmojiPicker && (
						<EmojiPicker onMouseLeave={toggleEmojiPicker}>
							<Picker onEmojiSelect={handleEmojiSelect}  />
						</EmojiPicker>
				)}
					<EmojiButton onMouseEnter={toggleEmojiPicker}>
							<SentimentSatisfiedAltIcon />
					</EmojiButton>
    	</EmojiPickerBlock>
				<ConversationButton onClick={sendMessage} >
					<SendIcon />
				</ConversationButton>
			</ConversationFormDiv>
	)
}
