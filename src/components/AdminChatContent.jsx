import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import moment from 'moment';
import toast from 'react-hot-toast';

import InputEmoji from 'react-input-emoji';
import useMutationObserver from '@rooks/use-mutation-observer';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SendIcon from '@mui/icons-material/Send';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ReplyIcon from '@mui/icons-material/Reply';
import CloseIcon from '@mui/icons-material/Close';
import {
	TextField,
	Popover,
	Typography,
	IconButton,
	Tooltip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	Paper,
	Button,
} from '@mui/material';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import '../public/css/Messages.css';

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

const AdminChatContent = () => {
	let auth = useSelector((state) => state.auth);
	let reduxStoredUserId = auth?.user?.current_user?._id;

	const token = tokenConfig();
	const { ideaId } = useParams();
	const messageRef = useRef();
	const valueRef = useRef('');

	const [anchorEl, setAnchorEl] = useState(null);
	const [anchorEl2, setAnchorEl2] = useState(null);

	const [roomName, setRoomName] = useState('');
	const [isIdeaActive, setIsIdeaActive] = useState(false);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');
	const [showEmojis, setShowEmojis] = useState(false);
	const [replyActive, setReplyActive] = useState(false);
	const [currentReplyMessage, setCurrentReplyMessage] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		shouldUnregister: true,
		shouldFocusError: true,
	});

	useMutationObserver(messageRef, () => {
		messageRef.current.scrollTop = messageRef.current.scrollHeight;
	});

	useEffect(() => {
		fetchDiscussions();
	}, [ideaId]);

	const fetchDiscussions = async () => {
		if (ideaId) {
			const response = await axios.get(
				`${ZinniaGlobalConsultancy}/api/v1/ideas/${ideaId}`,
				token
			);
			const data = await response.data;

			// console.log(data[0]?.discussions[creator]);
			setRoomName(data[0]?.title);
			setIsIdeaActive(data[0]?.isIdeaActive);
			if (data) {
				// console.log(data[0].discussions);
				setMessages(data[0].discussions);
			}
		}
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const replyMessage = (message, e) => {
		e.preventDefault();
		setCurrentReplyMessage(message);
		setReplyActive(true);
	};

	const closeReply = () => {
		setReplyActive(false);
		setCurrentReplyMessage('');
	};

	const sendValue = async () => {
		if (valueRef.current.value === '')
			return toast.error('Please type a message');

		const message = valueRef.current.value;
		try {
			if (ideaId) {
				// Request body
				const body = JSON.stringify({
					message,
					ideaId,
					replies: currentReplyMessage,
					tags: '',
					selectedFile: '',
					photoURL: '',
				});

				const response = await axios.post(
					`${ZinniaGlobalConsultancy}/api/v1/discussions/create`,
					body,
					token
				);

				const data = await response.data;

				setInput('');
				closeReply();
				if (data) {
					fetchDiscussions();
					toast.success(`${message}`);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Add emoji to TextField value
	const addEmoji = (e) => {
		let sym = e.unified.split('-');
		let codesArray = [];
		sym.forEach((el) => codesArray.push('0x' + el));
		let emoji = String.fromCodePoint(...codesArray);
		setInput(input + emoji);
	};

	const onDelete = async (_id, e) => {
		e.preventDefault();

		try {
			if (_id) {
				const response = await axios.delete(
					`${ZinniaGlobalConsultancy}/api/v1/discussions/${_id}`,
					token
				);

				const data = await response.data;
				toast.error('Message deleted successfully');
				if (data) {
					setMessages((state) =>
						state.filter((message) => message._id !== _id)
					);
					fetchDiscussions();
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	// console.log(userId);
	// console.log(reduxStoredUserId);

	return (
		<>
			<div className="container-admin-desktop">
				<div className="chat">
					<div className="chat-header">
						<div className="profile">
							<div className="left">
								<Link to="/dashboard/ideas_all">
									<ArrowBackIcon
										className="arrow"
										style={{ color: '#fff', cursor: 'pointer' }}
									/>
								</Link>
								<img
									src="https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1641758237/logoz-trans_2_usrpz6.png"
									className="pp"
								/>
								<h2>{roomName}</h2>
								<span>{isIdeaActive ? 'active' : 'inactive'}</span>
							</div>
							<div className="right">
								<VideocamIcon
									className="icon"
									style={{ color: '#fff', cursor: 'pointer' }}
								/>
								<PhoneIcon
									className="icon"
									style={{ color: '#fff', cursor: 'pointer' }}
								/>
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
									<Typography sx={{ p: 1 }}>Chat info</Typography>
									<Typography sx={{ p: 1 }}>Select messages</Typography>
									<Typography sx={{ p: 1 }}>Search</Typography>
									<Typography sx={{ p: 1 }}>Report</Typography>
									<Typography sx={{ p: 1 }}>Close chat</Typography>
								</Popover>
							</div>
						</div>
					</div>
					<div className="chat-box" ref={messageRef}>
						{messages.length > 0 ? (
							messages.map((item) => {
								const { _id, message, creator, replies, createdAt } = item;
								return (
									<div key={_id}>
										{creator === reduxStoredUserId ? (
											<div className="chat-r" key={_id}>
												<div className="sp"></div>
												<div className="mess mess-r">
													{replies[0] && (
														<div className="reply-info-right">{replies[0]}</div>
													)}
													<p>{message}</p>
													<div className="check">
														<span>{moment(createdAt).fromNow()}</span>
														{creator === reduxStoredUserId && (
															<>
																<ArrowDropDownIcon />
																<div className="dropdown-content-right">
																	<Typography
																		onClick={(event) =>
																			replyMessage(message, event)
																		}
																		sx={{
																			cursor: 'pointer',
																		}}
																	>
																		Reply
																	</Typography>
																	<Typography
																		onClick={(event) => onDelete(_id, event)}
																		sx={{
																			cursor: 'pointer',
																		}}
																	>
																		Delete
																	</Typography>
																</div>
															</>
														)}
													</div>
												</div>
											</div>
										) : (
											<div className="chat-l" key={_id}>
												<div className="mess">
													{replies[0] && (
														<div className="reply-info-left">{replies[0]}</div>
													)}
													<p>{message}</p>
													<div className="check">
														<span>{moment(createdAt).fromNow()}</span>
														<ArrowDropDownIcon />
														<div className="dropdown-content">
															<Typography
																onClick={(event) =>
																	replyMessage(message, event)
																}
																sx={{
																	cursor: 'pointer',
																}}
															>
																Reply
															</Typography>
														</div>
													</div>
												</div>
												<div className="sp"></div>
											</div>
										)}
									</div>
								);
							})
						) : (
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									paddingTop: '150px',
								}}
							>
								<h2>No Discussions available</h2>
							</div>
						)}

						{/* <div className="chat-r">
							<div className="sp"></div>
							<div className="mess mess-r">
								<img
									src="https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1641287485/http_3A_2F_2Fcdn.cnn.com_2Fcnnnext_2Fdam_2Fassets_2F210316172018-03-asian-americans-beauty-industry-restricted_hqy1xe.jpg"
									className="img_chat"
								/>
								<div className="check">
									<span>4:00 PM</span>
									<img src="" />
								</div>
							</div>
						</div> */}
					</div>
					{showEmojis && (
						<div>
							<Picker onSelect={addEmoji} />
						</div>
					)}

					<form noValidate autoComplete="off">
						<div
							className={
								replyActive ? 'reply-container' : 'reply-container-none'
							}
						>
							<div className="icon-inner">
								<ReplyIcon />
							</div>
							<div className="reply-inner">{currentReplyMessage}</div>
							<div className="icon-inner-right">
								<IconButton onClick={closeReply}>
									<CloseIcon />
								</IconButton>
							</div>
						</div>
						<div className="chat-footer">
							<IconButton>
								<KeyboardVoiceIcon />
							</IconButton>
							<IconButton onClick={() => setShowEmojis(!showEmojis)}>
								<InsertEmoticonIcon style={{ cursor: 'pointer' }} />
							</IconButton>
							<TextField
								onKeyPress={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault();
										sendValue();
									}
								}}
								value={input || ''} // to avoid warnings
								onChange={(e) => setInput(e.target.value)}
								fullWidth
								variant="standard"
								id="outlined-multiline-static"
								// multiline
								margin="normal"
								placeholder="Type a message"
								inputRef={valueRef}
							/>
							<IconButton onClick={sendValue}>
								<SendIcon />
							</IconButton>
						</div>
					</form>
				</div>
			</div>

			<div className="container-mobile">
				<div className="chat">
					<div className="chat-header">
						<div className="profile">
							<div className="left">
								<Link to="/ideas">
									<ArrowBackIcon
										className="arrow"
										style={{ color: '#fff', cursor: 'pointer' }}
									/>
								</Link>
								<img
									src="https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1641758237/logoz-trans_2_usrpz6.png"
									className="pp"
								/>
								<h2>{roomName}</h2>
								<span>{isIdeaActive ? 'active' : 'inactive'}</span>
							</div>
							<div className="right">
								<VideocamIcon
									className="icon"
									style={{ color: '#fff', cursor: 'pointer' }}
								/>
								<PhoneIcon
									className="icon"
									style={{ color: '#fff', cursor: 'pointer' }}
								/>
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
									<Typography sx={{ pr: 3, pl: 3, pt: 2, cursor: 'pointer' }}>
										Chat info
									</Typography>
									<Typography sx={{ pr: 3, pl: 3, pt: 2, cursor: 'pointer' }}>
										Select messages
									</Typography>
									<Typography sx={{ pr: 3, pl: 3, pt: 2, cursor: 'pointer' }}>
										Search
									</Typography>
									<Typography sx={{ pr: 3, pl: 3, pt: 2, cursor: 'pointer' }}>
										Report
									</Typography>
									<Typography
										style={{ marginBottom: '1rem' }}
										sx={{ pr: 3, pl: 3, pt: 2, cursor: 'pointer' }}
									>
										Close chat
									</Typography>
								</Popover>
							</div>
						</div>
					</div>
					<div className="chat-box">
						{messages.length > 0 ? (
							messages.map((item) => {
								const { _id, message, creator, replies, createdAt } = item;
								return (
									<Fragment key={_id}>
										{creator === reduxStoredUserId ? (
											<div className="chat-r">
												<div className="sp"></div>
												<div className="mess mess-r">
													{replies[0] && (
														<div className="reply-info-right">{replies[0]}</div>
													)}
													<p>{message}</p>
													<div className="check">
														<span>{moment(createdAt).fromNow()}</span>
														{creator === reduxStoredUserId && (
															<>
																<ArrowDropDownIcon />
																<div className="dropdown-content-right">
																	<Typography
																		onClick={(event) =>
																			replyMessage(message, event)
																		}
																		sx={{
																			cursor: 'pointer',
																		}}
																	>
																		Reply
																	</Typography>
																	<Typography
																		onClick={(event) => onDelete(_id, event)}
																		sx={{
																			cursor: 'pointer',
																		}}
																	>
																		Delete
																	</Typography>
																</div>
															</>
														)}
													</div>
												</div>
											</div>
										) : (
											<div className="chat-l">
												<div className="mess">
													{replies[0] && (
														<div className="reply-info-left">{replies[0]}</div>
													)}
													<p>{message}</p>
													<div className="check">
														<span>{moment(createdAt).fromNow()}</span>
														<ArrowDropDownIcon />
														<div className="dropdown-content">
															<Typography
																onClick={(event) =>
																	replyMessage(message, event)
																}
																sx={{
																	cursor: 'pointer',
																}}
															>
																Reply
															</Typography>
														</div>
													</div>
												</div>
												<div className="sp"></div>
											</div>
										)}
									</Fragment>
								);
							})
						) : (
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									paddingTop: '150px',
								}}
							>
								<h2>No Discussions available</h2>
							</div>
						)}
					</div>

					{showEmojis && (
						<div>
							<Picker onSelect={addEmoji} />
						</div>
					)}

					<form noValidate autoComplete="off">
						<div
							className={
								replyActive ? 'reply-container' : 'reply-container-none'
							}
						>
							<div className="icon-inner">
								<ReplyIcon />
							</div>
							<div className="reply-inner">{currentReplyMessage}</div>
							<div className="icon-inner-right">
								<IconButton onClick={closeReply}>
									<CloseIcon />
								</IconButton>
							</div>
						</div>
						<div className="chat-footer">
							<IconButton>
								<KeyboardVoiceIcon />
							</IconButton>
							<IconButton onClick={() => setShowEmojis(!showEmojis)}>
								<InsertEmoticonIcon style={{ cursor: 'pointer' }} />
							</IconButton>
							<TextField
								onKeyPress={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault();
										sendValue();
									}
								}}
								value={input || ''} // to avoid warnings
								onChange={(e) => setInput(e.target.value)}
								fullWidth
								variant="standard"
								id="outlined-multiline-static"
								// multiline
								margin="normal"
								placeholder="Type a message"
								inputRef={valueRef}
							/>
							<IconButton onClick={sendValue}>
								<SendIcon />
							</IconButton>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AdminChatContent;
