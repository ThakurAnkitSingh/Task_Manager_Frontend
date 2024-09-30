// src/pages/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();
    const { signinWithGoogle, registerUser } = useAuth();

    const handleGoogleSignIn = async () => {
        await signinWithGoogle(); // Use the context function for Google Sign In
    };

    const handleChange = (e) => {
        const { name, value } = e?.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        const { firstName, lastName, email, password, confirmPassword } = formData;

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // Register the user using the context function
        const google_id = null;
        await registerUser({ name: `${firstName} ${lastName}`, email, password, google_id });
    };

    const handleNavigateToLogin = () => {
        navigate('/login');
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ border: '2px solid #e0e0e0', padding: '20px', borderRadius: '10px', marginTop: '50px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)' }}>
            <Typography component="h1" variant="h5" align="center">
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Button
                    style={{ backgroundColor: 'red', color: 'white' }}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={handleGoogleSignIn}
                    sx={{ mb: 2 }}
                >
                    Sign up with Google
                </Button>
                <Typography variant="body2" align="center">
                    Already have an account?{' '}
                    <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleNavigateToLogin}>
                        Log in
                    </span>
                </Typography>
            </form>
        </Container>
    );
};

export default SignUp;