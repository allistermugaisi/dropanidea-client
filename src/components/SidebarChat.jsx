import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
	TextField,
	Popover,
	Typography,
	IconButton,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	Paper,
	Button,
} from '@mui/material';
import { logOut } from '../store/actions/auth-actions';
import { timeFromNow } from '../utils/Utils';

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

const SidebarChat = () => {
	const dispatch = useDispatch();
	const token = tokenConfig();
	let auth = useSelector((state) => state.auth);
	let reduxStoredUserId = auth?.user?.current_user?._id;
	// console.log(userLevel);

	const [openPopup, setOpenPopup] = useState(false);
	const [openPopupInfo, setOpenPopupInfo] = useState(false);

	const [anchorEl, setAnchorEl] = useState(null);
	const [anchorEl2, setAnchorEl2] = useState(null);
	const [data, setData] = useState([]);
	const [currentData, setCurrentData] = useState([]);

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

	const signOut = () => {
		dispatch(logOut());
	};

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response = await axios.get(
			`${ZinniaGlobalConsultancy}/api/v1/ideas`,
			token
		);
		const data = await response.data;
		// console.log(data);
		setData(data);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClick2 = (event) => {
		setAnchorEl2(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClose2 = () => {
		setAnchorEl2(null);
	};

	const open = Boolean(anchorEl);
	const open2 = Boolean(anchorEl2);

	const id = open ? 'simple-popover' : undefined;
	const id2 = open2 ? 'simple-popover' : undefined;

	const handleClickOpen = () => {
		setOpenPopup(true);
	};

	const handleClickOpenInfo = (event, data) => {
		event.preventDefault();
		setOpenPopupInfo(true);
		setCurrentData(data);
	};

	const handleCloseDialog = () => {
		setOpenPopup(false);
	};

	const handleCloseInfoDialog = () => {
		setOpenPopupInfo(false);
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

	const onDelete = async (e, data) => {
		e.preventDefault();
		const { _id } = data;

		try {
			if (_id) {
				const response = await axios.delete(
					`${ZinniaGlobalConsultancy}/api/v1/ideas/${_id}`,
					token
				);

				const data = await response.data;
				toast.error('Idea deleted successfully');
				if (data) {
					setData((state) => state.filter((idea) => idea._id !== _id));
					fetchData();
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{/* Desktop View */}
			<main className="sidebar-desktop">
				<div className="header-section-desktop">
					<div className="left-arrow">
						<Link to="/dashboard">
							<HomeIcon style={{ cursor: 'pointer', color: '#fff' }} />
						</Link>
					</div>
					<div className="messages-title">Ideas</div>
					<div className="buttons">
						<MoreVertIcon
							onClick={handleClick}
							className="icon"
							style={{ color: '#fff', cursor: 'pointer' }}
						/>
						<Popover
							id={id}
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
						>
							<Typography
								onClick={handleClickOpen}
								sx={{ pr: 3, pl: 3, pt: 2, cursor: 'pointer' }}
							>
								New idea
							</Typography>
							<Typography
								onClick={signOut}
								style={{ marginBottom: '1rem' }}
								sx={{ pr: 3, pl: 3, pt: 1, cursor: 'pointer' }}
							>
								Log out
							</Typography>
						</Popover>
					</div>
				</div>
				<div className="inbox-section">
					{data?.length > 0 ? (
						data.map((data) => {
							const { _id, title, description, createdAt, conceptualist } =
								data;
							return (
								<Link key={_id} to={`/ideas/${_id}`} className="message">
									<div className="picture-section">
										<img
											src="https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1642310534/chat_bphqfc.svg"
											alt=""
										/>
									</div>
									<div className="content-section">
										<div className="name">{title}</div>
										<div className="message-content">{description}</div>
									</div>
									<div className="date_time-section">
										<div className="date_time">
											{moment(createdAt).fromNow()}
										</div>
										{/* <div className="num">9</div> */}
										<ArrowDropDownIcon />
										<div className="dropdown-content">
											<Typography
												onClick={(event) => handleClickOpenInfo(event, data)}
												sx={{
													cursor: 'pointer',
												}}
											>
												Info
											</Typography>
											{reduxStoredUserId === conceptualist._id && (
												<Typography
													onClick={(event) => onDelete(event, data)}
													sx={{
														cursor: 'pointer',
													}}
												>
													Delete
												</Typography>
											)}
										</div>
									</div>
								</Link>
							);
						})
					) : (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								paddingTop: '100px',
							}}
						>
							<h3>Ideas Unavailable.</h3>
							<p>Kindly, create an idea to enable discussions</p>
						</div>
					)}
				</div>
			</main>

			{/* Mobile View */}
			<main className="sidebar-mobile">
				<div className="header-section">
					<div className="left-arrow">
						<Link to="/dashboard">
							<HomeIcon style={{ cursor: 'pointer', color: '#fff' }} />
						</Link>
					</div>
					<div className="messages-title">Ideas</div>
					<div className="buttons">
						<MoreVertIcon
							onClick={handleClick2}
							className="icon"
							style={{ color: '#fff', cursor: 'pointer' }}
						/>
						<Popover
							id={id2}
							open={open2}
							anchorEl={anchorEl2}
							onClose={handleClose2}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
						>
							<Typography
								onClick={handleClickOpen}
								sx={{ pr: 2, pl: 2, pt: 1, cursor: 'pointer' }}
							>
								New idea
							</Typography>
							<Typography
								onClick={signOut}
								style={{ marginBottom: '1rem' }}
								sx={{ pr: 2, pl: 2, pt: 1, cursor: 'pointer' }}
							>
								Log out
							</Typography>
						</Popover>
					</div>
				</div>
				<div className="inbox-section">
					{data?.length > 0 ? (
						data.map((data) => {
							const { _id, title, description, createdAt } = data;
							return (
								<Link key={_id} to={`/ideas/${_id}`} className="message">
									<div className="picture-section">
										<img
											src="https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1642310534/chat_bphqfc.svg"
											alt=""
										/>
									</div>
									<div className="content-section">
										<div className="name">{title}</div>
										<div className="message-content">{description}</div>
									</div>
									<div className="date_time-section">
										<div className="date_time">
											{moment(createdAt).fromNow()}
										</div>
										{/* <div className="num"></div> */}
									</div>
								</Link>
							);
						})
					) : (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								paddingTop: '100px',
							}}
						>
							<h3>Ideas Unavailable.</h3>
							<p>Kindly, create an idea to enable discussions</p>
						</div>
					)}
				</div>
			</main>
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
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDialog}>Cancel</Button>
						<Button type="submit">Create</Button>
					</DialogActions>
				</form>
			</Dialog>
			<Dialog open={openPopupInfo} onClose={handleCloseInfoDialog}>
				<DialogTitle>{currentData.title}</DialogTitle>
				<DialogContent>
					<DialogContentText style={{ marginBottom: '.8rem' }}>
						{currentData.description}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseInfoDialog}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default SidebarChat;
