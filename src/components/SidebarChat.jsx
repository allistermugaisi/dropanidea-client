import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
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
	let userLevel = auth?.user?.current_user?.role;
	// console.log(userLevel);

	const [openPopup, setOpenPopup] = useState(false);

	const [anchorEl, setAnchorEl] = useState(null);
	const [data, setData] = useState([]);

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

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const handleClickOpen = () => {
		setOpenPopup(true);
	};

	const handleCloseDialog = () => {
		setOpenPopup(false);
	};

	const onSubmit = async (data, e) => {
		console.log(data);
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
					{data?.length > 0 &&
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
										<div className="date_time">12:30pm</div>
										<div className="num">25</div>
									</div>
								</Link>
							);
						})}
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
							onClick={handleClick}
							className="icon"
							style={{ color: '#fff', cursor: 'pointer' }}
						/>
						{/* <Popover
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
								// onClick={handleClickOpen}
								sx={{ p: 1, cursor: 'pointer' }}
							>
								New idea
							</Typography>
							<Typography sx={{ p: 1, cursor: 'pointer' }}>Log out</Typography>
						</Popover> */}
					</div>
				</div>
				<div className="inbox-section">
					<Link to="/ideas/product_launch" className="message">
						<div className="picture-section">
							<img
								src="https://res.cloudinary.com/yugillc/image/upload/q_auto/v1641770389/chat-app-profile/profile_b1qtok.png"
								alt=""
							/>
						</div>
						<div className="content-section">
							<div className="name">Product Launch</div>
							<div className="message-content">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Necessitatibus iusto harum neque exercitationem quibusdam dolor
								nostrum autem minima nisi, officia corporis cumque distinctio a
								nobis aspernatur dicta iure tempora. Unde?
							</div>
						</div>
						<div className="date_time-section">
							<div className="date_time">12:00 pm</div>
							<div className="num">25</div>
						</div>
					</Link>
					<Link to="/ideas/marketing_survey" className="message">
						<div className="picture-section">
							<img
								src="https://res.cloudinary.com/yugillc/image/upload/q_auto/v1641770389/chat-app-profile/profile_b1qtok.png"
								alt=""
							/>
						</div>
						<div className="content-section">
							<div className="name">Marketing Strategy</div>
							<div className="message-content">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Necessitatibus iusto harum neque exercitationem quibusdam dolor
								nostrum autem minima nisi, officia corporis cumque distinctio a
								nobis aspernatur dicta iure tempora. Unde?
							</div>
						</div>
						<div className="date_time-section">
							<div className="date_time">02:45 am</div>
							<div className="num">8</div>
						</div>
					</Link>
					<Link to="/ideas/brand_awareness" className="message">
						<div className="picture-section">
							<img
								src="https://res.cloudinary.com/yugillc/image/upload/q_auto/v1641770389/chat-app-profile/profile_b1qtok.png"
								alt=""
							/>
						</div>
						<div className="content-section">
							<div className="name">Brand Awareness</div>
							<div className="message-content">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Necessitatibus iusto harum neque exercitationem quibusdam dolor
								nostrum autem minima nisi, officia corporis cumque distinctio a
								nobis aspernatur dicta iure tempora. Unde?
							</div>
						</div>
						<div className="date_time-section">
							<div className="date_time">04:30 pm</div>
							<div className="num">18</div>
						</div>
					</Link>
				</div>
			</main>
			<Dialog open={openPopup} onClose={handleCloseDialog}>
				<DialogTitle>Create an Idea</DialogTitle>
				<DialogContent>
					<DialogContentText style={{ marginBottom: '.8rem' }}>
						Do you have an idea that you want it to be discussed? Please proceed
						and create your idea in the form below.
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
					<Button onClick={handleCloseDialog}>Create</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default SidebarChat;
