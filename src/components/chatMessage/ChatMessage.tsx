import React from 'react';
import { Message } from '../../types/chat-types';
import './index.css';

export const ChatMessage: React.FC<{message: Message, id: string}> = ({message, id}) => {
	return (
		<div id={id} className='message'>			
			<div className="message-content">
				<div><p>{message.message}</p></div>
			</div>
			<div className="message-meta">
				<p>{message.time}</p>
				<p>{message.author.name} { message.author.surname}</p>
		</div>
	</div>
	)
}
