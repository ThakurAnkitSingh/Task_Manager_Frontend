// src/components/TaskList.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, updateTask, deleteTask, handleTaskClick }) => {
    return (
        <Box className="task-list" sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 2 }}>
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        updateTask={updateTask} 
                        deleteTask={deleteTask} 
                        handleTaskClick={handleTaskClick} // Pass the click handler
                    />
                ))
            ) : (
                <Box className='task-list' sx={{ textAlign: 'center', padding: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        No tasks available. Please add a task.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default TaskList;