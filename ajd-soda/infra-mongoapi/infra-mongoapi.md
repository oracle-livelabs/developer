# Infrastructure Configuration

## Introduction

In this lab we will build the infrastructure that we will use to run the rest of the workshop. 

The main three elements that we will be creating are a **Virtual Cloud Network** which helps you define your own data center network topology inside the Oracle Cloud by defining some of the following components (Subnets, Route Tables, Security Lists, Gateways, etc.), **Compute instance** using an image from the marketplace including the libraries need to execute the scripts needed to create and execute applications in Python. And finally an **Autonomous JSON Database** where we will allocate the JSON documents that we will ingest our Python apps with.

We will prepare the documents to be capable of accesing to **SODA APIs**, in particular, to create, drop, and list document collections using **APEX** as vehicle to visualize the JSON documents as we used to do with structure data. Tha capability is unique of Oracle Databases.

**Estimated Lab Time: 40 minutes.**

### Objectives

In this lab, you will:

* Create Virtual Cloud Network (VCN)
* Provision Compute Node for development
* Provision Oracle Autonomous JSON Database (AJD)
* Prepare Document Store

### Prerequisites

* An Oracle Free Tier, Always Free, or Paid Oracle Cloud Account


## Task 1: Create Virtual Cloud Network (VCN)

