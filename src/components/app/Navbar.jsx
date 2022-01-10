import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconButton, Badge, ClickAwayListener } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = ({
	searchToggled,
	handleSearchToggle,
	handleClickAway,
	onClick,
	sidebar,
	open,
}) => {
	const dispatch = useDispatch();
	// const signOut = () => {
	// 	dispatch(logOut());
	// };
	return (
		<>
			<nav className={sidebar ? 'nav active' : 'nav'}>
				<div className={searchToggled ? 'navbar showInput' : 'navbar'}>
					<div className="nav-links">
						<ul className="links">
							<li>
								<Link to="#">Platform</Link>
								<i className="bx bxs-chevron-down js-arrow arrow"></i>
								<ul className="js-sub-menu sub-menu">
									<li>
										<Link to="#">My idea</Link>
									</li>
									<li>
										<Link to="#">Drop an idea</Link>
									</li>
									<li>
										<Link to="#">Most discussed ideas</Link>
									</li>
									<li>
										<Link to="#">Forward idea</Link>
									</li>
									<li>
										<Link to="#">Most rated idea</Link>
									</li>
								</ul>
							</li>
						</ul>
					</div>
					<div className="profile-box">
						<div className="search-box">
							<i
								onClick={handleSearchToggle}
								className={searchToggled ? 'bx bx-x' : 'bx bx-search'}
							></i>
							<div className="input-box">
								<input type="text" placeholder="Search..." />
							</div>
						</div>
						<div className="nav-notification">
							<IconButton>
								<Badge color="secondary" badgeContent="99+" variant="standard">
									<i className="bx bx-bell"></i>
								</Badge>
							</IconButton>
						</div>
						<ClickAwayListener onClickAway={handleClickAway}>
							<div className="menu-container">
								<IconButton onClick={onClick}>
									<SettingsIcon style={{ color: '#fff' }} />
								</IconButton>
								<div className={`menu ${open ? 'active' : 'inactive'}`}>
									<ul>
										<li>
											<Link to="#">Profile</Link>
										</li>
										<li>
											<Link to="#">Settings</Link>
										</li>
									</ul>
								</div>
							</div>
						</ClickAwayListener>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
