# Car Dealer Marketplace 

## Introduction: Oracle Application Express (APEX)

APEX is a low-code development platform that enables you to build scalable, secure enterprise apps, with world-class features, that can be deployed anywhere.

Estimated Lab Time: --find out--


### Objectives

In this lab, you will:
* Upload an application template and configure APEX data sources to invoke your blockchain network

### Pre-Requisites

This lab assumes you have:
* Completed Lab1 - Create, Deploy & Execute Smart Contracts using Oracle Blockchain App Builder
* Completed Lab2 - Create, Deploy & Execute Smart Contracts using Oracle Blockchain App Builder
* Completed Lab3 - Setup & Configure API Gateway for external applications to connect with Smart Contract API's published by Oracle Blockchain REST Proxy.

## Task 1: Spin Up Autonomous Database Instance

1. In the OCI services menu, select 'Oracle Database' and click on 'Autonomous Database.'

2. Check your **Compartment** is correct and click on 'Create Autonomous Database.'
  ![Create a new ADB instance from the console](images/4-adb-1.png)

3. In the form, first choose a **Display name** (e.g. CarMarketplaceAPEX), a **Database name** (e.g. CarMarketplace), and then **Choose a workload type** (in this case, APEX) as shown.
  ![Choose instance name and DB type](images/4-adb-2.png)

3. Toggle 'Always Free' as shown.
  ![Choose Always Free](images/4-adb-3.png)

4. Check that your **database version** is 19c.
  ![Choose DB version](images/4-adb-4.png)

5. **Create administrator credentials** and store these credentials somwhere safe.
  ![Create admin credentials](images/4-adb-5.png)

6. Choose **network access** and **license type** as shown:
  ![Choose network access and license type](images/4-adb-6.png)

7. Finally, enter a **Contact Email**.
  ![Enter contact email](images/4-adb-7.png)

8. Click 'Create Autonomous Database' and wait a few minutes for the database to provision.


## Task 2: Configure Database Schema and User Credentials

1. When your Autonomous Database instance has provisioned, access the 'Service Console.' 

  ![Access Service Console](images/4-apex-2-1.png)

2. Enter the ADMIN password you just created.

  ![Sign in to Administration](images/4-apex-2-2.png)

3. Click on the 'Create Workspace' button.

  ![Create Workspace](images/4-apex-2-3.png)

4. Fill out the form as follows:
    - Enter 'DEVELOPER' as the **Database User**.
    - Choose a **Password** and copy it somewhere safe.
    - Enter 'DEVELOPER' as the **Workspace Name**.

  ![Access Service Console](images/4-apex-2-4.png)

5. From the 'Administration Services' page, click on 'Manage Workspaces.'

  ![Manage Instance](images/4-apex-2-5.png)

6. Now click on 'Manage Developers and Users' as shown.

  ![Manage Developers and Users](images/4-apex-2-6.png)

7. Click on the green 'Create User' button.

  ![Create User](images/4-apex-2-7.png)

8. Fill out the form as follows and click 'Create User' to save:
    - Enter 'john_dealer1' as the **Username**.
    - Enter 'john_dealer1@dealer.com' as the **Email Address**.
    - Select the 'DEVELOPER' **Workspace**.
    - Enter a **Password** and then **Confirm Password**.

  ![Create User Form](images/4-apex-2-8.png)

9. Repeat Steps 7 and 8 to create a second user:
    - Enter 'sam_dealer2' as the **Username**.
    - Enter 'sam_dealer2@dealer.com' as the **Email Address**.
    - Select the 'DEVELOPER' **Workspace**.
    - Enter a **Password** and then **Confirm Password**.

9. After clicking 'Create User' again, check that both new users are displayed on the 'Manage Developers and Users' page as shown. Then click on the APEX logo to return to 'Administration Services.'

  ![Check User Page](images/4-apex-2-9.png)

10. Sign out of ADMIN in the upper-right hand corner.

  ![Sign Out](images/4-apex-2-10.png)


## Task 3: Import APEX App Template

1. 'Return to Sign In Page' and login to 'DEVELOPER' as shown:
    - Enter 'marketplace' as the **Workspace**.
    - Enter 'DEVELOPER' as the **Username**.
    - Enter the **Password** you setup in Task 2, Step 4.

  ![Login as Developer](images/4-apex-3-1.png)

