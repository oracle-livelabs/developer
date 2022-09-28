# Deploy, Test Smart Contracts using Blockchain App Builder & Oracle Blockchain Admin Console

## Introduction

Blockchain App Builder is a tool set that assists Oracle Blockchain Platform users with rapid development, testing, debugging, and deployment of chaincode on Oracle Blockchain Platform networks. Blockchain App Builder is accessible through Visual Studio Code as an extension and through a lightweight command line interface. Blockchain App Builder to manage the complete life cycle of a token. Developers can tokenize existing assets and automatically generate token classes and methods to use for token lifecycle management.

*Estimated Lab Time:* 25 minutes

### About OBP Tokenization

1. Tokenization is a process where physical or digital assets are represented by tokens, which can be transferred, tracked, and stored on a blockchain. By representing assets as tokens, you can use the blockchain ledger to establish the state and ownership of an asset and use standard blockchain platform functions to transfer ownership of an asset.

2. You can use the Blockchain App Builder Extension to manage the complete life cycle of a token. You can tokenize existing assets and automatically generate token classes and methods to use for token lifecycle management.

3. This lab incorporates tokenization, enabling our car marketplace administrator to initialize, mint, and transfer fungible, fractional tokens to and from `john_dealer1` and `sam_dealer2`.

4. The tokenization feature uses an account/balance model to represent tokenized assets as balances in accounts - `john_dealer1` and `sam_dealer2`. The balance of their accounts is tracked globally, to ensure that transaction amounts are valid when buying/selling cars. The on-hold balance and transaction history are also tracked.

5. Feel free to learn more about [Tokenization support with OBP](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/tokenization-support.html).

### Objectives

In this lab, you will:
* Scaffold Project, Generate Chaincode, Deploy Smart Contracts locally, Test &  Debug Smart Contract, Package & Deploy Smart Contracts to OBP

### Prerequisites
This lab assumes you have:
- An Oracle Cloud account
- You have completed:
    - Lab: Prepare Setup (*Free-tier* and *Paid Tenants* only)
    - Lab: Environment Setup
    - Lab: Create a Blockchain Network connecting 3 Organizations & Configuring Oracle Blockchain App Builder
    

<!-- ## Task 1: Invoke and Query Ledger marketplace chaincode from App Builder in local environment

  Blockchain App Builder contains a built-in wizard to assist you with invoking or querying your chaincode.

1. Select your chaincode project in the **Chaincodes** pane. In the **Chaincode Details** pane, select **Deploy**.

2. In the deployment wizard:
    - Ensure the correct chaincode name is selected.
    - Select your target environment. In this case, choose Local Environment.
    - The channel will default to **mychannel**.
    - In the **Function** field, select **createCar** from the drop-down list. Every method available in the chaincode is listed.
    - In the **Parameters** field, select the **More Actions** (…) button. This will launch a window with available properties for your selected method. Enter sample properties as shown and click **Save**.

  ![Function parameters](images/2-app-builder-5-2.png)

3. Click **Invoke**. Test Some sample invoke methods - App Builder

4. Display Request and Response - Request/Response. -->


## Task 1: Deploy Smart Contract (Chaincode) to Founder Instance (Marketplace) from Blockchain App Builder

  Now that we have tested our project locally, we can connect to our remote instances.

1. In the OCI services menu, select 'Developer Services' and click on 'Blockchain Platform.'

2. Ensure that the right **Compartment** is selected and click on the 'Marketplace' founder instance.

3. Click the 'Service Console' -->Go to Markplace Blockchain Instance Dashboard.

4. Navigate to Nodes tab and copy the rest proxy url.

  ![Founder Deployment](images/2-app-builder-4-4.png)

5. Hover over the **Environments** pane, click on the '+' button, and fill out the form as follows:
    - Add a **Name** (e.g. Marketplace).
    - Optionally, add a **Description**.
    - Paste the **Marketpalce rest proxy url from step3** of your marketplace founder instance.
    - Enter your **User Name** (e.g. 'username') and then enter the **Password**.

5. Now, changing the target environment from 'Local Environment' to 'Marketplace' in App Builder. Obtain the channel name as set in *Lab1 - Task 5 (car-marketplace)* 

  ![Founder Deployment](images/2-car-marketplace-6-4.png)

## Task 2: Import Marketplace chaincode package from app builder

1. In Visual Studio Code, click on the **O** icon on the left-hand menu to use the Blockchain App Builder Extension.

2. Hover over the **Chaincodes** pane, Right Click on the chaincode to be packaged --> Select the directory to save the chaincode package file.

  ![Car Marketplace Chaincode Package](images/2-app-builder-7-1.png)

## Task 3: Install and Deploy Marketplace chaincode package onto Participant Instances using Oracle Cloud Blockchain Platform Console(dealer1 & dealer2)

  To install and re-deploy the chaincode on partner instances, use the package in Task3 (above) and then approve the chaincode definition from the partner instances (in this case, 'dealer1' and 'dealer2').

