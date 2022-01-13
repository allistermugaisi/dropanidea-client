import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { TextField, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import AdornedButton from '../utils/AdornedButton';
import { registerUser } from '../store/actions/auth-actions';
import '../public/css/Register.css';

const roles = [
	{
		value: 'Normal staff',
		label: 'Normal staff',
	},
	{
		value: 'Business owner',
		label: 'Business owner',
	},
	{
		value: 'Top Level Manager',
		label: 'Top Level Manager',
	},
	{
		value: 'Middle Level Manager',
		label: 'Middle Level Manager',
	},
	{
		value: 'Low Level Manager',
		label: 'Low Level Manager',
	},
];

const Register = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	let auth = useSelector((state) => state.auth);
	let error = useSelector((state) => state.error);

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

	const [selectedRole, setSelectedRole] = useState('Normal staff');

	const handleChange = (event) => {
		setSelectedRole(event.target.value);
	};

	const handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const onSubmit = async (data, e) => {
		e.preventDefault();
		setButtonLoading(true);
		e.preventDefault();
		await dispatch(registerUser(data));
		setButtonLoading(false);
	};

	useEffect(() => {
		if (auth.isAuthenticated) {
			history.push('/');
		}
	}, [auth.isAuthenticated]);

	useEffect(() => {
		// Check for register error
		if (error.id === 'REGISTER_FAIL') {
			setButtonLoading(false);
			toast.error('User already Registered!');
		} else {
			setButtonLoading(false);
		}
	}, [error]);

	return (
		<section className="register-section">
			<div className="register-container">
				<div className="title">
					<div className="logo-container">
						<img
							src="https://res.cloudinary.com/dgisuffs0/image/upload/v1641758237/logoz-trans_2_usrpz6.png"
							className="logo"
							alt=""
						/>
					</div>
					<span>Registration</span>
				</div>
				<div className="content">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="user-details">
							<div className="input-box">
								<TextField
									{...register('name', {
										required: 'Full Name is required!',
										shouldFocus: true,
									})}
									name="name"
									fullWidth
									autoComplete="off"
									label="Full Name"
									placeholder="John Doe"
									error={errors?.name ? true : false}
									helperText={errors?.name?.message}
								/>
							</div>

							<div className="input-box">
								<TextField
									{...register('username', {
										required: 'Username is required!',
										shouldFocus: true,
									})}
									name="username"
									fullWidth
									autoComplete="off"
									label="Username"
									placeholder="mastery"
									error={errors?.username ? true : false}
									helperText={errors?.username?.message}
								/>
							</div>
							<div className="input-box">
								<TextField
									{...register('email', {
										required: 'Email address is required!',
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: 'Invalid email address',
										},
										shouldFocus: true,
									})}
									name="email"
									fullWidth
									autoComplete="off"
									label="Email address"
									placeholder="johndoe@example.com"
									error={errors?.email ? true : false}
									helperText={errors?.email?.message}
								/>
							</div>
							<div className="input-box">
								<TextField
									{...register('role', {
										required: 'Role is required!',
									})}
									fullWidth
									select
									label="User role"
									value={selectedRole}
									onChange={handleChange}
									helperText="Please select your user role"
								>
									{roles.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</div>
							<div className="input-box">
								<TextField
									{...register('password', {
										required: 'Password is required!',
										minLength: {
											value: 8,
											message: 'Password should be atleast 8 characters',
										},
									})}
									fullWidth
									name="password"
									type={showPassword ? 'text' : 'password'}
									label="Password"
									autoComplete="off"
									error={errors?.password ? true : false}
									helperText={errors?.password?.message}
								/>
							</div>
							<div className="input-box">
								<TextField
									{...register('password_confirmation', {
										required: 'Please confirm password!',
										validate: {
											matchesPreviousPassword: (value) => {
												const password = getValues('password');
												return password === value || 'Passwords should match!';
											},
										},
									})}
									fullWidth
									name="password_confirmation"
									type={showPassword ? 'text' : 'password'}
									label="Confirm password"
									autoComplete="off"
									error={errors?.password_confirmation ? true : false}
									helperText={errors?.password_confirmation?.message}
								/>
							</div>
						</div>
						<div className="gender-details">
							<input type="radio" name="gender" id="dot-1" />
							<input type="radio" name="gender" id="dot-2" />
							<input type="radio" name="gender" id="dot-3" />
							<span className="gender-title">Gender</span>
							<div className="category">
								<label htmlFor="dot-1">
									<span className="dot one"></span>
									<span className="gender">Male</span>
								</label>
								<label htmlFor="dot-2">
									<span className="dot two"></span>
									<span className="gender">Female</span>
								</label>
								<label htmlFor="dot-3">
									<span className="dot three"></span>
									<span className="gender">Prefer not to say</span>
								</label>
							</div>
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
							Register
						</AdornedButton>
						<div className="login-link">
							Already have an account? <Link to="/login">Login</Link>
						</div>
					</form>
				</div>
			</div>{' '}
		</section>
	);
};

export default Register;
