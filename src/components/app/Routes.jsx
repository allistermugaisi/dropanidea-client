import React from 'react';
import { Route } from 'react-router-dom';
import {
	// Sidebar components
	Home,
	Users,
	Reports,
} from './index';

const routes = [
	// Sidebar routes
	{
		path: ``,
		exact: true,
		content: () => <Home />,
	},
	{
		path: `/users`,
		exact: false,
		content: () => <Users />,
	},
	{
		path: `/reports`,
		exact: false,
		content: () => <Reports />,
	},
];

const Routes = () => {
	return (
		<>
			{routes.map((route, index) => {
				const { path, exact, content } = route;
				return (
					<Route
						key={index}
						path={`${path}`}
						exact={exact}
						component={content}
					/>
				);
			})}
		</>
	);
};

export default Routes;
