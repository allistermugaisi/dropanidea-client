import React, { useState, Fragment } from 'react';
import io from 'socket.io-client';
import { Sidebar, Navbar, Routes, Home } from './index';
import '../../public/css/Landing.css';

const socket = io();

const Landing = () => {
	const [toggled, setToggled] = useState(false);
	const [searchToggled, setSearchToggled] = useState(false);
	const [open, setOpen] = useState(false);

	const handleClickAway = () => {
		setOpen(false);
	};

	socket.on('message', (message) => {
		console.log(message);
	});

	const onClick = () => setOpen(!open);

	const handleDrawerToggle = () => {
		setToggled(!toggled);
	};

	const handleSearchToggle = () => {
		setSearchToggled(!searchToggled);
	};

	return (
		<Fragment>
			<Sidebar toggled={toggled} handleDrawerToggle={handleDrawerToggle} />
			<div className="home_content">
				<Navbar
					sidebar={toggled}
					searchToggled={searchToggled}
					handleSearchToggle={handleSearchToggle}
					handleClickAway={handleClickAway}
					open={open}
					onClick={onClick}
				/>
				<Routes />
			</div>
		</Fragment>
	);
};

export default Landing;
