# Develop and deploy the .NET web application

## Introduction

In this lab, you will create a simple ASP.NET Core app, connnect to Oracle Autonomous Database using Oracle Data Provider for .NET (ODP.NET), and retrieve data to the web page on the OCI VM you previously set up. You will then publish the web app so that it can be accessed from a browser.

Note: This lab has been validated with ASP.NET Core 6. Some variations in the ASP.NET Core code may be necessary if you are using another version.

Estimated lab time: 10 minutes

### Objectives
-   Create a new ASP.NET Core web app
-   Configure the app to use NGINX web server
-   Develop app and connect to Oracle Autonomous Database with ODP.NET Core
-   Build and run the app

### Prerequisites

-   This lab requires completing all the previous labs in this workshop.

## Task 1: Create ASP.NET Core Web App

We will connect to Cloud Shell again to begin developing the ASP.NET Core part of the To Do List application. The project will incorporate ODP.NET Core for data access between the app and Oracle Autonomous Database.

1. Open Cloud Shell by clicking on its icon on the top right part of the menu bar.

    ![Click Cloud Shell icon](./images/cloud-shell-icon.png)

2. SSH into the web server machine by running the following command from Cloud Shell:

    ```
    <copy>ssh -i <key_directory_path><private_ssh_key> opc@<public_ip_address></copy>
    ```
Provide the same private key, the key directory path (i.e. .ssh/) and machine public IP as previously done in Lab 4.

3. We will use the .NET Command Line Interface (CLI) included with the Oracle Cloud Developer image. Execute the following command to create a new ASP.NET Core web app project in a new directory TODOLIST:

    ```
    <copy>dotnet new web -o todolist</copy>
    ```

  This command creates an empty ASP.NET Core empty web project. 

4. Change directory into the TODOLIST directory. Then, add the ODP.NET Core assembly to the project from NuGet Gallery.

    ```
    <copy>cd todolist
	dotnet add package Oracle.ManagedDataAccess.Core</copy>
    ```

## Task 2: Configure App to Use NGINX Web Server
We will now configure the web project to be able to use the NGINX web server.

1. Trust the certificate? Setup reverse proxy server?

    ![](./images/ssh.png " ")

## Task 3: Develop App and Connect to Oracle Autonomous Database with ODP.NET Core
We will create a simple web application that returns the current tasks (DESCRIPTION column) and their completion status (DONE column) from the TODOITEM table. Modify the ASP.NET Core app to connect to your Oracle Autonomous Database instance to retrieve this data and display it on a web page.

1. Copy and paste the following .NET sample code to a local text file to modify.

    ```
    <copy>using Oracle.ManagedDataAccess.Client;
    using System.Data;
    
    var builder = WebApplication.CreateBuilder(args);
    var app = builder.Build();
    app.MapGet("/", () => "Hello World!");
    
    app.Run(async context =>
    {
          //Set the user id, password and data source
          //Set Data Source value to Oracle connect descriptor or net service name
          string conString = "User Id=appuser;Password=<PASSWORD>;Data Source=<CONNECT DESCRIPTOR>;Connection Timeout=180;";
    
     

          using (OracleConnection con = new OracleConnection(conString))
          {
            using (OracleCommand cmd = con.CreateCommand())
            {
              try
              {
                con.Open();
                await context.Response.WriteAsync("Connected to Oracle Autonomous DB.\n\n");
    
                //Retrieve TODOITEM table with completion status of each task
                cmd.CommandText = "SELECT description, done FROM todoitem";
                OracleDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                  if (reader.GetBoolean(1))
                    await context.Response.WriteAsync(reader.GetString(0) + " is done.\n");
                  else
                    await context.Response.WriteAsync(reader.GetString(0) + " is NOT done.\n");
                }              
    
                reader.Dispose();
              }
              catch (Exception ex)
              {
                await context.Response.WriteAsync(ex.Message);
              }
            }
          }
    });
    app.Run();
    </copy>
    ```

2. The **User Id** value has already been set to APPUSER. Change this value if the database user you created has another name. 

     Add the **Password** and **Data Source** entries. In the previous lab, you retrieved the connect descriptor after configuring one-way TLS for Oracle Autonomous Database.

     Save the file and copy the entire file text.

3. Return to the Cloud Console to modify the **Program.cs** file with this code. First, delete the default file contents first.

    ```
    <copy>echo "" > Program.cs
    </copy>
    ```

4. Open the **Program.cs** with the Nano editor from the command line.

    ```
    <copy>nano Program.cs
    </copy>
    ```

5. Paste the code to this file by typing ***Ctrl-V***.

6. Save and close the file by typing ***Ctrl-X***, then ***Y***, then a carriage return. The app is now ready to run.

## Task 4: Build and Run the App
1. In Cloud Console, build and run the app using the following command:

    ```
    <copy>dotnet watch run
    </copy>
    ```

2. Navigate to `http://<public_ip_address>` (the IP address of the Linux VM) in your browser. You should see that you are connected to your Oracle Autonomous Database and the completed and incomplete tasks in the To Do list.

    ![Connect to web app and see the database results](./images/see-results.png " ")

Congratulations! You have completed this workshop.

The next lab cleans up the resources you created during the workshop. You may now **proceed to the next lab.**

## Want to Learn More?

Click [here](https://www.oracle.com/database/technologies/appdev/dotnet.html) to learn more about developing .NET applications with Oracle database and Oracle Cloud.

## Acknowledgements

- **Author** - Alex Keh
- **Last Updated By/Date** - Alex Keh, August 2022