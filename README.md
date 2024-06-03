# Student Leave Management System

This project is a Student Leave Management System built using the MERN stack. It allows students to request leaves and administrators to manage these requests.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)

## Features

- Student Registration and Authentication
- Submit Leave Requests
- Admin Approval/Denial of Leave Requests
- View Leave Request Status

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB

### Steps

1. Clone the repository
   ```bash
   git clone https://github.com/your-repo/student-leave-management.git
   cd student-leave-management
   ```

2. Install server dependencies
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies
   ```bash
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory and add the following environment variables
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development servers
   - For server:
     ```bash
     cd server
     npm run dev
     ```
   - For client:
     ```bash
     cd ../client
     npm start
     ```

## Usage

Once the servers are running, you can access the application at `http://localhost:3000`.

## API Endpoints

### Authentication

- **Register a Student**
  - URL: `POST /api/auth/register`
  - Body:
    ```json
    {
      "name": "Student Name",
      "email": "student@example.com",
      "password": "password"
    }
    ```

- **Login**
  - URL: `POST /api/auth/login`
  - Body:
    ```json
    {
      "email": "student@example.com",
      "password": "password"
    }
    ```

### Leave Requests

- **Submit a Leave Request**
  - URL: `POST /api/leaves`
  - Headers: `Authorization: Bearer <token>`
  - Body:
    ```json
    {
      "fromDate": "2023-06-01",
      "toDate": "2023-06-05",
      "reason": "Personal reasons"
    }
    ```

- **Get All Leave Requests (Admin)**
  - URL: `GET /api/leaves`
  - Headers: `Authorization: Bearer <token>`

- **Get Student Leave Requests**
  - URL: `GET /api/leaves/student`
  - Headers: `Authorization: Bearer <token>`

- **Approve/Reject a Leave Request (Admin)**
  - URL: `PATCH /api/leaves/:id`
  - Headers: `Authorization: Bearer <token>`
  - Body:
    ```json
    {
      "status": "approved"
    }
    ```

## Testing with Postman

1. **Set up Postman Environment**
   - Create a new environment in Postman.
   - Add a variable `baseUrl` with the value `http://localhost:5000/api`.

2. **Register a New Student**
   - Method: `POST`
   - URL: `{{baseUrl}}/auth/register`
   - Body:
     ```json
     {
       "name": "John Doe",
       "email": "john.doe@example.com",
       "password": "password123"
     }
     ```
   - Send the request and ensure you get a 201 status code with the registered student data.

3. **Login**
   - Method: `POST`
   - URL: `{{baseUrl}}/auth/login`
   - Body:
     ```json
     {
       "email": "john.doe@example.com",
       "password": "password123"
     }
     ```
   - Send the request and store the `token` from the response.

4. **Submit a Leave Request**
   - Method: `POST`
   - URL: `{{baseUrl}}/leaves`
   - Headers:
     - `Authorization: Bearer <token>`
   - Body:
     ```json
     {
       "fromDate": "2023-06-01",
       "toDate": "2023-06-05",
       "reason": "Family event"
     }
     ```
   - Send the request and ensure you get a 201 status code with the leave request data.

5. **Get Student Leave Requests**
   - Method: `GET`
   - URL: `{{baseUrl}}/leaves/student`
   - Headers:
     - `Authorization: Bearer <token>`
   - Send the request and ensure you get a 200 status code with the list of leave requests.

6. **Approve a Leave Request (Admin)**
   - Method: `PATCH`
   - URL: `{{baseUrl}}/leaves/{leaveId}`
   - Headers:
     - `Authorization: Bearer <token>`
   - Body:
     ```json
     {
       "status": "approved"
     }
     ```
   - Send the request and ensure you get a 200 status code with the updated leave request.