1. Access the 'Service Console' for the 'dealer1' instance.

  ![Download Package](images/2-car-marketplace-7-2.png)

2. Click the **Channels** tab and then the 'car-marketplace' channel.

  ![car-marketplace Channel](images/2-car-marketplace-7-3.png)

3. Select on 'Deployed Chaincodes' on the left-hand navigation pane. You will see that 1 chaincode has been committed to the channel, but has not yet been approved by the participant organization.

  ![Deployed Chaincodes](images/2-car-marketplace-7-4.png)

4. Now click the **Chaincodes** tab and then 'Deploy a New Chaincode'

  ![Deploy a New Chaincode](images/2-car-marketplace-7-5.png)

5. Select 'Advanced Deployment.'

  ![Advanced Deployment](images/2-car-marketplace-7-6.png)

6. Fill out the form as follows:
    - For **Package Label**, open up the 'Service Console' for the 'Marketplace' founder instance, click the **Chaincodes** tab, and copy the text as shown. You may use `car_marketplace_cc_car-marketplace_v1`, or any other name, but make sure to use the same name when repeating these steps for 'dealer2'

    ![Package Label](images/2-car-marketplace-7-7-1.png)

    - Keep 'GoLang' as the **Chaincode Language**.
    - Select both available peers as the **Target Peers**.
    - Upload the package .zip file you exported from the App Builder VS Code extension. We stored this in the **Samples** folder.
    - Click 'Next'

  ![Advanced Deployment Form](images/2-car-marketplace-7-7-2.png)

7. Click 'Close.' We will only be installing (not deploying) the chaincode onto the participant instances.

  ![Close Advanced Deployment Form](images/2-car-marketplace-7-8.png)

8. Now click 'Channels,' then the 'car-marketplace' channel, and navigate to 'Deployed Chaincodes' as you did in steps 3 and 4.

9. Find and click on the hamburger icon on the right of the row containing your chaincode. Select 'Approve.'

  ![Hamburger and Approve](images/2-car-marketplace-7-10.png)

10. Simply select the **Package ID** copied in Step6 as shown and click 'Approve'

  ![Approve Chaincode Form](images/2-car-marketplace-7-11.png)

11. Assign the [Endorsement policy](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/specify-endorsement-policy.html) by selecting signature under the endorsement policy. Add the policy of performing an endorsement signature by one of the organizations in the network. You can add an endorsement policy when you instantiate a chaincode. An endorsement policy specifies the members with peers that must approve, or properly endorse, a chaincode transaction before it’s added to a block and submitted to the ledger.

    ```
    <copy>
    OR ('dealer1.member','dealer2.member')
    </copy>
    ```

  ![Check Approved Field](images/2-car-marketplace-7-11.1.png)

12. Check that the chaincode has now been approved by the current participant.

  ![Check Approved Field](images/2-car-marketplace-7-12.png)

13. Repeat steps 1-12 for 'dealer2' instance


## Task 4: User Enrollment - Perform on All nodes (marketplace, dealer1, dealer2)

  Oracle Blockchain Platform supports enrollments to the REST proxy. You use enrollments with token chaincodes to ensure the identities of the users completing token transactions. To do this, when you add enrollments for token use cases, specify a user ID for each enrollment (founder ID in this case), and specify one and only one user for each enrollment.

1. While logged into the marketplace founder instance, navigate to Nodes in OBP console.

2. Click on the hamburger menu besides restproxy and select 'View or manage enrollments.'
  ![View or Manage Enrollments](images/view_or_manage_enrollments.png)

3. Select Create New Enrollment.

  ![Create New Enrollment](images/create_new_enrollment.png)

4. Input enrollment information. See sample enrollment as example. Enrollment user had to be created in idcs. In this example 'marketplace','dealer1','dealer2' is used. Make sure the user has REST_Client role assoicated with the Blockchain instance.

  ![Sample Enrollment](images/sample_enrollment.png)

5. Click Enroll.

## Task 5: Create Tokenization Chaincode

The flow for developing smart contracts for tokenization begins with creating a specification file that describes our fiat token. `Car_Tokenization.yml` describes our FiatToken structure: AssetType, `Token_id`, `Token_name`, `Token_desc`, `Token_type`, and behavior.  

The specification file is then used to scaffold a smart contract project ('`car_tokenization_cc`') and generate source code for models and controllers. Each object has properties that characterize the assets, data types and validations.

You can see sample specification files (and write your own specifications) in either YAML or JSON using the Blockchain App Builder package. [FiatToken Structure](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/input-specification-file-fungible-tokens.html)

1. Download the sample specification, [Car_Tokenization.yml](files/Car_Tokenization.yml?download=1)

2. In Visual Studio Code, click on the **O** icon on the left-hand menu to use the Blockchain App Builder Extension.

