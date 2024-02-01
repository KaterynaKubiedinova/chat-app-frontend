import { Button } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../hooks/store-hooks';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/userTypes';
import { Socket } from 'socket.io-client';
import { SocketEndPoints } from '../../config/apiController.constants';
import { CustomAvatar } from '../avatar/Avatar';
import {
  ProfileBlock,
  ProfileDataBlock,
  ProfileEmail
} from './styledComponents';
import { getLogoutUser } from '../../services/services';

const ProfileComponent: React.FC<{
  user: User | null;
  socket: Socket;
}> = ({ user, socket }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(getLogoutUser());
    navigate('/login');
    socket.emit(SocketEndPoints.DISCONNECT_USER, user?.email);
  };
  return (
    <ProfileBlock>
      <CustomAvatar email={user?.name} />
      <ProfileDataBlock>
        <ProfileEmail>
          {user?.name} {user?.surname}
        </ProfileEmail>
        <Button variant="outlined" onClick={logOut}>
          Log out
        </Button>
      </ProfileDataBlock>
    </ProfileBlock>
  );
};

export default ProfileComponent;
