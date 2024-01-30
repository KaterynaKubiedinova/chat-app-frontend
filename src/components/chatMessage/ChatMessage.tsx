import React from 'react';
import { Message } from '../../types/chatTypes';
import {
  MessageBlock,
  MessageContentBlock,
  MessageMetaBlock
} from './styledComponents';

export const ChatMessage: React.FC<{
  message: Message;
  isAuthorCurrentUser: boolean;
}> = ({ message, isAuthorCurrentUser }) => {
  return (
    <MessageBlock isAuthorCurrentUser={isAuthorCurrentUser}>
      <MessageContentBlock isAuthorCurrentUser={isAuthorCurrentUser}>
        <div>
          <p>{message.message}</p>
        </div>
      </MessageContentBlock>
      <MessageMetaBlock isAuthorCurrentUser={isAuthorCurrentUser}>
        <p>{message.time}</p>
        <p>
          {message.author?.name} {message.author?.surname}
        </p>
      </MessageMetaBlock>
    </MessageBlock>
  );
};
