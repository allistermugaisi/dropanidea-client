import axios from 'axios';
import toast from 'react-hot-toast';
import {
	IDEA_LOADING,
	GET_IDEA,
	GET_IDEAS,
	GET_ALL_IDEAS,
	IDEA_ERROR,
} from '../../constants/types';
import {
	returnErrors,
	clearErrors,
	authError,
	ideaError,
} from './error-actions';

const USERS_AUTH = 'https://zinniaglobalconsultancy.com/api/v1/auth';
const IDEA_URL = 'https://zinniaglobalconsultancy.com/api/v1/ideas';

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
		dispatch(clearErrors());
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

export const getAllIdeas = () => async (dispatch) => {
	const token = tokenConfig();

	try {
		const response = await axios.get(`${IDEA_URL}/all`, token);
		const data = await response.data;

		await dispatch({
			type: GET_ALL_IDEAS,
			payload: data,
		});
		dispatch(clearErrors());
	} catch (error) {
		// console.log(error.response.data);
		dispatch(
			returnErrors(error.response.data, error.response.status, 'IDEA_FAIL')
		);
		dispatch(ideaError());
	}
};

// Get ideas based on role level
export const getIdeas = () => async (dispatch) => {
	const token = tokenConfig();

	try {
		const response = await axios.get(`${IDEA_URL}`, token);
		const data = await response.data;

		console.log(data);
		await dispatch({
			type: GET_IDEAS,
			payload: data,
		});
		dispatch(clearErrors());
	} catch (error) {
		// console.log(error.response.data);
		dispatch(
			returnErrors(error.response.data, error.response.status, 'GET_IDEA_FAIL')
		);
		dispatch(ideaError());
	}
};
