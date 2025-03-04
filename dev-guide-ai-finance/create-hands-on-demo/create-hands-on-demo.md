# Title of the Lab

## Introduction

*Describe the lab in one or two sentences, for example:* This lab walks you through the steps to ...

Estimated Time: -- minutes

### About <Product/Technology> (Optional)
Enter background information here about the technology/feature or product used in this lab - no need to repeat what you covered in the introduction. Keep this section fairly concise. If you find yourself needing more than two sections/paragraphs, please utilize the "Learn More" section.

### Objectives

In this lab, you will:
* Load Hands_on Schema Tables and Views
* Configure existing middle tier for launching hands on demo
* Build Application Workflow Pages
* Launch the Application

### Prerequisites

This lab assumes you have:
* An Oracle Cloud account
   


## Task 1: Load Hands_on Schema Tables and Views

 -- **Add data model image**

Step 1 - Load hands_on schema

1. vi 1-introduction.py 
press i to insert
paste the python script

2. vi run.sh
press i to insert
paste

3. Run python3.11 db_hands_on_setup.py

 -- This creates your tables and views and loads data into the  hands_on schema.
  
mkdir -p /home/oracle/.streamlit
echo "[browser]" > /home/oracle/.streamlit/config.toml
echo "serverAddress = \"$PUBLIC_IP\"" >> /home/oracle/.streamlit/config.toml
cd /home/oracle/workshop/app
python3.11 db_hands_on.py
streamlit run 1-introduction.py

Then press escape, :wq and enter



## Task 2: Configure Existing Middle Tier for Launching Hands on Demo

1. Configure .env file

2. Establish hands_on workshop directory structure
    Streamlit/hands_on/...


## Task 3: Build Application Workflow Pages

-- **Quick overview of the general flow** 

1. Build the Introduction Page.

2. Build the Dashboard Page.

3. Build the Customers Page.

4. Build the Loan Decision Page.


## Task 4: Launch the Application

1. Launch the Application


## Learn More

*(optional - include links to docs, white papers, blogs, etc)*

* [URL text 1](http://docs.oracle.com)
* [URL text 2](http://docs.oracle.com)

## Acknowledgements
* **Author** - <Name, Title, Group>
* **Contributors** -  <Name, Group> -- optional
* **Last Updated By/Date** - <Name, Month Year>
