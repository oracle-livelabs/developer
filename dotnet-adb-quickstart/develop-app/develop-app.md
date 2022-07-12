# Develop and Deploy the .NET Web Application

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

1. To connect to the instance, use Cloud Shell and enter the following command:

    >**Note:** For Oracle Linux VMs, the default username is **opc**

    ```
    <copy>ssh -i <private_ssh_key> opc@<public_ip_address></copy>
    ```

    ![](images/ssh.png)

2. From Cloud Shell, use the .NET Command Line Interface (CLI) included as part of the Oracle Cloud Developer image by issuing the following command to create a new ASP.NET Core web app project in a new directory TODOLIST.

    ```
    <copy>dotnet new web -o todolist</copy>
    ```

    ![](./images/ssh.png " ")

  This command creates an empty ASP.NET Core empty web project. 

3. Change directory into the TODOLIST directory. Then, add the ODP.NET Core assembly to the project from NuGet Gallery.

    ```
    <copy>cd todolist
	dotnet add package Oracle.ManagedDataAccess.Core</copy>
    ```

    ![](./images/ssh.png " ")

4. Open the **Program.cs** with the Nano editor from the command line.

    ```
    <copy>nano Program.cs
    </copy>
    ```

    ![](./images/ssh.png " ")

5. A new editor window is now open. We will replace all lines of code in this app. Delete all code by typing ***Ctrl-K*** on each line so that you have a blank file.

    ![](./images/ssh.png " ")

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
      //Set the user id and password			
      string conString = "User Id=appuser;Password=<PASSWORD>;Connection Timeout=180;" +
      //Set Data Source value to an Oracle connect descriptor or an Oracle net service name
        "Data Source=<CONNECT DESCRIPTOR>;";
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

2. The **User Id** value has already been set to APPUSER. Add the **Password** and **Data Source** entries. 
In the previous lab, you retrieved the connect descriptor after configuring one-way TLS for Oracle Autonomous Database.

	Save the file and copy the file contents.

3. Return to the Cloud Console to the open **Program.cs** file. Paste the code to this file by typing ***Ctrl-U***.

    ![](./images/ssh.png " ")

4. Close and save the file by typing ***Ctrl-X*** and then ***Y***. The app is now ready to run the app.

## Task 4: Build and Run the App
1. In Cloud Console, build and run the app using the following command:

    ```
    <copy>dotnet watch run
    </copy>
    ```

2. Navigate to `http://<public_ip_address>` (the IP address of the Linux VM) in your browser. You should see that you are connected to your Oracle Autonomous Database and the completed and incomplete tasks in the To Do list.

    ![](./images/ssh.png " ")

Congratulations! You have completed this workshop.

## Want to Learn More?

Click [here](https://www.oracle.com/database/technologies/appdev/dotnet.html) to learn more about developing .NET applications with Oracle database and Oracle Cloud.

## Acknowledgements

- **Author** - Alex Keh
- **Last Updated By/Date** - Alex Keh, July 2022