import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../store/actions/auth-actions';
import { Route, Redirect, useLocation } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const location = useLocation();
	const dispatch = useDispatch();

	let currentUser = useSelector((state) => state.auth);

	const getCurrentUser = async () => {
		await dispatch(auth());
	};

	// Check authentication on Page Refresh
	useEffect(() => {
		getCurrentUser();
	}, []);

	if (!Component) return null;

	return (
		<Route
			{...rest}
			render={() =>
				currentUser.isAuthenticated ? (
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
