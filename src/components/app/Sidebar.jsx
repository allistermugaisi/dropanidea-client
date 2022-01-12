import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

// import Profile from '../../assets/images/profile.jpg';
// import { logOut } from '../../store/actions/auth';

const Sidebar = ({ toggled, handleDrawerToggle }) => {
	const dispatch = useDispatch();
	const [click, setClick] = useState(false);

	const handleClick = () => setClick(!click);
	// const signOut = () => {
	// 	dispatch(logOut());
	// };
	return (
		<>
			<div className={toggled ? 'sidebar active' : 'sidebar'}>
				<div className="logo_content">
					<div className="logo">
						<img
							src="https://res.cloudinary.com/dgisuffs0/image/upload/v1641758237/logoz-trans_2_usrpz6.png"
							alt=""
							className="logo-img"
						/>
						{/* <i className="bx bxl-c-plus-plus"></i>
						<div className="logo_name">
						</div> */}
					</div>
					<i className="bx bx-menu" onClick={handleDrawerToggle} id="btn"></i>
				</div>
				<ul className="nav_list">
					<li>
						<i className="bx bx-search"></i>
						<input type="text" placeholder="Search..." />
						<span className="tooltip">Search</span>
					</li>
					<li>
						<Link to="/dashboard">
							<i className="bx bx-grid-alt"></i>
							<span className="links_name">Home</span>
						</Link>
						<span className="tooltip">Home</span>
					</li>
					<li>
						<NavLink
							to="/dashboard/users"
							activeclassname="active"
							onClick={handleClick}
						>
							<i className="bx bx-user-circle"></i>
							<span className="links_name">Users</span>
						</NavLink>
						<span className="tooltip">Users</span>
					</li>
					<li>
						<NavLink to="/ideas" activeclassname="active" onClick={handleClick}>
							<i className="bx bx-chat"></i>
							<span className="links_name">Chat</span>
						</NavLink>
						<span className="tooltip">Chat</span>
					</li>
					<li>
						<NavLink
							to="/dashboard/reports"
							activeclassname="active"
							onClick={handleClick}
						>
							{/* <i className="bx bx-cog"></i> */}
							<i className="bx bx-pie-chart-alt-2"></i>
							<span className="links_name">Reports</span>
						</NavLink>
						<span className="tooltip">Reports</span>
					</li>
				</ul>
				<div className="profile_content">
					<div className="profile_dashboard">
						<div className="profile_details">
							<img
								src="https://res.cloudinary.com/yugillc/image/upload/q_auto/v1641770389/chat-app-profile/profile_b1qtok.png"
								alt="profile"
							/>
							<div className="name_job">
								<div className="name">Janet Mbugua</div>
								<div className="job">Top Level Manager</div>
							</div>
						</div>
						<i className="bx bx-log-out" id="log_out"></i>
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
