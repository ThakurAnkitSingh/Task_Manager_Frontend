import React from 'react';
import { Typography, Box } from '@mui/material';

const TaskDetails = ({ task }) => {
    if (!task) return null;

    return (
        <Box>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body1"><strong>Description:</strong> {task.description}</Typography>
            <Typography variant="body1"><strong>Created at:</strong> {task.created_at}</Typography>
        </Box>
    );
};

export default TaskDetails;