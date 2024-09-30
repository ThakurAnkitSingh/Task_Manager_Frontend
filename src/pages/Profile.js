import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Avatar, TextField, Button, Stack } from '@mui/material';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import TaskChart from '../components/TaskChart';
import { toast } from 'react-toastify';
import axios from 'axios';
import { taskAPI, userAPI } from '../helpers/api';

const Profile = () => {
    const { user } = useAuth();
    const [profilePic, setProfilePic] = useState('');
    const [taskCounts, setTaskCounts] = useState({ todo: 0, inProgress: 0, completed: 0 });
    const [userData, setUserData] = useState({ name: '', email: '', avatar: '' });

    const fetchUserDetailsAndTasks = async () => {
        try {
            // Fetch user details
            const userResponse = await axios.get(userAPI.getUser, {
                headers: { Authorization: `Bearer ${user}` },
            });

            const taskResponse = await axios.get(taskAPI.getTasks, {
                headers: { Authorization: `Bearer ${user}` },
            });

            if (userResponse?.status === 200) {
                const { name, email, avatar } = userResponse?.data?.message[0];
                setUserData({ name, email, avatar });
                setProfilePic('');
            } else {
                toast.error('Failed to fetch user details');
            }

            // Fetch task counts

            if (taskResponse?.status === 200) {
                const tasks = taskResponse?.data?.tasks;
                const counts = tasks.reduce(
                    (acc, task) => {
                        if (task.status === 0) acc.todo += 1;
                        else if (task.status === 1) acc.inProgress += 1;
                        else if (task.status === 2) acc.completed += 1;
                        return acc;
                    },
                    { todo: 0, inProgress: 0, completed: 0 }
                );
                setTaskCounts(counts);
            } else {
                toast.error('Failed to fetch task counts');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Error fetching profile and task data');
        }
    };

    useEffect(() => {
        fetchUserDetailsAndTasks();
    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        if (!profilePic.trim()) {
            return toast.error('Please provide a profile picture URL!');
        }

        try {
            await axios.post(userAPI.updateProfile, { profilePic }, {
                headers: { Authorization: `Bearer ${user}` },
            });
            toast.success('Profile picture updated successfully!');
            fetchUserDetailsAndTasks(); // Refetch user details after update
        } catch (error) {
            toast.error('Failed to update profile picture: ' + error.message);
        }
    };

    return (
        <>
            <Header />
            <Container component="main" maxWidth="lg" sx={{ mt: 4, padding: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    {/* Profile Picture Section */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar alt="Profile Picture" src={userData?.avatar} sx={{ width: 150, height: 150, mb: 2 }} />
                        <Typography variant="h5">{userData?.name}</Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            {userData?.email}
                        </Typography>

                        <Box sx={{ width: '100%', height: 300, mt: 4 }}>
                            <Typography variant="h6" align="center" gutterBottom>
                                Task Summary
                            </Typography>
                            <TaskChart taskCounts={taskCounts} />
                        </Box>
                    </Box>

                    {/* Update Profile Picture Section */}
                    <Box component="form" onSubmit={handleProfileUpdate} noValidate sx={{ flex: 1 }}>
                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                id="profilePic"
                                label="Profile Picture URL"
                                name="profilePic"
                                value={profilePic}
                                onChange={(e) => setProfilePic(e.target.value)}
                            />
                            <Button type="submit" fullWidth variant="contained" size="large">
                                Update Profile Picture
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Profile;