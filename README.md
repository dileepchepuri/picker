🛒 Picker – Full-Stack E-Commerce Web Application

Picker is a full-stack e-commerce web application built using Spring Boot MVC and RESTful APIs, featuring a dynamic user interface and a secured admin dashboard for product management.

🚀 Features
👤 User Features

View all available products

Search and filter products by category

Add products to cart

View cart and total price

Dynamic UI rendered using JavaScript and REST APIs

🔐 Admin Features

Secure admin login using session-based authentication

View all products

Add new products

Update existing products

Delete products

Admin access restricted at backend level

🛠️ Tech Stack

Backend: Java, Spring Boot (MVC, REST APIs)

Frontend: HTML, CSS, JavaScript

Database: MySQL

ORM: Spring Data JPA

Server: Embedded Tomcat

⚠️ No external frameworks (Spring Security, Bootstrap, etc.) were used to clearly demonstrate core fundamentals.

🧩 Architecture Overview

The application follows a clean MVC layered architecture:

Controller → Service → Repository → Database


Controller: Handles HTTP requests and REST endpoints

Service: Contains business logic

Repository: Manages database operations using JPA

Model: Represents database entities

🌐 Application URLs
Purpose	URL
User Home Page	http://localhost:8080/
Admin Login	http://localhost:8080/admin-login
Admin Dashboard	http://localhost:8080/admin
Admin Logout	http://localhost:8080/admin-logout
Products API	http://localhost:8080/api/products
🔒 Security Implementation

Admin authentication implemented using HTTP session

Admin pages and APIs are protected at controller level

User product listing APIs are publicly accessible

Admin UI files are not directly accessible via static paths

⚙️ How to Run the Project
Prerequisites

Java 17+

MySQL

Maven

Steps

Clone the repository

git clone https://github.com/dileepchepuri/picker.git


Create MySQL database

CREATE DATABASE picker;


Update application.properties with DB credentials

Run the application

mvn spring-boot:run


Open browser and access the application

📌 What I Learned

Designing RESTful APIs using proper HTTP methods

Implementing Spring Boot MVC architecture

Handling session-based authentication

Frontend–backend integration using Fetch API

Debugging real-world issues related to routing, sessions, and data binding

Building an industry-style admin vs user workflow
