# Create and Deploy Smart Contracts using Oracle Blockchain App Builder

## Introduction: Oracle Blockchain App Builder

Blockchain App Builder is a tool set that assists Oracle Blockchain Platform users with rapid development, testing, debugging, and deployment of chaincode on Oracle Blockchain Platform networks. Blockchain App Builder is accessible through Visual Studio Code as an extension and through a lightweight command line interface. Blockchain App Builder to manage the complete life cycle of a token. Developers can tokenize existing assets and automatically generate token classes and methods to use for token lifecycle management.

### About OBP Tokenization

1. Tokenization is a process where physical or digital assets are represented by tokens, which can be transferred, tracked, and stored on a blockchain. By representing assets as tokens, you can use the blockchain ledger to establish the state and ownership of an asset and use standard blockchain platform functions to transfer ownership of an asset.

2. You can use the Blockchain App Builder Extension to manage the complete life cycle of a token. You can tokenize existing assets and automatically generate token classes and methods to use for token lifecycle management. 

3. This lab incorporates tokenization, enabling our car marketplace administrator to initialize, mint, and transfer fungible, fractional tokens to and from `john_dealer1` and `sam_dealer2`. 

4. The tokenization feature uses an account/balance model to represent tokenized assets as balances in accounts - `john_dealer1` and `sam_dealer2`. The balance of their accounts is tracked globally, to ensure that transaction amounts are valid when buying/selling cars. The on-hold balance and transaction history are also tracked.

5. Feel free to learn more about [Tokenization support with OBP](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/tokenization-support.html).

*Estimated Lab Time: 25 minutes*

### Objectives

In this lab, you will:
* Scaffold Project, Generate Chaincode, Deploy Smart Contracts locally, Test &  Debug Smart Contract, Package & Deploy Smart Contracts to OBP

### Pre-requisites

This lab assumes you have:
- Setup Environment 
- Initialized Environment 


## Task 1: Blockchain AppBuilder Environment Setup

You will be using Oracle's Blockchain App Builder extension, accessible through Visual Studio Code, for this lab. First you will need to set up environments for each of the 3 blockchain platform instances you created in Lab 1.

1. In Visual Studio Code, click on the **O** icon on the left-hand menu to use the Blockchain App Builder Extension. 

2. Hover over the **Environments** pane, click on the '+' button, and fill out the form as follows:
    - Add a **Name** (e.g. Marketplace).
    - Optionally, add a **Description**.
    - Paste the **Remote URL** of your marketplace founder instance, which you can find using the OCI services console.
    - Enter your local **User Name** (e.g. 'local.user') and then enter the **Password**.

3. Click 'Save' and repeat for the two participant instances (e.g. Dealer1 and Dealer2).

  ![Car Marketplace Environment Details](images/2-app-builder-0.png)


## Task 2: Import Marketplace YAML Specification File

The flow for developing smart contracts begins with creating a [specification file](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/input-configuration-file.html) that describes car marketplace assets being maintained on the blockchain ledger. 

[Car_Marketplace.yml](../2-labs-obp-appbuilder/files/Car_Marketplace.yml) describes [marketplace assets](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/input-configuration-file.html): Car, Dealer, Invoice, and Purchase Order (PO). Each object has properties that characterize the assets, data types and validations. You can see sample specification files (and write your own specifications) in either YAML or JSON using the Blockchain App Builder package. 

1. Locate the sample specification, [Car_Marketplace.yml](../2-labs-obp-appbuilder/files/Car_Marketplace.yml?download=1), in the **Samples** folder.

2. In Visual Studio Code, click on the **O** icon on the left-hand menu to use the Blockchain App Builder Extension. 

3. Hover over the **Specifications** pane, click on the three dots, and then **Import Specification**. Alternatively, copy the path of the specification file and import manually. 

4. Click on the yml specification imported. You can see the specficiations defined for each object and attribute. If you want change any specification of an attribute, you can do so. For example: Change line number 102 to - format: ["PO%1%t", "recipient"]. [Specifications Help](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/input-configuration-file.html)

  Make sure the **Details** of your specification read:
  
  ![Car Marketplace Specification Details](images/2-app-builder-1-3.png)


## Task 3: Generate Marketplace Chaincode Project

The specification file is then used to scaffold a smart contract project ('car_marketplace_cc') and generate source code for models and controllers. 

