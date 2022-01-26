import axios from 'axios';
import toast from 'react-hot-toast';
import {
	IDEA_LOADING,
	GET_IDEA,
	DELETE_IDEA,
	GET_IDEAS,
	GET_ALL_IDEAS,
	UPDATE_IDEA,
} from '../../constants/types';
import {
	returnErrors,
	clearErrors,
	authError,
	ideaError,
} from './error-actions';

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

// Get all ideas
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

// Update idea
export const updateIdea = (payload) => async (dispatch) => {
	const token = tokenConfig();
	const { _id, title, description, level } = payload;
	try {
		// Request body
		const body = JSON.stringify({ title, description, level });

		const response = await axios.put(`${IDEA_URL}/${_id}`, body, token);

		const data = await response.data;
		if (data) {
			toast.success('Idea updated successfully');
			await dispatch({
				type: UPDATE_IDEA,
				payload: data,
			});
			dispatch(getAllIdeas());
		}
	} catch (error) {
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'UPDATE_IDEA_FAIL'
			)
		);
		dispatch(ideaError());
	}
};

// Delete idea
export const deleteIdea = (payloadId) => async (dispatch) => {
	const token = tokenConfig();

	try {
		const response = await axios.delete(`${IDEA_URL}/${payloadId}`, token);

		const data = await response.data;
		if (data) {
			toast.success('Idea deleted successfully');
			await dispatch({
				type: DELETE_IDEA,
				payload: payloadId,
			});
			dispatch(getAllIdeas());
		}
	} catch (error) {
		dispatch(
			returnErrors(
				error.response.data,
				error.response.status,
				'DELETE_IDEA_FAIL'
			)
		);
		dispatch(ideaError());
	}
};
