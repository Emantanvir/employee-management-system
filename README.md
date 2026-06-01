Employee Management System

A full-stack CRUD application built using ASP.NET Core Web API, Entity Framework Core, SQL Server, React Vite, Material UI, and Axios.

Project Overview

This project is an Employee Management System where users can add, view, update, and delete employee records.

Tech Stack
Backend
ASP.NET Core Web API
Entity Framework Core
SQL Server
Controller-Service-Repository pattern
DTOs
Validation
Dependency Injection
Async/Await
EF Core Migrations
Frontend
React with Vite
Material UI
Axios
Snackbar notifications
Loading indicator
Add/Edit employee form
Delete confirmation dialog
Features
View employee list
Add new employee
Edit existing employee
Delete employee with confirmation dialog
Form validation
Snackbar success/error notifications
Loading indicator
SQL Server database integration
Employee Fields
Id
First Name
Last Name
Email
Phone
Department
Created Date
Backend API Endpoints
Method	Endpoint	Description
GET	/api/employees	Get all employees
GET	/api/employees/{id}	Get employee by ID
POST	/api/employees	Create new employee
PUT	/api/employees/{id}	Update employee
DELETE	/api/employees/{id}	Delete employee
Backend Setup
Open the backend solution in Visual Studio:
EmployeeManagement.API/EmployeeManagement.API.sln
Update the connection string in appsettings.json if required:
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=EmployeeManagementDb;Trusted_Connection=True;TrustServerCertificate=True;"
}
Open Package Manager Console and run:
Add-Migration InitialCreate
Update-Database
Run the backend project from Visual Studio.

The backend API will run on a localhost URL such as:

https://localhost:7007
Frontend Setup
Open terminal inside the frontend folder:
employee-management-ui
Install dependencies:
npm install
Run the frontend:
npm run dev

The frontend will run on:

http://localhost:5173
Important Note

Make sure the backend API URL in:

employee-management-ui/src/api/employeeApi.js

matches the backend localhost port.

Example:

const API_URL = "https://localhost:7007/api/employees";
How to Run the Full Project
Run the backend from Visual Studio.
Run the frontend from VS Code using:
npm run dev
Open:
http://localhost:5173
Project Structure
EmployeeManagementSystem
│
├── EmployeeManagement.API
│   └── EmployeeManagement.API
│       ├── Controllers
│       ├── Data
│       ├── DTOs
│       ├── Models
│       ├── Repositories
│       ├── Services
│       ├── Program.cs
│       └── appsettings.json
│
├── employee-management-ui
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
Author

Developed as an internship task for a full-stack CRUD application.