1. Hover over the **Chaincodes** pane, click on the **+**, and fill out the form as follows: 
    - **Name** your chaincode (e.g. car_marketplace_cc).
    - Select Go as the **Language**.
    - Select Car_Marketplace.yml as the **Specification**.
    - Choose a **Go Domain** (e.g. Samples).

  ![Car Marketplace Chaincode Details](images/2-app-builder-2-1.png)

2. Click 'Create' and wait for the chaincode to generate. Check the 'Output' pane at the bottom for more details.

3. Click 'Create' and wait for the chaincode to generate. Check the 'Output' pane at the bottom for more details. 

  ![Chaincode Output](images/2-app-builder-2-2.png)

4. Select 'car_marketplace_cc.model.go' under 'car_marketplace_cc/src'. The Model file contains the property definitions of all the assets defined in the spec file.
Select 'car_marketplace_cc.controller.go' under 'car_marketplace_cc/src.' The Controller file defines all the behavior and methods for those assets. 'Car_Marketplace.yml' spec file allows defining additional custom methods that users implement to provide business logic of smart contracts. 

## Task 4: View Custom Methods in Marketplace

1. Open the Car Marketplace specification file and scroll to the bottom. This is where your customMethods are listed.

2. We've modified existing CRUD operations and defined custom methods for the following functions:
  - 'CreateCar': Adds car to dealer's inventory. The function retrieves dealer from blockchain, appends the car to dealer's inventory and records car on ledger.
        ```
        <copy>
        func (t *Controller) CreateCarWrapper(asset Car) (interface{}, error) {

        //Verify dealer exists
        owner, err := t.GetDealerById(asset.OwnerId)
        if err != nil {
          return nil, fmt.Errorf("dealer with id: %s does not exist", asset.OwnerId)
        }

        //append car to owner's inventory
        owner.Inventory = append(owner.Inventory, asset.Vin)

        //Update and commit dealer inventory to blockchain
        t.UpdateDealer(owner)
        t.CreateCar(asset)

        return nil, err

        }
        </copy>

        ```
  - 'CreatePO': Creates purchase order once buyer places order on vehicle. The function verifies car exists on ledger, places car off the market, and records purchase order on ledger.
        ```
        <copy>
        func (t *Controller) CreatePOWrapper(asset PO) (interface{}, error) {

        //Verify that car exists
        car, err := t.GetCarById(asset.Vin)
        if err != nil {
          return nil, fmt.Errorf("car with id: %s does not exist", asset.Vin)
        }

        //Car no longer on sale as purchase order is created
        car.ForSale = false
        t.UpdateCar(car)
        t.CreatePO(asset)

        return nil, err

        }
        </copy>
        ```

  - 'UpdatePO': Updates purchase order. If order status is:
    - 'Delivered': Car is successfully delivered to buyer, an invoice is generated, and custom function 'CarTransfer' is invoked.
    - 'Rejected': Order is canceled, and car is placed back on the market.
    ```
    <copy>
    func (t *Controller) UpdatePOWrapper(asset PO) (interface{}, error) {

    //Verifies purchase order exists
    _, err := t.GetPOById(asset.PO)
    if err != nil {
      return nil, fmt.Errorf("po with id: %s does not exist", asset.PO)
    }

    //If vehicle is delivered to buyer
    if asset.OrderStatus == "Delivered" {

      var invoiceObject Invoice

      //Verify car exists in ledger
      car, err := t.GetCarById(asset.Vin)
      if err != nil {
        return nil, fmt.Errorf("car with id: %s does not exist", asset.Vin)
      }

      car.ForSale = true

      t.UpdateCar(car)

      //Create invoice sent to buyer
      invoiceObject.Vin = asset.Vin
      invoiceObject.Po_number = asset.PO
      invoiceObject.Price = car.Price
      invoiceObject.Recipient = asset.Purchaser
      invoiceObject.Status = false

      invoiceObject.InvoiceId = asset.InvoiceId

      t.CreateInvoice(invoiceObject)

      currentTime := time.Now().String()

      var ts_formatted string

      for i, c := range currentTime {
        fmt.Printf("Start Index: %d Value:%s\n", i, string(c))

        if string(c) == " " {
          fmt.Println(ts_formatted)
          break
        }
        ts_formatted += string(c)
      }

      //Invoke Custom Method: Car Transfer
      t.CarTransfer(asset.Vin, asset.Purchaser, car.OwnerId, asset.PO, car.Price, ts_formatted)

      }

    //If vehicle is rejected by buyer
    if asset.OrderStatus == "Rejected" {

      car, err := t.GetCarById(asset.Vin)
      if err != nil {
        return nil, fmt.Errorf("car with id: %s does not exist", asset.Vin)
      }

      //Set car for sale back to true
      car.ForSale = true
      t.UpdateCar(car)

    }
    t.UpdatePO(asset)
    return nil, err

    }
    </copy>
    ```
   
  - 'CarTransfer': Transfer vehicle ownership from one dealer to another. Validations are written to check that car being sold and dealer receiving vehicle exist in ledger and that the owner isn't selling a vehicle to themselves. We update car object properties to reflect the new owner of the vehicle, removing the car from the seller's inventory, adding it to the buyer's inventory. Finally, we commit car and dealer changes to the ledger.

      ```
      <copy>
      func (t *Controller) CarTransfer(vin string, buyerId string, sellerId string, PO string, price int, dateString string) (interface{}, error) {

      //Date formatting and handling
      dateBytes, err := json.Marshal(dateString)
      if err != nil {
        return nil, fmt.Errorf("error in marshalling %s", err.Error())
      }

      var dateValue date.Date
      err = json.Unmarshal(dateBytes, &dateValue)
      if err != nil {
        return nil, fmt.Errorf("error in unmarshalling the date %s", err.Error())
      }

      if buyerId == sellerId {
        return nil, fmt.Errorf(`buyer and seller cannot be same`)
      }

      //Verify car exists
      car, err := t.GetCarById(vin)
      if err != nil {
        return nil, err
      }

      //Verify dealer exists
      buyer, err := t.GetDealerById(buyerId)
      if err != nil {
        return nil, err
      }

      if car.OwnerId != sellerId {

        return nil, fmt.Errorf("car with vin %s does not belong to the seller %s", vin, sellerId)
      }
      if car.OwnerId == buyerId {

        return nil, fmt.Errorf("car with vin %s already exist with owner %s", vin, buyerId)
      }

      //Update car object properties

      car.OwnerId = buyerId
      car.Price = price
      car.LastSold = dateValue

      buyer.Inventory = append(buyer.Inventory, vin)

      seller, err := t.GetDealerById(sellerId)
      if err != nil {
        return nil, err
      }

      //Remove car from seller's inventory
      for i := 0; i < len(seller.Inventory)-1; i++ {
        if seller.Inventory[i] == vin {
          seller.Inventory = append(seller.Inventory[:i], seller.Inventory[i+1:]...)
        }
      }

      //Commit changes to the ledger
      t.UpdateDealer(seller)
      t.UpdateCar(car)
      t.UpdateDealer(buyer)

      return nil, err

      }
      </copy>
      ```

