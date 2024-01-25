import {
	Button,
	IconButton,
	Input,
	InputAdornment,
	InputLabel
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomH1, EmailTextField, Error, LoginFormControl } from '../../themes/styledComponents';
import { loginUser } from '../../store/auth';
import { useAppDispatch } from '../../hooks/store-hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EMAIL_PATTERN } from '../../config/validationPatterns';
import { LoginForm, LoginPageBlock } from './styledComponents';


interface IFormInput {
  email: string
  password: string
}

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const chatName  = location.state?.chatName || null;

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		dispatch(loginUser(data))
			.then((data) => {
				if (data) {
					
					chatName ?
						navigate(`/chat/${data.user.id}/${chatName}`) :
						navigate(`/chat/${data.user.id}`);
				}
			})
			.catch(e => {
				throw e;
			})
	};

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
	};

	const signUp = () => {
		navigate(`/registration`);
	}

	return (
		<LoginPageBlock>
			<CustomH1>Login to your account!</CustomH1>
			<LoginForm onSubmit={handleSubmit(onSubmit)}>
			<EmailTextField
					type='email'
          id="standard-error-helper-text"
					label="Email"
					variant="standard"
					{...register("email", {
						required: true, pattern: EMAIL_PATTERN, 
					})}
				/>
				{errors.email && <Error>Email is required and should be correct</Error>}
				<LoginFormControl variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
					<Input
						{...register("password", {required: true})}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
				</LoginFormControl>
				{errors.password && <Error>Password is required and should be correct</Error>}
				<Button type='submit' variant="outlined">
					Sign in
				</Button>
				OR
				<Button variant="outlined" onClick={signUp}>
					Sign up
				</Button>
      </LoginForm>
		</LoginPageBlock>
	)
}
