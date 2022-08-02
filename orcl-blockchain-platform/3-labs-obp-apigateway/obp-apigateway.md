# Car Dealer Marketplace 

## Introduction: Oracle API Gateway

The API Gateway service enables you to publish APIs with private endpoints that are accessible from within your network, and which you can expose with public IP addresses if you want them to accept internet traffic. The endpoints support API validation, request and response transformation, CORS, authentication and authorization, and request limiting.

In this lab, you will be introduced to API Gateway. The gateway is necessary for configuring Oracle Blockchain Platform REST API endpoints on the front-end application.

Estimated Lab Time: --find out--


## Objectives

In this lab, you will:
* Create and configure REST endpoints to be accessed by front-end applications

## Task 1: Setup VCN and Subnet

1. In the OCI services menu, select 'Networking' and click 'Virtual Cloud Networks.'

  ![OCI Services - VCNs](images/3-gateway-1-0.png)

2. Click 'Start VCN Wizard.'

  ![Start VCN Wizard](images/3-gateway-1-1.png)

3. Keep the default selection and click 'Start VCN Wizard.'

  ![Start VCN with Internect Connectivity](images/3-gateway-1-2.png)

4. Fill out the 'Configuration' form as follows:
    - Choose a **VCN Name** (e.g. Car Marketplace VCN).
    - Ensure the correct **Compartment** is selected (e.g. Blockchain LiveLabs).
    - Keep the remaining default fields.
  
  ![VCN Configuration](images/3-gateway-1-3.png)

5. Click 'Next' and then 'Create.'

  ![VCN Creation](images/3-gateway-1-4.png)

6. Once your VCN is available, click 'Create Subnet.'

  ![Create Subnet](images/3-gateway-1-5.png)

7. Fill out the 'Create Subnet' form as follows:
    - **Name** your subnet (e.g. Public Subnet for Car Marketplace VCN).
    - Ensure the correct **Compartment** is selected (e.g. Blockchain LiveLabs).
    - Scroll to the bottom and set 'Default DHCP Options for Car Marketplace VCN' as the **DHCP Options Compartment**.
    - Similarly, set 'Default Security List for Car Marketplace VCN' as the **Security List Compartment**.

  ![Create Subnet Form 1](images/3-gateway-1-6.png)
  ![Create Subnet Form 2](images/3-gateway-1-7.png)

8. Click 'Create Subnet' and see that the subnet has been successfully created.
  ![See Subnet](images/3-gateway-1-8.png)


## Task 2: Configure VCN

1. Select 'DHCP Options' on the left-hand side menu and then 'Edit' the default options.

  ![Edit DHCP Options](images/3-gateway-2-0.png)

2. Ensure that your options match those on the form below and click 'Save Changes.'

  ![Edit DHCP Options Form](images/3-gateway-2-1.png)

3. Now, select 'CIDR Blocks' on the left-hand side menu and click 'Add CIDR Block' to match the screenshot below.

  ![Add CIDR Block](images/3-gateway-2-2.png)

4. Next, select 'Route Tables' on the left-hand side menu and click 'Default Route Table for Car Marketplace VCN.'

  ![Default Route table](images/3-gateway-2-3.png)

5. Click 'Add Route Rules.'

  ![Add Route Rule](images/3-gateway-2-4.png)

6. Fill out the form as follows and click on 'Add Route Rules.'

  ![Add Route Rule Form](images/3-gateway-2-5.png)

7. Next, select 'Security Lists' on the left-hand side menu and click 'Default Security List for Car Marketplace VCN.'

  ![Security Lists](images/3-gateway-2-6-0.png)

8. Click 'Add Ingress Rules.'

  ![Add Ingress Rules](images/3-gateway-2-6.png)

9. Fill out the form as follows and click on 'Add Ingress Rules.'

  ![Add Ingress Rules Form](images/3-gateway-2-7.png)

10. Repeat Steps 8-9 four more times so your Ingress Rules match the screenshot below:

  ![All Ingress Rules](images/3-gateway-2-8.png)


## Task 3: Create API Gateway

1. From the OCI services mennu, search for 'Gateways' and find the service listed under **API Management**.
  ![Navigate to Gateways](images/3-gateway-3-1.png)

2. Click on 'Create Gateway.'

  ![Create Gateway](images/3-gateway-3-2.png)

3. Fill out the form as follows and click 'Create Gateway.'
    - Give your gateway a **Name** (e.g. Car Marketplace LiveLab Gateway).
    - Scroll down and select the **Virtual Cloud Network** and **Subnet** you just created.

  ![Create Gateway Form](images/3-gateway-3-3.png)


## Task 4: Create Gateway Deployment

1. After ensuring the right **Compartment** is selected, find and click on the the gateway corresponding to this LiveLab (e.g. Car Marketplace LiveLab Gateway).
  ![Choose Compartment and Gateway](images/3-gateway-4-2.png)

2. Click on 'Deployments' in the **Resources** pane and click 'Create Deployment.'
  ![Create Deployment](images/3-gateway-4-3.png)

3. You will be deploying a custom API 'From Scratch.' Fill out the form as follows:
    - Give your deployment a **Name** (e.g. car-marketplace)
    - Optionally, enter a **Path Prefix** (e.g. /v1)
    - Ensure that the right **Compartment** is selected and click on 'Next'
  ![Deployment Step 1](images/3-gateway-4-4.png)

4. Next in your deployment, you need to add 4 routes: 1 for each participant instance and 2 for the founder instance. Under 'Routes', fill out the form for your first route as follows:
    - Enter a **Path**. For Route 1, this will be /dealer-1/transactions
    - Select 'POST' under **Methods**
    - Specify 'HTTP' as the **Type**
    - Enter the **URL** to serve as a REST endpoint. For Route 1, this will be https://forddealer-orasenatdpltintegration03-iad.blockchain.ocp.oraclecloud.com:7443/restproxy/api/v2/channels/car-marketplace-livelab/chaincode-queries
    - For **Connection Establishment**, **Request Transmit**, and **Reading Response** timeouts, enter 60, 10, and 10 respectively
  ![Route 1](3-gateway-4-5.png)

5. Click the '+ Another Route' button and repeat Step 2 for the remaining 3 routes as shown:
  ![Route 2](3-gateway-4-6.png)
  ![Route 3](images/3-gateway-4-7.png)
  ![Route 4](images/3-gateway-4-8.png)

6. 'Review' the deployment information and click 'Create.'
  ![Review Deployment](images/3-gateway-4-9.png)


## Task 5: Prefix Query and Invoke Endpoint During Configuration

Once active, the deployment can be used to make REST API calls between APEX and OBP.

1. Find the **Deployment Information** pane and the **Endpoint** as shown.
  ![Deployment Information](images/3-gateway-5-1.png)

2. --complete after above is confirmed--


## Acknowledgements
* **Author** - Amal Tyagi, Cloud Engineer
* **Contributors** -  Teodora Gheorghe, Adrien Lhemann, Diego Morales, Lokeswara Nushisarva, Siddesh C. Prabhu Dev Ujjni
* **Last Updated By/Date** - Amal Tyagi, 03-22