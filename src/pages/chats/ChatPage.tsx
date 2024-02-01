import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import {
  getUserChats,
  selectAllChats,
  selectCurrentChat
} from '../../store/chats';
import ProfileComponent from '../../components/profile/Profile';
import FormDialog from '../../components/dialogForm/dialogForm';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { ChatCard } from '../../components/chatCard/ChatCard';
import socketIOClient from 'socket.io-client';
import { SocketEndPoints } from '../../config/apiController.constants';
import { selectCurrentUser } from '../../store/auth';
import { AllChatsBlock, ChatPageBlock, Menu } from './styledComponents';
import { deleteChatById, getUserByID } from '../../services/services';

export default function ChatPage() {
  const сhats = useAppSelector(selectAllChats);
  const currentChat = useAppSelector(selectCurrentChat);
  const currentUser = useAppSelector(selectCurrentUser);

  const URL: string = process.env.REACT_APP_API_URL || '';
  const socket = useRef(socketIOClient(URL));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getUserByID(userId || ''));
  }, []);

  useEffect(() => {
    socket.current.emit(SocketEndPoints.JOIN_USER, currentUser?.email);
    socket.current.on(SocketEndPoints.RECEIVE_CHATS, (chats) => {
      dispatch(getUserChats(chats));
    });
  }, [currentUser]);

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
