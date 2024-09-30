// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { loginWithGoogle, loginWithEmailPassword } = useAuth();

    const handleGoogleSignIn = async () => {
        try {
            await loginWithGoogle(); // Use the context function for Google Sign In
        } catch (error) {
            toast.error("Google sign-in failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await loginWithEmailPassword(email, password);
            if (result?.status === 200) {
                toast.success("Login successful! Redirecting...");
                navigate('/dashboard');
            } else {
                toast.error(result?.data?.message || "Login failed");
            }
        } catch (error) {
            toast.error("Login failed: " + error?.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ border: '2px solid #e0e0e0', padding: '20px', borderRadius: '10px', marginTop: '50px', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)' }}>
            <Typography component="h1" variant="h5" align="center">
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
                <Button
                    style={{ backgroundColor: 'red', color: 'white' }}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={handleGoogleSignIn}
                    sx={{ mb: 2 }}
                >
                    Log in with Google
                </Button>
                <Typography variant="body2" align="center">
                    Don't have an account?{' '}
                    <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => navigate('/signup')}>
                        Create one
                    </span>
                </Typography>
            </form>
        </Container>
    );
};

export default Login;