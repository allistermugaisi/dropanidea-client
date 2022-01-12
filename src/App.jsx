import { Switch, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketProvider';
import './App.css';
import {
	Login,
	Register,
	Welcome,
	Chat,
	Content,
	ContentLanding,
	ChatLanding,
	PsychometricTest,
	Messages,
	PageNotFound,
} from './components';
import PrivateRoute from './middleware/PrivateRoute';
import { Landing } from './components/app';

// null   Anyone can access route
// true   only logged in users can access route
// false  logged in user can't access route

const App = () => {
	const id = Math.random();

	return (
		<SocketProvider id={id}>
			<Switch>
				<PrivateRoute exact path="/" component={Welcome} />
				<PrivateRoute exact path="/dashboard" component={Landing} />
				<PrivateRoute exact path="/dashboard/:id" component={Landing} />
				<PrivateRoute path="/psychometric_test" component={PsychometricTest} />
				<PrivateRoute exact path="/ideas" component={Chat} />
				<PrivateRoute path="/ideas/:ideaId" component={Chat} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="*" component={PageNotFound} />
			</Switch>
		</SocketProvider>
	);
};

export default App;