## Task 5: Deploy Marketplace Chaincode in local Environment

Blockchain App Builder chaincode deployment starts the Hyperledger Fabric basic network, other services, and installs and instantiates the chaincode for you.

1. In the **Chaincode Details** pane, select 'Deploy.' 

2. In the deployment wizard: 
    - Ensure the correct chaincode is selected.
    - Select your target environment. In this case, choose **Local Environment**.
    - Select the channel you want to deploy to. A channel named **mychannel** is created by default with the extension's installation, and can be used for testing.

3. Ensure that your form reads as shown and click 'Deploy.' 

  ![Deploy chaincode](images/2-app-builder-4-3.png)

  If you receive an error message in the **Output** console window (located at the bottom of your Visual Studio window), open the Docker Desktop app and copy/paste the given command into your terminal to start the Docker daemon. Restart Visual Studio and repeat steps 1-3 as necessary.


## Task 6: Invoke and Query Ledger marketplace chaincode from App Builder in local environment

  Once your chaincode project is running on a local network, you can test it.

  Blockchain App Builder contains a built-in wizard to assist you with invoking or querying your chaincode.

1. Select your chaincode project in the **Chaincodes** pane. In the **Chaincode Details** pane, select **Execute**.

2. In the deployment wizard: 
    - Ensure the correct chaincode name is selected.
    - Select your target environment. In this case, choose Local Environment.
    - The channel will default to **mychannel**.
    - In the **Function** field, select **addCar** from the drop-down list. Every method available in the chaincode is listed.
    - In the **Parameters** field, select the **More Actions** (…) button. This will launch a window with available properties for your selected method. Enter sample properties as shown and click **Save**.

  ![Function parameters](images/2-app-builder-5-2.png)

