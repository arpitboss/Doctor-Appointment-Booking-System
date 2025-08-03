<<<<<<< HEAD
=======
# 🩺 Doctor Appointment Booking System - NestJS Backend

This repository contains the backend implementation for a Doctor Appointment Booking System, built with **NestJS**. It's designed to be a robust, scalable, and well-documented solution that follows clean architecture principles and RESTful API conventions.

---

## 🎯 Objective

The primary goal of this project is to create a real-world backend system for managing doctor appointments. This includes designing data models, implementing core business logic for booking, and exposing a clean, intuitive REST API for client applications.

---

## ✨ Features

- **Doctor Management**:
  - Create new doctor profiles.
  - View a list of all doctors.
  - Filter doctors by `specialization`.
  - Paginate results for doctor lists.
- **Appointment Scheduling**:
  - View available time slots for a specific doctor on a given date.
  - Book a new appointment.
  - **Business Rule Enforcement**: Prevents double-booking and overlapping appointments for the same doctor at the database level.
- **API Documentation**:
  - Integrated **Swagger (OpenAPI)** for interactive API documentation.

---

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) (TypeScript)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [TypeORM](https://typeorm.io/)
- **Validation**: `class-validator` and `class-transformer`
- **API Documentation**: Swagger

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/)

---

## 🚀 Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/arpitboss/Doctor-Appointment-Booking-System
    cd doctor-booking-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the database:**
    -   Log in to PostgreSQL and create a new database.
        ```sql
        CREATE DATABASE doctor_booking_db;
        ```

4.  **Configure environment variables:**
    -   Create a `.env` file in the root of the project by copying the example file:
        ```bash
        cp .env
        ```
    -   Open the `.env` file and update the database connection details (`DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`).

---

## ▶️ Running the Application

1.  **Start the development server:**
    ```bash
    npm run start:dev
    ```
    The application will be running on `http://localhost:3000`.

2.  **Access API Documentation:**
    -   Once the server is running, you can access the interactive Swagger documentation at:
        `http://localhost:3000/api-docs`

---

## 🌱 Seeding the Database

To populate the database with initial sample data (a list of doctors), run the seed script.

1.  **Run the seed script:**
    ```bash
    npm run seed
    ```
    *Note: This requires adding a `"seed": "ts-node src/seed.ts"` script to your `package.json` file and installing `ts-node` as a dev dependency (`npm install -D ts-node`).*

---

## 🔗 API Endpoints

All endpoints are versioned under `/v1`.

| Method | Path                                         | Description                                  |
| :----- | :------------------------------------------- | :------------------------------------------- |
| `POST` | `/v1/doctors`                                | Create a new doctor.                         |
| `GET`  | `/v1/doctors`                                | Get a list of doctors (supports filtering).  |
| `GET`  | `/v1/doctors/:id`                            | Get a single doctor by their ID.             |
| `GET`  | `/v1/appointments/doctors/:id/available-slots` | Get available slots for a doctor on a date.  |
| `POST` | `/v1/appointments`                           | Book a new appointment.                      |

For detailed information on request bodies, query parameters, and responses, please refer to the Swagger documentation at `http://localhost:3000/api-docs`.

---

## 🧠 System Design and Decisions

-   **Database-Level Constraints**: The core business rule of preventing overlapping appointments is enforced directly in the PostgreSQL database using an `EXCLUDE` constraint with a `tsrange` (time range) type. This is highly efficient and guarantees data integrity at the lowest level, preventing race conditions that might occur if the check were only in the application layer.
-   **Modular Structure**: The application is divided into `DoctorsModule` and `AppointmentsModule`. This separation of concerns makes the codebase easier to understand, maintain, and scale.
-   **DTOs and Validation**: All incoming data is validated using Data Transfer Objects (DTOs) with `class-validator` decorators. This ensures that the service layer always receives data in the expected shape and format, preventing common errors.
-   **Asynchronous Operations**: All database operations and service methods are asynchronous (using `async/await`), ensuring the application remains non-blocking and can handle concurrent requests efficiently.
-   **Configuration Management**: The `ConfigModule` is used to manage environment variables, separating configuration from code and making it easy to run the application in different environments (development, staging, production).
>>>>>>> d05a147112c4634823cfff75b023e714ea8e154a
