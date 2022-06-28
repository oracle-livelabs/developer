# How to build powerful, secure REST APIs for your Oracle Database

## Introduction
Oracle REST Data Services (ORDS) bridges HTTPS and your Oracle Database. A mid-tier Java application, ORDS provides a Database Management REST API, SQL Developer Web, a PL/SQL Gateway, SODA for REST, and the ability to publish RESTful Web Services for interacting with the data and stored procedures in your Oracle Database. 

The Java EE implementation offers increased functionality including a command line based configuration, enhanced security, file caching, and RESTful web services. Oracle REST Data Services also provides increased flexibility by supporting deployments using Oracle WebLogic Server, Apache Tomcat, and a standalone mode. Oracle REST Data Services further simplifies the deployment process because there is no Oracle home required, as connectivity is provided using an embedded JDBC driver.


Watch the video below for a comprehensive overview of REST and how ORDS provides what you need to deliver RESTful Services for your Oracle Database.

[](youtube:rvxTbTuUm5k)

<if type="odbw">If you would like to watch us do the workshop, click [here](https://youtu.be/t0MkIxMKhDo).</if>

### About this Workshop

Starting with a simple CSV document, you'll quickly create a new Autonomous Database with a new table based on that CSV. And instead of using SQL or PL/SQL to interact with your new table, we'll show you how to quickly build no-code full Create Read Update Delete (CRUD) REST APIs.

Like code? No problem! We'll show you how to take YOUR SQL and/or PLSQL and leverage that with your own REST APIs. No need to learn Java, JavaScript, Python, or anything else - it's all done via the language of the Oracle Database.

Once your APIs are ready for prime-time, we'll show you how to SECURE them with OAuth2 clients.

Estimated Workshop Time: 60-90 minutes

### Objectives

- Create an Autonomous Database
- Connect to your Autonomous Database using Database Actions/SQL Developer Web
- Create and Auto-REST enable a table
- Load data into the database
- Publish RESTful services for various database objects
- Secure the REST endpoints

### Prerequisites
This lab assumes you have completed the following labs:
* Lab: [Login to Oracle Cloud](https://objectstorage.us-phoenix-1.oraclecloud.com/p/SJgQwcGUvQ4LqtQ9xGsxRcgoSN19Wip9vSdk-D_lBzi7bhDP6eG1zMBl0I21Qvaz/n/c4u02/b/common/o/labs/cloud-login/pre-register-free-tier-account.md)
* Lab: [Provision an Autonomous Database](https://raw.githubusercontent.com/oracle/learning-library/master/data-management-library/autonomous-database/shared/adb-provision/adb-provision.md)
* Lab: [Connect to your Autonomous Database using Database Actions/SQL Developer Web](https://objectstorage.us-phoenix-1.oraclecloud.com/p/SJgQwcGUvQ4LqtQ9xGsxRcgoSN19Wip9vSdk-D_lBzi7bhDP6eG1zMBl0I21Qvaz/n/c4u02/b/common/o/labs/sqldevweb-login/sqldevweb-login.md)

## Developing RESTful Services in Autonomous Database

In this lab you will use the browser-based SQL and REST workshop tools, connect to your Autonomous Database and REST enable a table. You will then secure that REST endpoint all within a single UI.

### **Lab 1:** Login to the Oracle Cloud

### **Lab 2:** Provision an Autonomous Database

### **Lab 3:** Connect to your Autonomous Database using Database Actions/SQL Developer Web

### **Lab 4:** Create and Auto-REST enable a table

### **Lab 5:** Load data and create business logic in the database

### **Lab 6:** REST enable tables and business logic

### **Lab 7:** Securing the REST endpoints

## Learn More about REST

### About RESTful Web Services

Representational State Transfer (REST) is a style of software architecture for distributed hypermedia systems such as the World Wide Web. An API is described as RESTful when it conforms to the tenets of REST. Although a full discussion of REST is outside the scope of this document, a RESTful API has the following characteristics:

- Data is modeled as a set of resources. Resources are identified by URIs.
- A small, uniform set of operations are used to manipulate resources (for example, PUT, POST, GET, DELETE).
- A resource can have multiple representations (for example, a blog might have an HTML representation and an RSS representation).
- Services are stateless and since it is likely that the client will want to access related resources, these should be identified in the representation returned, typically by providing hypertext links.

### RESTful Services Terminology

This section introduces some common terms that are used throughout this lab:

**RESTful service**: An HTTP web service that conforms to the tenets of the RESTful architectural style.

**Resource module**: An organizational unit that is used to group related resource templates.

**Resource template**: An individual RESTful service that is able to service requests for some set of URIs (Universal Resource Identifiers). The set of URIs is defined by the URI Pattern of the Resource Template

**URI pattern**: A pattern for the resource template. Can be either a route pattern or a URI template, although you are encouraged to use route patterns.

**Route pattern**: A pattern that focuses on decomposing the path portion of a URI into its component parts. For example, a pattern of /:object/:id? will match /emp/101 (matches a request for the item in the emp resource with id of 101) and will also match /emp/ (matches a request for the emp resource, because the :id parameter is annotated with the ? modifier, which indicates that the id parameter is optional).

**URI template**: A simple grammar that defines the specific patterns of URIs that a given resource template can handle. For example, the pattern employees/{id} will match any URI whose path begins with employees/, such as employees/2560.

**Resource handler**: Provides the logic required to service a specific HTTP method for a specific resource template. For example, the logic of the GET HTTP method for the preceding resource template might be:
```
select empno, ename, dept from emp where empno = :id
```
**HTTP operation**: HTTP (HyperText Transport Protocol) defines standard methods that can be performed on resources: GET (retrieve the resource contents), POST (store a new resource), PUT (update an existing resource), and DELETE (remove a resource).


## Acknowledgements

 - **Authors** - Jeff Smith, Distinguished Product Manager, The Raleigh Cobra, Product Manager ![RC](./images/cobra.png)
 - **Last Updated By/Date** - Jeff Smith, July 2022