2. Click 'Set APEX Account Password.'

  ![Set APEX Account Password](images/4-apex-3-2.png)

3. Enter an **Email Address** (e.g. DEVELOPER@dealer.com) and scroll down to enter a **Password**.

  ![Set APEX Account Password 1](images/4-apex-3-3-1.png)
  ![Set APEX Account Password 2](images/4-apex-3-3-2.png)

4. Select 'App Builder' as shown.

  ![Access App Builder](images/4-apex-3-4.png)

5. Select 'Import' to import an app template.

  ![Import Template](images/4-apex-3-5.png)

6. 'Drag and Drop' the f100.zip file into the pane and click 'Next.'

  ![Import Template 1](images/4-apex-3-6.png)

7. Click 'Next.'

  ![Import Template 2](images/4-apex-3-7.png)

8. Fill out the 'Install Database Application' form as follows:
    - Choose 'DEVELOPER' for the **Parsing Schema**.
    - Select 'Run and Build Application' as the **Build Status**.
    - Keep 'Auto Assign New Application ID' selected and click 'Install Application.'

  ![Install Application 1](images/4-apex-3-8.png)

9. Click 'Next.'

  ![Install Application 2](images/4-apex-3-9.png)

10. Click 'Next' again.

  ![Install Application 3](images/4-apex-3-10.png)

11. Finally, click on 'Install.'

  ![Install Application 4](images/4-apex-3-11.png)

12. Click 'Edit Application' and proceed to Task 4 to further configure your APEX app.

  ![Edit Application](images/4-apex-3-12.png)


## Task 4: Configure APEX Data Source with API Gateway Endpoint

1. Now, click on 'Shared Components.' Here you will be able to configure application attributes and data sources. 

  ![Access Shared Components](images/4-apex-4-1.png)

2. Click on 'Application Definition Attributes,' located under **Application Logic**. 

  ![Application Definition Attributes](images/4-apex-4-2.png)

3. Click the 'Substitions' tab as shown.

  ![Substitions](images/4-apex-4-3.png)

4. Set the following **Substitutions** and 'Apply Changes':
- First, set G\_OCI\_WEB\_CREDENTIAL to OCI\_API\_Credentials.
- Next, set OBP\_MAIN\_INSTANCE\_URL to the URL you found in the **Deployment Information** section in Lab 3. This allows APEX to connect to the Car Marketplace OBP REST API endpoints via the API Gateway deployment. 
- Set FABCAR\_CHAINCODE to car\_marketplace\_cc.
- Set TOKENIZATION\_CHAINCODE to car\_tokenization\_cc.
- Set DEALER\_1\_URL and DEALER\_2\_URL to john_dealer1 and sam_dealer2, respectively. This gives information on API routing.

  ![Substitions Form](images/4-apex-4-4.png)

5. Next, scroll towards the bottom of your 'App Builder' homepage and under **Data Sources**, select 'REST Data Sources.'

  ![REST Data Sources](images/4-apex-4-6.png)

6. Click 'GetDealerByRange' to view information regarding this data source.

 ![GetDealerByRange](images/apex-4-4-12.png)

7. Click the pencil icon **Remote Server**. 

  ![Edit Remote Server](images/4-apex-4-8.png)

8. Make the following updates:
    - Set **Name** to the 'Hostname' found in the Gateway details, accessible from the OCI service console.
  ![Gateway Hostname](images/4-apex-4-9-1.png)
    - Give your server a  **Static Identifier** (e.g. by changing all punctuation in **Name** to underscores as shown).
    - Set **Endpoint URL** to the same 'Hostname' from the Gateway details.

  ![Edit Remote Server Form](images/4-apex-4-9-2.png)

9. Click on 'Apply Changes.'

  ![Apply Changes to Remote Server](images/4-apex-4-10.png)

10. Set **URL Path Prefix** to v0/marketplace/chaincode/queries and click 'Apply Changes.'

  ![Edit URL Path Prefix and Apply Changes](images/4-apex-4-11.png)

11. Now, repeat steps 7-11 for the following REST Sources:
    - 'GetAccountBalance' 
    - 'GetInvoiceByRange'
    - 'GetCarsByRange'
    - 'GetCarHistoryById'
    - 'GetPOByRange'
    -'GetInvoiceByRannge' 

  ![Repeat APEX Data Source Steps](images/apex-4-4-12.png)


## Task 5: Setup APEX Web Credentials

