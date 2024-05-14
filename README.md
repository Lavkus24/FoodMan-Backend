# Food Man Backend

The Food Man Backend is the server-side component of the Food Man project, responsible for handling requests from the frontend, managing data storage and retrieval, implementing security measures such as encryption and decryption, and providing user authentication using JSON Web Tokens (JWT).

## Technologies Used

- Node.js: JavaScript runtime environment for server-side development.
- Express.js: Web application framework for building APIs.
- MongoDB: NoSQL database used to store restaurant and food item data.
- Encryption and Decryption Techniques: Implemented to prevent data leakage and ensure data security.
- JSON Web Token (JWT): Used for user authentication purposes.

## Features

- RESTful API Endpoints: Implemented using Express.js to handle CRUD operations for managing restaurant and food item data.
- Encryption and Decryption: Data stored in the database is encrypted to prevent unauthorized access. Decryption is performed when retrieving data for authorized users.
- User Authentication: Implemented using JWT for secure authentication and authorization of users.
- Middleware: Used to handle request validation, error handling, and authentication verification.

## Setup Instructions

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd food-man-backend`
3. Install dependencies: `npm install`
4. Start the server: `npm start`
5. The backend server will start running on the specified port.

## Project Structure

- `controllers`: Contains logic for handling HTTP requests and responses.
- `middleware`: Custom middleware functions for request validation, error handling, authentication, etc.
- `models`: Database models and schema definitions.
- `routes`: Express.js routes for defining API endpoints.


