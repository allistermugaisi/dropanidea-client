import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Tooltip,
	Typography,
	Collapse,
	CircularProgress,
	MenuItem,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Paper,
	Popover,
	TextField,
	Box,
	Button,
	IconButton,
} from '@mui/material';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import {
	getAllIdeas,
	updateIdea,
	deleteIdea,
} from '../../store/actions/idea-actions';
import MoreVert from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Search from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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

const Ideas = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	let auth = useSelector((state) => state.auth);
	let getIdeas = useSelector((state) => state.idea);

	const [selectedIndex, setSelectedIndex] = useState('');
	const [openPopup, setOpenPopup] = useState(false);
	const [openPopupInfo, setOpenPopupInfo] = useState(false);

	const [currentData, setCurrentData] = useState([]);
	const [selectedRole, setSelectedRole] = useState('Normal staff');

	const {
		register,
		reset,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		shouldUnregister: true,
		shouldFocusError: true,
	});

	useEffect(() => {
		dispatch(getAllIdeas());
	}, []);

	const handleChange = (event) => {
		setSelectedRole(event.target.value);
	};

	const handleClickOpen = (data, e) => {
		e.preventDefault();
		const { title, description, role } = data;
		reset({
			title,
			description,
			role,
		});
		setCurrentData(data);
		setOpenPopup(true);
	};

	const handleClickOpenInfo = (data, e) => {
		e.preventDefault();
		setCurrentData(data);
		setOpenPopupInfo(true);
	};

	const handleCloseDialog = () => {
		setOpenPopup(false);
	};

	const handleCloseInfoDialog = () => {
		setOpenPopupInfo(false);
	};

	const handleClick = (index) => {
		if (selectedIndex === index) {
			setSelectedIndex('');
		} else {
			setSelectedIndex(index);
		}
	};

	// Update an idea
	const onSubmit = async (data, e) => {
		e.preventDefault();

		const { title, description } = data;

		const body = {
			_id: currentData._id,
			title,
			description,
			level: selectedRole,
		};
		dispatch(updateIdea(body));
		handleCloseDialog();
	};

	const onDelete = async (_id, e) => {
		e.preventDefault();
		dispatch(deleteIdea(_id));
		handleCloseDialog();
	};

	return (
		<div
			style={{
				paddingTop: '5rem',
				paddingLeft: '1rem',
				paddingRight: '1rem',
			}}
		>
			<IconButton
				style={{ marginBottom: '.8rem' }}
				onClick={() => history.goBack()}
			>
				<ArrowBackIcon />
			</IconButton>
			<TableContainer component={Paper}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Total Ideas (All)</TableCell>
							<TableCell>Creator</TableCell>
							<TableCell>Level</TableCell>
							<TableCell>Last Update</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{getIdeas?.ideasAll?.map((idea, index) => {
							const {
								_id,
								title,
								level,
								discussions,
								conceptualist,
								createdAt,
								updatedAt,
							} = idea;
							return (
								<Fragment key={_id}>
									<TableRow key={_id}>
										<TableCell>
											<IconButton
												aria-label="expand row"
												size="small"
												onClick={() => handleClick(index)}
											>
												{index === selectedIndex ? (
													<KeyboardArrowUpIcon />
												) : (
													<KeyboardArrowDownIcon />
												)}
											</IconButton>
										</TableCell>
										<TableCell component="th" scope="row">
											{title}
										</TableCell>
										<TableCell component="th" scope="row">
											{conceptualist.name}
										</TableCell>
										<TableCell component="th" scope="row">
											{level}
										</TableCell>
										<TableCell>
											{format(
												new Date(updatedAt),
												"do MMM yyyy, h:mm:ss aaaaa'm'"
											)}
										</TableCell>
										<TableCell>
											<PopupState
												variant="popover"
												popupId="demo-popup-popover"
											>
												{(popupState) => (
													<>
														<IconButton {...bindTrigger(popupState)}>
															<Tooltip
																title="More actions"
																placement="right"
																arrow
															>
																<MoreVert />
															</Tooltip>
														</IconButton>
														<Popover
															{...bindPopover(popupState)}
															anchorOrigin={{
																vertical: 'top',
																horizontal: 'right',
															}}
															transformOrigin={{
																vertical: 'top',
																horizontal: 'right',
															}}
															elevation={1}
														>
															<Typography
																sx={{
																	display: 'flex',
																	flexDirection: 'column',
																	padding: 2,
																}}
															>
																<Link
																	to="#"
																	style={{ textDecoration: 'none' }}
																	onClick={(event) =>
																		handleClickOpenInfo(idea, event)
																	}
																	sx={{ padding: 1 }}
																>
																	View
																</Link>
																<Link
																	to="#"
																	onClick={(event) =>
																		handleClickOpen(idea, event)
																	}
																	style={{ textDecoration: 'none' }}
																	sx={{ padding: 1 }}
																>
																	Edit
																</Link>
																<Link
																	to="#"
																	onClick={(e) => onDelete(_id, e)}
																	style={{ textDecoration: 'none' }}
																	sx={{ padding: 1 }}
																>
																	Delete
																</Link>
															</Typography>
														</Popover>
													</>
												)}
											</PopupState>
										</TableCell>
									</TableRow>
									<TableRow key={index}>
										<TableCell
											style={{ paddingBottom: 0, paddingTop: 0 }}
											colSpan={6}
										>
											<Collapse
												in={index === selectedIndex}
												timeout="auto"
												unmountOnExit
											>
												<Box margin={1}>
													<div
														style={{
															display: 'flex',
															justifyContent: 'space-between',
															marginBottom: '1rem',
														}}
														className="title-actions"
													>
														<Typography
															variant="h6"
															gutterBottom
															component="div"
														>
															Contributions
														</Typography>

														{/* <Button
															size="small"
															variant="contained"
															color="primary"
														>
															Add Material Entry
														</Button> */}
													</div>
													<Table size="medium" aria-label="purchases">
														<TableHead>
															<TableRow>
																<TableCell>Creator</TableCell>
																<TableCell>Message</TableCell>
																<TableCell>Date Created</TableCell>
															</TableRow>
														</TableHead>
														<TableBody>
															{discussions?.map((discussion, index) => (
																<TableRow key={index}>
																	<TableCell component="th" scope="row">
																		{discussion.creator}
																	</TableCell>
																	<TableCell>{discussion.message}</TableCell>
																	<TableCell>
																		{format(
																			new Date(discussion.createdAt),
																			"do MMM yyyy, h:mm:ss aaaaa'm'"
																		)}
																	</TableCell>
																</TableRow>
															))}
														</TableBody>
													</Table>
												</Box>
											</Collapse>
										</TableCell>
									</TableRow>
								</Fragment>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<Dialog open={openPopup} onClose={handleCloseDialog}>
				<DialogTitle>Edit an Idea</DialogTitle>
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
							multiline
							autoComplete="off"
							label="Your description"
							placeholder="Type your description"
							error={errors?.description ? true : false}
							helperText={errors?.description?.message}
						/>
						{auth?.user?.current_user?.isAdmin && (
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
						<Button type="submit">Update</Button>
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
		</div>
	);
};

export default Ideas;
