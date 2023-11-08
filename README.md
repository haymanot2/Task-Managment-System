# Task Management System

## Task management application built with Express.js, PostgreSQL, and Prisma ORM.
This project is a robust backend API and database system for streamlined project and task management. Users can  register and login  and used JSON Web Tokens (JWT) for authentication. Once authenticated, users can access their profiles, create projects, and perform CRUD operations on them. They can also create tasks within projects and perform CRUD operation on them again and attach/upload files for specific task . This powerful backend system enhances productivity and promotes efficient workflows in project and task management.

## Installation

1. Clone the repository:

    - git clone (https://github.com/haymanot2/Task-Managment-System.git)
2. Install the dependencies:
    - cd repository
    - npm install
  
3. Set up the database:
    - Install PostgreSQL and create a new database.
    - Open the .env file and
        - update the DATABASE_URL with your PostgreSQL connection string.
        - update the JWT_SECRET with your secretekey
        - update the PORT with your server port number
4. Run database migrations:
    - npx prisma migrate dev
5. Start the server:
    - npm run start:dev
## Usage
The server will start running at http://localhost:PORT. You can now send API requests to this URL.

To access protected routes,you need to include an authentication token in the request headers. After successful 
registration and login, you'll receive a JWT token that needs to be included in the Authorization header as follows:
Authorization: Bearer [token]

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

    - GET /api/profile/:id  : Fetch the user profile information.




    













