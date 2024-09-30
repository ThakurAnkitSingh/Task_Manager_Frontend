const userAPI = {
    register: `http://localhost:5000/api/v1/user/register`,
    login: `http://localhost:5000/api/v1/user/login`,
    userAuth: `http://localhost:5000/api/v1/user/userAuth`,
    updateProfile: `http://localhost:5000/api/v1/user/updateProfile`,
    getUser: `http://localhost:5000/api/v1/user/userAuth`,
}

const taskAPI = {
    createTask: `http://localhost:5000/api/v1/task/createTask/`,
    getTasks: `http://localhost:5000/api/v1/task/getTasks/`,
    updateTask: `http://localhost:5000/api/v1/task/updateTask`,
    deleteTask: `http://localhost:5000/api/v1/task/deleteTask`
}

const authAPI = {
    googleAuth: `http://localhost:5000/api/v1/auth/googleAuth`
}

export { userAPI, taskAPI, authAPI };