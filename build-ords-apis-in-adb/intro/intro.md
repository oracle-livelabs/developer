# Introduction

In this lab, you will learn about Oracle REST Data Services (ORDS). ORDS makes it simple for you to securely and quickly build APIs based on your Tables, Views, JSON-Relational Duality Views, SQL, PL/SQL, Procedures, Functions, MLE/JS modules, and more. 

You'll discover how easy ORDS makes it to turn your business logic and Create, Read, Update, and Delete (CRUD) operations into APIs. ORDS stores all definitions and metadata in the Oracle database; so operations are highly secure and responsive. ORDS even has its own OAuth2.0 capabilities as well; you'll learn about ORDS Roles, Privileges, and the supported OAuth2.0 Grant Types. 

In this lab, you'll perform much of your work in the browser-based UI SQL Developer Web. This lab assumes you have access to an Oracle Autonomous Database 23ai, but ORDS ships automatically in OCI, and is avilable for download for your on-prem, hybrid, and containerized deployments too.

## About this Workshop

In this lab, you will:

- Explore ORDS' SQL Developer Web and the REST Workshop
- Connect to your Autonomous Database 23ai and create new database objects
- Explore automatic and customizable ORDS REST APIs

Estimated Workshop Time: 90 minutes

## Objectives

- Create an Autonomous Database and Connect to your Autonomous Database 23ai
- Create and Auto-REST enable tables
- Insert data into the database
- Publish ORDS APIs for `GET` and `POST` operations
- Explore ORDS OAuth2.0 Clients, Roles, and Privileges

## Learn More

### About ORDS

Oracle REST Data Services (ORDS) brings the power of REST to your Oracle Database. ORDS, which is included automatically in the Autonomous Database, is highlighted by the following interfaces and capabilities: 

- SQL Developer Web - a browser-based UI for the Oracle database
- PL/SQL Gateway - for directe execution of PL/SQL Stored Procedures
- JSON Collections, MLE/JS module support
- Database API for MongoDB 
- ORDS Database Management and Monitoring APIs
- Support for GraphQL queries
- Java plug-in framework - for extending functionality of self-managed ORDS deployments
- SODA for REST
- ...and more!

#### Flexiblity

ORDS ships automatically with the Autonomous Database, but is free to download and deploy. ORDS, a Java EE application, can be deployed to connect to any of your Oracle databases. With a self-managed ORDS deployment you can take advantage of a command-line-based configuration, enhanced security, file caching, JDBC and pool configuration, and enhanced customization for your ORDS RESTful APIs. 

Oracle REST Data Services can be deployed in a number of ways: 
- Oracle WebLogic Server
- Apache Tomcat
- Standalone mode (Embedded Jetty server).

### About REST and RESTful Web Services

ORDS is based on the principal of `Representational State Transfer (REST)`--a style of software architecture for distributed hypermedia systems such as the World Wide Web. An API is described as "RESTful" when it conforms to the tenets of REST. Although a complete discussion of REST is outside the scope of this document, a RESTful API has the following characteristics:

- Data is modeled as a set of resources. URIs identify resources.
- A small, uniform set of operations is used to manipulate resources (for example, PUT, POST, GET, DELETE).
- A resource can have multiple representations (for example, a blog might have an HTML and RSS representation).
- Hypertext links for accessing related resources.

### Let's Get Started

You may now [proceed to the next lab](#next).

## Acknowledgements

### Authors

- Jeff Smith, Distinguished Product Manager
- Chris Hoina, Senior Product Manager

## Last Updated By/Date

- Chris Hoina, September 2025
