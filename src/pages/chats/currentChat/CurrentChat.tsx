import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { selectCurrentChat } from '../../../store/chats';
import { useNavigate, useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { ConversationForm } from '../../../components/conversationForm/ConversationForm';
import { MessageDTO } from '../../../types/chatTypes';
import { ChatMessage } from '../../../components/chatMessage/ChatMessage';
import { SocketEndPoints } from '../../../config/apiController.constants';
import { CustomAvatar } from '../../../components/avatar/Avatar';
import { selectCurrentUser } from '../../../store/auth';
import {
  ConversationBlock,
  ConversationBodyBlock,
  ConversationHeaderBlock,
  HeaderContentBlock
} from './styledComponents';
import { getCurrentUserChat } from '../../../services/services';

export const CurrentChat = () => {
  const currentChat = useAppSelector(selectCurrentChat);
  const { chatName } = useParams();
  const dispatch = useAppDispatch();
  const storedUser = sessionStorage.getItem('user');
  const currentUser = useAppSelector(selectCurrentUser);

  const URL: string = process.env.REACT_APP_API_URL || '';
  const socket = useRef(socketIOClient(URL));

  const [messagesList, setMessagesList] = useState<MessageDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!storedUser) {
      navigate('/login', { state: { chatName: chatName } });
    }

    if (chatName) {
      dispatch(getCurrentUserChat(chatName));
      socket.current.emit(SocketEndPoints.JOIN_ROOM, chatName);
      socket.current.on(SocketEndPoints.RECEIVE_MESSAGE, (messagesList) => {
        setMessagesList(messagesList.messages);
      });
    }

    return () => {
      socket.current.emit(SocketEndPoints.DISCONNECT_ROOM, chatName);
    };
  }, [chatName]);

  useEffect(() => {
    socket.current.on(SocketEndPoints.RECEIVE_MESSAGE, (messagesList) => {
      setMessagesList(messagesList.messages);
    });

    return () => {
      socket.current.emit(SocketEndPoints.DISCONNECT_ROOM, chatName);
    };
  }, [socket]);

  return (
    <ConversationBlock>
      <ConversationHeaderBlock>
        <HeaderContentBlock>
          <CustomAvatar email={currentChat?.consumer} />
          <div>{currentChat?.chatName}</div>
        </HeaderContentBlock>
      </ConversationHeaderBlock>
      <ConversationBodyBlock>
        {messagesList.map((message) => {
          const isAuthorCurrentUser =
            message.author?.email === currentUser?.email;
          return (
            <ChatMessage
              message={message}
              isAuthorCurrentUser={isAuthorCurrentUser}
              key={message._id}
            />
          );
        })}
      </ConversationBodyBlock>
      <ConversationForm
        chatName={chatName}
        socket={socket.current}
        messagesList={messagesList}
        user={currentUser}
      />
    </ConversationBlock>
  );
};
