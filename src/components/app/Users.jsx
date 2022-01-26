import React, { useState, useEffect } from 'react';
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
import { getUsers } from '../../store/actions/auth-actions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Users = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	let auth = useSelector((state) => state.auth);

	console.log(auth?.users);

	useEffect(() => {
		dispatch(getUsers());
	}, []);

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
				<h3 style={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
					Active Users
				</h3>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="left">Email Address</TableCell>
							<TableCell align="left">Role</TableCell>
							<TableCell align="left">Gender</TableCell>
							<TableCell align="left">Admin</TableCell>
							<TableCell align="left">Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{auth?.users?.length > 0 ? (
							auth?.users?.map((user) => {
								const {
									_id,
									name,
									email,
									role,
									gender,
									isAdmin,
									isUserActive,
								} = user;

								return (
									<TableRow
										key={_id}
										sx={{
											'&:last-child td, &:last-child th': { border: 0 },
										}}
									>
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
		</div>
	);
};

export default Users;
