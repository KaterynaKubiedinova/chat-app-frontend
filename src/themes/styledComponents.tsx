import styled from "@emotion/styled";
import { Button, FormControl, TextField } from "@mui/material";

export const LoginFormControl = styled(FormControl)`
	margin: 1; 
	width: 70%; 
	align-items: center;
`

export const EmailTextField = styled(TextField)`
	margin: 2px; 
	width: 70%; 
	align-items: center;
`

export const Error = styled.p`
	color: red;
	width: 70%;
`;

export const CreateNewChatBtn = styled(Button)`
	flex-grow: 1;
`;