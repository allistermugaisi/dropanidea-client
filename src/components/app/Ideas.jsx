import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography,
	Collapse,
	CircularProgress,
	Paper,
	Box,
	Button,
	IconButton,
} from '@mui/material';
import { getAllIdeas } from '../../store/actions/idea-actions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Ideas = () => {
	const dispatch = useDispatch();
	let getIdeas = useSelector((state) => state.idea);

	const [selectedIndex, setSelectedIndex] = useState('');

	useEffect(() => {
		dispatch(getAllIdeas());
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
				paddingTop: '6rem',
				paddingLeft: '1rem',
				paddingRight: '1rem',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<TableContainer component={Paper}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Total Ideas (All)</TableCell>
							<TableCell>Creator</TableCell>
							<TableCell>Level</TableCell>
							<TableCell>Date Created</TableCell>
							<TableCell>Last Update</TableCell>
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
												new Date(createdAt),
												"do MMM yyyy, h:mm:ss aaaaa'm'"
											)}
										</TableCell>
										<TableCell>
											{format(
												new Date(updatedAt),
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
		</div>
	);
};

export default Ideas;
