import { Button, Checkbox, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import boyWithRocketLight from "../util/images/boyWithRocketLight.png";
import loginIcon from "../util/images/loginIcon.svg";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { Link, useNavigate } from 'react-router-dom';
import { Login } from '../services/apiServices/authServices';
import { ErrorType } from '../types/Errors';
import { useMutation } from '@tanstack/react-query';
import Loading from '../components/comman/Loading';
import { useToast } from '@/components/ui/use-toast';

const Loginpage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [checked, setChecked] = useState(false);

	const navigate = useNavigate();
	const { toast } = useToast();

	const { mutate: login_user, isPending: loginPanding } = useMutation({
		mutationFn: Login,
		onSuccess: (data) => {
			const user = data.data.data.query;
			console.log(user, data)
			localStorage.setItem("token", data.data.data.access_token);
			navigate("/dashboard");
			// toast.success("Login successful")
			toast({ title: "Login successful" });
		},
		onError: (error: ErrorType) => {
			toast({
				variant: "destructive",
				title: error.data.message,
			});
		},
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			email: Yup.string().email('please enter valid email').required('please enter email'),
			password: Yup.string()
				.required('Please enter a password')
				.min(6, 'Password must be at least 6 characters')
				.matches(
					/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
					'Password must contain at least one uppercase letter, one lowercase letter, and one number'
				),
		}),
		onSubmit: async (values) => {
			try {
				login_user(values)
			} catch (error) {
				console.error('Error:', error);
			}
		},
	});

	const handleClickShowPassword = () => {
		setShowPassword(prev => !prev);
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};


	return (
		<div className='flex w-full mx-auto h-screen'>
			<div className='bg-[#F5F5F9] w-2/3 hidden justify-center xl:flex'>
				<img src={boyWithRocketLight} alt="login poster" className='object-cover h-screen' />
			</div>

			<div className='flex flex-col items-center justify-center xl:w-1/3 w-full mx-3'>
				<div className='max-w-[400px]'>
					<div className='flex gap-2 text-2xl font-bold text-gray-600 mb-8'>
						<img src={loginIcon} alt="icon" />
						<h1 className='text-[#32475CDE]'>Decent store</h1>
					</div>
					<h2 className='text-lg font- text-gray-600 mb-[6px]'>Welcome to Decent store! 👋🏻
					</h2>
					<p className='text-gray-500 mb-6 max-w[380px]'>Please sign-in to your account and start the adventure
					</p>
					<form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
						<TextField
							id="outlined-basic"
							label="Email"
							variant="outlined"
							size='medium'
							className='text-gray-500 '
							fullWidth
							{...formik.getFieldProps('email')}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
						/>
						<TextField
							className="text-gray-500"
							label="Password"
							type={showPassword ? "text" : "password"}
							variant="outlined"
							size="medium"
							required
							fullWidth
							{...formik.getFieldProps('password')}
							error={formik.touched.password && Boolean(formik.errors.password)}
							helperText={formik.touched.password && formik.errors.password}
							InputProps={{
								endAdornment: <InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff sx={{ color: "#2D2D2D", opacity: 0.7, fontSize: "16px" }} /> : <Visibility sx={{ color: "#2D2D2D", opacity: 0.7, fontSize: "16px" }} />}
									</IconButton>
								</InputAdornment>,
							}}
						/>

						<div className='flex justify-between items-center'>
							<div className='flex items-center text-[14px]'>
								<Checkbox
									color="default"
									checked={checked}
									onChange={handleChange}
									sx={{
										'& .MuiSvgIcon-root': {
											color: checked ? '#696CFF' : ""// Change the color of the checkbox icon
										},
									}}
									inputProps={{ 'aria-label': 'primary checkbox' }}
								/>

								<p className='text-[#32475C99] '>Remember Me</p>
							</div>
							<Link to="/forgot-password" className='text-[#696CFF]'>Forgot Password?</Link>
						</div>

						<Button type='submit' variant="contained" className='!bg-[#696CFF] text-lg'>sign in</Button>
					</form>
					<div className='flex justify-center gap-1 mt-4 text-[14px]'>
						<p className='text-[#32475C99]'>New on our platform?</p>
						<Link to={'/register'} className='text-[#696CFF]'> Create an account</Link>
					</div>
				</div>
			</div>
			<Loading isLoading={loginPanding} />
		</div >
	)
}

export default Loginpage;
