import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from '../../hooks/store-hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../../types/userTypes';
import { createNewChat } from '../../store/chats';
import { CreateNewChatBtn } from '../../themes/styledComponents';
import { EMAIL_PATTERN } from '../../config/validationPatterns';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { SocketEndPoints } from '../../config/apiController.constants';

type FormInput = {
  consumer: string;
  chatName: string;
};

const FormDialog: React.FC<{ user: User | null; socket: Socket }> = ({
  user,
  socket
}) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const { register, handleSubmit, resetField } = useForm<FormInput>({
    defaultValues: {
      consumer: '',
      chatName: ''
    }
  });
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetField('consumer');
    resetField('chatName');
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const newChat = { ...data, supplier: user?.email ?? 'User' };
    dispatch(createNewChat(newChat)).then((response) => {
      if (response) {
        navigate(data.chatName);
        handleClose();
      }
      socket.emit(SocketEndPoints.CREATE_NEW_CHAT, data.consumer);
    });
  };

  return (
    <div>
      <CreateNewChatBtn variant="outlined" onClick={handleClickOpen}>
        Create new chat
      </CreateNewChatBtn>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new chat</DialogTitle>
        <DialogContent>
          <TextField
            type="email"
            label="Consumer email"
            fullWidth
            variant="standard"
            {...register('consumer', {
              required: true,
              pattern: EMAIL_PATTERN
            })}
          />
          <TextField
            type="text"
            label="Chat name"
            fullWidth
            variant="standard"
            {...register('chatName', {
              required: true
            })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
