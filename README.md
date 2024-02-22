# Exercise Tracker Microservice (freeCodeCamp Back End and APIs course)

This project implements an API for managing users and tracking their exercise logs using Node.js, Express, and MongoDB (with Mongoose for model interactions).

## Technologies

- Express.js
- Mongodb
- Mongoose

## Key Features

- User Management:
  - Create new users with usernames.
  - Retrieve a list of all users.
- Exercise Tracking:
  - Create exercise logs for specific users.
  - Retrieve exercise logs for specific users, with optional date range and limit filtering.

**Getting Started:**

1. **Prerequisites:** Node.js and npm or yarn installed on your system.
2. **Clone this repository:** `git clone git@github.com:karimAoulallay/fcc-exercice-tracker.git`
3. **Install dependencies:** `npm install` or `yarn install`
4. **Run the project:** `npm start` or `yarn start`

## API Endpoints

- **`POST /users`:**
  - Creates a new user with a provided username.
  - Request body: `{"username": "username_value"}`
- **`GET /users`:**
  - Retrieves a list of all users.
- **`POST /users/:userId/exercises`:**
  - Creates an exercise log for the specified user.
  - Request body: `{"description": "exercise_description", "duration": duration_in_minutes, "date": "optional_date_string"}`
- **`GET /users/:userId/logs`:**
  - Retrieves exercise logs for the specified user.
  - Query parameters:
    - `from`: Start date for filtering (optional)
    - `to`: End date for filtering (optional)
    - `limit`: Maximum number of logs to return (optional)
