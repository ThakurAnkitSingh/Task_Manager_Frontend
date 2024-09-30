// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const { logout } = useAuth(); // Using the context for logout

    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        console.log('User logged out');
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar >
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Task Manager
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
                <Button color="inherit" onClick={() => navigate('/profile')}>
                    Profile
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;