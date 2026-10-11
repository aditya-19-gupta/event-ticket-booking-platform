# Event Ticket Booking Platform

A full-stack event ticket booking platform where users can discover events, book seats, and manage tickets, while organizers can create and manage events.

**Project Status:** In Development

## Features

### Implemented
- Express server setup
- MongoDB connection
- User registration with password hashing

### In Progress
- Email-based login
- JWT access and refresh tokens

### Planned
- Role-based access control
- Event creation and management
- Seat reservation and booking
- Payment gateway integration
- Redis caching and temporary seat holds
- Background jobs and email notifications
- React frontend
- Testing and deployment

## Technology Stack

**Current**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

**Planned**
- React + Vite
- Redis
- BullMQ
- Razorpay
- Docker

## Project Structure

```text
Event-Booking-Project/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
├── frontend/
├── README.md
└── .gitignore
```

The structure will evolve as development progresses.

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB

### Run the Backend

```bash
cd backend
npm install
npm run dev
```

Configure the required environment variables in `backend/.env` before starting the server.

The health endpoint is available at:

`http://localhost:5000/health`

## Learning Objectives

This project explores REST API development, authentication, authorization, database modeling, seat-booking concurrency, caching, payment processing, background jobs, testing, and deployment.
