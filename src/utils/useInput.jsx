import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Input(props) {
	const {
		half,
		type,
		name,
		label,
		value,
		error = null,
		onChange,
		helperText,
		autoFocus,
		handleShowPassword,
		...other
	} = props;
	return (
		<TextField
			name={name}
			type={type}
			variant="outlined"
			fullWidth
			autoFocus={autoFocus}
			label={label}
			onChange={onChange}
			InputProps={
				(name === 'password' && {
					endAdornment: (
						<InputAdornment position="start">
							<IconButton onClick={handleShowPassword}>
								{type === 'password' ? (
									<VisibilityOff fontSize="small" />
								) : (
									<Visibility fontSize="small" />
								)}
							</IconButton>
						</InputAdornment>
					),
				}) ||
				(name === 'password_confirmation' && {
					endAdornment: (
						<InputAdornment position="start">
							<IconButton onClick={handleShowPassword}>
								{name === 'password_confirmation' && type === 'password' ? (
									<Visibility fontSize="small" />
								) : (
									<VisibilityOff fontSize="small" />
								)}
							</IconButton>
						</InputAdornment>
					),
				})
			}
			{...other}
			{...(error && { error: true, helperText })}
		/>
	);
}
