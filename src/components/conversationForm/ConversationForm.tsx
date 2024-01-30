import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Message } from '../../types/chatTypes';
import { UserDTO } from '../../types/userTypes';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Picker from '@emoji-mart/react';
import SendIcon from '@mui/icons-material/Send';
import { SocketEndPoints } from '../../config/apiController.constants';
import {
  ConversationButton,
  ConversationFormBlock,
  ConversationInput,
  EmojiButton,
  EmojiPicker,
  EmojiPickerBlock
} from './styledComponents';
import { useForm } from 'react-hook-form';

export const ConversationForm: React.FC<{
  chatName: string | undefined;
  socket: Socket;
  messagesList: Message[];
  user: UserDTO | null;
}> = ({ chatName, socket, messagesList, user }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { handleSubmit, getValues, setValue, setFocus, register } = useForm({
    defaultValues: {
      message: ''
    }
  });
  const messageInput = 'message';

  useEffect(() => {
    setFocus(messageInput);
  }, [chatName]);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiSelect = (emoji: { native: string }) => {
    const message = getValues(messageInput) + emoji.native;
    setValue(messageInput, message);
    setFocus(messageInput);
  };

  const sendMessage = async () => {
    const message = getValues(messageInput);
    const messageTime = `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`;

    if (message !== '') {
      const newMessage: Message = {
        message: message,
        room: chatName,
        author: user,
        time: messageTime
      };
      socket.emit(
        SocketEndPoints.SEND_MESSAGE,
        [newMessage, ...messagesList],
        chatName
      );

      setValue(messageInput, '');
      setFocus(messageInput);
    }
  };

  return (
    <ConversationFormBlock onSubmit={handleSubmit(sendMessage)}>
      <ConversationInput
        type="text"
        placeholder="Enter your message"
        {...register('message')}
      />
      <EmojiPickerBlock>
        {showEmojiPicker && (
          <EmojiPicker onMouseLeave={toggleEmojiPicker}>
            <Picker onEmojiSelect={handleEmojiSelect} />
          </EmojiPicker>
        )}
        <EmojiButton onMouseEnter={toggleEmojiPicker}>
          <SentimentSatisfiedAltIcon />
        </EmojiButton>
      </EmojiPickerBlock>
      <ConversationButton type="submit">
        <SendIcon />
      </ConversationButton>
    </ConversationFormBlock>
  );
};
