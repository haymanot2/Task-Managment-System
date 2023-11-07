# Task Management API

This is a RESTful API for a task management application built with JavaScript, Express.js, JWT authentication, PostgreSQL, and Prisma ORM.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

- git clone https://github.com/your/repository.git
2. Install the dependencies:
- cd repository
- npm install
  
3. Set up the database:
- Install PostgreSQL and create a new database.
- Open the .env file and update the DATABASE_URL with your PostgreSQL connection string.
4. Run database migrations:
- npx prisma migrate dev
5. Start the server:
- npm run start:dev
# Usage
- The server will start running at http://localhost:5000. You can now send API requests to this URL.

- To access protected routes, you need to include an authentication token in the request headers. After successful registration or login, you'll receive a JWT token that needs to be included in the Authorization header as follows:
- Authorization: Bearer <token>

# API Endpoints
- The following API endpoints are available:
- User Authentication:

   - POST /api/auth/register: Register a new user.
   - POST /api/auth/login: Log in an existing user.
- Project Management:

    - GET /api/projects: Fetch all projects for the authenticated user.
    - POST /api/projects: Create a new project.
    - GET /api/projects/:projectId: Fetch a specific project by ID.
    - PUT /api/projects/:projectId: Update a specific project by ID.
    - DELETE /api/projects/:projectId: Delete a specific project by ID.
- Task Management:

    - GET /api/projects/:projectId/tasks: Fetch all tasks for a specific project.
    - POST /api/projects/:projectId/tasks: Create a new task within a project.
    - GET /api/tasks/:taskId: Fetch a specific task by ID.
    - PUT /api/tasks/:taskId: Update a specific task by ID.
    - DELETE /api/tasks/:taskId: Delete a specific task by ID.
- User Profile:

    - GET /api/profile: Fetch the user's profile information.




    













