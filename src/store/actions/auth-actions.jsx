import axios from 'axios';
import toast from 'react-hot-toast';
import {
	AUTH_USER,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
} from '../../constants/types';
import {
	returnErrors,
	clearErrors,
	registerFail,
	loginFail,
} from './error-actions';

const USERS_AUTH = 'https://zinniaglobalconsultancy.com/api/v1/auth';

// Setup config headers and token

export const tokenConfig = () => {
	// Get token from localStorage
	const token = localStorage.getItem('token');
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

export const auth = async () => {
	const response = await axios.get(`${USERS_AUTH}/profile`, tokenConfig());
	const data = await response.data;

	return {
		type: AUTH_USER,
		payload: data,
	};
};

// Register User

export const registerUser = (payload) => async (dispatch) => {
	const {
		username,
		name,
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
	} catch (error) {
		dispatch(
			returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL')
		);
		dispatch(registerFail());
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
	}
};

// Logout User
export const logOut = () => (dispatch) => {
	localStorage.removeItem('userToken');
	toast.success('Successfully logged out!');
	dispatch({
		type: LOGOUT_SUCCESS,
	});
};
