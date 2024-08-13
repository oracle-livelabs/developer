# Integrating ORDS APIs into your applications

## Introduction

This workshop illustrates how Oracle REST Data Services (ORDS) can simplify the process of exposing your data to external services and third-party applications. It uses a Flask/Python application to highlight how ORDS APIs can be easily "dropped" into existing code.

ORDS does not require additional libraries or Object-Relational Mapping (ORM) tools to function. Everything is stored in and serviced from your Oracle database.

The sample application in this workshop uses ORDS, the Flask framework, Jinja2 (a template engine), and JavaScript.

Estimated Time: 5 minutes

### About Oracle REST Data Services

Oracle REST Data Services is a *free* Java application responsible for:

1. Listening for and handling HTTP/HTTPS web requests, *then*
2. As a proxy/universal `ORDS_PUBLIC_USER` database user satisfying these requests, where finally
3. Responding to the requesting end user, client, or application with the results of that HTTP/HTTPS request

HTTP requests can be one of the following methods:

* `GET`
* `POST`
* `PUT`
* `PATCH`
* `UPDATE`
* `DELETE`

ORDS makes REST-enabling SQL, PL/SQL stored procedures and functions, Views, Tables, and other database objects intuitive and simple. ORDS is pre-installed and configured in all OCI regions, for the Oracle Autonomous Database. ORDS is also available for download to be installed and configured for your on-premises database deployments.

ORDS supports high-availability deployments, it can be run as a standalone process, and can also be deployed in your choice of Java Enterprise application servers:

* Oracle WebLogic
* Apache Tomcat

### Objectives

In this lab, you will become acquainted with:

* Oracle REST Data Services
* Methods and operations available in ORDS

### Prerequisites

* An OCI Always Free, Free Tier, or paid tenancy
* A provisioned Oracle Autonomous Database, or
* Access to a LiveLabs-provided sandbox environment
* Beginner-level experience in Python, HTML, and Integrated Developer Environments (IDEs)

This lab assumes you have:

* An Oracle account
* All previous labs successfully completed

## Learn More

* [ORDS home](https://www.oracle.com/database/technologies/appdev/rest.html)
* [ORDS forum](https://forums.oracle.com/ords/apexds/domain/dev-community/category/oracle_rest_data_services)
* [Jinja](https://jinja.palletsprojects.com/en/3.1.x/)
* [Flask](https://flask.palletsprojects.com/en/3.0.x/)

## Acknowledgements

* **Author** - Chris Hoina, Senior Product Manager, Database Tools
* **Contributors** -  Jeff Smith, Distinguished Product Manager, Database Tools
* **Last Updated By/Date** - Chris Hoina, Senior Product Manager, Database Tools
