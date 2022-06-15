# Setup Dev Environment

## Introduction

In this  lab, you will configure your development environment and collect information that will be used later throughout this workshop.

Estimated Time: ~25 minutes

### Objectives

* Launch Cloud Shell
* Download the workshop code and scripts from GitHub
* Set up an OCI Compartment and install a two nodes OKE cluster
* Create the ATP database, the user schema and a database table  
* Create an OCI Registry and Auth key
* Access OKE from the Cloud Shell

### Prerequisites

- This lab requires an [Oracle Cloud account](https://www.oracle.com/cloud/free/). You may use your own cloud account, a cloud account that you obtained through a trial, a Free Tier account, or a LiveLabs account.

## Task 1: Launch the Cloud Shell and Clone mtdrworkshop GitHub repository

1. Launch Cloud Shell

  The Cloud Shell is a small virtual machine running a Bash shell which you access through the OCI Console. It comes with a pre-authenticate CLI pre-installed and configured so you can immediately start working in your tenancy without having to spend time on installation and configuration!

  Click the Cloud Shell icon in the top-right corner of the Console.
  ![](images/7-open-cloud-shell.png " ")

2. Clone the GitHub repo and move up the `mtdrworkshop` directory.

    ```
    <copy>
    git clone https://github.com/oracle/oci-react-samples.git
    </copy>
    ```

    ```
    <copy>
    cd ~/oci-react-samples; mv mtdrworkshop ..
    </copy>
    ```

  You should now see `mtdrworkshop` in your root directory

3. Change to `mtdrworkshop` directory.

  	```
  	<copy>
  	cd ~/mtdrworkshop
  	</copy>
  	```

4. Set the execution mode for all Shell scripts.

    ```
    <copy>chmod +x *.sh */*.sh</copy>
    ```

    >  **NOTE:** THE CLOUD SHELL WILL DISCONNECT AFTER A CERTAIN PERIOD OF INACTIVITY. IF YOU ARE DISCONNECTED OR LOGGED OFF AND RETURN TO CLOUD SHELL, MAKE SURE YOU ARE IN THE ~/mtdrworkshop DIRECTORY.

## Task 2: Create an OCI compartment and an OKE cluster in that compartment

 1. Open up the hamburger menu in the top-left corner of the Console and select **Identity & Security > Compartments**.

  	![](images/15-identity-compartments.png " ")

 2. Click **Create Compartment** with the following parameters then click **Create Compartment**:

	- Compartment name: `mtdrworkshop`
	- Description: `My ToDo React workshop compartment`

    ![](./images/16-create-compartment.png " ")

    ![](images/17-create-compartment2.png " ")

  3. Once the compartment is created, click the name of the compartment and then click **Copy** to copy the OCID.

    ![](images/19-compartment-name-ocid.png " ")

    ![](images/20-compartment-ocid.png " ")

  4. Go back into your cloud shell and verify you are in the `~/mtdrworkshop` directory.

  5. Run `./setCompartmentId.sh <COMPARTMENT_OCID> <REGION_ID>` where your `<COMPARTMENT_OCID>` and `<REGION_ID>`   values are set as arguments.

    To find your region id, check cloud web url in the browser & look for string "region=xx-xxxx-xx".

      For example:
      ```
       `./setCompartmentId.sh ocid1.compartment.oc1..aaaaaaaaxbvaatfz6yourcomparmentidhere5dnzgcbivfwvsho77myfnqq us-ashburn-1`
      ```
       This will set the environment variables that will allow other scripts to pick the information.

  6.  To create an OKE cluster, return to the OCI console and open up the hamburger button in the top-left corner of the Console and go to **Developer Services > Kubernetes Clusters**.

    ![](images/27-dev-services-oke.png " ")

  7. Make sure you are in the newly created compartment and click **Create Cluster**.
     (Please use the default schema in the unlikely situation that the newly created compartment is not quickly visible on the left pickler)
    ![](images/28-create-oke.png " ")

  8. Choose **Quick Create** as it will create the new cluster along with the new network resources such as Virtual Cloud Network (VCN), Internet Gateway (IG), NAT Gateway (NAT), Regional Subnet for worker nodes, and a Regional Subnet for load balancers. Click **Launch Workflow**.

    ![](images/29-create-oke-wizard.png " ")

  9. Change the name of the cluster to `mtdrworkshopcluster`, accept all the other defaults, and click **Next** to review the cluster settings.


  10. Once reviewed click **Create Cluster**, and you will see the resource creation progress.

    ![](images/31-create-oke-wizard3.png " ")

  11. Close the creation window once you can.

    ![](images/32-close-cluster-create.png " ")

  12. Once launched it should usually take around 5-10 minutes for the cluster to be fully provisioned and the Cluster Status should show Active.

    ![](images/33-click-cluster-name.png " ")

    ![](images/34-copy-cluster-id.png " ")

    There is no need to wait for the cluster to be fully provisioned at this point as we will verify cluster creation and create a kube config in order to access it in a later step.


## Task 3: Create the ATP database

1. Open up the hamburger menu in the top-left corner of the Console and select **Oracle Databse > Autonomous Transaction Processing**.

    ![](images/menu-autonomous.png " ")

2. Click on **Create Autonomous Database**.

    ![](images/create-autonomous.png " ")

3. Set **Compartment, Database Name and Display Name**.

	- Set the workload type to "Transaction Processing".
	- Accept the default Deployment Type "Shared Infrastructure".

   ![](images/ATP-config-1.png " ")

4.  Set **ADMIN password, Network Access Type and License Type**

	- Set the database ADMIN password (12 to 30 characters, at least one uppercase letter, one lowercase letter, and one number) and confirm.
		Please note the ADMIN password; it will be required later.
	- Set the Network Access type to "Allow secure access from specific IPs an VCNs".
	- Set the license type to "Bring Your Own License (BYOL)" (does not matter for this workshop)
	- Click on "Create Autonomous Database"

   ![](images/ADB-setup.png " ")

	The database creation will take a few minutes.

5. Populate mtdrworkshopdbid.txt with the database OCID

    - Create the "~/mtdrworkshop/workingdir/mtdrworkshopdbid.txt" file.

        ```
        <copy>touch ~/mtdrworkshop/workingdir/mtdrworkshopdbid.txt</copy>
        ```

        ![](images/42-copy-atp-ocids2.png " ")

    - Copy the OCID of the newly created database from the Cloud console and
      add it into `~/mtdrworkshop/workingdir/mtdrworkshopdbid.txt` file.



        ```
        For example
        echo ocid1.autonomousdatabase.oc1.xxx.xxxx  > ~/mtdrworkshop/workingdir/mtdrworkshopdbid.txt
        ```


6. Generate the Wallet for your ATP Connectivity

	- Still in Cloud Shell, make sure you are in the
		"~/mtdrworkshop/setup-dev-environment" directory.

	- Copy the following command and replace $OCID by the
     copied OCID.

		```
		<copy>
     cd ~/mtdrworkshop/setup-dev-environment
     OCID=$( cat ~/mtdrworkshop/workingdir/mtdrworkshopdbid.txt )
    ./generateWallet.sh $OCID
     </copy>
		```
    - Execute generateWallet.sh ocid1.autonomousdatabase.oc1.phx.abyhqlj....

    You will be requested to enter a password for wallet encryption, this is separate for the ADMIN password but you could reuse the statement.
    A wallet.zip file will be created in the current directory.



7. Create TODOUSER using sql utility in Cloud shell

    - Stay in mtdrwokshop/setup-dev-environment directory and launch
      sql with /nolog option

      ![](images/SQLCl-Cloud-Shell.png " ")

    - Point the tool at your wallet.zip file
      SQL> set cloudconfig wallet.zip

      SQL> show tns
      ![](images/Show-tns.png " ")

    - Connect to mtdrdb_tp service, as database ADMIN user (remember the
      password given to ADMIN above)

      SQL> connect ADMIN@mtdrdb_tp

    - Create TODOUSER (replace <password> by a strong password).

        ```
        <copy> CREATE USER todouser IDENTIFIED BY <password> DEFAULT TABLESPACE data QUOTA UNLIMITED ON data;</copy>
        ```
    - Grant some privileges to TODOUSER by executing the following command

        ```
        <copy>grant create session, create view, create sequence, create procedure, create table, create trigger, create type, create materialized view to todouser;</copy>
        ```

    - Verify you can connect as TODOUSER with the password you provided.
        ```
          SQL> <copy> connect todouser@mtdrdb_tp </copy>
        ```

<!--
      - Create TODOITEM table

         Copy the following command in the Worksheet and execute.

         ```
         <copy>CREATE TABLE todoitem (
           id NUMBER GENERATED ALWAYS AS IDENTITY,
           description VARCHAR2(4000),
           creation_ts TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
           done NUMBER(1,0),
           PRIMARY KEY (id)
          );</copy>
         ```

      - Insert the first row, manually into TODOITEM table

        ```
        <copy>insert into todoitem  (description) values ('Manual item insert');</copy>
        ```

      Then commit the inserted row

        ```
        <copy>commit;</copy>
        ```

-->

## Task 4: Create an OCI Registry and Auth key

You are now going to create an Oracle Cloud Infrastructure Registry and an Auth key. The Oracle Cloud Infrastructure Registry is an Oracle-managed registry that enables you to simplify your development-to-production workflow by storing, sharing, and managing development artifacts such as Docker images.

1. Open up the hamburger menu in the top-left corner of the console and go to **Developer Services > Container Registry**.

  ![](images/21-dev-services-registry.png " ")

2. Take note of the namespace (for example, `axkcsk2aiatb` shown in the image below).

  ![](images/22-create-repo.png " ")

3. Click **Create Repository** , specify the following details for your new repository, and click **Create Repository**.
	- Repository Name: <tenancy name>/mtdrworkshop
	- Access: Public

4. Go to Cloud Shell and run `./addOCIRInfo.sh` with the namespace and repository name as arguments

    ```
    <copy>./addOCIRInfo.sh <namespace> <repository_name></copy>
    ```
  	For example `./addOCIRInfo.sh axkcsk2aiatb mtdrworkshop.user1/mtdrworkshop`

5. You will now create the Auth token by going back to the User Settings page. Click the Profile icon in the top-right corner of the Console and select **User Settings**.

    ![](images/23-user-settings.png " ")

6. Click on **Auth Tokens** and select **Generate Token**.

    ![](images/24-gen-auth-token.png " ")

7. In the description type `mtdrworkshoptoken` and click **Generate Token**.

    ![](images/25-gen-auth-token2.png " ")

8. Copy the token value.

    ![](images/26-save-auth-token.png " ")

9. Go to Cloud Shell, at the workshop root directory and run the dockerLogin.sh scripts
    ```
    . ./dockerLogin.sh  USERNAME AUTH_TOKEN
    ```

    <USERNAME> - is the username used to log in (typically your email address). If your username is federated from Oracle Identity Cloud Service, you need to add the oracleidentitycloudservice/ prefix to your username.

    Example oracleidentitycloudservice/firstname.lastname@something.com
    Note: Please run the script with . ./dockerLogin.sh. This will help to export the username and AUTH token which is useful in the next step.

    "<AUTH_TOKEN>" - paste the generated token value and enclose the value in quotes.


    ```
    For example
    . ./dockerLogin.sh user.foo@bar.com "8nO[BKNU5iwasdf2xeefU;yl"
    ```

    Once successfully logged into Container Docker Registry, you should see the "Login Succeeded" in the cloud shell.

    We can list the existing docker images. Since this is the first time logging into Registry, no images will be shown.

    ```
    <copy>docker images </copy>
    ```

## Task 5: Access OKE from the Cloud Shell

  1. Create the mtdrworkshop/workingdir/mtdrworkshopclusterid.txt file

      ```
      <copy>touch ~/mtdrworkshop/workingdir/mtdrworkshopclusterid.txt</copy>
      ```

  2. Navigate to **Developer Services > Kubernetes Clusters**

  3. Copy the mdtrworkshopcluster id and paste into the newly created file
    ![](images/mtdrworkshop-cluster-id.png " ")

    ```
    For example
    echo ocid1.cluster.oc1.yyy.xxxxx  > ~/mtdrworkshop/workingdir/mtdrworkshopclusterid.txt
    ```

  4. Run `./verifyOKEAndCreateKubeConfig.sh`

    ```
    <copy>./verifyOKEAndCreateKubeConfig.sh</copy>
    ```

   Notice `/.kube/config` is created for the OKE cluster.

    ![](images/verifyOKEOutput.png " ")


## Task 6:  Create a imagePullSecret  for the Tutorial

  To enable Kubernetes to pull an image from Oracle Cloud Infrastructure Registry when deploying an application, you need to create a Kubernetes secret. The secret includes all the login details you would provide if you were manually logging in to Oracle Cloud Infrastructure Registry using the docker login command, including your auth token.

  ```
  <copy>
  echo MTDRWORKSHOP_OCIR_NAMESPACE = $MTDRWORKSHOP_OCIR_NAMESPACE
  echo MTDRWORKSHOP_REGION = $MTDRWORKSHOP_REGION
  echo MTDRWORKSHOP_OCIR_USER = $MTDRWORKSHOP_OCIR_USER
  echo MTDRWORKSHOP_OCIR_AUTHKEY = $MTDRWORKSHOP_OCIR_AUTHKEY

   kubectl create secret docker-registry todolistpullsecret3 --docker-server=$MTDRWORKSHOP_REGION --docker-username='$MTDRWORKSHOP_OCIR_NAMESPACE/$MTDRWORKSHOP_OCIR_USER'  --docker-password=$MTDRWORKSHOP_OCIR_AUTHKEY
   </copy>
  ```



## Task 7: Access OKE from the Cloud Shell

1. Create the mtdrworkshop/workingdir/mtdrworkshopclusterid.txt file

    ```
    <copy>touch ~/mtdrworkshop/workingdir/mtdrworkshopclusterid.txt</copy>
    ```

2. Navigate to **Developer Services > Kubernetes Clusters**

3. Copy the mdtrworkshopcluster id and paste into the newly created file
  ![](images/mtdrworkshop-cluster-id.png " ")

      ```
      For example
      echo ocid1.cluster.oc1.yyy.xxxxx  > ~/mtdrworkshop/workingdir/mtdrworkshopclusterid.txt
      ```

4. Run `./verifyOKEAndCreateKubeConfig.sh`

    ```
    <copy>./verifyOKEAndCreateKubeConfig.sh</copy>
    ```

 Notice `/.kube/config` is created for the OKE cluster.

  ![](images/verifyOKEOutput.png " ")

## Task 8: Configuring Network Security Rules

1. The network security rules control the inbound (Ingres) and the outbound (Egress) traffic. As we will be configuring the API Gateway in Part II, we will not set tight security rules at the Kubernetes cluster level.
2. Navigate to **Developer Services > Kubernetes Clusters**
   	- Click on the **mtdrworkshopcluster**

3. Click on VCN Name
  ![](images/VCN-name.png " ")
4. Click on  the VCN named starting with oke-svclbsubnet-quick-mtdrworkshpcluster
  ![](images/oke-svclbsubnet.png " ")

5. Click on the existing security list
  ![](images/Add-security-lists.png " ")

6. Add an Ingress Rule
  Set the Destination CIDR  as indicated (leave other fields as is) then Click `Add Ingress Rules`
  ![](images/Ingress-rule.png " ")

7. Click on Egress Rules and add an Egress Rule
  Set Stateless and Destination CIDR as indicated in the image (leave other fields as-is) then Click `Add Egress Rules`  
  ![](images/Egress-rule.png " ")

  Note: Skipping this step will have issues while testing API gateways.

Congratulations, you have completed lab 1; you may now proceed to the next lab.

## Acknowledgements

* **Author** -  - Vijay Balebail, Director Product Management.
* **Contributors** - Satyabrata Mishra, Rajeev Rumale
* **Last Updated By/Date** - Kamryn Vinson, November 2021
