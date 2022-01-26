import {
	DISCUSSION_LOADING,
	GET_DISCUSSION,
	GET_DISCUSSIONS,
} from '../../constants/types';

const initialState = {
	isAuthenticated: !!localStorage.getItem('userToken'),
	discussion: null,
	discussions: null,
};

export default function DiscussionReducer(state = initialState, action) {
	switch (action.type) {
		case DISCUSSION_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_DISCUSSION:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				discussion: action.payload,
			};
		case GET_DISCUSSIONS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				discussions: action.payload,
			};
		default:
			return state;
	}
}
