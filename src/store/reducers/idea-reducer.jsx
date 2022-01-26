import {
	IDEA_LOADING,
	GET_IDEA,
	UPDATE_IDEA,
	DELETE_IDEA,
	GET_IDEAS,
	GET_ALL_IDEAS,
} from '../../constants/types';

const initialState = {
	isAuthenticated: !!localStorage.getItem('userToken'),
	idea: null,
	ideas: null,
	ideasAll: null,
};

export default function IdeaReducer(state = initialState, action) {
	switch (action.type) {
		case IDEA_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_IDEA:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				idea: action.payload,
			};
		case GET_IDEAS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				ideas: action.payload,
			};
		case GET_ALL_IDEAS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				ideasAll: action.payload,
			};
		case DELETE_IDEA:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				ideasAll: state.ideasAll?.filter((idea) => idea._id !== action.payload),
			};
		default:
			return state;
	}
}
