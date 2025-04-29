# Task Management Application

## Overview

A full-stack task management application built with React, featuring user authentication, task CRUD operations, and priority management. This application demonstrates modern web development practices with a clean separation between frontend and backend services.

---

## Core Features

- **User Authentication**:
  - Secure registration with name, email, and password
  - JWT-based login system
  - Protected routes for authenticated users

- **Task Management**:
  - View all tasks in an intuitive dashboard
  - Add new tasks with title, description, and priority
  - Mark tasks as complete/incomplete
  - Delete tasks
  - Filter tasks by status (All, Active, Completed)

- **Task Data Structure**:
  - Unique ID (auto-generated)
  - Title (text)
  - Description (text)
  - Status (complete/incomplete)
  - Priority (Low, Medium, High)
  - Creation date (timestamp)

---

## Technical Stack

### Frontend
- **Framework**: React with functional components
- **State Management**: React Hooks (useState, useEffect, useContext)
- **Routing**: React Router for navigation
- **HTTP Client**: Axios for API requests
- **Styling**: Tailwind CSS for responsive design

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **API Architecture**: RESTful endpoints
- **Authentication**: JWT token-based system

### Database
- **Type**: NoSQL (MongoDB)
- **ODM**: Mongoose for schema validation

---

## Technical Choices and Architecture

### Frontend Architecture
- **Component Structure**: Modular components with clear separation of concerns
- **React Hooks**: Used for state management and side effects, simplifying the component logic
- **Custom Hooks**: Encapsulates reusable logic for API calls and form validation
- **Context API**: Manages global state for authentication and task filtering

### Backend Architecture
- **MVC Pattern**: Organized code with Models, Controllers, and Routes
- **Middleware**: Custom middleware for authentication, error handling, and request validation
- **JWT Authentication**: Secure and stateless user authentication with token expiration
- **RESTful API**: Clean separation of concerns with standardized HTTP methods

### Database Schema

#### User Schema
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

#### Task Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  title: String,
  description: String,
  status: String (enum: "complete", "incomplete"),
  priority: String (enum: "Low", "Medium", "High"),
  creataionDate:Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Setup and Installation

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```
     PORT=<your-server-running-port>
     DATABASE_URL=<your-mongodb-connection-string>
     JWT_SECRET=<your-secret-key>
     JWT_EXPIRES_IN=<token-expiration-time>
     ```
4. Start the backend server:
   ```bash
   npm run start
   ```

---

## How to Run the Application Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Susanta0/management_application.git
   ```
2. Follow the setup instructions for both frontend and backend.
3. Access the application:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8080`

---

## Deployment

### Live Application URLs

- **Frontend**: [https://management-application-sigma.vercel.app/](https://management-application-sigma.vercel.app/)
- **Backend API**: [https://management-application-o77e.onrender.com](https://management-application-o77e.onrender.com)

### Deployment Platforms

- **Frontend**: Deployed on Vercel for optimal React application hosting
- **Backend**: Hosted on Render with automatic CI/CD pipeline
- **Database**: MongoDB Atlas cloud database service

---

## Seed Data

### Test Users

1. **User 1**:
   - Email: `user1@example.com`
   - Password: `password123`
2. **User 2**:
   - Email: `user2@example.com`
   - Password: `password321`

### Sample Tasks

**User 1 Tasks**:
- **Task 1**:
  - Title: `Complete Assignment`
  - Description: `Finish the React assignment by the deadline.`
  - Status: `Incomplete`
  - Priority: `High`
- **Task 2**:
  - Title: `Grocery Shopping`
  - Description: `Buy groceries for the week.`
  - Status: `Complete`
  - Priority: `Medium`

**User 2 Tasks**:
- **Task 1**:
  - Title: `Team Meeting`
  - Description: `Attend the project status meeting with the development team at 3 PM.`
  - Status: `Incomplete`
  - Priority: `Low`
- **Task 2**:
  - Title: `Code Review`
  - Description: `Review pull requests and leave feedback for the team.`
  - Status: `Complete`
  - Priority: `High`

---
