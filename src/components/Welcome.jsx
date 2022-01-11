import React from 'react';
import { Link } from 'react-router-dom';
import '../public/css/Welcome.css';

const Welcome = () => {
	return (
		<div className="welcome-container">
			<div className="logo-welcome-container">
				<img
					src="https://res.cloudinary.com/yugillc/image/upload/q_auto/v1641840407/logoz-trans_2_uuslx1.png"
					className="logo-land"
					alt=""
				/>
			</div>
			<div className="btn-container">
				<Link to="dashboard" className="btn-landing">
					Continue
				</Link>
			</div>
		</div>
	);
};

export default Welcome;
