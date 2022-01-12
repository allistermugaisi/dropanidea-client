import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
	// Sidebar chat ideas components
	Messages,
	ChatLanding,
} from './index';

const routes = [
	// Sidebar routes
	{
		path: ``,
		exact: true,
		content: () => <ChatLanding />,
	},
	{
		path: `/:ideaId`,
		exact: true,
		content: () => <Messages />,
	},
];

const ChatRoute = ({ params }) => {
	console.log(params);
	const exact = false;
	return (
		<Switch>
			{params === 1 ? (
				<Route path={``} exact={exact} component={ChatLanding} />
			) : (
				<Route path={``} exact={exact} component={Messages} />
			)}
		</Switch>
	);
};

export default ChatRoute;
