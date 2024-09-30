import React, { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TaskForm from '../components/TaskForm';
import TaskDetails from '../components/TaskDetails';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import TaskItem from '../components/TaskItem';
import axios from 'axios';
import { taskAPI } from '../helpers/api';

const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortCriteria, setSortCriteria] = useState('date');
    const [mode, setMode] = useState('add'); // 'add', 'edit', or 'view'
    const [triggered, setTriggered] = useState(false);

    // Fetch tasks from API
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(taskAPI.getTasks, {
                    headers: { Authorization: `Bearer ${user}` },
                });

                if (response?.status === 200) {
                    setTasks(response?.data?.tasks.map(task => ({
                        ...task,
                        status: mapNumberToStatus(task.status)
                    })));
                } else {
                    toast.error('Failed to fetch tasks');
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
                toast.error('Error fetching tasks');
            } finally{
                setTriggered(false);
            }
        };
        if (user) fetchTasks();
    }, [user, triggered]);

    // Convert numeric status to string
    const mapNumberToStatus = (status) => {
        switch (status) {
            case 0: return 'todo';
            case 1: return 'in-progress';
            case 2: return 'completed';
            default: return 'todo';
        }
    };

    // Convert string status to numeric
    const mapStatusToNumber = (status) => {
        switch (status) {
            case 'todo': return 0;
            case 'in-progress': return 1;
            case 'completed': return 2;
            default: return 0;
        }
    };

    // Add a new task
    const addTask = async (taskData) => {
        try {
            if (!taskData || !taskData.title || !taskData.description || !taskData.status) {
                toast.error('Invalid task data');
                return;
            }
            const numericTask = { ...taskData, status: mapStatusToNumber(taskData.status) };
            const response = await axios.post(taskAPI.createTask, numericTask, {
                headers: { Authorization: `Bearer ${user}` },
            });

            if (response?.status === 201) {
                const newTask = {
                    ...response.data.task,
                    status: mapNumberToStatus(response.data.task.status)
                };
                setTasks([...tasks, newTask]);
                setTriggered(true);
                toast.success('Task added successfully!');
                handleClose();
            } else {
                toast.error('Failed to add task');
            }
        } catch (error) {
            console.error('Error adding task:', error);
            toast.error('Error adding task');
        }
    };

    // Update an existing task
    const updateTask = async (id, updatedTaskData) => {
        try {
            const numericTask = { ...updatedTaskData, status: mapStatusToNumber(updatedTaskData.status) };
            const response = await axios.put(`${taskAPI.updateTask}/${id}`, numericTask, {
                headers: { Authorization: `Bearer ${user}` },
            });


            if (response?.status === 200) {
                const updatedTask = {
                    ...response?.data?.task,
                    status: mapNumberToStatus(response?.data?.task?.status)
                };
                setTasks(tasks?.map((task) => (task?.id === id ? updatedTask : task)));
                toast.success('Task updated successfully!');
                setTriggered(true);
                handleClose();
            } else {
                toast.error('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Error updating task');
        }
    };

    // Delete a task
    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`${taskAPI.deleteTask}/${id}`, {
                headers: { Authorization: `Bearer ${user}` },
            });

            if (response?.status === 200) {
                setTasks(tasks?.filter((task) => task?.id !== id));
                toast.success('Task deleted successfully!');
                setTriggered(true);
            } else {
                toast.error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Error deleting task');
        }
    };

    const handleOpen = (task, mode) => {
        setSelectedTask(task);
        setMode(mode);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedTask(null);
        setMode('add');
    };

    const handleFormSubmit = (data) => {
        if (mode === 'edit') {
            updateTask(selectedTask.id, data);
        } else {
            addTask(data);
        }
    };

    const filteredTasks = tasks.filter((task) =>
        task?.title?.toLowerCase().includes(searchTerm?.toLowerCase()) || task?.description?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    return (
        <Container component="main" maxWidth="xl" sx={{ padding: 2 }}>
            <Header user={user} />
            <Box sx={{ display: 'flex', gap: 2, marginTop: 2, padding: 1, borderRadius: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, padding: 1 }}>
                        <Button variant="contained" onClick={() => handleOpen(null, 'add')}>
                            Add Task
                        </Button>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <TextField
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                sx={{ width: 200 }}
                            />
                            <FormControl sx={{ minWidth: 150 }}>
                                <InputLabel id="sort-label">Sort By</InputLabel>
                                <Select
                                    labelId="sort-label"
                                    value={sortCriteria}
                                    onChange={(e) => setSortCriteria(e.target.value)}
                                    label="Sort By"
                                >
                                    <MenuItem value="date">Sort by Date</MenuItem>
                                    <MenuItem value="priority">Sort by Priority</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {['todo', 'in-progress', 'completed'].map((status) => (
                            <Box
                                key={status}
                                sx={{
                                    bgcolor: '#f5f5f5',
                                    padding: 2,
                                    borderRadius: 1,
                                    flexGrow: 1,
                                    minHeight: '300px',
                                }}
                            >
                                <Typography variant="h6">
                                    {status === 'todo' ? 'To Do' : status === 'in-progress' ? 'In Progress' : 'Completed'}
                                </Typography>
                                {filteredTasks
                                    .filter((task) => task.status === status)
                                    .map((task) => (
                                        <TaskItem
                                            key={task.id}
                                            task={task}
                                            onEdit={() => handleOpen(task, 'edit')}
                                            onView={() => handleOpen(task, 'view')}
                                            onDelete={() => deleteTask(task.id)}
                                        />
                                    ))}
                            </Box>
                        ))}
                    </Box>

                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                        <DialogTitle>
                            {mode === 'add' ? 'Add New Task' : mode === 'edit' ? 'Edit Task' : 'Task Details'}
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            {mode === 'view' ? (
                                <TaskDetails task={selectedTask} />
                            ) : (
                                <TaskForm
                                    task={mode === 'edit' ? selectedTask : null}
                                    onSubmit={handleFormSubmit}
                                />
                            )}
                        </DialogContent>
                    </Dialog>
                </Box>
            </Box>
        </Container>
    );
};

export default Dashboard;