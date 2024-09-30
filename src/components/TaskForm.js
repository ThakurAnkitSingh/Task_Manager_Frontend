import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, FormHelperText } from '@mui/material';

const TaskForm = ({ task, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('todo');
    const [errors, setErrors] = useState({});
    const [isChanged, setIsChanged] = useState(false);


    const handleChange = (field, value) => {
        switch (field) {
            case 'title':
                setTitle(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'status':
                setStatus(value);
                break;
            default:
                break;
        }
        setIsChanged(true);
    };

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        } else {
            // Reset form for new task
            setTitle('');
            setDescription('');
            setStatus('todo');
        }
        setErrors({});
    }, [task]);

    const validateForm = () => {
        let tempErrors = {};
        tempErrors.title = title.trim() ? "" : "Title is required";
        tempErrors.description = description.trim() ? "" : "Description is required";
        tempErrors.status = status ? "" : "Status is required";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({ title, description, status });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title}
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    required
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <FormControl fullWidth required error={!!errors.status}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        onChange={(e) => handleChange('status', e.target.value)}
                        label="Status"
                    >
                        <MenuItem value="todo">To Do</MenuItem>
                        <MenuItem value="in-progress">In Progress</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                    {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
                </FormControl>
                {errors.form && (
                    <FormHelperText error>{errors.form}</FormHelperText>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button type="submit" variant="contained" color="primary">
                        {task ? 'Update' : 'Add'} Task
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export default TaskForm;