3. Click **Invoke**. --> Test Some sample invoke methods - App Builder

4. Display Request and Response - Request/Response.


## Task 7: Deploy to Founder Instance (Marketplace)

  Now that we have tested our project locally, we can connect to our remote instances.

1. In the OCI services menu, select 'Developer Services' and click on 'Blockchain Platform.'

2. Ensure that the right **Compartment** is selected and click on the 'Marketplace' founder instance. 

3. Access the 'Service Console' and copy the URL of this platform instance.

4. Now, repeat Tasks 5 and 6, changing the target environment from 'Local Environment' to 'Marketplace.' Also change the channel to 'car-marketplace' as set in Lab 1, Task 5. 

  ![Founder Deployment](images/2-car-marketplace-6-4.png)

## Task 8: Import Marketplace chaincode package from app builder

1. In Visual Studio Code, click on the **O** icon on the left-hand menu to use the Blockchain App Builder Extension. 

2. Hover over the **Chaincodes** pane, Right Click on the chaincode to be packaged --> Select the directory on your laptop to save the chaincode package file. 

  ![Car Marketplace Chaincode Package](images/2-app-builder-7-1.png)

## Task 9: Install and Deploy Marketplace chaincode package onto Participant Instances (dealer1 & dealer2)

  To install and re-deploy the chaincode on partner instances, use the package in Task7 and then approve the chaincode definition from the partner instances (in this case, 'dealer1' and 'dealer2').

1. Access the 'Service Console' for the 'dealer1' instance.

  ![Download Package](images/2-car-marketplace-7-2.png)

2. Click the **Channels** tab and then the 'car-marketplace' channel.

  ![car-marketplace Channel](images/2-car-marketplace-7-3.png)

3. Select on 'Deployed Chaincodes' on the left-hand navigation pane. You will see that 1 chaincode has been committed to the channel, but has not yet been approved by the participant organization.

  ![Deployed Chaincodes](images/2-car-marketplace-7-4.png)

4. Now click the **Chaincodes** tab and then 'Deploy a New Chaincode.'

  ![Deploy a New Chaincode](images/2-car-marketplace-7-5.png)

5. Select 'Advanced Deployment.'

  ![Advanced Deployment](images/2-car-marketplace-7-6.png)

6. Fill out the form as follows:
    - For **Package Label**, open up the 'Service Console' for the 'Marketplace' founder instance, click the **Chaincodes** tab, and copy the text as shown. You may use `car_marketplace_cc_car-marketplace_v1`, or any other name, but make sure to use the same name when repeating these steps for 'dealer2.'

    ![Package Label](images/2-car-marketplace-7-7-1.png)

    - Keep 'GoLang' as the **Chaincode Language**.
    - Select both available peers as the **Target Peers**.
    - Upload the package .zip file you exported from the App Builder VS Code extension. We stored this in the **Samples** folder.

  ![Advanced Deployment Form](images/2-car-marketplace-7-7-2.png)

7. Click 'Close.' We will only be installing (not deploying) the chaincode onto the participant instances.

  ![Close Advanced Deployment Form](images/2-car-marketplace-7-8.png)

8. Now click 'Channels,' then the 'car-marketplace' channel, and navigate to 'Deployed Chaincodes' as you did in steps 3 and 4. 


9. Find and click on the hamburger icon on the right of the row containing your chaincode. Select 'Approve.'

  ![Hamburger and Approve](images/2-car-marketplace-7-10.png)

10. Simply select the **Package ID** as shown and click 'Approve.' 

  ![Approve Chaincode Form](images/2-car-marketplace-7-11.png)

11. Assign the [Endorsement policy](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/specify-endorsement-policy.html) by selecting signature under the endorsement policy. Add the policy of performing an endorsement signature by one of the organizations in the network. ou can add an endorsement policy when you instantiate a chaincode. An endorsement policy specifies the members with peers that must approve, or properly endorse, a chaincode transaction before it’s added to a block and submitted to the ledger.

    ```
    <copy>
    OR ('dealer1.member', dealer2.member)
    </copy>
    ```

  ![Check Approved Field](images/2-car-marketplace-7-11.1.png)

12. Check that the chaincode has now been approved by the current participant. 

  ![Check Approved Field](images/2-car-marketplace-7-12.png)

13. Repeat steps 2-12 for 'dealer2.'


