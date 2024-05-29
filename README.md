# FindMyCampSpot

## Overview

FindMyCampSpot is a web application designed to help users find and book camping spots. The backend is built using MongoDB, ExpressJS, and Node.js, while the frontend is created with Bootstrap and CSS. The website features user authentication, token generation, and cookie management.

## Features

- **User Authentication**: Secure sign up, login, and logout functionalities.
- **Token Generation**: JWT (JSON Web Token) for managing user sessions.
- **Cookie Management**: Storing tokens and session data in cookies.
- **Camping Spots Management**: Create, read, update, and delete camping spots.
- **Responsive Design**: Frontend developed using Bootstrap for a responsive user experience.

## Technologies Used

- **Frontend**: Bootstrap, CSS
- **Backend**: Node.js, ExpressJS, MongoDB
- **Authentication**: JWT, Cookies

## Getting Started

### Prerequisites

- Node.js and npm installed on your local machine
- MongoDB instance (local or remote)

### Installation

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/your-username/FindMyCampSpot.git
   cd FindMyCampSpot
   ```

2. **Install Backend Dependencies**:

   ```sh
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:

   ```sh
   cd ../frontend
   npm install
   ```

4. **Setup Environment Variables**:

   Create a `.env` file in the `backend` directory and add the following environment variables:

   ```env
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   COOKIE_SECRET=your-cookie-secret
   PORT=5000
   ```

5. **Run the Backend**:

   ```sh
   cd backend
   npm start
   ```

   The backend server should now be running on `http://localhost:5000`.

## API Endpoints

### Authentication

- **POST /api/auth/signup**: User registration
- **POST /api/auth/login**: User login
- **POST /api/auth/logout**: User logout

### Camping Spots

- **GET /api/spots**: Get all camping spots
- **GET /api/spots/:id**: Get a single camping spot by ID
- **POST /api/spots**: Create a new camping spot
- **PUT /api/spots/:id**: Update a camping spot by ID
- **DELETE /api/spots/:id**: Delete a camping spot by ID

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
