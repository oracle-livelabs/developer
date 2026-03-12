# Get Started

## Introduction

You have been provided with three URLs; one is an OCI Object Storage location, another for signing in to Database Actions, and another for accessing a Jupyter lab.  

In this lab, you retrieve the sample application files, configure your sample application, and then execute commands to start-up this sample application.

Some experience in shell commands, Python, JavaScript, and HTML are helpful but not necessary. We've designed this workshop so even the beginner can complete it!

Estimated Time: 10 minutes

### Objectives

In this lab, you will:

* Obtain the application project contents from OCI Cloud Storage
* Sign in to Database Actions as the `MOVIE` user
* Create your ORDS APIs with the provided scripts
* Add your ORDS APIs to your project's files
* Start-up a simple ORDS + Python application

### Prerequisites

* An OCI Always Free, Free Tier, or paid tenancy
* A provisioned Oracle Autonomous Database and Integrated Developer Environment (IDE), or
* Access to a LiveLabs-provided sandbox environment
* Access to Database Actions
* Beginner-level experience in Python, HTML, and Integrated Developer Environments (IDEs)

This lab assumes you have:

* An Oracle account
* All previous labs successfully completed

## Task 1: Retrieve the project from OCI Cloud Storage

1. You have been provided three URLs. One for accessing Database Actions, one for accessing a Jupyter lab, and another for retrieving this workshop's sample application project file from OCI Cloud Storage:  

   [Click here](https://c4u04.objectstorage.us-ashburn-1.oci.customer-oci.com/p/EcTjWk2IuZPZeNnD_fYMcgUhdNDIDA6rt9gaFj_WZMiL7VvxPBNMY60837hu5hga/n/c4u04/b/livelabsfiles/o/labfiles/ocw24flask.zip) to download a copy of the application's project files.  

   If you are unable to click the hyperlink, copy the direct link below, and navigate to it in a new browser tab:  

     ```html
     <copy>
     https://c4u04.objectstorage.us-ashburn-1.oci.customer-oci.com/p/EcTjWk2IuZPZeNnD_fYMcgUhdNDIDA6rt9gaFj_WZMiL7VvxPBNMY60837hu5hga/n/c4u04/b/livelabsfiles/o/labfiles/ocw24flask.zip
     </copy>
     ```

2. Accept any dialogs that may appear, and download the `.zip` file to your `Downloads` folder.  

   ![Accepting terms to download zip file.](images/workshop-presentation-zero-dot-one.png)

   > If you choose to download this file to another folder, note its location. Later, you will need to transfer this `.zip` file to the Jupyter lab.

## Task 2: Database Actions, Part I

1. You have been provided two additional URLs. One for accessing Database Actions, and another one for accessing a Jupyter lab. First, navigate to Database Actions (SQL Developer Web) using the provided URL.  

   ![Login information for green button lab.](images/workshop-presentation-one-minus.png)

2. Several users have been created for you, including a new `MOVIE` user. Its schema has already been REST-enabled, meaning you will be able to Sign in to Database Actions.  

   To Sign in, click the <button type="button" style="pointer-events: none;">Go</button> button under the SQL Developer Web card.

   ![Navigating to SQL Developer Web.](images/workshop-presentation-one.png " ")

   Once the Sign-in screen appears, enter the following credentials, and click the <button type="button" style="pointer-events: none;">Sign-in</button> button:

   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Username: `MOVIE`  
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password: `[See Task 1 of the previous lab]`
  
3. The Database Actions Launchpad will appear. Navigate to the `Development` category, then click `SQL`. A blank SQL Worksheet will appear.

   ![A new SQL Worksheet.](images/workshop-presentation-two.png " ")

      > If this is your first time visiting the SQL Worksheet, a guided tour will appear. You may continue with the tour, or click the <button type="button" style="pointer-events: none;">X</button> (as seen in the image) to exit the tour.

4. You'll notice a `MOVIE` table has already been created for you. This table has also been pre-populated with movie data.

   To view a sample of the table's data<span class="fa fa-file-play" aria-hidden="true"></span> copy and paste the following SQL statement into the SQL Worksheet and click then `Run Statement` icon.

      ```sql
      <copy>
      SELECT * FROM MOVIE FETCH FIRST 10 ROWS ONLY;
      </copy>
      ```

   ![Executing the SQL statement.](images/workshop-presentation-three.png " ")

   You will see results similar to the following image:

   ![Reviewing the results.](images/workshop-presentation-four.png " ")

5. You may notice the varied data types in this table. To take a closer look at how this `MOVIE` table is structured, right-click on the `MOVIE` table, then select `Edit...`. When the `Table Properties` slider appears, click `DDL`, then select the `Create` tab.  

   Note the data types:

   ![Reviewing the Movie table properties.](images/workshop-presentation-four-dot-two.png " ")

      > ORDS APIs will be able to handle all of these various data types and send them to your application.

## Task 3: Jupyter lab, Part I

1. Using the second URL you were provided, log in to your Jupyter lab.  

   ![Using the password from previous task.](images/workshop-presentation-five-minus.png)

   Use the same password from the previous tasks.

   ![Login to Jupyter lab.](images/workshop-presentation-five.png " ")
  
2. Once logged in, you may see several directories. You will need to upload the `ocw24flask` directory to the Jupyter lab. To do this you can simply drag the `.zip` file from your Downloads folder (or from where you saved it to in the earlier Task) into the Jupyter Lab (as seen in the image).  

   ![Drag the zip into the Jupyter lab.](images/workshop-presentation-five-two.png " ")  

   > Ensure the directory has been compressed into a `.zip` format, prior to uploading into the Jupyter Lab.  

      ![Compressing project folder.](images/workshop-presentation-five-two-one.png)

3. Accept any `Large file size` warnings to upload the file.

   ![Accept large file warning.](images/workshop-presentation-five-three.png " ")

4. Once uploaded, select a new Terminal and unzip the project files using the `unzip ocw24flask.zip` command.  

   ![Unzipping the project folder.](images/workshop-presentation-five-five.png " ")

5. Click into the `ocw24flask` folder, from there the `scripts` folder.  

   ![The scripts folder.](images/workshop-presentation-five-six.png " ")

6. Next, double-click the `moviestream_resource_module_definitions.sql` file. This file contains the definitions for your Resource Module, Templates, and Handlers, which are your ORDS APIs.
  
      ![Reviewing the resource definitions file.](images/workshop-presentation-six.png " ")

7. Select all and copy the contents to your clipboard. Then, return to the SQL Worksheet.

## Task 4: Database Actions, Part II

1. Navigate to the SQL Worksheet. Then paste the contents of the `moviestream_resource_module_definitions.sql` file to the SQL Worksheet.
  
2. Click the `Run Script` icon. Upon completion, a `PL/SQL procedure successfully completed` message will appear in the `Script Output` tab.

   ![Running the resource module script.](images/workshop-presentation-seven.png " ")

   > As you may know, the `MOVIE` schema has already been REST-enabled. For this reason, it is not necessary for you to execute the `ORDS.ENABLE_SCHEMA` PL/SQL procedure. Executing this procedure will cause no disruptions. The full script is provided for your convenience.

3. You've just created the ORDS APIs for the `Movie` user. To review the Resource Module, its Resource Templates and Resource Handlers, navigate to the REST Workshop.

   Click the hamburger menu from the top of Database Actions, then click REST.

   ![Navigating to the REST Workshop.](images/workshop-presentation-eight.png " ")

4. You'll notice a single Module in the Workshop's Object panel. Click it, then click the `moviestream` card.

   ![Navigating to the moviestream resource module.](images/workshop-presentation-nine.png " ")

5. You'll now see the newly created Resource Templates. Each Template contains a single `GET` Resource Handler. These are your ORDS APIs; you'll rely on them to feed data to your application.

   ![Acknowledging the resource templates.](images/workshop-presentation-ten.png " ")

6. Next, copy each of these URI's to your clipboard.

   > In a few moments, you will return to the Jupyter lab to input these into the application code.

   ![Adding the ORDS URIs to the clipboard](images/workshop-presentation-eleven.png " ")

## Task 5: Jupyter Lab, Part II

1. Navigate back to the Jupyter lab. Once there, locate the `ocw24flask` directory. Double click the `ordsflask.py` file.

   ![Locating the ordsflask python file.](images/workshop-presentation-twelve.png)

   You will notice two request variables, `r1` and `r2`. They will both have temporary, placeholder URIs.

2. Replace the `r1` temporary URI with the one you captured in the previous lab. The ORDS URI ending in `/movie-genre` will go here. Next, replace the `/r2` temporary URI with the `/movie-all` URI.

   Verify that your `r1` and `r2` variables are structured like those in the image. Then, save your changes.

   ![Locating the ordsflask python file.](images/workshop-presentation-thirteen.png " ")

3. Next, locate the `static` directory, then double-click the `functions.js` file. Here, you will see another ORDS URI placeholder. Replace it with your `/movie-single/:id` URI.

   Verify that your `const response = ...` is structured exactly as the image shows (your URI will differ). Then, save your changes.

   ![Modifying the function.js file.](images/workshop-presentation-fourteen.png " ")

## Task 6: Start the Flask application

1. From the Jupyter Launcher, open a new Terminal.  

   ![Launching a new terminal.](images/workshop-presentation-fourteen-one.png)  

2. If you are not in the `ords24flask` folder, then `cd` to it. Issue the `ls` command to verify the `ordsflask.py` file exists.

   ![Verify in the correct folder.](images/workshop-presentation-fourteen-two.png)

3. Next, issue the following command:

      ```sh
      <copy>
      python ordsflask.py
      </copy>
      ```  

   The Flask development server will start up.  

      ![Executing terminal commands to start the Flask server.](images/workshop-presentation-fourteen-three.png " ")

4. Your application will be available on port 5000. However, you will need to open the application in a new tab. Modify the URL, so you are using the one provided to you for this lab *plus* port `5000`.  

   ![Workshop lab IP address.](images/workshop-presentation-fourteen-four.png)  

   ![Navigating to the correct address plus port 5000.](images/workshop-presentation-fourteen-five.png)

5. Navigate to the new tab and combine the lab's URI with port 5000. Accept any warnings and your application will load.

   ![Navigating to your application.](images/workshop-presentation-fourteen-six.png)

6. The ORDS application will load.  

   ![ORDS application up and running.](images/workshop-presentation-fourteen-seven.png)

7. With the application running, we'll next explore the ORDS APIs and how they feed data to your application.

8. You may now [proceed to the next lab](#next).  

## Learn More

* [ORDS RESTful services terminology](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/developing-REST-applications.html#GUID-50E24524-32BB-470D-8015-6C25C9B47A44)
* [Flask installation and configuration](https://flask.palletsprojects.com/en/3.0.x/installation/)
* [Visual Studio Code Flask tutorial](https://code.visualstudio.com/docs/python/tutorial-flask)

## Acknowledgements

* **Author** - Chris Hoina, Senior Product Manager, Database Tools
* **Contributors** -  Jeff Smith, Distinguished Product Manager, Database Tools
* **Last Updated By/Date** - Chris Hoina, Database Tools, August 2024
