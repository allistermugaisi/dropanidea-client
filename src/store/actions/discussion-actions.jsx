import axios from 'axios';
import toast from 'react-hot-toast';
import {
	DISCUSSION_LOADING,
	GET_DISCUSSION,
	GET_DISCUSSIONS,
} from '../../constants/types';
import { returnErrors, clearErrors, discussionError } from './error-actions';

const DISCUSSION_URL = 'https://zinniaglobalconsultancy.com/api/v1/discussions';

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

// Get discussions
export const getDiscussions = () => async (dispatch) => {
	const token = tokenConfig();

	try {
		const response = await axios.get(`${DISCUSSION_URL}/all`, token);
		const data = await response.data;

		await dispatch({
			type: GET_DISCUSSIONS,
			payload: data,
		});
		// console.log(data);
	} catch (error) {
		console.log(error.response.data);
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'GET_DISCUSSIONS_FAIL'
			)
		);
		dispatch(discussionError());
	}
};
