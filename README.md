# Booking Platform

A modern full-stack hotel booking platform built with **NestJS**, **React**, **PostgreSQL**, and **Docker**. The platform allows users to browse rooms, make bookings, and manage reservations through a secure and responsive web application.

---

## Overview

The Booking Platform is a full-stack web application developed using a modern software architecture. It consists of a React frontend, a NestJS backend, and a PostgreSQL database, all containerized with Docker for simplified deployment.

The application provides secure authentication using JWT, RESTful APIs for communication, and a responsive user interface designed for both desktop and mobile devices.

---

## Features

- JWT Authentication & Authorization
- User Registration & Login
- Room Management
- Booking Management
- View Booking History
- Responsive User Interface
- RESTful API
- Docker Support
- PostgreSQL Database Integration
- Modern Full-Stack Architecture

---

## Technology Stack

### Frontend
- React
- Vite
- TypeScript
- CSS

### Backend
- NestJS
- TypeScript
- TypeORM
- JWT Authentication

### Database
- PostgreSQL

### DevOps
- Docker
- Docker Compose

---

# Project Structure

```
Booking_Platform/
│
├── booking-platform-api/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── ...
│
├── booking-platform-frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── package.json
│   └── ...
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# Getting Started

## Clone Repository

```bash
git clone https://github.com/Nimsaraw/Booking_Platform.git

cd Booking_Platform
```

---

## Backend Setup

```bash
cd booking-platform-api

npm install

npm run start:dev
```

---

## Frontend Setup

```bash
cd booking-platform-frontend

npm install

npm run dev
```

---

# Run with Docker

Build Images

```bash
docker compose build
```

Run Containers

```bash
docker compose up
```

Run in Background

```bash
docker compose up -d
```

Stop Containers

```bash
docker compose down
```

---

# Environment Variables

Backend `.env`

```env
PORT=3000

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=booking_platform

JWT_SECRET=your-secret-key

JWT_EXPIRES_IN=1d
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|----------|----------------|
| POST | /auth/register |
| POST | /auth/login |

---

## Users

| Method | Endpoint |
|----------|----------------|
| GET | /users |
| GET | /users/:id |

---

## Rooms

| Method | Endpoint |
|----------|----------------|
| GET | /rooms |
| POST | /rooms |
| PATCH | /rooms/:id |
| DELETE | /rooms/:id |

---

## Bookings

| Method | Endpoint |
|----------|----------------|
| GET | /bookings |
| POST | /bookings |
| PATCH | /bookings/:id |
| DELETE | /bookings/:id |

---

# Screenshots

> Add screenshots of your application here.

Example

```
screenshots/

├── login.png
├── dashboard.png
├── rooms.png
├── bookings.png
```

---

# Authentication

The application uses **JWT (JSON Web Token)** for secure authentication.

Protected routes require:

```
Authorization: Bearer <token>
```

---

# Docker Architecture

```
React Frontend
        │
        ▼
NestJS REST API
        │
        ▼
 PostgreSQL
```

All services are managed using Docker Compose.

---

# Future Improvements

- Email Notifications
- Payment Gateway Integration
- Role-Based Access Control
- Booking Cancellation
- Search & Filtering
- Admin Dashboard
- Room Images Upload
- Analytics Dashboard

---

# Author

**Nimsara Yuwanga Wickramasinghe**

- GitHub: https://github.com/Nimsaraw
- Portfolio: https://yuwangawickramasinghe.vercel.app

---

# License

This project is licensed under the MIT License.

---

⭐ If you found this project helpful, consider giving it a star on GitHub.
