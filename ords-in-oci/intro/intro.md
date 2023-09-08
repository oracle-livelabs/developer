# Expand Oracle REST Data Services into Oracle Cloud Infrastructure

## About this Workshop

Like a swiss army knife or that as-seen-on-tv multi-tool you got from your grandmother on your birthday, Oracle REST Data Services APIs can work with more than just the Oracle Database. This Workshop will walk you through using ORDS to expose an Oracle database to multiple other OCI services and products. You will also practice securing Oracle REST Data Services endpoints for external consumption.

*Estimated Workshop Time:* 2 Hours

### Objectives

In this lab you will create a series of scenarios in OCI where Oracle REST Data Services facilitates the secure loading of different types of data into an Oracle Autonomous Database. Scenarios include:

- Consume a CSV file from Object Storage with a REST enabled table in an Autonomous Database using Functions and Events
- Send Log Data to an Autonomous Database using OCI Logging and the Service Connector Hub and Functions

### Prerequisites

This lab assumes you have:

- Completed the [Getting Started](https://oracle-livelabs.github.io/common/labs/cloud-login/cloud-login-livelabs.md) lab

## Learn More

### About Oracle REST Data Services

Oracle REST Data Services (ORDS) brings HTTPS Methods (`GET`, `PUT`, `POST`, `DELETE`) to your Oracle Database objects. As a mid-tier Java application, ORDS provides a bevy of functions such as:

- Database Management REST APIs
- Database Actions (a web-based version of Oracle SQL Developer)
- JSON and REST API developer tools
- a PL/SQL Gateway
- SODA for REST functions
- Ability to publish RESTful Web Services for your data and stored procedures

The Java EE implementation offers increased functionality including a command line based configuration, enhanced security, file caching, and RESTful web services. Oracle REST Data Services also provides increased flexibility by supporting deployments using Oracle WebLogic Server, Apache Tomcat, and a standalone mode. Oracle REST Data Services further simplifies the deployment process because there is no Oracle home required, as connectivity is provided using an embedded JDBC driver.

### About Functions

Oracle Functions is a fully managed, multi-tenant, highly scalable, on-demand, Functions-as-a-Service platform. It is built on enterprise-grade Oracle Cloud Infrastructure and powered by the Fn Project open source engine. Use Oracle Functions (sometimes abbreviated to just Functions) when you want to focus on writing code to meet business needs.

The serverless and elastic architecture of Oracle Functions means there's no infrastructure administration or software administration for you to perform. You don't provision or maintain compute instances, and operating system software patches and upgrades are applied automatically. Oracle Functions simply ensures your app is highly-available, scalable, secure, and monitored. With Oracle Functions, you can write code in Java, Python, Node, Go, and Ruby (and for advanced use cases, bring your own Dockerfile, and Graal VM). You can then deploy your code, call it directly or trigger it in response to events, and get billed only for the resources consumed during the execution.

More about Functions can be found [here](https://docs.oracle.com/en-us/iaas/Content/Functions/Concepts/functionsoverview.htm).

### About Service Connector Hub

Service Connector Hub is a cloud message bus platform that offers a single pane of glass for describing, executing, and monitoring movement of data between services in Oracle Cloud Infrastructure. Data is moved using service connectors. A service connector specifies the source service that contains the data to be moved, optional tasks, and the target service for delivery of data when tasks are complete. An optional task might be a function task to process data from the source or a log filter task to filter log data from the source.

More about the Service Connector Hub can be found [here](https://docs.oracle.com/en-us/iaas/Content/service-connector-hub/overview.htm).

### About Logging

The Oracle Cloud Infrastructure Logging service is a highly scalable and fully managed single pane of glass for all the logs in your tenancy. Logging provides access to logs from Oracle Cloud Infrastructure resources. These logs include critical diagnostic information that describes how resources are performing and being accessed.

More about Logging can be found [here](https://docs.oracle.com/en-us/iaas/Content/Logging/Concepts/loggingoverview.htm).

## Acknowledgements

- **Authors**

  - Jeff Smith, Distinguished Product Manager
  - Chris Hoina, Senior Product Manager

- **Contributors** - Brian Spendolini

- **Last Updated By/Date** - Chris Hoina, March 2023
