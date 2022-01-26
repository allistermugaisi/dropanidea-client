import React, { useState, useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { format } from 'date-fns';
import { getUsers } from '../../store/actions/auth-actions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Users = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	let auth = useSelector((state) => state.auth);

	const [selectedIndex, setSelectedIndex] = useState('');

	useEffect(() => {
		dispatch(getUsers());
	}, []);

	const handleClick = (index) => {
		if (selectedIndex === index) {
			setSelectedIndex('');
		} else {
			setSelectedIndex(index);
		}
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
							<TableCell>Name</TableCell>
							<TableCell align="left">Email Address</TableCell>
							<TableCell align="left">Role</TableCell>
							<TableCell align="left">Gender</TableCell>
							<TableCell align="left">Admin</TableCell>
							<TableCell align="left">Status</TableCell>
							<TableCell align="left">Date Created</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{auth?.users?.length > 0 ? (
							auth?.users?.map((user, index) => {
								const {
									_id,
									name,
									email,
									role,
									gender,
									isAdmin,
									isUserActive,
									psychometricTest,
									createdAt,
								} = user;

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
											<TableCell>{name}</TableCell>
											<TableCell align="left">{email}</TableCell>
											<TableCell align="left">{role}</TableCell>
											<TableCell align="left">{gender}</TableCell>
											<TableCell align="left">
												{isAdmin ? 'true' : 'false'}
											</TableCell>
											<TableCell align="left">
												{isUserActive && 'active'}
											</TableCell>
											<TableCell>
												{format(
													new Date(createdAt),
													"do MMM yyyy, h:mm:ss aaaaa'm'"
												)}
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
																PsychometricTest
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
																	<TableCell>Question</TableCell>
																	<TableCell>Answer</TableCell>
																	<TableCell>Date Created</TableCell>
																</TableRow>
															</TableHead>
															<TableBody>
																{psychometricTest?.map((data, index) => (
																	<TableRow key={index}>
																		<TableCell component="th" scope="row">
																			{data.question}
																		</TableCell>
																		<TableCell>{data.answer}</TableCell>
																		<TableCell sx={{ whiteSpace: 'nowrap' }}>
																			{format(
																				new Date(data.timestamp),
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
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={12}
									style={{ padding: '1rem', textAlign: 'center' }}
								>
									There are no active users
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Users;
