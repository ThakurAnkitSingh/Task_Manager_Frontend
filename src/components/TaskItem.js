import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const TaskItem = ({ task, onEdit, onView, onDelete }) => {

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };  // fromatting the Date and time

    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {task.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Created at: {formatDateTime(task.created_at)}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button sx={{margin: 0.5}} variant='contained' size="small" color="error" onClick={onDelete}>Delete</Button>
                    <Button sx={{margin: 0.5}} variant='contained' size="small" onClick={onEdit}>Edit</Button>
                    <Button sx={{margin: 0.5}} variant='contained' size="small" onClick={onView}>View Details</Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TaskItem;