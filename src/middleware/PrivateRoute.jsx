import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
	let location = useLocation();
	let auth = useSelector((state) => state.auth);

	if (!Component) return null;

	return (
		<Route
			{...rest}
			render={() =>
				auth.isAuthenticated ? (
					<Component {...rest} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
