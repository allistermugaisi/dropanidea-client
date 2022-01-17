import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';

import '../../public/css/Home.css';

const ZinniaGlobalConsultancy = 'https://zinniaglobalconsultancy.com';

const tokenConfig = () => {
	// Get token from localStorage
	const token = localStorage.getItem('userToken');
	// console.log(token);

	// Headers
	const config = {
		headers: {
			'content-Type': 'application/json',
		},
	};

	// if token, add to headers
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
};

const Home = () => {
	const token = tokenConfig();
	let auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const [ideas, setIdeas] = useState([]);

	// console.log(auth?.user?.current_user?.ideas.length);

	useEffect(() => {
		fetchIdeas();
	}, []);

	const fetchIdeas = async () => {
		try {
			const response = await axios.get(
				`https://zinniaglobalconsultancy.com/api/v1/ideas`,
				token
			);
			const data = await response.data;

			if (data) {
				setIdeas(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
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
						<span>{auth?.user?.current_user?.ideas.length}</span>
					</div>
				</div>
				<div className="card-detail">
					<h5 className="card-title">Total Ideas</h5>
					<div className="card-inner">
						<span>{ideas.length}</span>
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
				<TableContainer component={Paper}>
					<h3 style={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
						Recent Ideas
					</h3>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Title</TableCell>
								<TableCell align="left">Description</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ideas.length > 0 &&
								ideas.map((idea) => {
									const { _id, title, description } = idea;

									return (
										<TableRow
											key={_id}
											sx={{
												'&:last-child td, &:last-child th': { border: 0 },
											}}
										>
											<TableCell>{title}</TableCell>
											<TableCell align="left">{description}</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TableContainer style={{ marginTop: '1rem' }} component={Paper}>
					<h3 style={{ paddingLeft: '1rem', paddingTop: '1rem' }}>My Ideas</h3>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Title</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell>Market Strategy</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				{/* <div className="equipment-machinery">
						<h4>Most Discussed Ideas</h4>
					</div>
					<div className="materials-usage-summary">
						<h4>Live Discussions</h4>
					</div> */}

				{/* <div>
					<div className="payment-history">
						<h4>My Ideas</h4>
						
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
				</div> */}
			</div>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Contributions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell>Market Strategy</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Home;
