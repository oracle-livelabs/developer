# Securing Oracle REST APIs

## Introduction

You may have noticed throughout these Labs, our Oracle REST APIs did not require authentication (in the form of a Bearer Token). We have deliberately disabled security since it can be easier to test and interact with API endpoints. 

However, best practices for applications such as our example Flask application would require users to authenticate before accessing services.

## Task 1: Understanding Privileges

1. Controlling access to protected resources is done by defining privileges. Privileges restrict access to only users having at least one of a set of specified roles. 

  - A privilege is then associated with one or more resource modules (such as our `flask` Resource Module):

    ![Our Flask Resource Module](images/flask-resource-module-in-oci.png " ")

  - But before those Resource Modules can be accessed, the user must be authenticated and then authorized to ensure that the user has one of the required roles. Here is an example cURL command that includes a Bearer Token for authentication: 

   ![Our Flask Resource Module](images/click-copy-icon-to-copy-token-text.png " ")

## Task 2: Learn about securing Oracle REST APIs 

1. The importance of security cannot be understated. While not required to complete this Workshop, we encourage you to review our **How to build powerful, secure REST APIs for your Oracle Database** Workshop. 

  There you will learn about security principles related to Oracle REST APIs:
    - OAuth 2.0 workflow for authentication. 
    - Quick note on security
    - Snippet of python for call for access token 

2. Once you've completed the Workshop, we encourage you to return to this Flask application and secure your Oracle REST APIs with a workflow like this:

   ![Backend application flow example.](images/backend-application-flow-example.png " ")

     > :brain: You can modify it slightly so it complements the sample Flask application; ensuring services are performed <i>securely</i>. 

3. You may visit the Modern Application Development with Oracle REST Data Services Workshop [here](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=815). Or, in the <b>Other LiveLabs you might like</b> section of this Workshop.

  There you will complete objectives such as:
    - Create an Autonomous Database
   - Connect to your Autonomous Database using Database Actions/SQL Developer Web
    - Create and Auto-REST enable a table
    - Load data into the database
    - Publish RESTful services for various database objects
    - Secure the REST endpoints

4. Congratulations, you've made it to the end of this Workshop! By now you should have a thorough understanding of this sample Flask application. And you should also be familiar with Oracle REST APIs and their various capabilities and characteristics. 

 - You are encouraged to take the provided database scripts, Flask and Python files, and make this application your own. How can you manipulate the Oracle REST APIs to put your own personal spin on the application? 

### You may now proceed to the [next Section](#next).

## Learn More
* [OAuth 2.0 workflows in Python's requests-oauthlib](https://requests-oauthlib.readthedocs.io/en/latest/oauth2_workflow.html#)
* [Protecting ORDS Resources](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/22.2/qsord/get-started-with-oracle-rest-data-services.html#GUID-F6961F9D-C0FA-4ED4-AA88-88FDDF208D83)
* [OAuth 2.0 sessions with Python's Authlib](https://docs.authlib.org/en/latest/client/oauth2.html) 

## Acknowledgements

* **Author** - Chris Hoina, Senior Product Manager, Database Tools
* **Contributors**
  - Jeff Smith, Distinguished Product Manager, Database Tools
  - Zachary Talke, Product Manager, Database Tools
  - Brian Spendolini, Principal Product Manager
* **Last Updated By/Date** - Chris Hoina, August 2022