## Task 11: User Enrollment - Perform on All nodes (marketplace, dealer1, dealer2)

  Oracle Blockchain Platform supports enrollments to the REST proxy. You use enrollments with token chaincodes to ensure the identities of the users completing token transactions. To do this, when you add enrollments for token use cases, specify a user ID for each enrollment (founder ID in this case), and specify one and only one user for each enrollment.

1. While logged into the marketplace founder instance, navigate to Nodes in OBP console.

2. Click on the hamburger menu besides restproxy and select 'View or manage enrollments.'
  ![View or Manage Enrollments](images/View_or_manage_enrollments.png)

3. Select Create New Enrollment.

  ![Create New Enrollment](images/Create_new_enrollment.png)

4. Input enrollment information. See sample enrollment as example. Enrollment user had to be created in idcs. In this example local.user is used. Make sure the user has REST_Client role assoicated with the Blockchain instance.

  ![Input Enrollment](images/input_enrollment.png)
  ![Sample Enrollment](images/Sample_enrollment.png)

5. Click Enroll.

## Task 12: Create Tokenization Chaincode

The flow for developing smart contracts for tokenization begins with creating a specification file that describes our fiat token. Car_Tokenization.yml describes our FiatToken structure: AssetType, Token_id, Token_name, Token_desc, Token_type, and behavior.  The specification file is then used to scaffold a smart contract project ('car_tokenization_cc') and generate source code for models and controllers. Each object has properties that characterize the assets, data types and validations. You can see sample specification files (and write your own specifications) in either YAML or JSON using the Blockchain App Builder package. [FiatToken Structure](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/input-specification-file-fungible-tokens.html)

1. Locate the sample specification, [Car_Tokenization.yml](../2-labs-obp-appbuilder/files/Car_Tokenization.yml?download=1), in the **Samples** folder. 


2. In Visual Studio Code, click on the **O** icon on the left-hand menu to use the Blockchain App Builder Extension. 

3. Hover over the **Specifications** pane, click on the three dots, and then **Import Specification**. Alternatively, copy the path of the specification file and import manually. 

  Make sure the **Details** of your specification read:
  ![Car Tokenization Specification Details](images/2-app-builder-tokenization-yml.png)

## Task 13: Deploy Tokenization chaincode to Founder Instance

Now that we have tested our project locally, we can connect to our remote instances.

1. In the OCI services menu, select 'Developer Services' and click on 'Blockchain Platform.'

2. Ensure that the right **Compartment** is selected and click on the 'Marketplace' founder instance. 

3. Access the 'Service Console' and copy the REST Proxy URL of this platform instance.
  ![Service Console](images/2-app-builder-tokenization-deploy-marketplace.png)

4. Changing the target environment in Blockchain AppBuilder from 'Local Environment' to 'Marketplace.' Also change the channel to 'car-marketplace'. 

  ![Founder Deployment](images/2-app-builder-tokenization-deploy-marketplace.png)

## Task 14: Import Tokenization chaincode package from app builder

1. In Visual Studio Code, click on the **O** icon on the left-hand menu to use the Blockchain App Builder Extension. 

2. Hover over the **Chaincodes** pane, Right Click on the chaincode to be packaged --> Select the directory on your laptop to save the chaincode package file. 

  ![Car Tokenization Chaincode Package](images/2-appbuilder-chaincodepackage-tokenization.png)

## Task 15: Install and Deploy Tokenization chaincode package onto Participant Instances

  To install and re-deploy the chaincode on partner instances, use the package in Task7 and then approve the chaincode definition from the partner instances (in this case, 'dealer1' and 'dealer2').

1. Access the 'Service Console' for the 'dealer1' instance.

  ![Download Package](images/2-car-marketplace-7-2.png)

2. Click the **Channels** tab and then the 'car-marketplace' channel.

  ![car-marketplace Channel](images/2-car-marketplace-7-3.png)

3. Select on 'Deployed Chaincodes' on the left-hand navigation pane. You will see that 1 chaincode has been committed to the channel, but has not yet been approved by the participant organization.

  ![Deployed Chaincodes](images/2-car-marketplace-7-4.png)

4. Now click the **Chaincodes** tab and then 'Deploy a New Chaincode.'

  ![Deploy a New Chaincode](images/2-car-marketplace-7-5.png)

5. Select 'Advanced Deployment.'

  ![Advanced Deployment](images/2-car-marketplace-7-6.png)

