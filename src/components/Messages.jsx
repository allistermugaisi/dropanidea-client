import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// import Picker from 'emoji-picker-react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SendIcon from '@mui/icons-material/Send';
import { TextField, Popover, Typography, IconButton } from '@mui/material';
import '../public/css/Messages.css';

const Messages = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [chosenEmoji, setChosenEmoji] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		shouldUnregister: true,
		shouldFocusError: true,
	});

	const onEmojiClick = (event, emojiObject) => {
		setChosenEmoji(emojiObject);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const onSubmit = async (data, e) => {
		e.preventDefault();
		console.log(data);
	};

	return (
		<>
			<div className="container-desktop">
				<div className="chat">
					<div className="chat-header">
						<div className="profile">
							<div className="left">
								<img
									src="https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1641758237/logoz-trans_2_usrpz6.png"
									className="pp"
								/>
								<h2>DropAnIdea</h2>
								<span>active </span>
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
					<div className="chat-box">
						<div className="chat-r">
							<div className="sp"></div>
							<div className="mess mess-r">
								<p>
									{/* <img src="img/emoji-1.png" className="emoji" /> */}
									Hi, Kate
								</p>
								<div className="check">
									<span>4:00 PM</span>
									{/* <img src="img/check-2.png" /> */}
								</div>
							</div>
						</div>
						<div className="chat-l">
							<div className="mess">
								<p>
									Oh! hi
									{/* <img src="img/emoji-2.png" className="emoji" /> */}
								</p>
								<div className="check">
									<span>4:00 PM</span>
								</div>
							</div>
							<div className="sp"></div>
						</div>

						<div className="chat-r">
							<div className="sp"></div>
							<div className="mess mess-r">
								<p>How are you doing?</p>
								<div className="check">
									<span>4:00 PM</span>
									{/* <img src="img/check-2.png" /> */}
								</div>
							</div>
						</div>
						<div className="chat-l">
							<div className="mess">
								<p>I'm doing alright. How about you?</p>
								<div className="check">
									<span>4:00 PM</span>
								</div>
							</div>
							<div className="sp"></div>
						</div>

						<div className="chat-r">
							<div className="sp"></div>
							<div className="mess mess-r">
								<p>Not too bad. The weather is great isn't it?</p>
								<div className="check">
									<span>4:00 PM</span>
									{/* <img src="img/check-2.png" /> */}
								</div>
							</div>
						</div>
						<div className="chat-l">
							<div className="mess">
								<p>Yes. It's absolutely beautiful today.</p>
								<div className="check">
									<span>4:00 PM</span>
								</div>
							</div>
							<div className="sp"></div>
						</div>

						<div className="chat-r">
							<div className="sp"></div>
							<div className="mess mess-r">
								{/* <img src="img/post2.jpg" className="img_chat" /> */}
								<div className="check">
									<span>4:00 PM</span>
									{/* <img src="img/check-2.png" /> */}
								</div>
							</div>
						</div>
						<div className="chat-r">
							<div className="sp"></div>
							<div className="mess mess-r">
								<p>I wish it was like this more frequently.</p>
								<div className="check">
									<span>4:00 PM</span>
									{/* <img src="img/check-2.png" /> */}
								</div>
							</div>
						</div>
						<div className="chat-l">
							<div className="mess">
								<p>
									Me too.
									{/* <img src="img/heart.png" className="emoji" /> */}
								</p>
								<div className="check">
									<span>4:00 PM</span>
								</div>
							</div>
							<div className="sp"></div>
						</div>
						<div className="chat-r">
							<div className="sp"></div>
							<div className="mess mess-r">
								<p>So where are you going now?</p>
								<div className="check">
									<span>4:00 PM</span>
									{/* <img src="img/check-1.png" /> */}
								</div>
							</div>
						</div>
					</div>

					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="chat-footer">
							<IconButton>
								<InsertEmoticonIcon style={{ cursor: 'pointer' }} />
							</IconButton>

							<IconButton>
								<AttachFileIcon
									style={{
										cursor: 'pointer',
									}}
								/>
							</IconButton>
							<TextField
								{...register('message', {
									required: 'Kindly, type your message...',

									shouldFocus: true,
								})}
								fullWidth
								variant="standard"
								id="outlined-multiline-static"
								// multiline
								margin="normal"
								placeholder="Type a message"
								error={errors?.message ? true : false}
								// helperText={errors?.message?.message}
							/>
							<IconButton type="submit">
								<SendIcon />
							</IconButton>
							<IconButton>
								<KeyboardVoiceIcon />
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
								<Link to="/chat">
									<ArrowBackIcon
										className="arrow"
										style={{ color: '#fff', cursor: 'pointer' }}
									/>
								</Link>
								<img
									src="https://res.cloudinary.com/dgisuffs0/image/upload/q_auto/v1641758237/logoz-trans_2_usrpz6.png"
									className="pp"
								/>
								<h2>DropAnIdea</h2>
								<span>active</span>
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
					<div className="chat-box">
						<div className="chat-r">
							<div className="sp"></div>
							<div className="mess mess-r">
								<p>
									{/* <img src="img/emoji-1.png" className="emoji" /> */}
									Hi, Kate
								</p>
								<div className="check">
									<span>4:00 PM</span>
									{/* <img src="img/check-2.png" /> */}
								</div>
							</div>
						</div>
						<div className="chat-l">
							<div className="mess">
								<p>
									Oh! hi
									{/* <img src="img/emoji-2.png" className="emoji" /> */}
								</p>
								<div className="check">
									<span>4:00 PM</span>
								</div>
							</div>
							<div className="sp"></div>
						</div>

						<div className="chat-r">
							<div className="sp"></div>
							<div className="mess mess-r">
								<p>How are you doing?</p>
								<div className="check">
									<span>4:00 PM</span>
									{/* <img src="img/check-2.png" /> */}
								</div>
							</div>
						</div>
						<div className="chat-l">
							<div className="mess">
								<p>I'm doing alright. How about you?</p>
								<div className="check">
									<span>4:00 PM</span>
								</div>
							</div>
							<div className="sp"></div>
						</div>

						<div className="chat-r">
							<div className="sp"></div>
							<div className="mess mess-r">
								<p>Not too bad. The weather is great isn't it?</p>
								<div className="check">
									<span>4:00 PM</span>
									{/* <img src="img/check-2.png" /> */}
								</div>
							</div>
						</div>
						<div className="chat-l">
							<div className="mess">
								<p>Yes. It's absolutely beautiful today.</p>
								<div className="check">
									<span>4:00 PM</span>
								</div>
							</div>
							<div className="sp"></div>
						</div>

						<div className="chat-r">
							<div className="sp"></div>
							<div className="mess mess-r">
								{/* <img src="img/post2.jpg" className="img_chat" /> */}
								<div className="check">
									<span>4:00 PM</span>
									{/* <img src="img/check-2.png" /> */}
								</div>
							</div>
						</div>
						<div className="chat-r">
							<div className="sp"></div>
							<div className="mess mess-r">
								<p>I wish it was like this more frequently.</p>
								<div className="check">
									<span>4:00 PM</span>
									{/* <img src="img/check-2.png" /> */}
								</div>
							</div>
						</div>
						<div className="chat-l">
							<div className="mess">
								<p>
									Me too.
									{/* <img src="img/heart.png" className="emoji" /> */}
								</p>
								<div className="check">
									<span>4:00 PM</span>
								</div>
							</div>
							<div className="sp"></div>
						</div>
						<div className="chat-r">
							<div className="sp"></div>
							<div className="mess mess-r">
								<p>So where are you going now?</p>
								<div className="check">
									<span>4:00 PM</span>
									{/* <img src="img/check-1.png" /> */}
								</div>
							</div>
						</div>
					</div>

					<div className="chat-footer">
						<InsertEmoticonIcon className="emo" style={{ cursor: 'pointer' }} />
						<AttachFileIcon
							className="emo-1"
							style={{
								cursor: 'pointer',
							}}
						/>
						<TextField
							fullWidth
							variant="standard"
							id="outlined-multiline-static"
							multiline
							margin="normal"
							placeholder="Type a message"
						/>
						{/* <div className="icons">
						<PhotoCameraIcon
							style={{ fontSize: '1.5rem', cursor: 'pointer' }}
						/>
					</div> */}
						<IconButton>
							<SendIcon />
						</IconButton>
						<KeyboardVoiceIcon className="mic" />
					</div>
				</div>
			</div>
		</>
	);
};

export default Messages;
