import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import {
	Box,
	TextField,
	MobileStepper,
	Paper,
	Typography,
	Button,
	MenuItem,
	RadioGroup,
	Radio,
	FormControlLabel,
	FormLabel,
	FormControl,
} from '@mui/material';
import toast from 'react-hot-toast';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import '../public/css/Psychometric.css';

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

const PsychometricTest = () => {
	const token = tokenConfig();
	const theme = useTheme();
	const history = useHistory();
	let auth = useSelector((state) => state.auth);

	const [activeStep, setActiveStep] = useState(0);
	const [selectedValue, setSelectedValue] = useState('');
	const maxSteps = steps.length;

	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		shouldUnregister: true,
		shouldFocusError: true,
	});

	let isTestLength = auth?.user?.current_user?.psychometricTest.length;

	useEffect(() => {
		if (isTestLength >= 5) {
			history.push('/ideas');
		}
	}, [isTestLength]);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const proceed = () => {
		history.push('/');
	};

	const handleChange = async (event) => {
		setSelectedValue(event.target.value);
		const formData = {
			question: event.target.name,
			answer: event.target.value,
		};

		// Request body
		const body = JSON.stringify({
			question: formData.question,
			answer: formData.answer,
		});

		if (
			event.target.name === 'What do you prefer when collecting information?'
		) {
			const response = await axios.post(
				`${ZinniaGlobalConsultancy}/api/v1/auth/psychometric-test`,
				body,
				token
			);

			const data = await response.data;

			if (data) {
				history.push('/ideas');
				toast.success('Thank you for your feedback!');
			}
		} else {
			try {
				const response = await axios.post(
					`${ZinniaGlobalConsultancy}/api/v1/auth/psychometric-test`,
					body,
					token
				);

				const data = await response.data;
				console.log(data);
				if (data) {
					toast.success('Quiz answered successfully!');
					handleNext();
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<section className="psychometric-container">
			<Box sx={{ maxWidth: 500, flexGrow: 1 }}>
				<Paper
					square
					elevation={0}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						height: 50,
						borderTopLeftRadius: 7,
						borderTopRightRadius: 7,
						pl: 2,
						pr: 2,
						bgcolor: 'background.primary',
					}}
				>
					<Typography sx={{ fontSize: 18, fontWeight: 550 }}>
						Psychometric Test
					</Typography>
					<Typography>{steps[activeStep].label}</Typography>
				</Paper>
				<Box
					sx={{
						minHeight: '50vh',
						backgroundColor: '#f3f4f3',
						fontSize: 20,
						maxWidth: 500,
						width: '100%',
						p: 2,
					}}
				>
					<Typography sx={{}}>{steps[activeStep].description}</Typography>
					<FormControl sx={{ pl: 6, mt: 3 }} component="fieldset">
						{steps[activeStep].options.map((option, index) => {
							// console.log(option);
							return (
								<RadioGroup key={index}>
									<FormControlLabel
										key={index}
										checked={selectedValue === option.option}
										value={option.option}
										onChange={handleChange}
										control={<Radio key={index} />}
										name={option.question}
										label={option.option}
									/>
								</RadioGroup>
							);
						})}
					</FormControl>
				</Box>
				<MobileStepper
					variant="text"
					steps={maxSteps}
					position="static"
					sx={{ borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }}
					activeStep={activeStep}
					// nextButton={
					// 	<Button
					// 		size="small"
					// 		onClick={handleNext}
					// 		disabled={activeStep === maxSteps - 1}
					// 	>
					// 		Next
					// 		{theme.direction === 'rtl' ? (
					// 			<KeyboardArrowLeft />
					// 		) : (
					// 			<KeyboardArrowRight />
					// 		)}
					// 	</Button>
					// }
					// backButton={
					// 	<Button
					// 		size="small"
					// 		onClick={handleBack}
					// 		disabled={activeStep === 0}
					// 	>
					// 		{theme.direction === 'rtl' ? (
					// 			<KeyboardArrowRight />
					// 		) : (
					// 			<KeyboardArrowLeft />
					// 		)}
					// 		Back
					// 	</Button>
					// }
				/>
			</Box>
		</section>
	);
};

export default PsychometricTest;

