# 🧠 Hackathon Challenge  

## Introduction  

**Welcome to the Hackathon Challenge!**  

The data science team at SeerEquities is focused on building a data-driven approval system.  Currently, the objective is to share loan information with the Marketing team.  

This lab guides you through creating and sharing data products using Oracle Data Platform tools.  

As a share provider, you will create a data share and add a table to it.  Next, you will setup a recipient that will have access to that data share.  

Finally, you will publish the data share and send the recipient an activation link needed to access the data share.  

In this lab, you will:  
*  Utilize a data share provider account (**LOAN user**) that logs in and manages the data shares for the recipients of the data share (**MARKETING user**)  
*  Leverage an Object Storage bucket to store the shared data - **MyDemoBucket**  
*  Create and publish data share - **LoanApp\_SharetoMarket**  
*  Create and authorize a data share recipient  

## Task 1: Create Data Product  

1. **Navigate to your assigned ADB Instance.**  

   a. Open Navigation Menu  
   b. Select Oracle Database  
   c. Select Autonomous Database  
   d. Select name of assigned database.  

2. Select the name of your assigned database.  

3. Select **Database Actions**, then view all database actions.  

4. Sign out of **Database Actions** page as ADMIN user.  

5. From **Database Actions Launchpad**, click the user icon in the top right corner to sign-on as the LOAN user.  

   a. Enter LOAN user credentials.  
   b. Press Sign-In button.  

6. **Create a Data Product**  

   a. Select **Data Studio** from the menu bar, then choose **Data Share** from left rail.  
   b.  Click **Provide Share** on the **Provider and Consumer** page.  
   c. Click **Provider Identification** on the **Provide Share** page.  
   d. Provide details for the provider in the **Provider Identification** popup window.  

      Name: **LoanApp\_Share\_Provider**             
      Email: **MyEmail@MyCompany.com**                
      Description: **meaningful description**  
   
   e. Click **Save**.  

7. **Create New Data Share**  

   a. Click **Shares** on the **Provide Share** page.  
   b. Provide details on the **General** page of the **Create Share** wizard.  

      Name: **LoanApp\_ShareToMarketing**  
      Description: meaningful description (optional)  

   c. Click **Next** 📄  
   d. Specify the cloud location where the share will be published on the **Publish Details** page.  
   
      Select **MyDemoBucket** from the drop-down list.  

   e. Click **Next** 📄  
   f. Choose the table that will be made available for the Marketing Team, on the **Select Tables** page.  

      Select **Share\_Loan_Data\_Marketing\_VW** table in the **Available Tables** column.  
      Click the **move (>)** button to copy it to the **Shared Tables** column  
   
   g. Click **Next** 📄  
   h. Click **New Recipients**, on the following page.  
   i. Enter details about the recipient in the **Create Share Recipient** page.  

      Name: **Marketing\_Dept\_Lead**  
      Description: **Marketing Department Data Engineering Lead (optional)**  
      Email: **a meaningful description (optional)**  

   j. Click **Create.** 📄  
   k. In the **Create Share** page, Click on the **copy** icon to capture the recipient’s profile activation link to the clipboard.  
   l. Click **Create.**  

5. **Publish the New Share**  

   a. Paste the activation link URL in browser window.  
   b. Click **Get Profile Information** to envoke download.  
   c. Rename file to **Marketing\_Delta\_Share\_Profile.json.**  

## Task 2 - Share the Data Product  

1. **Manage the New Share**  

   a. Publish your **Client\_Loans\_Marketing\_Dept\_View** data, so that the Marketing team can quickly grab data whenever they need insights.  
   b. On **Provide Share** page, click action icon to manage the data product share.  
   c. Select **Recipients and Profiles** from the dropdown menu.  
   d. From here, you can add or remove recipients from **Recipients and Profiles** page.  
   e. Click **Cancel.**   
   f. From **Provide Share** page, click **Recipients** to display the recipients for the data share.  

   ***Congratulations you have shared your data from ADB to the Risk Dept Lead.***

## Task 3 – Subscribe to Data Product  

1. **Sign-on as MARKETING User.**  

   a. Select **Database Actions**, then view all database actions.  
   b. Sign-out of **Database Actions** page as the current user.  
   c. Sign-on as **MARKETING** user.  

2. **Create a Subscription**  

   a. Subscribe to published **Client\_Loans\_Marketing\_Dept\_View** data to ensure the Marketing team’s custom loan data is at your fingertips.  
   b. At **Database Actions** page, click **Data Studio**.  
   c. On the **Data Share** page, click on the left rail.  
   d. Click **Consume Share** on **Provider and Consumer** page.  
   e. On **Consume Share** page, click **Subscribe to Share   Provider** drop-down button.  
   f. Select **Subscribe to Delta Share Provider** from the drop-down list.  Then enter the following details, once **Subscribe to Share Provider** wizard is displayed:  

      Share Source: **Delta Share Provider JSON (the default selection)**  
      Share Provider JSON: **From File (the default selection)**  
      Delta Share Profile JSON: **Click** the box and navigate to location where you downloaded the data share profile.  Select **MARKETING\_Delta\_Share\_Profile.json** and click **Open**.  
      Provider Name: **LoanApp\_Share\_Provider**  
      Description: **Subscribing to data share of closed mortgage loan details for marketing analysis**  

   h. Click **Next** to proceed  

3.	**Subscribe to Data Product**  

   a. Select **LoanApp\_ShareToMarketing** share in **Available Shares** column, on the **Add Shares** screen. 
   b. Click **move (>)** button to transfer the share to **Selected Shares** column.  
   c. Click **Subscribe** to proceed.  

4. **Link External Table to Data Product**  

   a. On **Link Data** page, select drop-down list for **Select Cloud Store Location** or enter a public URL.  
   b. Select **LoanApp\_Share\_Provider.**  
   c. Expand the drill down tab for the share named **LoanApp\_Share\_Provider** to display the available data.  
   d. Now, let's create an external table based on the **LOAN.Shared\_Loan\_Data\_Marketing\_VW** file, by dragging and dropping the file onto the data linking job section.  
   e. Click **Settings (pencil)** icon to display the Link Data from Cloud Store Location panel.  
   f. Edit Table Name to be **Shared\_Loan\_Data\_Marketing**  
   g. Click **Close** to proceed  
   h. Click **Start** and then **Run** on the popup box that appears.  
   i. Make sure the data link card has the link icon next to it, once the link job is complete.  

## Task 4 – Demonstrate Use of Data Share  

1. Click the Report button for this link job to view a report of the total rows processed successfully and failed for the selected table and the SQL used.  
   a. Click Close when done.  
2. In the Table and View Loads section:  
   a. Click the external table link named **Shared\_Loan\_Data\_Marketing** to preview its data.  
3. The **Shared\_Loan\_Data\_Marketing\_VW** panel is displayed with the Preview tab selected by default that displays the external table's data.  
4. Click **Close** to exit the panel and to return to the **Data Share Dashboard.**  
5. Click **Query** button to run a query from ADB against the Linked Shared Data  


## Acknowledgements
* **Author** - Eddie Ambler, Otis Barr
* **Contributors** -  Mike Matthews, Marty Gubar, Francis Regalado, Linda Foinding
* **Last Updated By/Date** - 05-29-2025
