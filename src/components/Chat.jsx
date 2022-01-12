import React, { useState } from 'react';
import { Link, Switch, Route, useParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { Popover, Typography } from '@mui/material';
import { ChatLanding, Messages, ChatRoute } from './index';
import '../public/css/Chat.css';

const Chat = () => {
	let params = useParams();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	// console.log(params.ideaId);

	return (
		<>
			{/* Desktop View */}
			<section className="section-desktop">
				<main className="sidebar-desktop">
					<div className="header-section-desktop">
						<div className="left-arrow">
							<Link to="/dashboard">
								<HomeIcon style={{ cursor: 'pointer', color: '#fff' }} />
							</Link>
						</div>
						<div className="messages-title">Ideas</div>
						<div className="buttons">
							<SearchIcon style={{ cursor: 'pointer', color: '#fff' }} />
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
								<Typography sx={{ p: 1 }}>New idea</Typography>
								<Typography sx={{ p: 1 }}>Settings</Typography>
								<Typography sx={{ p: 1 }}>Log out</Typography>
							</Popover>
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
									Necessitatibus iusto harum neque exercitationem quibusdam
									dolor nostrum autem minima nisi, officia corporis cumque
									distinctio a nobis aspernatur dicta iure tempora. Unde?
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
									Necessitatibus iusto harum neque exercitationem quibusdam
									dolor nostrum autem minima nisi, officia corporis cumque
									distinctio a nobis aspernatur dicta iure tempora. Unde?
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
									Necessitatibus iusto harum neque exercitationem quibusdam
									dolor nostrum autem minima nisi, officia corporis cumque
									distinctio a nobis aspernatur dicta iure tempora. Unde?
								</div>
							</div>
							<div className="date_time-section">
								<div className="date_time">04:30 pm</div>
								<div className="num">18</div>
							</div>
						</Link>
					</div>
				</main>
				<>
					<ChatRoute params={4} />
					{/* {params.ideaId === 'undefined' ? (
						<ChatLanding params={params.ideaId} />
					) : (
						<Messages params={params.ideaId} />
					)} */}
				</>
			</section>
			{/* Mobile View */}
			<main className={params.chatId ? 'no-sidebar-mobile' : 'sidebar-mobile'}>
				<div className="header-section">
					<div className="left-arrow">
						<Link to="/dashboard">
							<HomeIcon style={{ cursor: 'pointer', color: '#fff' }} />
						</Link>
					</div>
					<div className="messages-title">Ideas</div>
					<div className="buttons">
						<SearchIcon style={{ cursor: 'pointer', color: '#fff' }} />
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
							<Typography sx={{ p: 1 }}>New idea</Typography>
							<Typography sx={{ p: 1 }}>Settings</Typography>
							<Typography sx={{ p: 1 }}>Log out</Typography>
						</Popover>
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
		</>
	);
};

export default Chat;
