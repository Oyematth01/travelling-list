# Travelling List Application

The Travelling List Application is a web application designed to help users manage their travel packing lists efficiently. Users can sign up, sign in, add items to their packing list, mark items as packed, and delete items. The application is built using React for the frontend and Node.js with Express for the backend, and it uses SQLite for the database.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (sign up and sign in)
- Add items to the packing list
- Mark items as packed/unpacked
- Delete items from the packing list
- Responsive design for mobile and desktop

## Technologies Used

### Frontend

- React
- CSS Modules
- Axios (for HTTP requests)

### Backend

- Node.js
- Express
- SQLite (using the `sqlite3` package)

### Other Tools

- React Router (for client-side routing)
- Body-Parser (for parsing incoming request bodies)
- Cors (for enabling Cross-Origin Resource Sharing)

## Installation

### Prerequisites

- Node.js and npm installed on your machine

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/Oyematth01/travelling-list.git
   cd travelling-list

2. npm install

3. Start the backend server:
		```sh
   node server.js

4. Start the frontend development server:
		```sh
   npm start

5. Open your browser and navigate to http://localhost:3000 to view the application.

## API Endpoints

### User Authentication

#### Sign Up
- **Endpoint:** `POST /signup`
- **Request Body:**
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response:**
  - `201 Created` on success
  - `400 Bad Request` if the username already exists

#### Sign In
- **Endpoint:** `POST /signin`
- **Request Body:**
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response:**
  - `200 OK` on success
  - `400 Bad Request` if the credentials are invalid

### Packing List Items

#### Add Item
- **Endpoint:** `POST /items`
- **Request Body:**
  ```json
  {
    "description": "item_description",
    "quantity": 1,
    "userId": "user_id"
  }
  ```
- **Response:**
  - `201 Created` on success

#### Get Items
- **Endpoint:** `GET /items/:userId`
- **Response:**
  - `200 OK` with a list of items

#### Delete Item
- **Endpoint:** `DELETE /items/:id`
- **Response:**
  - `200 OK` on success

## Project Structure

```plaintext
travelling-list/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── css/
│   │   ├── index.css
│   │   ├── Registration.module.css
│   ├── js/
│   │   ├── App.js
│   │   ├── Logo.js
│   │   ├── Form.js
│   │   ├── PackingList.js
│   │   ├── Stats.js
│   │   ├── Signup.js
│   │   ├── Signin.js
│   ├── index.js
│   └── ...
├── .env
├── package.json
├── server.js
└── README.md
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the project's coding standards and passes all tests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

