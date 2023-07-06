Before you Begin
----------------

This 30-minute tutorial shows you how to create a SQL dialog with Oracle Digital Assistant.

### Background

SQL Dialogs are skills that enable users to interact with databases using natural language, not SQL queries. Users don't need to know SQL or anything about the database schema to retrieve information. Instead, they can query the database using a conceptual understanding of the information. A SQL dialog skill can translate a user's natural language utterances into SQL queries, send the queries to a backend data source, and display the response. For the scenario presented in this tutorial, you're going to query an employee database through a skill to find out individual employee information, office location, and head count by location.

### What Do You Need?

*   Access to Oracle Digital Assistant
*   Access to Oracle Database Cloud Service Enterprise Edition

Tip:

You can request a [free trial](https://docs.oracle.com/en/cloud/get-started/subscriptions-cloud/csgsg/request-trial-subscription.html) of Oracle Cloud Service Enterprise Edition instance if you don't already have access to one. To complete this tutorial, you must also provision ATP ([Oracle Autonomous Transaction Processing](https://docs.oracle.com/en-us/iaas/autonomous-database-shared/doc/autonomous-provision.html#GUID-0B230036-0A05-4CA3-AF9D-97A255AE0C08)) on your trial instance.

## Acknowledgements

* **Authors** - John Bassett
* **Contributors** -  Daniel Teixeira, Patrick Keegan
* **Last Updated By/Date** - Daniel Teixeira, January 2023
