const userAPI = {
    register: `https://task-manager-backend-nl4b.onrender.com/api/v1/user/register`,
    login: `https://task-manager-backend-nl4b.onrender.com/api/v1/user/login`,
    userAuth: `https://task-manager-backend-nl4b.onrender.com/api/v1/user/userAuth`,
    updateProfile: `https://task-manager-backend-nl4b.onrender.com/api/v1/user/updateProfile`,
    getUser: `https://task-manager-backend-nl4b.onrender.com/api/v1/user/userAuth`,
}

const taskAPI = {
    createTask: `https://task-manager-backend-nl4b.onrender.com/api/v1/task/createTask/`,
    getTasks: `https://task-manager-backend-nl4b.onrender.com/api/v1/task/getTasks/`,
    updateTask: `https://task-manager-backend-nl4b.onrender.com/api/v1/task/updateTask`,
    deleteTask: `https://task-manager-backend-nl4b.onrender.com/api/v1/task/deleteTask`
}

const authAPI = {
    googleAuth: `https://task-manager-backend-nl4b.onrender.com/api/v1/auth/googleAuth`
}

export { userAPI, taskAPI, authAPI };
