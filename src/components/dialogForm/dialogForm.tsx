import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from '../../hooks/store-hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../../types/user-types';
import { createNewChat } from '../../store/chats';
import { CreateNewChatBtn } from '../../themes/styledComponents';
import { EMAIL_PATTERN } from '../../config/app-constants';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';


interface IFormInput {
  consumer: string
	chatName: string
}

const FormDialog: React.FC<{user: User, socket: Socket}> = ({user, socket}) => {
  const [open, setOpen] = React.useState(false);
	const dispatch = useAppDispatch();
	const { register, handleSubmit, resetField } = useForm<IFormInput>();
	const navigate = useNavigate();

  const handleClickOpen = () => {
		setOpen(true);
  };

  const handleClose = () => {
		setOpen(false);
		resetField('consumer');
		resetField('chatName');
  };

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		const newChat = { ...data, supplier: user.email };
		dispatch(createNewChat(newChat)).then(response => {
			response && navigate(data.chatName);
			response && handleClose();
			socket.emit('createNewChat', data.consumer);
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
							type='email'
							id="standard-error-helper-text"
							label="Consumer email"
							fullWidth
							variant="standard"
							{...register("consumer", {
								required: true, pattern: EMAIL_PATTERN, 
							})}
					/>
					<TextField
						type='text'
						id="standard-error-helper-text"
						label="Chat name"
						fullWidth
						variant="standard"
						{...register("chatName", {
							required: true, 
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
}

export default FormDialog;