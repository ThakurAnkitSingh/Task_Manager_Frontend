// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../helpers/firebase'; // Import Firebase and Google provider
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authAPI, userAPI } from '../helpers/api';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';

// Create an authentication context
const AuthContext = createContext();

// Provider component to wrap the app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // React Router v6 hook

    // Function to handle Google login
    const signinWithGoogle = async () => {
        try {
            // Sign in with Google
            const result = await signInWithPopup(auth, googleProvider);
            // The signed-in user info.
            const user = result.user;
            // Assuming you have an API endpoint to handle Google sign-in
            const response = await axios.post(authAPI.googleAuth, { token: user?.accessToken });

            if (response?.status === 200 && !response?.data?.user?.password) {
                toast.success('Important! Please set the password');
                navigate('/setpassword', { state: response?.data?.user });
            } else {
                toast.success('User already registered');
                navigate('/login'); // Handle error message from server
            }

        } catch (error) {
            console.error("Error during Google signin:", error);
            toast.error("Google signin failed: " + error.message); // Notify user about error
        }
    };

    const loginWithGoogle = async () => {
        try {
            // Sign in with Google
            const result = await signInWithPopup(auth, googleProvider);
            // The signed-in user info.
            const user = result.user;
            // Assuming you have an API endpoint to handle Google sign-in
            const response = await axios.post(authAPI.googleAuth, { token: user?.accessToken });
            if (response?.data?.user?.password == null) {
                toast.success('Please first Sign In');
                navigate('/signup');
                return;
            }

            if (response?.status === 200) {
                setUser(response?.data?.user?.password); // Update user state
                navigate('/dashboard'); // Redirect to dashboard
            } else {
                alert(response?.data?.message); // Handle error message from server
            }
        } catch (error) {
            console.error("Error during Google login:", error);
            alert("Google login failed: " + error.message); // Notify user about error
        }
    };
    // Function to handle email/password login
    const loginWithEmailPassword = async (email, password) => {
        try {
            const response = await axios.post(userAPI.login, { email, password });
            if (response?.status === 200) {
                setUser(response?.data?.token); // Save user data
                navigate('/dashboard'); // Redirect to dashboard
            } 
            return response;
        } catch (error) {
            console.error("Error during email/password login:", error);
            // alert("Login failed: " + error?.message);
        }
    };

    // Function to handle user registration
    const registerUser = async (userData) => {
        try {
            const response = await axios.post(userAPI.register, userData);
            if (response?.status === 201) {
                setUser(response?.data?.token);
                toast.success("Registration successful! Redirecting to Dashboard...");
                navigate('/dashboard'); // Redirect to login upon successful signup
            } else {
                toast.error(response?.data?.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("Registration failed: " + error.message);
        }
    };

    // Function to log out the user
    const logout = async () => {
        try {
            await auth.signOut(); // Sign out from Firebase
            setUser(null); // Clear user state
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error("Error during logout:", error);
            alert("Logout failed: " + error.message);
        }
    };

    // Check authentication status on app load
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get(userAPI.userAuth); // API to check current user
                if (response?.status === 200) {
                    setUser(response?.data?.user); // Set user from the response
                } else {
                    setUser(null); // User not authenticated
                }
            } catch (error) {
                console.error("Error checking auth status:", error);
                setUser(null); // User not authenticated
            }
        };

        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loginWithGoogle, loginWithEmailPassword, registerUser, logout, signinWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
