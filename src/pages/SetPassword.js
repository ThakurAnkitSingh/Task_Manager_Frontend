// SetPassword.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { userAPI } from '../helpers/api';
import { useAuth } from '../context/AuthContext';

const SetPassword = () => {
    const location = useLocation();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    let userData = location?.state;
    const { setUser } = useAuth(); // Access setUser from AuthContext


    const handlePasswordChange = (e) => {
        setPassword(e?.target?.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }
        userData.password = password;
        try {
            const response = await axios.post(userAPI.register, userData);
            if (response?.status === 201) {
                toast.success('Password set successfully!');
                setUser(response?.data?.token);
                setPassword(''); // Clear password field
                navigate('/dashboard');
            }
        } catch (err) {
            toast.error('Failed to set password. Please try again or Try to login now');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Set Your Password
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Enter your password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    margin="normal"
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Set Password
                </Button>
            </form>
        </Container>
    );
};

export default SetPassword;