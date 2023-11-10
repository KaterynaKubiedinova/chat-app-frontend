import { Avatar, Button } from '@mui/material';
import React from 'react';
import { createLogo } from '../../utils/create-logo';
import './index.css';
import { useAppDispatch } from '../../hooks/store-hooks';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/auth';
import { User } from '../../types/user-types';

const UserComponent: React.FC<{
  user: User
}> = ({ user }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const logOut = () => {
		dispatch(logoutUser());
		navigate('/');
	}
	return (
		<div className="user">
			<Avatar sx={{ bgcolor: '#BDE6CD', color: '#253E82', marginRight: '25px' }}>
				{createLogo(user.name)}
			</Avatar>
			<div className='user-data'>
				<div className='user-email'>{user.name} {user.surname}</div>
				<Button variant="outlined" onClick={logOut}>Log out</Button>
			</div>
		</div>
	)
}

export default UserComponent;