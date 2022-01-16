// import React, { useState } from 'react';
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogTitle,
// 	Typography,
// 	Grow,
// 	IconButton,
// } from '@mui/material';
// import { Close } from '@mui/icons-material';

// const Transition = React.forwardRef(function Transition(props, ref) {
// 	return <Grow direction="up" ref={ref} {...props} />;
// });

// export default function Popup(props) {
// 	const [fullWidth] = useState(true);
// 	const { title, children, openPopup, setOpenPopup } = props;

// 	return (
// 		<Dialog
// 			open={openPopup}
// 			maxWidth="xs"
// 			fullWidth={fullWidth}
// 			TransitionComponent={Transition}
// 			transitionDuration={300}
// 		>
// 			<DialogTitle>
// 				<div style={{ display: 'flex' }}>
// 					<Typography variant="h6" component="div">
// 						{title}
// 					</Typography>
// 					{setOpenPopup ? (
// 						<IconButton aria-label="close" onClick={() => setOpenPopup(false)}>
// 							<Close />
// 						</IconButton>
// 					) : null}
// 				</div>
// 			</DialogTitle>
// 			<DialogContent dividers>{children}</DialogContent>
// 		</Dialog>
// 	);
// }