3. Hover over the **Specifications** pane, click on the three dots, and then **Import Specification**. Alternatively, copy the path of the specification file and import manually.

  Make sure the **Details** of your specification read:
  ![Car Tokenization Specification Details](images/2-app-builder-tokenization-yml.png)

## Task 6: Deploy Tokenization chaincode to Founder Instance

Now that we have tested our project locally, we can connect to our remote instances.

1. In the OCI services menu, select 'Developer Services' and click on 'Blockchain Platform.'

2. Ensure that the right **Compartment** is selected and click on the 'Marketplace' founder instance.

3. Click on the 'Service Console' -->  Go to 'Nodes' tab from the Blockchain Admin Console Dashboard --> copy the REST Proxy URL of this platform instance.
  ![Service Console](images/2-app-builder-tokenization-deploy-marketplace.png)

4. Changing the target environment in Blockchain AppBuilder from 'Local Environment' to 'Marketplace.' Also change the channel to 'car-marketplace'. Add the Init Parameters needed (org_id: marketplace, user_id: marketplace)

  ![Founder Deployment](images/2-app-builder-tokenization-deploy-marketplace.png)
  ![Founder Deployment](images/2-appbuilder-tokenization-init.png)

## Task 7: Import Tokenization chaincode package from app builder

1. In Visual Studio Code, click on the **O** icon on the left-hand menu to use the Blockchain App Builder Extension.

2. Hover over the **Chaincodes** pane, Right Click on the chaincode to be packaged --> Select the directory  to save the chaincode package file.

  ![Car Tokenization Chaincode Package](images/2-appbuilder-chaincodepackage-tokenization.png)

## Task 8: Install and Deploy Tokenization chaincode package onto Participant Instances

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

  ![Advanced Deployment](images/2-car-marketplance-7-6.png)

6. Fill out the form as follows:

   - For **Package Label**, open up the 'Service Console' for the 'Marketplace' founder instance, click the **Chaincodes** tab, and copy the text as shown. You may use `car_tokenization_v1`, or any other name, but make sure to use the same name when repeating these steps for 'dealer2.'

  ![Package Label](images/2-car-tokenization-7-6.png)

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


## Task 9: Initialization and Issuance of Car Marketplace FiatToken
-
1. Import the Marketplace Tokenization Postman collection [Marketplace Tokenization](files/MarketplaceTokenization.postman_collection_final.json?download=1) and assign variable definitions as shown.

  ![Import Collection](images/import_collection.png)
  ![Import Collection 2](images/import_collection2.png)

2. Enter the environment setup variables in Postman Environment 'Tokenization' (`tokenization_environment.postman_environment.json`) and assign variable definitions. Some sample definitions are shown below.

  ![Tokenization Definitions](images/tokenization_definitions.png)

3. Open tokenization collection Marketplace_Tokenization, and run integrations as described in steps 0 – 6 by clicking Send:

    - Step 0 - Init: Called when chaincode is instantiated. Token Admin is identified by `user_id` and `org_id`.
  ![Init](images/init.png)

    - Step 1 – Initialize Token: This method creates a token and initializes the token properties. The asset and its properties are saved in the state database. This method can be invoked only by the Token Admin of the chaincode.
  ![Initialize Token](images/initialize_token.png)

    - Step 2, 3, 4 – Create & Associate Accounts(Token Admin, Token User1, Token User2):  This method creates an account for a specified user and token. An account must be created for any user who will have tokens at any point. Accounts track balances, on-hold balances, and transation history. 

  ![Create Accounts](images/create_accounts.png)
  ![Initialize Token](images/user_tokens.png)
  ![Initialize Token](images/associate_token1.png)

    - Step 5, 6 – Add Role: This method adds a role to a specified user and token. This method can be called only by the Token Admin of the chaincode.
  ![Add Role](images/add_role.png)

    - Minter Role: mints a quantity of tokens, which are then owned by the caller of the method.
    - Escrow Role: notary account is specified, which is responsible to either complete or release the hold. When the hold is created, the specified token balance from the payer is put on hold. A held balance cannot be transferred until the hold is either completed or released.

    - Step 7 – Issue Tokens: This method mints tokens, which are then owned by the caller of the method. The caller must have an account and the minter role.
  ![Issue Tokens](images/issue_tokens.png)

You may now proceed to the next lab.

## Learn More

[Tokenization support with OBP](https://docs.oracle.com/en/cloud/paas/blockchain-cloud/usingoci/tokenization-support.html)

## Acknowledgements
* **Author** - Amal Tyagi, Cloud Engineer
* **Contributors** -  Teodora Gheorghe, Adrien Lhemann, Diego Morales, Lokeswara Nushisarva, Siddesh C. Prabhu Dev Ujjni, Rene Fontcha
* **Last Updated By/Date** - Rene Fontcha, September 2022
