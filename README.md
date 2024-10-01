# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Project Overview

The Task Manager Frontend is a web application that enables users to manage their tasks efficiently. Built using React and Material-UI, it provides a modern and responsive user interface for creating, updating, and organizing tasks.

### How it works

The frontend communicates with the Task Manager Backend to manage user authentication and task operations. Users log in and receive a secure token, which allows them to access and manipulate their tasks. The application fetches tasks from the backend and presents them in an organized manner, providing a seamless experience for users.


### Technologies Used

  React: JavaScript library for building user interfaces.
  
  Material-UI: React UI framework providing pre-built components and styling.
  
  Axios: Promise-based HTTP client for making API requests.
  
  Firebase Authentication: User authentication via Google Sign-In.
  
### Key Features

User Authentication: Secure sign-up and login via email/password and Google Sign-In.

Task Management: Create, read, update, and delete tasks categorized by status (To Do, In Progress, Completed).

Search and Sort: Search for tasks by title or description and sort will not work.

### How to Start

## Prerequisites

 Node.js (v14 or higher)

 Yarn or npm

## Getting Started

# Clone the repository

 git clone <repository_url>

 cd task_manager_frontend

## Install dependencies

npm install

# or if you prefer yarn

yarn install

## Set up environment variables Create a .env file in the root directory:

REACT_APP_API_BASE_URL=http://localhost:5000/api

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key

REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain

REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id

### Start the application

npm start

# or if using yarn

yarn start

The application should now be running at http://localhost:3000.

### Problem Solved

The Task Manager Frontend addresses the common challenges users face when managing tasks. It provides a centralized platform for users to organize their tasks effectively, improving productivity and time management. By integrating user-friendly features such as drag-and-drop, search, and sorting, the application enhances the overall task management experience, making it easier for users to focus on their priorities.

### Conclusion

The Task Manager Frontend serves as a powerful tool for individuals and teams to manage tasks efficiently. By leveraging modern web technologies, it provides a scalable, responsive, and intuitive interface that simplifies task management and enhances user engagement.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
