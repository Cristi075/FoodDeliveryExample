# Food Delivery App

This is a web application that can be used by a small catering company to receive and track order from its clients.
This was created by me for the Distributed Systems class at the Technical University of Cluj-Napoca.

## Requirements

* The application should have 3 types of users
	* Administrators
		* performs CRUD operations on menu items and on users
	* Clients
		* can see the products
		* can place a new order. An order has one or more products and a delivery address
		* can add a new delivery address or modify an existing one
	* Employees
		* Can see existing orders
		* Can change the status of an order to 'Delivered'
		* Can generate a receipt for an order
		* Can see a route to the delivery address (using Google Maps API)
* When the status of an order is changed the client should be notified
* An unregistered user should be able to create a new account (no security measures are in scope for this project)
* The system should validate the input from the users
* The system should not allow the users to access data they don't have access to

## Technologies used

Some of the highlights of what was used to create this project:
* MySQL for the database database
* Spring Boot for the backend server
* Hibernate ORM
* Angular (v5) for the frontend (using angular-cli)
* Authentication using Spring Security and Json Web Tokens (JWTs)

More to be added....
