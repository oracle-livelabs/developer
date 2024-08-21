# Introduction

In this lab you'll explore using Oracle REST Data Services (ORDS) to make APIs for the data, tables, and objects in your Oracle Autonomous Database. You will primarily work in Database Actions -  a suite of tools designed to speed up your database development and administration tasks.

You'll learn how to create APIs based on your existing SQL and PL/SQL. ORDS aid you in taking your Create Read Update Delete (CRUD) operations and turning them into APIs.

And once you've created your ORDS APIs, you'll learn how to secure them with roles, privileges, and various forms of authentication.

## About this Workshop

In this lab you will:

- Use the browser-based SQL and REST workshop tools
- Connect to your Autonomous Database and REST enable a table
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

ORDS also provides you with the ability to publish RESTful Web Services for interacting with the data and stored procedures located in your Oracle Database.

The Java EE implementation offers increased functionality including a command line based configuration, enhanced security, file caching, and RESTful web services. Oracle REST Data Services also provides increased flexibility by supporting deployments using Oracle WebLogic Server, Apache Tomcat, and a Standalone mode. Oracle REST Data Services further simplifies the deployment process because connectivity is provided using an embedded JDBC driver. Once Java is installed, simply unzip and run ORDS instantly.

### About REST and RESTful Web Services

Representational State Transfer (REST) is a style of software architecture for distributed hypermedia systems such as the World Wide Web. An API is described as RESTful when it conforms to the tenets of REST. Although a full discussion of REST is outside the scope of this document, a RESTful API has the following characteristics:

- Data is modeled as a set of resources. Resources are identified by URIs.
- A small, uniform set of operations are used to manipulate resources (for example, PUT, POST, GET, DELETE).
- A resource can have multiple representations (for example, a blog might have an HTML representation and an RSS representation).
- Services are stateless and since it is likely that the client will want to access related resources, these should be identified in the representation returned, typically by providing hypertext links.

## Acknowledgements

### Authors

- Jeff Smith, Distinguished Product Manager
- Chris Hoina, Senior Product Manager

## Last Updated By/Date

- Chris Hoina, August 2024