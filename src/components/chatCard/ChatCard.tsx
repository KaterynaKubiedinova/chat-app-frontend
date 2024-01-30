import React from 'react';
import { ChatDTO } from '../../types/chatTypes';
import { useAppDispatch } from '../../hooks/store-hooks';
import { getAllChatsForUser } from '../../store/chats';
import { CustomAvatar } from '../avatar/Avatar';
import { ChatIcon, ChatName, DeleteButton } from './styledComponents';

export const ChatCard: React.FC<{
  selectChat: (chatName: string) => void;
  deleteChat: (id: string) => void;
  chat: ChatDTO;
}> = ({ selectChat, chat, deleteChat }) => {
  const dispatch = useAppDispatch();

  const handleSelectChat = () => {
    selectChat(chat.chatName);
  };

  const handleDeleteChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (chat._id) {
      deleteChat(chat._id);
    }
    dispatch(getAllChatsForUser(chat.supplier));
  };

  return (
    <ChatIcon onClick={handleSelectChat}>
      <CustomAvatar email={chat.consumer} />
      <div>
        <ChatName>{chat.chatName}</ChatName>
      </div>
      <DeleteButton onClick={handleDeleteChat} />
    </ChatIcon>
  );
};
