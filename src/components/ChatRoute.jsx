import React from 'react';
import { Switch } from 'react-router-dom';
import { PrivateRoute } from '../middleware';
import {
	// Sidebar chat ideas components
	Messages,
	ChatLanding,
} from './index';

const routes = [
	// Sidebar routes
	{
		path: `/ideas`,
		exact: true,
		content: () => <ChatLanding />,
	},
	{
		path: `/ideas/:ideaId`,
		exact: false,
		content: () => <Messages />,
	},
];

const ChatRoute = () => {
	return (
		<Switch>
			{routes.map((route, index) => (
				<PrivateRoute
					key={index}
					path={route.path}
					exact={route.exact}
					component={route.content}
				/>
			))}
		</Switch>
	);
};

export default ChatRoute;
