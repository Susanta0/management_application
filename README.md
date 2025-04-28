# React Assignment: Task Management Application

## Overview

This project involves building a full-stack task management application with a React frontend, database integration, and API implementation.

---

## Core Features

- **User Authentication**: Register(name, email, password) and log in with (email/password).
- **Task Management**:
  - View tasks.
  - Add new tasks.
  - Mark tasks as complete.
  - Delete tasks.
  - Filter tasks by status (All, Active, Completed).
- **Task Data Structure**:
  - Unique ID
  - Title (text)
  - Description (text)
  - Status (complete/incomplete)
  - Priority (Low, Medium, High)
  - Creation date

---

## Technical Stack

- **Frontend**: React with functional components and React Hooks.
- **Backend**: RESTful API implementation.
- **Database**: NoSQL for storing users and tasks.
- **Authentication**: JWT token-based authentication.
- **Styling**: Tailwind.

---

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
   npm start
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
     PORT=<your-port>
     DATABASE_URL=<your-database-url>
     JWT_SECRET=<your-secret-key>
     ```
4. Start the backend server:
   ```bash
   npm run start
   ```

---

## How to Run the Application Locally

1. Clone the repository:
   ```bash
   git clone <repository-link>
   ```
2. Follow the setup instructions for both frontend and backend.
3. Access the application:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8080`

---

## Technical Choices and Architecture

- **React Hooks**: Simplifies state management and lifecycle methods.
- **JWT Authentication**: Secure and stateless user authentication.
- **RESTful API**: Clean separation of concerns between frontend and backend.
- **Database**: Flexible schema design for scalability.
- **Custom Hook**: Encapsulates reusable logic for API calls.

---

## Seed Data

### Test Users

1. **User 1**:
   - Email: `user1@example.com`
   - Password: `password123`
2. **User 2**:
   - Email: `user2@example.com`
   - Password: `password123`

### Sample Tasks

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

---
