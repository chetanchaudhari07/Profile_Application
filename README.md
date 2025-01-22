## Company Employee Management API
This is a RESTful API built with Node.js, Express, and MySQL. The API allows performing CRUD operations (Create, Read, Update, Delete) on company employees, as well as supporting authentication and authorization via JWT (JSON Web Token). The application includes features like user registration, login, and admin-only access for managing users.

**Prerequisites**
Node.js,
MySQL

**🚀 Setup**

1. Clone the Repository using this cmd 
**git clone <repository_url>
cd <repository_folder>**

2. Install Dependencies
Run the following command to install the required dependencies:
**npm install**

3. Configure Environment Variables
Create a .env file in the root directory and add the following environment variables:

   DB_HOST=your_mysql_host

   DB_USER=your_mysql_user

   DB_PASSWORD=your_mysql_password

   DB_NAME=your_mysql_database

   JWT_SECRET=your_jwt_secret

**🚀 API Endpoints**

1. POST /api/register
Register a new user.

Request Body:
json
    
        {
          "name": "John Doe",
          "email": "john.doe@example.com",
          "password": "password123",
          "phone": "1234567890",
          "company": "TechCorp"
        }

Response:
      json
      
        {
          "message": "User Registered",
          "userId": 1
        }


2. POST /api/login
Login an existing user to get a JWT token.

 Request Body:
        json
        
        {
          "email": "john.doe@example.com",
          "password": "password123"
        }
      Response:
        json
        
        {
          "token": "jwt_token"
        }


3. GET /api/get-user
Get a list of all users (Admins only).

Response:
    json
        
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

DELETE /api/delete-user/1
 Response:
     json
        
        {
          "message": "User deleted successfully"
        }


5. PUT /api/update-user
Update an existing user's details (Admins only).

Request Body:
        json
        
        {
          "id": 1,
          "name": "John Doe",
          "email": "john.doe@example.com",
          "phone": "9876543210",
          "company": "TechCorp"
        }
 Response:
     json
        
        {
          "message": "User updated successfully"
        }


6. GET /api/search-user
Search for users by name, email, phone, or company (Admins only).

Example Request:
bash

GET /api/search-user?name=John&company=TechCorp
        Response:
        json
        
        [
          {
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "company": "TechCorp"
          }
        ]


## Authentication & Authorization
Authentication: Each user must log in to receive a JWT token. This token should be passed in the Authorization header for subsequent requests.
Authorization: Only users with the admin role can perform certain operations, such as deleting and updating users.
Example Authorization Header:

Authorization: **Bearer <your_jwt_token>**

Running the Project
To run the project, use the following command: **npm run nodemon**

This will start the server if you intsall nodemon or you can use node server.js.

**Testing the Endpoints**

You can use tools like Postman or Insomnia to test the API endpoints. Ensure that you pass the JWT token for authorized routes such as GET /api/get-user, PUT /api/update-user, and DELETE /api/delete-user.

**Conclusion**

This API allows managing a company's employees with a secure authentication mechanism and a flexible admin interface to perform CRUD operations. Use the endpoints to register, login, update, delete, and search for employees.








