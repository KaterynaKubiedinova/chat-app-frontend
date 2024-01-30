import styled from '@emotion/styled';
import { Avatar, Button, FormControl, TextField } from '@mui/material';

export const LoginFormControl = styled(FormControl)`
  margin: 1;
  width: 70%;
  align-items: center;
`;

export const EmailTextField = styled(TextField)`
  margin: 2px;
  width: 70%;
  align-items: center;
`;

export const Error = styled.p`
  color: red;
  width: 70%;
`;

export const CreateNewChatBtn = styled(Button)`
  flex-grow: 1;
`;

export const StyledAvatar = styled(Avatar)`
  bgcolor: #bde6cd;
  color: #253e82;
  marginright: 25px;
`;

export const ExplanationText = styled.div`
  color: #224d97;
  display: flex;
  align-items: center;
  margin: auto;
  justify-content: center;
  background: #1a70cb3c;
  height: 20px;
  padding: 7px;
  border-radius: 10px;
`;

export const CustomH1 = styled.h1`
  color: #253e82;
`;
