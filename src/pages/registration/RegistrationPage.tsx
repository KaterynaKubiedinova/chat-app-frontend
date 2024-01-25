import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { registerUser } from '../../store/auth';
import { useAppDispatch } from '../../hooks/store-hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '../../config/validationPatterns';
import { CustomH1, Error, LoginFormControl } from '../../themes/styledComponents';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoginPageBlock, RegistrationForm } from './styledComponents';

interface IFormInput {
	name: string
	surname: string
  email: string
	password: string
}

const RegistrationPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const { register, handleSubmit, formState: { errors }  } = useForm<IFormInput>();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		dispatch(registerUser(data))
			.then((data) => {
				if (data) {
					sessionStorage.setItem('user', JSON.stringify(data.user));
					sessionStorage.setItem('AccessToken', data.accessToken);
					sessionStorage.setItem('RefreshToken', data.refreshToken);
					navigate(`/chat/${data.user.id}`);
				}
			})
			.catch(e => {
				console.error('jsafh',e);
			})
	};

	const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
	};

	const signIn = () => {
		navigate(`/login`);
	}

	
	return (
		<LoginPageBlock>
			<CustomH1>Create your account!</CustomH1>
			<RegistrationForm onSubmit={handleSubmit(onSubmit)}>
				<TextField
					type='text'
          label="Name"
					variant="standard"
					fullWidth
					required
					{...register("name", {maxLength: 25, required: true})}
				/>
				{errors.name && <Error>Name is required!</Error>}
				<TextField
					type='text'
          label="Surname"
					variant="standard"
					fullWidth
					required
					{...register("surname", {maxLength: 25, required: true})}
				/>
				{errors.surname && <Error>Surname is required!</Error>}
				<TextField
					type='email'
          label="Email"
					variant="standard"
					fullWidth
					required
					{...register("email", {pattern: EMAIL_PATTERN, required: true})}
				/>
				{errors.email && <Error>Email is required and should be correct!</Error>}
				<LoginFormControl
					variant="standard"
					fullWidth>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
					<Input
						{...register("password", {required: true})}
            id="standard-adornment-password"
						type={showPassword ? 'text' : 'password'}
						fullWidth
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
				{errors.password && <Error>Password is required and should be correct!</Error>}
				<Button type='submit' variant="outlined">
					Sign up
				</Button>
				OR 
				<Button variant="outlined" onClick={signIn}>
					Sign in
				</Button>
      </RegistrationForm>
		</LoginPageBlock>
	)
}

export default RegistrationPage;