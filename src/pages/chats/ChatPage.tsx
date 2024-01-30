import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import {
  deleteChatById,
  getUserChats,
  selectAllChats,
  selectCurrentChat
} from '../../store/chats';
import ProfileComponent from '../../components/profile/Profile';
import FormDialog from '../../components/dialogForm/DialogForm';
import { Outlet, useNavigate } from 'react-router-dom';
import { ChatCard } from '../../components/chatCard/ChatCard';
import socketIOClient from 'socket.io-client';
import { SocketEndPoints } from '../../config/apiController.constants';
import { selectCurrentUser } from '../../store/auth';
import { AllChatsBlock, ChatPageBlock, Menu } from './styledComponents';

export default function ChatPage() {
  const сhats = useAppSelector(selectAllChats);
  const currentChat = useAppSelector(selectCurrentChat);
  const currentUser = useAppSelector(selectCurrentUser);
  const socket = useRef(socketIOClient(process.env.PUBLIC_URL));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
    socket.current.emit(SocketEndPoints.JOIN_USER, currentUser?.email);
    socket.current.on(SocketEndPoints.RECEIVE_CHATS, (chats) => {
      dispatch(getUserChats(chats));
    });
  }, []);

  useEffect(() => {
    socket.current.on(SocketEndPoints.RECEIVE_CHATS, (chats) => {
      dispatch(getUserChats(chats));
    });

    return () => {
      socket.current.emit(SocketEndPoints.DISCONNECT_USER, currentUser?.email);
    };
  }, [socket]);

  const selectChat = (chatName: string) => {
    navigate(chatName);
  };

  const deleteChat = (id: string) => {
    dispatch(deleteChatById(id));
    if (currentChat?._id === id) {
      navigate(`/chat/${currentUser?.id}`);
    }
  };

  return (
    <ChatPageBlock>
      <Menu>
        <ProfileComponent user={currentUser} socket={socket.current} />
        <FormDialog user={currentUser} socket={socket.current} />
        <AllChatsBlock>
          {сhats?.map((chat) => (
            <ChatCard
              key={chat._id}
              selectChat={selectChat}
              chat={chat}
              deleteChat={deleteChat}
            />
          ))}
        </AllChatsBlock>
      </Menu>
      <Outlet />
    </ChatPageBlock>
  );
}