1. On the 'App builder' main page page, click on 'Workspace Utilities.'

  ![Web Credentials](images/Web-credentials.png)

2. Now, click on 'Web Credentials'

  ![Web Credentials](images/select-wc.png)

2. Now, click on 'Credentials for OBP Endpoint.'

  ![Web Credentials](images/wc-list.png)

4. Using the same password used for the founder instance (marketplace, Section 1- Task 2), update the password in 'Client or Password' field and 'Apply Changes'. 

    ![Web Credentials](images/wc-updatePassword.png)

5. Repeat step 1-4 for the other two web credentials, using the passwords belonging to the Dealership accounts in Section 1 - task 8.
  - dealer-1-auth-obp (john_dealer1 account)
  - dealer-2-obp-auth (sam_dealer2 account)

 ## Task 6: Make Query and Invoke Calls via APEX to Transfer Vehicles

Congrats on making it to the last task of this workshop!

You will now create a car and simulate a transaction between the founder organization and a car dealer partner. When a car is added to the Marketplace, tokens are put on hold in the founder instance and then transacted with partner dealerships as necessary.

1. Login as a dealer (e.g. Dealer1) and land on My Inventory.

![Car Delaership](images/dealer1-login.png)

![Car Delaership](images/apex-myinventory.png)

2. Click 'Add Car' and fill out the form to create a car, as shown. 
    - Enter Vehicle Vin (Must be 17 characters)
    - Select Vehicle Make
    - Select Year
    - Enter Vehicle model
    - Enter Vehicle Price
    - Enter Vehicle Mileage
    - Select a vehicle type.
    - Set 'For Sale' to true.

![Car Delaership](images/apex-addcar.png)

3. Now login as the other dealer, Dealer2.

  ![Car Delaership](images/dealer2-login.png)

4. Navigate to Orders, and filter to accounting. 

  ![Car Delaership](images/apex-accounting.png)

5. Select Deposit Money, and enter desired ammount. Account Balance should be updated to reflect amount deposited. 

![Car Delaership](images/apex-depositMoney.png)

![Car Delaership](images/apex-accountBalance.png)

5. Navigate to Marketplace 

![Car Delaership](images/apex-viewMarketplace.png)

6. Select vehicle to view payment details and proceed with Payment

![Car Delaership](images/apex-carDetailsPayment.png)

6. Confirm vehicle payment 

![Car Delaership](images/apex-confirmPayment.png)

Purchase order will now be created.

8. Return to dealer 1's account, and navigate to orders received. You should be able to see the order placed by dealer 2. 

![Car Delaership](images/apex-MyOrders.png)
   
9. Select the actions icon (pencil) on the order received and process the order. 

![Car Delaership](images/apex-processOrder.png)

This action confirms the order by the seller. 

10. Return to dealers 2's account, and navigate to orders placed. You will see the order placed should now be processed and ready to complete the purchase. 

![Car Delaership](images/apex-confirmReceipt.png)

Select "Accept Receipt" to complete order or "Withdraw Offer" to cancel the order. 

11. Once purchaser Accepts receipt, the token transfer will now occur and the vehicle will be delivered to the new owner. 

![Car Delaership](images/apex-VehicleDelivered.png)

![Car Delaership](images/apex-vehicleDeliverdToDelaer.png)

Additionaly, you are able to view the invoice from the purchase in the Orders > Invoice received section

![Car Delaership](images/apex-invoiceReceived.png)



<!-- 10. 

5. Proceed to payment by clicking a car in the Marketplace. This car will disappear from the Marketplace when sold.

5. When a transaction begins, it will show up in the 'Orders' tab. Here, you will see that the car you created is currently pending sale.

6. Click on the pencil icon next to this pending order and click 'Process Order.' Here, the car will go back to the dealer who submitted the order. This dealer can **Filter data** by 'Orders Placed' to see that the transaction has processed. They can then 'Accept Receipt' to purchase or simply 'Withdraw Order.'

--describe tokenization-- tokens will be put on hold while transaction is processed and order is confirmed -->

## Acknowledgements
* **Author** - Amal Tyagi, Cloud Engineer
* **Contributors** -  Teodora Gheorghe, Adrien Lhemann, Diego Morales, Lokeswara Nushisarva, Siddesh C. Prabhu Dev Ujjni
* **Last Updated By/Date** - Amal Tyagi, August 2022
