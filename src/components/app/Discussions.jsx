import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
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
import { getDiscussions } from '../../store/actions/discussion-actions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Discussions = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	let discussions = useSelector((state) => state.discussion);

	useEffect(() => {
		dispatch(getDiscussions());
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
					Contributions
				</h3>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Contributor</TableCell>
							<TableCell align="left">Message</TableCell>
							<TableCell align="left">Idea</TableCell>
							<TableCell align="left">Date Created</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{discussions?.discussions?.length > 0 ? (
							discussions?.discussions?.map((discussion) => {
								const { _id, creator, message, idea, createdAt } = discussion;
								return (
									<TableRow
										key={_id}
										sx={{
											'&:last-child td, &:last-child th': { border: 0 },
										}}
									>
										<TableCell>{creator.name}</TableCell>
										<TableCell align="left">{message}</TableCell>
										<TableCell align="left">{idea?.title}</TableCell>
										<TableCell align="left">
											{format(
												new Date(createdAt),
												"do MMM yyyy, h:mm:ss aaaaa'm'"
											)}
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
									There are no recent contributions
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Discussions;
