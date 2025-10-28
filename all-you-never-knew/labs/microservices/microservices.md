# Get started - Customer Support Microservice

## Introduction

In this lab, you'll set up your local environment to run the customer support application.

This lab forms the basis for the rest of the workshop, as we progressively enhance the base application with advanced Oracle Database features.

Estimated Time: 15 minutes

### Objectives

* Download the lab code and set up the environment

### Prerequisites

This lab assumes you have:

* All previous labs successfully completed

## Task 1: Download the lab code

Download the lab code from the [microservices-datadriven](https://github.com/oracle/microservices-datadriven/) repository.

Change directory into the lab.

```bash
<copy>
cd microservices-datadriven/customer-support-lab
</copy>
```

## Task 2: Run database setup scripts

In a SQL Worksheet for your database, run the following setup scripts:

1. [`user.sql`](https://github.com/oracle/microservices-datadriven/blob/main/customer-support-lab/src/test/resources/user.sql): configures a user for the customer support application
2. [`init.sql`](https://github.com/oracle/microservices-datadriven/blob/main/customer-support-lab/src/test/resources/init.sql): creates database objects in the customer support application.

## Task 3: Set environment variables for the application

You will need your database wallet, TNS alias, and OCI compartment OCID to complete this section.

```bash
export JDBC_URL=jdbc:oracle:thin:@<my TNS alias>?TNS_ADMIN=/path/to/wallet;
export OCI_COMPARTMENT_ID=<embedding model compartment id>;
export TNS_ALIAS=<tns alias>;
export WALLET_DIR=</path/to/wallet>
```

## Task 4: Start the customer support application

From the root of the downloaded lab code, run the following Maven command to start the application:

```bash
<copy>
mvn spring-boot:run
</copy>
```

You may now proceed to the next lab.

## Acknowledgements

* **Author** - Mark Nelson, Developer Evangelist, August 2025
* **Contributors** - Mark Nelson, Anders Swanson
* **Last Updated By** - Mark Nelson, August 2025