const steps = [
	{
		id: 1,
		label: 'Question 1',
		description: `Who is your role model?`,
		options: [
			{
				option: 'Zucker burger',
				question: `Who is your role model?`,
			},
			{
				option: 'Mwai Kibaki',
				question: `Who is your role model?`,
			},
			{
				option: 'Raila Odinga',
				question: `Who is your role model?`,
			},
			{
				option: 'Kim Kadarshian',
				question: `Who is your role model?`,
			},
			{
				option: 'Martin Luther King Junior',
				question: `Who is your role model?`,
			},
			{
				option: 'Barack Obama',
				question: `Who is your role model?`,
			},
		],
	},
	{
		id: 2,
		label: 'Question 2',
		description: 'Who is the person that knows most of your secrets?',
		options: [
			{
				option: 'No one',
				question: 'Who is the person that knows most of your secrets?',
			},
			{
				option: 'Mother/Father',
				question: 'Who is the person that knows most of your secrets?',
			},
			{
				option: 'Siblings',
				question: 'Who is the person that knows most of your secrets?',
			},
			{
				option: 'A friend',
				question: 'Who is the person that knows most of your secrets?',
			},
			{
				option: 'A Stranger',
				question: 'Who is the person that knows most of your secrets?',
			},
		],
	},
	{
		id: 3,
		label: 'Question 3',
		description: `What would your friends say about you?`,
		options: [
			{
				option: 'Smart',
				question: `What would your friends say about you?`,
			},
			{
				option: 'Kind',
				question: `What would your friends say about you?`,
			},
			{
				option: 'Impulsive',
				question: `What would your friends say about you?`,
			},
			{
				option: 'Quiet',
				question: `What would your friends say about you?`,
			},
			{
				option: 'Reliable',
				question: `What would your friends say about you?`,
			},
			{
				option: 'Bully',
				question: `What would your friends say about you?`,
			},
			{
				option: 'Indifferent',
				question: `What would your friends say about you?`,
			},
			{
				option: 'Relentless',
				question: `What would your friends say about you?`,
			},
			{
				option: 'Ambitious',
				question: `What would your friends say about you?`,
			},
			{
				option: 'Nagging',
				question: `What would your friends say about you?`,
			},
			{
				option: 'Intelligent',
				question: `What would your friends say about you?`,
			},
			{
				option: 'Aggressive',
				question: `What would your friends say about you?`,
			},
		],
	},
	{
		id: 4,
		label: 'Question 4',
		description: `If something in your house breaks, what is the first thing you do?`,
		options: [
			{
				option: 'Try to fix it on my own',
				question: `If something in your house breaks, what is the first thing you do?`,
			},
			{
				option: 'Call a professional',
				question: `If something in your house breaks, what is the first thing you do?`,
			},
			{
				option: 'Call a friend',
				question: `If something in your house breaks, what is the first thing you do?`,
			},
			{
				option: 'Try to ignore it',
				question: `If something in your house breaks, what is the first thing you do?`,
			},
		],
	},
	{
		id: 5,
		label: 'Question 5',
		description: `What is the ritual that helps you calm down?`,
		options: [
			{
				option: 'A warm bath',
				question: `What is the ritual that helps you calm down?`,
			},
			{
				option: 'Talking to a friend',
				question: `What is the ritual that helps you calm down?`,
			},
			{
				option: 'Sports',
				question: `What is the ritual that helps you calm down?`,
			},
			{
				option: 'Work',
				question: `What is the ritual that helps you calm down?`,
			},
			{
				option: 'Praying',
				question: `What is the ritual that helps you calm down?`,
			},
			{
				option: 'Hanging out',
				question: `What is the ritual that helps you calm down?`,
			},
			{
				option: 'Walking outdoor',
				question: `What is the ritual that helps you calm down?`,
			},
			{
				option: 'Watching favorite programs',
				question: `What is the ritual that helps you calm down?`,
			},
			{
				option: 'Listening to music',
				question: `What is the ritual that helps you calm down?`,
			},
		],
	},
	{
		id: 6,
		label: 'Question 6',
		description: `What do you prefer when collecting information?`,
		options: [
			{
				option: 'Reading',
				question: `What do you prefer when collecting information?`,
			},
			{
				option: 'Observing/Watching',
				question: `What do you prefer when collecting information?`,
			},
			{
				option: 'Listening',
				question: `What do you prefer when collecting information?`,
			},
		],
	},
];
