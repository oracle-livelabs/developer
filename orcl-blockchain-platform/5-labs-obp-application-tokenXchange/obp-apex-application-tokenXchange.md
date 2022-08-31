# Car Trading Marketplace using Tokens in Oracle Blockchain Platform 

## Introduction: Car Trading Marketplace using Tokens built with Oracle Application Express (APEX)

APEX is a low-code development platform that enables you to build scalable, secure enterprise apps, with world-class features, that can be deployed anywhere.

*Estimated Lab Time:* 10 minutes

### Objectives

In this lab, you will:
- Trade a Car making payments using Tokens

### Prerequisites
This lab assumes you have:
- An Oracle Cloud account
- You have completed:
    - Lab: Prepare Setup (*Free-tier* and *Paid Tenants* only)
    - Lab: Environment Setup
    - Lab: Create a Blockchain Network connecting 3 Organizations
    - Lab: Create and Deploy Smart Contracts using Oracle Blockchain App Builder
    - Lab: Create & Setup API Gateway to connect with Smart Contract API's
    - Lab: Building Car Marketplace application using APEX

## Task 1: Setup APEX Web Credentials

1. On the 'App builder' main page page, click on 'Workspace Utilities.'

  ![Web Credentials](images/4-apex-5-1.png)

2. Now, click on 'Web Credentials'

  ![Web Credentials](images/4-apex-5-2.png)

2. Now, click on 'Credentials for OBP Endpoint.'

  ![Web Credentials](images/4-apex-5-3.png)

4. Using the same password used for the founder instance (marketplace, Section 1- Task 2), update the password in 'Client or Password' field and 'Apply Changes'. 

  ![Web Credentials](images/4-apex-5-4.png)

5. Repeat step 1-4 for the other two web credentials, using the passwords belonging to the Dealership accounts in Section 1 - task 8.
  - dealer-1-auth-obp (john_dealer1 account)
  - dealer-2-obp-auth (sam_dealer2 account)

## Task 2: Complete Car Marketplace Workshop by Trading a Car

You will now create a car and simulate a transaction between the founder organization and a car dealer partner. When a car is added to the Marketplace, tokens are put on hold in the founder instance and then transacted with partner dealerships as necessary.

## Task 3: Add a car to dealer1 Inventory 

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

## Task 4: dealer2 - Deposit Tokens in to the account

1. Now login as the other dealer, Dealer2.

  ![Car Delaership](images/dealer2-login.png)

2. Navigate to Orders, and filter to accounting. 

  ![Car Delaership](images/apex-accounting.png)

3. Select Deposit Money, and enter desired ammount. Account Balance should be updated to reflect amount deposited. 

  ![Car Delaership](images/apex-depositmoney.png)

  ![Car Delaership](images/apex-accountbalance.png)

## Task 5: dealer2 - Search Car

1. Navigate to Marketplace 

  ![Car Delaership](images/apex-viewmarketplace.png)

2. Select vehicle to view Car Details & Price

  ![Car Delaership](images/apex-carDetailspayment.png)

## Task 6: dealer2 - Purchase and Confirm Purchase

1. Confirm vehicle Purchase 

  ![Car Delaership](images/apex-confirmpayment.png)

Purchase order will now be created.

## Task 7: Dealer1 - Review & Confirm the order place by dealer2

1. Return to dealer 1's account, and navigate to orders received. You should be able to see the order placed by dealer 2. 

  ![Car Delaership](images/apex-myOrders.png)
   
2. Select the actions icon (pencil) on the order received and process the order. 

  ![Car Delaership](images/apex-processorder.png)

This action confirms the order by the seller. 

## Task 8: dealer2 - Order Processed and Accepted

1. Return to dealers 2's account, and navigate to orders placed. You will see the order placed should now be processed and ready to complete the purchase. 

  ![Car Delaership](images/apex-confirmreceipt.png)

Select "Accept Receipt" to complete order or "Cancel Order" to cancel the order. 

## Task 10: dealer2 - Generate Invoice & Payment

1. Generate & View the invoice for the order Processed

  ![Car Delaership](images/apex-invoice-details.png)

2. Make a Payment

 ![Car Delaership](images/apex-proceed-payment.png)


## Task 9: dealer2 - Token Transfer & Delivery
1. Once purchaser Accepts receipt, the token transfer will now occur and the vehicle will be delivered to the new owner. 

  ![Car Delaership](images/apex-vehicledelivered.png)

  ![Car Delaership](images/apex-vehicledeliverdtodelaer.png)

Additionaly, you are able to view the invoice from the purchase in the Orders > Invoice received section

  ![Car Delaership](images/apex-invoicereceived.png)

## Task 10: Check Token Balances for dealer1 & dealer2 after the payment

1. dealer1 token balance

 ![Car Delaership](images/apex-dealer1-balance.png)

2. dealer2 token balance

 ![Car Delaership](images/apex-dealer2-balance.png)


<!-- 10. 

5. Proceed to payment by clicking a car in the Marketplace. This car will disappear from the Marketplace when sold.

5. When a transaction begins, it will show up in the 'Orders' tab. Here, you will see that the car you created is currently pending sale.

6. Click on the pencil icon next to this pending order and click 'Process Order.' Here, the car will go back to the dealer who submitted the order. This dealer can **Filter data** by 'Orders Placed' to see that the transaction has processed. They can then 'Accept Receipt' to purchase or simply 'Withdraw Order.'

--describe tokenization-- tokens will be put on hold while transaction is processed and order is confirmed -->

## Acknowledgements
* **Author** - Amal Tyagi, Cloud Engineer
* **Contributors** -  Teodora Gheorghe, Adrien Lhemann, Diego Morales, Lokeswara Nushisarva, Siddesh C. Prabhu Dev Ujjni, Rene Fontcha
* **Last Updated By/Date** - Rene Fontcha, August 2022
