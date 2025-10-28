# Cleanup

## Introduction

In this lab, we will clean up database objects associated with the lab. This lab is optional. 

Estimated Lab Time: 15 minutes

### Objectives

In this lab, you will:

* Clean up database objects associated with the lab (optional)

### Prerequisites

This lab assumes you have:

* All previous labs successfully completed

## Task 1: Clean up application data

Run the following [SQL script](https://github.com/oracle/microservices-datadriven/blob/main/customer-support-lab/src/test/resources/cleanup.sql) to remove all application data from your database:

```sql
drop view ticket_dv;
drop table related_ticket;
drop index ticket_Vector_ivf_idx;
drop table support_ticket;
```

## Acknowledgements

* **Author** - Mark Nelson, Developer Evangelist, August 2025
* **Contributors** - Mark Nelson, Anders Swanson
* **Last Updated By** - Mark Nelson, August 2025
