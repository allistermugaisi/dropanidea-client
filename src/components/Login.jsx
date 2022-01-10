import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import AdornedButton from '../utils/AdornedButton';
import '../public/css/Login.css';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);

	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		shouldUnregister: true,
		shouldFocusError: true,
	});

	const handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const onSubmit = async (data, e) => {
		e.preventDefault();
		// setButtonLoading(true);
		// await dispatch(loginUser(data));
	};
	return (
		<section className="login-section">
			<div className="login-container">
				<div className="wrapper">
					<div className="title">
						<div className="logo-container">
							<img
								src="https://res.cloudinary.com/dgisuffs0/image/upload/v1641758237/logoz-trans_2_usrpz6.png"
								className="logo"
								alt=""
							/>
						</div>
						<span>Login</span>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							{...register('email', {
								required: 'Email address is required!',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Invalid email address',
								},
								shouldFocus: true,
							})}
							style={{ marginBottom: '.8rem' }}
							name="email"
							fullWidth
							autoComplete="off"
							label="Email address"
							placeholder="johndoe@example.com"
							error={errors?.email ? true : false}
							helperText={errors?.email?.message}
						/>

						<TextField
							{...register('password', {
								required: 'Password is required!',
								minLength: {
									value: 8,
									message: 'Password should be atleast 8 characters',
								},
							})}
							style={{ marginBottom: '.8rem' }}
							fullWidth
							name="password"
							type={showPassword ? 'text' : 'password'}
							label="Password"
							autoComplete="off"
							error={errors?.password ? true : false}
							helperText={errors?.password?.message}
						/>

						<div className="forgot">
							<a href="#">Forgot password?</a>
						</div>
						<AdornedButton
							fullWidth
							disableElevation
							size="large"
							type="submit"
							color="primary"
							style={{ marginTop: '1rem' }}
							disabled={buttonLoading ? true : false}
							loading={buttonLoading}
							variant="contained"
						>
							Login
						</AdornedButton>
						<div className="signup-link">
							Not a member? <Link to="/register">Create an account</Link>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
