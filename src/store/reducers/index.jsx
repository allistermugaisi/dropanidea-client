import { combineReducers } from 'redux';
import auth from './auth-reducer';
import discussion from './discussions-reducer';
import idea from './idea-reducer';
import error from './error-reducer';

const rootReducer = combineReducers({
	auth,
	idea,
	discussion,
	error,
});

export default rootReducer;
