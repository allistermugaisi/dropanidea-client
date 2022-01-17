import React from 'react';
import '../../public/css/Home.css';

const Home = () => {
	return (
		<div className="project-container">
			<div className="card-content">
				<div className="card-detail">
					<h5 className="card-title">Drop An Idea</h5>
					<div className="card-inner">
						<span>Create</span>
					</div>
				</div>
				<div className="card-detail">
					<h5 className="card-title">My Ideas</h5>
					<div className="card-inner">
						<span>No active ideas</span>
					</div>
				</div>
				<div className="card-detail">
					<h5 className="card-title">Total Ideas</h5>
					<div className="card-inner">
						<span>0</span>
					</div>
				</div>
				<div className="card-detail">
					<h5 className="card-title">Top Ideas</h5>
					<div className="card-inner">
						<span>0</span>
					</div>
				</div>
			</div>
			<div className="conclusive-content">
				<div>
					<div className="cost-analysis">
						<h4>Recent Activities</h4>
					</div>
					<div className="materials-cost-summary">
						<h4>Most Rated Ideas</h4>
					</div>
					<div className="equipment-machinery">
						<h4>Most Discussed Ideas</h4>
					</div>
					<div className="materials-usage-summary">
						<h4>Live Discussions</h4>
					</div>
				</div>
				<div>
					<div className="payment-history">
						<h4>Most Rated Ideas</h4>
					</div>
					<div className="work-schedule">
						<h4>Active Users</h4>
					</div>
					<div className="project-reports">
						<h4>Visualization</h4>
					</div>
					<div className="project-logs">
						<h4>System Logs</h4>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
