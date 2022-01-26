import axios from 'axios';
import toast from 'react-hot-toast';
import {
	AUTH_USER,
	GET_USERS,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	RESET_PASSWORD_SUCCESS,
} from '../../constants/types';
import {
	returnErrors,
	clearErrors,
	registerFail,
	loginFail,
	usersError,
	authError,
} from './error-actions';

const USERS_AUTH = 'https://zinniaglobalconsultancy.com/api/v1/auth';

// Setup config headers and token

export const tokenConfig = () => {
	// Get token from localStorage
	const token = localStorage.getItem('userToken');
	// console.log(token);

	// Headers
	const config = {
		headers: {
			'content-Type': 'application/json',
		},
	};

	// if token, add to headers
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
};

// Check token and Auth user
export const auth = () => async (dispatch) => {
	const token = tokenConfig();
	try {
		const response = await axios.get(`${USERS_AUTH}/profile`, token);
		const data = await response.data;
		// console.log(data);

		await dispatch({
			type: AUTH_USER,
			payload: data,
		});
	} catch (error) {
		// console.log(error.response.data);
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'AUTHENTICATION_FAIL'
			)
		);
		dispatch(authError());
		localStorage.removeItem('userToken');
	}
};

// Get users
export const getUsers = () => async (dispatch) => {
	const token = tokenConfig();
	try {
		const response = await axios.get(`${USERS_AUTH}/users`, token);
		const data = await response.data;

		await dispatch({
			type: GET_USERS,
			payload: data,
		});
	} catch (error) {
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_USERS_FAIL')
		);
		dispatch(usersError());
	}
};

// Register User
export const registerUser = (payload) => async (dispatch) => {
	const {
		username,
		name,
		company_name,
		email,
		gender,
		role,
		password,
		password_confirmation,
	} = payload;

	try {
		// Headers
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// Request body
		const body = JSON.stringify({
			username,
			name,
			company_name,
			email,
			gender,
			role,
			password,
			password_confirmation,
		});

		const response = await axios.post(`${USERS_AUTH}/signup`, body, config);
		const data = await response.data;

		if (data) {
			await dispatch({
				type: REGISTER_SUCCESS,
				payload: data,
			});
			toast.success('You are now registered successfully!');
			toast.success('Kindly await your Psychometric Test!');
		}
		dispatch(clearErrors());
	} catch (error) {
		dispatch(
			returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL')
		);
		dispatch(registerFail());
		localStorage.removeItem('userToken');
	}
};

// Login User
export const loginUser = (payload) => async (dispatch) => {
	const { email, password } = payload;

	try {
		// Headers
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// Request body
		const body = JSON.stringify({ email, password });

		const response = await axios.post(`${USERS_AUTH}/signin`, body, config);

		const data = await response.data;

		if (data) {
			await dispatch({
				type: LOGIN_SUCCESS,
				payload: data,
			});
			localStorage.setItem('userToken', data.token);
			toast.success('Successfully logged in!');
		}
		dispatch(clearErrors());
	} catch (error) {
		dispatch(
			returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL')
		);
		dispatch(loginFail());
		localStorage.removeItem('userToken');
	}
};

// Logout User
export const logOut = () => (dispatch) => {
	localStorage.removeItem('userToken');
	toast.success('Successfully logged out!');
	dispatch(clearErrors());
	dispatch({
		type: LOGOUT_SUCCESS,
	});
};

// Forgot password
export const forgotPassword = (payload) => async (dispatch) => {
	const { email, new_password } = payload;
	// console.log(payload);

	try {
		// Headers
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// Request body
		const body = JSON.stringify({ email, new_password });

		const response = await axios.put(
			`${USERS_AUTH}/forgot-password`,
			body,
			config
		);

		const data = await response.data;
		// console.log(data);

		if (data) {
			await dispatch({
				type: RESET_PASSWORD_SUCCESS,
				payload: data,
			});
			toast.success('Password reset successfully!');
		}
		dispatch(clearErrors());
	} catch (error) {
		dispatch(
			returnErrors(error.response.data, error.response.status, 'RESET_FAIL')
		);
		localStorage.removeItem('userToken');
	}
};
