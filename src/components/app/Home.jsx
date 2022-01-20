import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {
	Table,
	MenuItem,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Button,
} from '@mui/material';

import '../../public/css/Home.css';

const roles = [
	{
		value: 'Global',
		label: 'Global (All levels)',
	},
	{
		value: 'Normal staff',
		label: 'Normal staff',
	},
	{
		value: 'Business owner',
		label: 'Business owner',
	},
	{
		value: 'Top Level Manager',
		label: 'Top Level Manager',
	},
	{
		value: 'Middle Level Manager',
		label: 'Middle Level Manager',
	},
	{
		value: 'Low Level Manager',
		label: 'Low Level Manager',
	},
];

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
	let reduxStoredUserId = auth?.user?.current_user?._id;
	const dispatch = useDispatch();

	const [ideas, setIdeas] = useState([]);
	const [openPopup, setOpenPopup] = useState(false);
	const [selectedRole, setSelectedRole] = useState('Normal staff');

	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		shouldUnregister: true,
		shouldFocusError: true,
	});

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

	const handleChange = (event) => {
		setSelectedRole(event.target.value);
	};

	const handleClickOpen = () => {
		setOpenPopup(true);
	};

	const handleCloseDialog = () => {
		setOpenPopup(false);
	};

	const onSubmit = async (data, e) => {
		const { title, description } = data;

		try {
			// Headers
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			// Request body
			const body = JSON.stringify({
				title,
				description,
				level: selectedRole,
			});

			const response = await axios.post(
				`${ZinniaGlobalConsultancy}/api/v1/ideas/create`,
				body,
				token
			);

			await response.data;
			toast.success('Idea created successfully!');
			fetchData();
			handleCloseDialog();
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
						<span style={{ cursor: 'pointer' }} onClick={handleClickOpen}>
							Create
						</span>
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
								<TableCell align="center">Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ideas.length > 0 ? (
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
											<TableCell align="left">
												<Button>
													<Link
														style={{ textDecoration: 'none' }}
														to={`/ideas/${_id}`}
													>
														Discuss
													</Link>
												</Button>
											</TableCell>
										</TableRow>
									);
								})
							) : (
								<TableRow>
									<TableCell
										colSpan={12}
										style={{ padding: '1rem', textAlign: 'center' }}
									>
										There are no recent ideas
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TableContainer style={{ marginTop: '1rem' }} component={Paper}>
					<h3 style={{ paddingLeft: '1rem', paddingTop: '1rem' }}>My Ideas</h3>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Title</TableCell>
								<TableCell align="left">Description</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{auth?.user?.current_user?.ideas.length ? (
								auth?.user?.current_user?.ideas?.map((idea) => {
									const { _id, title, description } = idea;
									return (
										<TableRow
											key={_id}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell>{title}</TableCell>
											<TableCell>{description}</TableCell>
										</TableRow>
									);
								})
							) : (
								<TableRow>
									<TableCell
										colSpan={12}
										style={{ padding: '1rem', textAlign: 'center' }}
									>
										You have no ideas
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Contributions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{auth?.user?.current_user?.contributions.length ? (
							auth?.user?.current_user?.contributions?.map((idea) => {
								const { _id, message } = idea;
								return (
									<TableRow
										key={_id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell>{message}</TableCell>
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={12}
									style={{ padding: '1rem', textAlign: 'center' }}
								>
									You have no contributions
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<Dialog open={openPopup} onClose={handleCloseDialog}>
				<DialogTitle>Create an Idea</DialogTitle>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						<DialogContentText style={{ marginBottom: '.8rem' }}>
							Do you have an idea that you want it to be discussed? Please
							proceed and create your idea in the form below.
						</DialogContentText>

						<TextField
							autoFocus
							{...register('title', {
								required: 'Title is required!',
								shouldFocus: true,
							})}
							style={{ marginBottom: '.8rem' }}
							name="title"
							fullWidth
							autoComplete="off"
							label="Title"
							placeholder="Market Strategy"
							error={errors?.title ? true : false}
							helperText={errors?.title?.message}
						/>
						<TextField
							{...register('description', {
								required: 'Description is required!',
								shouldFocus: true,
							})}
							style={{ marginBottom: '.8rem' }}
							name="description"
							fullWidth
							autoComplete="off"
							label="Your description"
							placeholder="Type your description"
							error={errors?.description ? true : false}
							helperText={errors?.description?.message}
						/>
						{reduxStoredUserId === '61e1059af5aab1f746e513b0' && (
							<TextField
								{...register('role', {
									required: 'Role is required!',
								})}
								fullWidth
								select
								label="User role level"
								value={selectedRole}
								onChange={handleChange}
								helperText="Please select user role level"
							>
								{roles.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						)}
						{reduxStoredUserId === '61e0fe34f5aab1f746e513a3' && (
							<TextField
								{...register('role', {
									required: 'Role is required!',
								})}
								fullWidth
								select
								label="User role level"
								value={selectedRole}
								onChange={handleChange}
								helperText="Please select user role level"
							>
								{roles.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						)}
						{reduxStoredUserId === '61e51931339d036aa2404867' && (
							<TextField
								{...register('role', {
									required: 'Role is required!',
								})}
								fullWidth
								select
								label="User role level"
								value={selectedRole}
								onChange={handleChange}
								helperText="Please select user role level"
							>
								{roles.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						)}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDialog}>Cancel</Button>
						<Button type="submit">Create</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
};

export default Home;
