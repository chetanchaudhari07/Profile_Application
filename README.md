Company Employee Management API
This is a RESTful API built with Node.js, Express, and MySQL. The API allows performing CRUD operations (Create, Read, Update, Delete) on company employees, as well as supporting authentication and authorization via JWT (JSON Web Token). The application includes features like user registration, login, and admin-only access for managing users.

Prerequisites
Before you begin, ensure you have the following installed:

Node.js
MySQL
You will also need a MySQL database set up to store the employee records.

Setup
1. Clone the Repository
bash
Copy
Edit
git clone <repository_url>
cd <repository_folder>
2. Install Dependencies
Run the following command to install the required dependencies:

bash
Copy
Edit
npm install
3. Configure Environment Variables
Create a .env file in the root directory and add the following environment variables:

plaintext
Copy
Edit
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_mysql_database
JWT_SECRET=your_jwt_secret
DB_HOST: The host of your MySQL database.
DB_USER: Your MySQL username.
DB_PASSWORD: Your MySQL password.
DB_NAME: The name of your MySQL database.
JWT_SECRET: A secret key used to sign JWT tokens.
4. Set Up the Database
Run the following command to create the necessary table in the MySQL database:

bash
Copy
Edit
node config/db.js
This will create a table called company_employee in your database with columns like id, name, email, password, phone, role, and company.

API Endpoints
1. POST /api/register
Register a new user.

Request Body:
json
Copy
Edit
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phone": "1234567890",
  "company": "TechCorp"
}
Response:
json
Copy
Edit
{
  "message": "User Registered",
  "userId": 1
}
2. POST /api/login
Login an existing user to get a JWT token.

Request Body:
json
Copy
Edit
{
  "email": "john.doe@example.com",
  "password": "password123"
}
Response:
json
Copy
Edit
{
  "token": "jwt_token"
}
3. GET /api/get-user
Get a list of all users (Admins only).

Response:
json
Copy
Edit
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "company": "TechCorp"
  }
]
4. DELETE /api/delete-user/:id
Delete a user by ID (Admins only).

Example Request:
bash
Copy
Edit
DELETE /api/delete-user/1
Response:
json
Copy
Edit
{
  "message": "User deleted successfully"
}
5. PUT /api/update-user
Update an existing user's details (Admins only).

Request Body:
json
Copy
Edit
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "9876543210",
  "company": "TechCorp"
}
Response:
json
Copy
Edit
{
  "message": "User updated successfully"
}
6. GET /api/search-user
Search for users by name, email, phone, or company (Admins only).

Example Request:
bash
Copy
Edit
GET /api/search-user?name=John&company=TechCorp
Response:
json
Copy
Edit
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "company": "TechCorp"
  }
]
Authentication & Authorization
Authentication: Each user must log in to receive a JWT token. This token should be passed in the Authorization header for subsequent requests.
Authorization: Only users with the admin role can perform certain operations, such as deleting and updating users.
Example Authorization Header:
plaintext
Copy
Edit
Authorization: Bearer <your_jwt_token>
Running the Project
To run the project, use the following command:

bash
Copy
Edit
npm start
This will start the server at http://localhost:8748.

Testing the Endpoints
You can use tools like Postman or Insomnia to test the API endpoints. Ensure that you pass the JWT token for authorized routes such as GET /api/get-user, PUT /api/update-user, and DELETE /api/delete-user.

Conclusion
This API allows managing a company's employees with a secure authentication mechanism and a flexible admin interface to perform CRUD operations. Use the endpoints to register, login, update, delete, and search for employees.