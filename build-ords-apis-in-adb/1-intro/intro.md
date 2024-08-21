# Introduction

In this lab, you will explore using Oracle REST Data Services (ORDS) to make APIs for the data, tables, and objects in your Oracle Autonomous Database. You will primarily work in Database Actions -  a suite of tools designed to speed up your database development and administration tasks.

You'll learn how to create APIs based on your existing SQL and PL/SQL. ORDS helps you turn your Create, Read, Update, and Delete (CRUD) operations into APIs.

Once you've created your ORDS APIs, you'll learn how to secure them with roles, privileges, and various forms of authentication.

## About this Workshop

In this lab, you will:

- Use the browser-based SQL and REST workshop tools
- Connect to your Autonomous Database and REST to enable a table
- You will then secure that REST endpoint all within a single UI

[Video overview explaining the many features of ORDS](youtube:rvxTbTuUm5k)

<if type="odbw">If you would like to watch us demo the workshop, click [here](https://youtu.be/t0MkIxMKhDo).</if>

Estimated Workshop Time: 60-90 minutes

## Objectives

- Create an Autonomous Database
- Connect to your Autonomous Database using Database Actions/SQL Developer Web
- Create and Auto-REST enable a table
- Load data into the database
- Publish RESTful services for various database objects
- Secure the REST endpoints

## Learn More

### About ORDS

Oracle REST Data Services (ORDS) bridges HTTPS and your Oracle Database. ORDS, a mid-tier Java application, provides:

- a Database Management REST API
- SQL Developer Web
- a PL/SQL Gateway
- SODA for REST

ORDS also allows you to publish RESTful Web Services to interact with the data and stored procedures in your Oracle Database.

The Java EE implementation offers increased functionality, including a command-line-based configuration, enhanced security, file caching, and RESTful web services. Oracle REST Data Services also provides increased flexibility by supporting deployments using Oracle WebLogic Server, Apache Tomcat, and a Standalone mode. ORDS further simplifies the deployment process by allowing connectivity with its embedded JDBC driver. Once you've installed Java, unzip and run ORDS instantly.

### About REST and RESTful Web Services

Representational State Transfer (REST) is a style of software architecture for distributed hypermedia systems such as the World Wide Web. An API is described as RESTful when it conforms to the tenets of REST. Although a complete discussion of REST is outside the scope of this document, a RESTful API has the following characteristics:

- Data is modeled as a set of resources. URIs identify resources.
- A small, uniform set of operations is used to manipulate resources (for example, PUT, POST, GET, DELETE).
- A resource can have multiple representations (for example, a blog might have an HTML and RSS representation).
- Hypertext links for accessing related resources.

## Acknowledgements

### Authors

- Jeff Smith, Distinguished Product Manager
- Chris Hoina, Senior Product Manager

## Last Updated By/Date

- Chris Hoina, August 2024
