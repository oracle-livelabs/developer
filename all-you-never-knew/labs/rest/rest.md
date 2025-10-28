# Spring Boot REST Capabilities

## Introduction

In this lab, we will explore the Spring Boot customer service application using the basic `rest` profile.


Estimated Lab Time: 15 minutes

### Objectives

In this lab, you will:

* Explore the Spring Boot customer service application
* Run the application using the `rest` profile
* Run sample cURL commands to test the application

### Prerequisites

This lab assumes you have:

* All previous labs successfully completed

## Task 1: Understanding the Spring Boot application

The `rest` Spring Boot profile enables a basic RESTController to create and view customer support tickets. This profile includes Oracle Database connectivity, and HTTP endpoints to GET and POST support tickets.

As we progress through the workshop, we'll progressively enhance the application with advanced features of Oracle Database.

## Task 2: Running the application

Before running the application, run the `user.sql` script on your database and configure the following environment variables:

```bash
JDBC_URL=jdbc:oracle:thin:@<my TNS alias>?TNS_ADMIN=/path/to/wallet;
OCI_COMPARTMENT_ID=<embedding model compartment id>;
TNS_ALIAS=<tns alias>;
WALLET_DIR=</path/to/wallet>
```

Start the application using `maven`:

```bash
mvn spring-boot:run
```

## Task 3: Testing the REST endpoints

With the application running, we can test the basic Spring Boot REST endpoints, creating and retrieving ticket data from the database:

```bash
curl -X POST -H 'Content-Type: application/json' \
  "http://localhost:8080/tickets" \
  -d '{"title": "My ticket", "description": "Need help with XYZ!"}'
```

#### Retrieve a ticket

```bash
curl -X GET "http://localhost:8080/tickets/{id}"
```

#### Retrieve all tickets
 ```bash
curl -X GET "http://localhost:8080/tickets"
```


## Learn More

* [Spring Cloud Oracle](https://github.com/oracle/spring-cloud-oracle)

## Acknowledgements

* **Author** - Mark Nelson, Developer Evangelist, August 2025
* **Contributors** - Mark Nelson, Anders Swanson
* **Last Updated By** - Mark Nelson, August 2025