6. Fill out the form as follows:

   - For **Package Label**, open up the 'Service Console' for the 'Marketplace' founder instance, click the **Chaincodes** tab, and copy the text as shown. You may use `car_tokenization_v1`, or any other name, but make sure to use the same name when repeating these steps for 'dealer2.'

  ![Package Label](images/2-car-marketplace-7-7-1.png)

   - Keep 'GoLang' as the **Chaincode Language**.
   - Select both available peers as the **Target Peers**.
   - Upload the package .zip file you exported from the App Builder VS Code extension. We stored this in the **Samples** folder.

  ![Advanced Deployment Form](images/2-car-tokenization-7-7-2.png)

7. Click 'Close.' We will only be installing (not deploying) the chaincode onto the participant instances.

  ![Close Advanced Deployment Form](images/2-car-marketplace-7-8.png)

8. Now click 'Channels,' then the 'car-marketplace' channel, and navigate to 'Deployed Chaincodes' as you did in steps 2,3 and 4. 


9. Find and click on the hamburger icon on the right of the row containing your chaincode. Select 'Approve.'

  ![Hamburger and Approve](images/2-car-marketplace-7-10.png)

10. Simply select the **Package ID** as shown and click 'Approve.' 

  ![Approve Chaincode Form](images/2-car-tokenization-7-11.png)

11. Assign the Endorsement policy by selecting signature under the endorsement policy. Add the policy of performing an endorsement signature by one of the organizations in the network.
    ```
    <copy>
    OR ('dealer1.member', dealer2.member)
    </copy>
    ```

  ![Check Approved Field](images/2-car-tokenization-7-11.1.png)

12. Check that the chaincode has now been approved by the current participant. 

  ![Check Approved Field](images/2-car-marketplace-7-12.png)

13. Repeat steps 2-12 for 'dealer2.'


## Task 16: Initialization and Issuance of Car Marketplace Fiat Token - Run It with App Builder. Save Input.

1. Import the Marketplace Tokenization Postman collection (Marketplace_Tokenization.postman_collection.json) and assign variable definitions as shown.

  ![Import Collection](images/import_collection.png)
  ![Import Collection 2](images/import_collection2.png)

2. Repeat for the Postman Environment 'Tokenization' (tokenization_environment.postman_environment.json) and assign variable definitions. Some sample definitions are shown below.

  ![Tokenization Definitions](images/tokenization_tefinitions.png)

3. Open tokenization collection Marketplace_Tokenization, and run integrations as described in steps 0 – 6 by clicking Send:

    - Step 0 - Init: Called when chaincode is instantiated. Token Admin is identified by user_id and org_id. 
  ![Init](images/init.png)

    - Step 1 – Initialize Token: This method creates a token and initializes the token properties. The asset and its properties are saved in the state database. This method can be invoked only by the Token Admin of the chaincode. 
  ![Initialize Token](images/initialize_token.png)

    - Step 2, 3, 4 – Create Accounts:  This method creates an account for a specified user and token. An account must be created for any user who will have tokens at any point. Accounts track balances, on-hold balances, and transation history. 
  ![Create Accounts](images/create_accounts.png)

    - Step 5, 6 – Add Role: This method adds a role to a specified user and token. This method can be called only by the Token Admin of the chaincode. 
  ![Add Role](images/add_role.png)

    - Minter Role: mints a quantity of tokens, which are then owned by the caller of the method.
    - Escrow Role: notary account is specified, which is responsible to either complete or release the hold. When the hold is created, the specified token balance from the payer is put on hold. A held balance cannot be transferred until the hold is either completed or released.

    - Step 7 – Issue Tokens: This method mints tokens, which are then owned by the caller of the method. The caller must have an account and the minter role. 
  ![Issue Tokens](images/issue_tokens.png)

  ## Task 17: [Proceed to next lab](../3-labs-obp-apigateway/obp-apigateway.md)

## What's Next?

  **You are all set to begin next lab! Click Lab 3: C Setup & Configure API Gateway for external applications to connect with Smart Contract API's published by Oracle Blockchain REST Proxy.**

## Learn More

[Tokenization support with OBP](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/tokenization-support.html)

## Acknowledgements
* **Author** - Amal Tyagi, Cloud Engineer
* **Contributors** -  Teodora Gheorghe, Adrien Lhemann, Diego Morales, Lokeswara Nushisarva, Siddesh C. Prabhu Dev Ujjni
* **Last Updated By/Date** - Amal Tyagi, August 2022