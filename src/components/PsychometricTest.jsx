import React, { useState } from 'react';
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

const PsychometricTest = () => {
	const theme = useTheme();
	const history = useHistory();
	const [activeStep, setActiveStep] = useState(0);
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

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const approval = () => {
		toast.success('kindly await approval for your feedback!');
	};

	const proceed = () => {
		history.push('/');
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
										{...register('gender')}
										value={option}
										control={<Radio key={index} onClick={approval} />}
										name="gender"
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
					nextButton={
						<Button
							size="small"
							onClick={handleNext}
							disabled={activeStep === maxSteps - 1}
						>
							Next
							{theme.direction === 'rtl' ? (
								<KeyboardArrowLeft />
							) : (
								<KeyboardArrowRight />
							)}
						</Button>
					}
					backButton={
						<Button
							size="small"
							onClick={handleBack}
							disabled={activeStep === 0}
						>
							{theme.direction === 'rtl' ? (
								<KeyboardArrowRight />
							) : (
								<KeyboardArrowLeft />
							)}
							Back
						</Button>
					}
				/>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Button
						sx={{
							backgroundColor: '#fff',
							mt: 1,
						}}
						size="large"
						onClick={proceed}
					>
						Continue
					</Button>
				</Box>
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
			},
			{
				option: 'Mwai Kibaki',
			},
			{
				option: 'Raila Odinga',
			},
			{
				option: 'Kim Kadarshian',
			},
			{
				option: 'Martin Luther King Junior',
			},
			{
				option: 'Barack Obama',
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
			},
			{
				option: 'Mother/Father',
			},
			{
				option: 'Siblings',
			},
			{
				option: 'A friend',
			},
			{
				option: 'A Stranger',
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
			},
			{
				option: 'Kind',
			},
			{
				option: 'Impulsive',
			},
			{
				option: 'Quiet',
			},
			{
				option: 'Reliable',
			},
			{
				option: 'Bully',
			},
			{
				option: 'Indifferent',
			},
			{
				option: 'Relentless',
			},
			{
				option: 'Ambitious',
			},
			{
				option: 'Nagging',
			},
			{
				option: 'Intelligent',
			},
			{
				option: 'Aggressive',
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
			},
			{
				option: 'Call a professional',
			},
			{
				option: 'Call a friend',
			},
			{
				option: 'Try to ignore it',
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
			},
			{
				option: 'Talking to a friend',
			},
			{
				option: 'Sports',
			},
			{
				option: 'Work',
			},
			{
				option: 'Praying',
			},
			{
				option: 'Hanging out',
			},
			{
				option: 'Walking outdorr',
			},
			{
				option: 'Watching favorite programs',
			},
			{
				option: 'Listening to music',
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
			},
			{
				option: 'Observing/Watching',
			},
			{
				option: 'Listening',
			},
		],
	},
];
