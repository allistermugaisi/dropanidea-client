import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
	return (
		<div>
			<h2>Complete psychometric test on signup</h2>
			<Link to="dashboard">Proceed to dashboard</Link>
		</div>
	);
};

export default Welcome;
