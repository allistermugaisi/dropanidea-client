import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../../middleware/PrivateRoute';
import {
	// Sidebar components
	Home,
	Users,
	Reports,
	Ideas,
	Discussions,
} from './index';

const routes = [
	// Sidebar routes
	{
		path: ``,
		exact: true,
		content: () => <Home />,
	},
	{
		path: `users`,
		exact: false,
		content: () => <Users />,
	},
	{
		path: `reports`,
		exact: false,
		content: () => <Reports />,
	},
	{
		path: `ideas_all`,
		exact: false,
		content: () => <Ideas />,
	},
	{
		path: `contributions`,
		exact: false,
		content: () => <Discussions />,
	},
];

const Routes = () => {
	return (
		<>
			{routes.map((route, index) => {
				const { path, exact, content } = route;
				return (
					<PrivateRoute
						key={index}
						path={`/dashboard/${path}`}
						exact={exact}
						component={content}
					/>
				);
			})}
		</>
	);
};

export default Routes;
