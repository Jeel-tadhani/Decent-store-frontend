import React, { useState } from 'react';
import girlWithLaptopLight from "../util/images/girl-with-laptop-light.png";
import { useFormik } from 'formik';
import { ErrorType } from '../types/Errors';
import { Register } from '../services/apiServices/authServices';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Button, Checkbox, IconButton, InputAdornment, TextField } from '@mui/material';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import loginIcon from "../util/images/loginIcon.svg";
import Loading from '../components/comman/Loading';
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from '@/components/ui/use-toast';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(false);

    const navigate = useNavigate();
    const { toast } = useToast();

    const { mutate: register_user, isPending: registerPanding } = useMutation({
        mutationFn: Register,
        onSuccess: () => {
            toast({ title: "user has been registered" })
            navigate("/login");
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
            user_name: '',
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
            user_name: Yup.string()
                .required('Please enter a username')
                .min(3, 'Username must be at least 3 characters')
                .max(15, 'Username must not exceed 15 characters')
        }),
        onSubmit: async (values) => {
            try {
                register_user(values)

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
                <img src={girlWithLaptopLight} alt="signup poster" className='object-cover h-screen' />
            </div>

            <div className='flex flex-col items-center justify-center xl:w-1/3 w-full mx-3'>
                <div className='max-w-[400px] w-full'>
                    <div className='flex gap-2 text-2xl font-bold text-gray-600 mb-8'>
                        <img src={loginIcon} alt="icon" />
                        <h1 className='text-[#32475CDE]'>Decent store</h1>
                    </div>
                    <h2 className='text-lg font- text-gray-600 mb-[6px]'>Adventure starts here 🚀
                    </h2>
                    <p className='text-gray-500 mb-6 max-w[380px]'>Make your app management easy and fun!
                    </p>
                    <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4 w-full'>
                        <TextField
                            id="outlined-basic"
                            label="Username"
                            variant="outlined"
                            size='medium'
                            className='text-gray-500 '
                            fullWidth
                            {...formik.getFieldProps('user_name')}
                            error={formik.touched.user_name && Boolean(formik.errors.user_name)}
                            helperText={formik.touched.user_name && formik.errors.user_name}
                        />
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
                                            color: checked ? '#696CFF' : ""
                                        },
                                    }}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <p className='text-[#32475C99] '>I agree to <span className='text-[#696CFF]'>privacy policy & terms</span></p>
                            </div>
                        </div>

                        <Button type='submit' variant="contained" className='!bg-[#696CFF] text-lg'>sign up</Button>
                    </form>
                    <div className='flex justify-center gap-1 mt-4 text-[14px]'>
                        <p className='text-[#32475C99]'>Already have an account?</p>
                        <Link to={'/login'} className='text-[#696CFF]'> Sign in instead</Link>
                    </div>
                </div>
            </div>
            <Loading isLoading={registerPanding} />
        </div >
    );
};

export default RegisterPage;
