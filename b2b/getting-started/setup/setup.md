# Setup Workshop Prerequisites

## Introduction

This lab walks you through the steps to setup the workshop prerequisites.

Estimated Time: 5 minutes

### Objectives

In this lab, you will:

* Create the required File Server Folders and configure User and Folder permissions.
* Connect an FTP Client to the Oracle Integration File Server.
* Create a Connection to the File Server.
* Create a REST based API Connection.

### Prerequisites

This lab assumes you have:

* Successfully provisioned an Oracle Integration Instance and are able to access the home page.
* Successfully enabled Oracle Integration File Server.
* All instructions assume you are starting from the Oracle Integration Home page.

## Task 1: Configure File Server

Configure File Server settings.

1. Starting at the Oracle Integration **Home** page, select ***Settings***, then ***File Server*** from the left Navigation pane.
2. Select ***Settings*** from left Navigation pane to open the File Server Settings page and review the File Server status and configurations.
![File Server Settings page](images/file-server-settings.png)
**Note**: Ensure the **Authentication Type** is set to ***Password or Key***.
3. Select ***Files*** from left Navigation pane.
![Navigation to Files](images/file-server-files1.png)
4. From the top right click ***Create*** and create a Folder named ***B2BWorkshop***.
![Create Folder](images/file-server-files2.png)
5. Select the ***B2BWorkshop*** Folder and create two additional Folders named ***B2BTPDELLIn*** and ***B2BTPDELLOut***.
![Workshop Folder structure](images/file-server-files3.png)
**Note**: You will be using the above Folder structure in next labs.
6. Select ***Users*** from left Navigation pane. Find and select the user you are currently logged in as.  
If your user has not yet been configured to use File Server, click ***Select*** to configure your user.  
Otherwise, click ***Edit Configuration*** for your user.
7. Configure your user as follows:
    * Select **Home Folder Type** as ***Custom***.
    * Select **Home Folder** as ***B2BWorkshop***.
![User configuration](images/user-permissions2.png)
8. Click the ***X*** icon to close the Property pane. Expand your User Details and notice that **Home Folder Permissions** are not yet provided.
![User Details](images/user-details.png)
![Home Folder Permissions](images/user-permissions3.png)
9. Select ***Files*** from left Navigation pane. Click ***Permissions*** on the **B2BWorkshop** folder.
![Select Folder Permissions](images/user-permissions4.png)
10. Click ***Add Permissions*** and select your user. Click ***Add***.
![Add user to Folder permissions](images/user-permissions5.png)
11. Select ***All*** and ***Propagate to subfolders***. All of the permission check boxes should be checked. Click ***Save*** and exit the Permissions page.
![Folder permissions](images/user-permissions6.png)

## Task 2: Connect to File Server with FTP Client

To access files on the File Server you will need to use an FTP Client. You will need to configure your FTP Client with the following:

* File Server IP Address.
* File Server Port.
* Your Oracle Integration username.
* Your Oracle Integration password.

1. To obtain the File Server IP Address and Port, select **Settings** from left Navigation pane. The IP and Port are located in the **IP and Port Information** section of the **Settings** page.
2. Using your FTP Client choice, connect to the File Server using the SFTP - SSH File Transfer Protocol.  
![Example FTP Client configuration](images/user-permissions7.png)
A example configuration using FileZilla FTP Client.  
If the permissions are configured correctly, you should be able to list, read, and write files on the **B2BWorkshop**, **B2BTPDELLIn**, and **B2BTPDELLOut** Folders.
![Example FTP Client directory listing](images/user-permissions8.png)

## Task 3: Creating Connection with File Server

To access the File Server from an Integration, you will need to create an FTP Connection.  
**Note**: You can use an existing connection if one has already been configured for your environment.

1. Starting at the Oracle Integration **Home** page, select ***Integrations***, then ***Connections*** from the left Navigation pane.
2. Click ***Create***, then select the ***FTP*** Adapter and click ***Select***.
3. From the **Create Connection** dialog, **Name** your connection ***File Server*** and leave the rest of the configurations as defaulted. Click ***Create***.  
**Note**: If you get an error that the identifier already exists, change the Connection Name and remember this name for use later in the workshop.
4. Enter the following configurations in the **FTP Connection** with the information you previously gathered from the File Server Settings page.  
| Field                   | Value                                                 |
|-------------------------|-------------------------------------------------------|
| FTP Server Host Address | From File Server Settings - IP and Port Information   |
| FPT Server Port         | From File Server Settings - IP and Port Information   |
| SFTP Connection         | Yes                                                   |
| Security                | FTP Server Access Policy                              |
| Username                | Your Oracle Integration username                      |
| Password                | Your Oracle Integration password                      |

5. Confirm your Connection by clicking ***Test***, then ***Diagnose & Test***. You should see the **Connection File Server was tested successfully** confirmation message. Click ***Save*** and exit the Connection editor.

## Task 4: Creating Connection with REST Adapter

To expose your B2B integrations as an API, you will need to create a REST Connection.  
**Note**: You can use an existing connection if one has already been configured for your environment.

1. If you are not already on the Connections page, starting at the Oracle Integration Home page, select ***Integrations***, then ***Connections*** from the left Navigation pane.
2. Click ***Create***, then select the ***REST*** Adapter and click ***Select***.
3. From the **Create Connection** dialog, **Name** your connection ***REST Interface***. Set the **Role** to ***Trigger*** and leave the rest of the configurations as defaulted. Click ***Create***.  
**Note**: If you get an error that the identifier already exists, change the Connection Name and remember this name for use later in the workshop.
4. Set the **Security Policy** to ***OAuth 2.0 Or Basic Authentication***.  
![REST Connection configuration](images/rest-interface.png)
5. Confirm your Connection by clicking ***Test***. You should see the **Connection REST Interface was tested successfully** confirmation message. Click ***Save*** and exit the Connection editor.

## Task 5: Download Lab Artifacts

[Download the lab artifacts](https://objectstorage.us-ashburn-1.oraclecloud.com/p/Ei1_2QRw4M8tQpk59Qhao2JCvEivSAX8MGB9R6PfHZlqNkpkAcnVg4V3-GyTs1_t/n/c4u04/b/livelabsfiles/o/oci-library/b2b-getting-started.zip) and unzip in a folder **b2b-getting-started**

You may now **proceed to the next lab**.

## Learn More

* [File Server](https://docs.oracle.com/en/cloud/paas/integration-cloud/file-server/file-server-overview.html)
* [About Connections](https://docs.oracle.com/en/cloud/paas/integration-cloud/integrations-user/integration-cloud-service-concepts.html#GUID-DDA9C4B9-BCB0-4F4D-BA51-44FB610AEA1C)

## Acknowledgements

* **Author** - Kishore Katta, Technical Director, Oracle Integration Product Management
* **Contributors** - Subhani Italapuram, Oracle Integration Product Management
* **Last Updated By/Date** - Oracle Integration team, December 2021