1. Login to Oracle cloud console: [cloud.oracle.com](https://cloud.oracle.com/)

    - Cloud Account Name: oci-tenant
    - **Next**
    
    ![cloud Account Name](./images/task1/cloud-account-name.png)

    - User Name: oci-username - email address provided
    - Password: oci-password
    - **Sign In**

    ![User Name & Password](./images/task1/username-password.png)    

2. Click on main menu ≡, then Networking > **Virtual Cloud Networks**. Select your Region and Compartment assigned by the instructor. 

    >**Note**: Use **Root** Compartment, oci-tenant(root), to create all resources for this workshop.

    ![Oracle Console Networking](./images/task1/oracle-console-networking.png)

3. Select your Region and Compartment assigned by the instructor. Click **Start VCN Wizard**.
    
    ![Oracle Console Networking Start Wizard](./images/task1/oracle-console-networking-start-wizard.png)

4. Select **Create VCN with Internet Connectivity**. Start **VCN Wizard**.

   ![Create VCN with Internet Connectivity](./images/task1/create-vcn-with-internet-connectivity.png)

5. Provide the following information:

    - VCN Name: 
    ```
    <copy>DEVCN</copy>
    ```
    - Compartment: Be sure you have selected the correct one for this workshop purpose. **Root** is the recommended one
    - Click **Next**

    ![vcnName & Compartment](./images/task1/vcn-name-compartment.png)

6. Review the information in the 'Review and Create Page' and Click **Create**.

    ![vcn Creation](./images/task1/vcn-creation.png)

7. The Resources have being created on the next page. Click **View Virtual Cloud Network** to access to the vcn.

    ![View vcn Page](./images/task1/view-vcn-page.png)
    ![DEVCN Detail](./images/task1/devcn-detail.png)

8. Click **Public Subnet-DEVCN**. 

    ![Public Subnet](./images/task1/public-subnet.png)

9. Click **Default Security List for DEVCN**.
    
    ![Default Security List for DEVCN](./images/task1/default-security-list-for-devcn.png)

10. Click **Add Ingress Rules**.

    ![Add Ingress Rules](./images/task1/add-ingress-rules.png)

11. Provide the following information:

    - CIDR Block: 
    ```
    <copy>0.0.0.0/0</copy>
    ```
    - Destination Port Range: 
    ```
    <copy>5000</copy>
    ```
    - Description: 
    ```
    <copy>Python Flask</copy>
    ```
    - Click **+ Another Ingress Rule**

    ![Python Flask Rule](./images/task1/python-flask-rule.png)

12. Provide the following information:

    - CIDR Block:
    ```
    <copy>0.0.0.0/0</copy>
    ```
    - Destination Port Range:
    ```
    <copy>80</copy>
    ```
    - Description: 
    ```
    <copy>HTTP</copy>
    ```
    - Click **Add Ingress Rules**
    
    ![Port 80 Rule](./images/task1/port80-rule-new.png)

13. You can check on the **Detail Page** that the 2 Ingress Rules have beed added.
    
    ![All Ingress Rules Added](./images/task1/all-ingress-rules-added-new.png)

## Task 2: Provision Compute Node for development

1. Click on the following link to access to a marketplace image from [Oracle marketplace](https://bit.ly/3CxvsxA).

    ![Marketplace Image](./images/task2/marketplace-image.png)

2. Click **Get App**.

    ![Marketplace Get App](./images/task2/marketplace-get-app.png)

3. Select **Commercial Market** and click **Sign in**.

    ![Marketplace Commercial Market](./images/task2/marketplace-commercial-market.png)

4. In the next screen be sure that you have the correct information:

    - Version: 2.0 (3/4/2022) - default
    - Compartment: Be sure you have selected the correct one for this workshop purpose. **Root** is the recommended one
    - **Accept** the Oracle standard Terms and Restrictions
    - **Launch Instance**

    ![Marketplace Launch App](./images/task2/marketplace-launch-app.png)

5. Provide the following information:

    - Name: 
    ```
    <copy>DEVM</copy>
    ```
    - Comparment: Be sure you have selected the correct one for this workshop purpose. **Root** is the recommended one
    - Image and shape: click **Edit/Collapse** and after **Change shape** if you don't have the following information:
        - Image: **MongoDB and Autonomous JSON workshop**
        - Shape: **VM.Standard.E2.1.Micro - Always Free eligible**
    
    ![Marketplace Compute Instance Creation](./images/task2/marketplace-compute-instance-creation.png)

    If you are using your own cloud account, not just a trial, you can see this section different. Just be sure you have all the information as following selected:

    - Name: 
    ```
    <copy>DEVM</copy>
    ```
    - Comparment: Be sure you have selected the correct one for this workshop purpose. **Root** is the recommended one
    - Image and shape: click **Edit/Collapse** and after **Change shape** if you don't have the following information:
        - Image: **MongoDB and Autonomous JSON workshop**
        - Shape: **VM.Standard.E2.1.Micro - Always Free eligible**
    
    ![Marketplace Compute Instance Creation No Trial](./images/task2/marketplace-compute-instance-creation-no-trial.png)

    - Networking: Be sure you have the following information. If not, click **Edit/Collapse** to edit the information:

        - Virtual cloud network: **DEVCN**
        - Subnet: **Public Subnet-DEVCN (regional)**
    
    ![Networking Compute](./images/task2/networking-compute.png)

    - Download the private and public keys: **Save Private Key**, **Save Public Key**

    ![Private & Public Keys](./images/task2/private-public-keys.png)

    - Click **Create**

    ![Create Compute](./images/task2/create-compute.png)
       
6. Wait for Compute Instance to finish provisioning, and have status Available (click browser Refresh button). 
On the Instance Details page, copy Public IP Address in your notes.

    ![Compute Provisioning](./images/task2/compute-provisioning.png)
    ![Compute Running](./images/task2/compute-running.png)

> Note: On the Instance Details page, copy **Public IP Address** in your notes.


## Task 3: Provision Oracle Autonomous JSON Database (AJD)

1. **Click** on main menu ≡, then Oracle Database > **Autonomous JSON Database**. **Create Autonomous Database**.

    ![Oracle Console AJD](./images/task3/oracle-console-ajson.png)

2. Click **Create Autonomous Database**.

    ![Create AJD](./images/task3/create-ajson.png)

3. Provide the following information:

    - Comparment: Be sure you have selected the correct one for this workshop purpose. *Root* is the recommended one
    - Display name: 
    ```
    <copy>AJDEV</copy>
    ```
    - Database name:
    ```
    <copy>AJDEV</copy>
    ```
    - Choose a workload type: JSON
    - Choose a deployment type: Shared Infrastructure
    - Always Free: Show only Always Free configuration options
    - Choose database version: 19c
    - OCPU count: 1
    - Storage (TB): 1 or 0.02 if you are using a Trial account

    ![Creation AJD Dashboard](./images/task3/creation-ajson-dashboard.png)

4. Under **Create administrator** credentials:

    - Password: 
    ```
    <copy>DBlearnPTS#22_</copy>
    ```

    > We recomend you to use the password as later on, it will be use for running Python scripts. If you consider changing it, remember that later on, you will need to modify the Python scripts manually.
    
    ![Creation AJD Password](./images/task3/creation-ajson-password.png)
    
5. Under **Choose network access**:

    - Access Type: Secure access from everywhere

    ![Creation AJD Network](./images/task3/creation-ajson-network.png)

6. Under **Choose a license type**:
    
    - License included
    
    ![Creation AJD License](./images/task3/creation-ajson-license.png)

7. Click **Create Autonomous Database**.

    ![Creation AJD Create](./images/task3/creation-ajson-create.png)

8. Wait for Lifecycle State to become **Available** from Provisioning (click browser Refresh button).

    ![AJD Provisioning](./images/task3/ajson-provisioning.png)
    ![AJD Available](./images/task3/ajson-available.png)

9. Next to the big green box, click **DB Connection**.
    
    ![AJD DB Connection](./images/task3/ajson-db-connection.png)

10. Click **Download wallet**.

    ![Download Wallet](./images/task3/download-wallet.png)

11. Type the following information:

    - Password:
    ```
    <copy>DBlearnPTS#22_</copy>
    ```
    - Confirm Password:
    ```
    <copy>DBlearnPTS#22_</copy>
    ```
    - Click **Download**

    ![Download Wallet Password](./images/task3/download-wallet-password.png)

12. Click **Save file** and **OK**.
    
    ![Save Wallet](./images/task3/save-wallet.png)

13. To access to our compute instance, we will use the **cloud shell**, a small linux terminal embedded in the OCI interface. **Click** on the **shell** icon next to the name of the OCI region, on the top right corner of the page.

    ![Cloud Shell](./images/task3/cloud-shell.png)

14. **Drag and drop** the previously saved **private key file** (ssh-key-xxx.key) and **wallet file** (Wallet_AJDEV.zip) into the **cloud shell**. Be sure both files have been completed checking the **green flag**.

    ![Cloud Shell Files](./images/task3/cloud-shell-files.png)

15. You can **verify** if the files have been transfered correctly using the following command:

    ````
    <copy>
    ll   
    </copy>
    ````

    ![Cloud Shell Files](./images/task3/ll.png)

16. We will **copy** the files in our **compute machine** in this case in `/home/opc` through the **ssh connections** using the **Public IP**. **Replace** <Public_IP> with your own one, removing <> too. We copied the Public IP when we provisioned the compute instance few tasks back. Execute the following commands:

    ````
    <copy>
    chmod 400 <private-key-file-name>.key
    scp -i <private-key-file-name>.key ./Wallet_AJDEV.zip opc@<Public_IP>:/home/opc
    </copy>
    ````

    ![scp Command](./images/task3/scp-command.png)

    > NOTE: If you are asked: `Are you sure you want to continue connecting (yes/no)?`, please type **yes** to continue.

17. Now we will stablish an **ssh connections** using the **Public IP.** Replace <Public_IP> with your own one, removing <> too. We copied the Public IP when we provisioned the compute instance few tasks back. Execute the following commands:

    ````
    <copy>
    ssh -i <private-key-file-name>.key opc@<Public_IP>
    </copy>
    ````

    ![ssh Connection](./images/task3/ssh.png)

18. We will **unzip** the **Wallet** running the following commands:

    ````
    <copy>
    unzip Wallet_AJDEV.zip -d Wallet_AJDEV
    </copy>
    ````

    ![ssh Connection](./images/task3/unzip-wallet.png)

19. We will **export** the **paths** and give access to the **firewall** using the following commands:

    ````
    <copy>
    sed -i 's/?\/network\/admin/\${TNS_ADMIN}/g' Wallet_AJDEV/sqlnet.ora
    export TNS_ADMIN=/home/opc/Wallet_AJDEV
    export LD_LIBRARY_PATH=/usr/lib/oracle/21/client64/lib
    export PATH=$PATH:/usr/lib/oracle/21/client64/bin/
    sudo firewall-cmd --zone=public --add-port=5000/tcp --permanent
    sudo firewall-cmd --reload
    </copy>
    ````

    ![Export Paths Firewall](./images/task3/export-paths-firewall.png)

## Task 4: Prepare Document Store


1. **Click** on main menu ≡, then Oracle Database > **Autonomous JSON Database**. 

    ![AJD Dashboard](./images/task4/ajson-dashboard.png)

2. On **Tools tab**, under **Oracle Application Express**, click **Open APEX**. 

    ![Apex](./images/task4/apex.png)

3. On **Administration Services** login page, use password for **ADMIN**.

    - Password: 
    ```
    <copy>DBlearnPTS#22_</copy>
    ```

    ![Apex ADMIN](./images/task4/apex-admin.png)

4. Click **Create Workspace**.

    ![Apex Workspace](./images/task4/apex-workspace.png)

5. Type the following information:

    - Database User:
    ```
    <copy>DEMO</copy>
    ```
    - Password: 
    ```
    <copy>DBlearnPTS#22_</copy>
    ```
    - Workspace Name:
    ```
    <copy>DEMO</copy>
    ```

    ![Apex Workspace DEMO](./images/task4/apex-workspace-demo.png)
    
6. Click **DEMO** in the middle of the page to **Sign in** as **DEMO** user.
 
    ![Apex Login DEMO](./images/task4/apex-log-in-demo.png)
 
7. Click **Sign In** Page using the following information:

    - Workspace: 
    ```
    <copy>demo</copy>
    ```
    - Username:
    ```
    <copy>demo</copy>
    ```
    - Password: 
    ```
    <copy>DBlearnPTS#22_</copy>
    ```

    ![Login DEMO](./images/task4/log-in-demo.png)

    **Oracle APEX** uses low-code development to let you build data-driven apps quickly without having to learn complex web technologies. This also gives you access to Oracle REST Data Services, that allows developers to readily expose and/or consume RESTful Web Services by defining REST end points.

8. On Oracle Cloud Infrastructure Console, click **Database Actions** next to the big green box. Allow pop-ups from cloud.oracle.com. If you need to **Sign in** again remember doing it as admin:
    - User:
    ```
    <copy>admin</copy>
    ```
    - Password:
    ```
    <copy>DBlearnPTS#22_</copy>
    ```

    ![DB Actions](./images/task4/db-actions.png)

9. Click **Development** > **SQL** (first button).

    ![DB Actions SQL](./images/task4/db-actions-sql.png)

10. Run the following code using **Run Script** button:

    ````
    <copy>
    BEGIN 
       ords_admin.enable_schema (
          p_enabled => TRUE,
          p_schema => 'DEMO',
          p_url_mapping_type => 'BASE_PATH',
          p_url_mapping_pattern => 'demo',
          p_auto_rest_auth => NULL
       ) ;
      commit ;
    END ; 
    /
    </copy>
    ````

    ![Enable Schema Script](./images/task4/enable-schema-script.png)
    
    >**Note** : For all code you run in SQL Developer Web, make sure you receive a success message:

    ````
    PL/SQL procedure successfully completed.
    ````
    
    ![PLSQL Successfully completed](./images/task4/plsql-success.png)    

11. Grant **SODA_APP** to DEMO user. This role provides privileges to use the SODA APIs, in particular, to create, drop, and list document collections. Use **Run Statement** button to execute this command.

    ````
    <copy>
    GRANT SODA_APP TO demo;
    </copy>
    ````

    ![GRANT SODA](./images/task4/grant-soda.png)

12. Click **ADMIN** upper right corner, and **Sign Out**. 

    ![Sign Out](./images/task4/sign-out.png)

13. Click **Sign In**. Login using DEMO user credentials.

    - Username:
     ```
    <copy>demo</copy>
    ```
    - Password:
     ```
    <copy>DBlearnPTS#22_</copy>
    ```
    
    ![Sign In DEMO](./images/task4/sign-in-demo.png)
    
14. Click **Development** > **JSON**, and follow the tips. This is the interface you will use to manage your JSON collections in this document store.

    ![DB Actions JSON](./images/task4/db-actions-json.png)


*You can proceed to the next lab…*

## Acknowledgements
* **Author** - Valentin Leonard Tabacaru, Database Product Management and Priscila Iruela, Technology Product Strategy Director
* **Contributors** - Victor Martin Alvarez, Technology Product Strategy Director
* **Last Updated By/Date** - Priscila Iruela, June 2022

## Need Help?
Please submit feedback or ask for help using our [LiveLabs Support Forum](https://community.oracle.com/tech/developers/categories/livelabsdiscussions). Please click the **Log In** button and login using your Oracle Account. Click the **Ask A Question** button to the left to start a *New Discussion* or *Ask a Question*.  Please include your workshop name and lab name.  You can also include screenshots and attach files.  Engage directly with the author of the workshop.

If you do not have an Oracle Account, click [here](https://profile.oracle.com/myprofile/account/create-account.jspx) to create one.