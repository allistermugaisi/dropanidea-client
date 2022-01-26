import { combineReducers } from 'redux';
import auth from './auth-reducer';
import idea from './idea-reducer';
import error from './error-reducer';

const rootReducer = combineReducers({
	auth,
	idea,
	error,
});

export default rootReducer;
