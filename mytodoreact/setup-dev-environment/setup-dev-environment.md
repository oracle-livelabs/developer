# Setup the development environment

## Introduction

In this lab, you will configure your development environment and collect information that will be used later throughout this workshop. The setup script requires certain environment variables to be set, which is why a script for configuring the environment variables is necessary. After the environment varialbes are set, the setup script uses Terraform, Bash, and SQL to automate the creation of all the resources needed for this lab, such as VCNs, an OKE Cluster, Autonomous database, etc. The script also creates a table in the provisioned database and inserts one record into the table, which you will use to make sure the setup was done correctly.

Estimated time: 25 minutes

Watch the video below for a quick walk through of the lab.

[](youtube:l6hEDTdOiEI)

### Objectives

* Create group and give the appropriate permissions to run the setup
* Clone the github repository and execute setup script to create the following resources:
	* 1 Autonomous database
    * 1 OKE cluster (3 Compute VMs)
    * 2 OCI Container Registry
    * 1 Virtual Cloud Network

### Prerequisites

* This lab requires an [Oracle Cloud account](https://www.oracle.com/cloud/free/). You may use your own cloud account, a cloud account that you obtained through a trial, a Free Tier account, or a LiveLabs account.

## Task 1: Create Group and Appropriate Policies
[Policies](https://docs.oracle.com/en-us/iaas/Content/Identity/Concepts/policies.htm) determine what resources users are allowed to access and what level of access they have. You can create a group and add as many users as you like to that group. 

If you are not the tenancy administrator, there may be additional policies you must have in your group to perform some of the steps for this lab. If you cannot create a group and add specific policies, please ask your tenancy administrator for the correct policies in order to follow along.

**If your group already has the permissions listed in part 6 of this task or you are the administrator or owner of your tenancy, you may skip to Task 2.**

1. First make sure you are in your home region.

	![Home region](images/home-region.png " ")


2. Click the navigation menu in the top left, click on **Identity and Security** and select Groups.

	![Groups](images/groups.png " ")


3. Click on Create Group and enter the details for group name and description. Be mindful of the restrictions for group name (no spaces, etc.) 

	![Create Group](images/create-group.png " ")

  	Once you have filled in these details click _Create_. Your group should show up under Groups

  	![Group created](images/group-created.png " ")


4. Add your user to the group that you have just created by selecting the name of the group you have created and selecting **Add User to Group**

	![Add user to group](images/add-user-group.png " ")



5. Navigate to policies and click Create Policy

	![Create Policy](images/create-policy.png " ")

6. You should see a page like the following. This is where you will create the policy that will give the group permissions to execute the setup for this workshop.

	![:Policy details](images/policy-details.png " ")

	Select **Show manual editor** and copy and paste these policies in the box below

	```
	<copy>
	Allow group myToDoGroup to use cloud-shell in tenancy
	Allow group myToDoGroup to manage users in tenancy
	Allow group myToDoGroup to manage all-resources in tenancy
	Allow group myToDoGroup to manage buckets in tenancy
	Allow group myToDoGroup to manage objects in tenancy
	</copy>
	```

## Task 2: Launch the Cloud Shell


1. Launch Cloud Shell

	The Cloud Shell is a small virtual machine running a Bash shell which you access through the OCI Console. It comes with a pre-authenticated CLI pre-installed and configured so you can immediately start working in your tenancy without having to spend time on installation and configuration!

	Click the Cloud Shell icon in the top-right corner of the Console.


	![Cloud Shell](images/7-open-cloud-shell.png " ")

## Task 3: Create a Folder for the Workshop Code

The workshop requires a root directory to be created and contain the workshop code and scripts. The directory name will be used to create a compartment of the same name in your tenancy if you do not provide one of your own. The directory name will also be used to uniquely identify your workshop.

1. Create a directory. The directory name **must be between 1 and 13 characters, contain only letters or numbers, and start with a letter**. Make sure that a compartment of the same name does not already exist in your tenancy or the setup will fail. For example:

	```
	<copy>
	mkdir todoworkshop && cd todoworkshop
	</copy>
	```

## Task 4: Clone the Workshop Code

1. Clone the workshop code inside the directory you just created.

	```
	<copy>
	git clone --single-branch --branch helidon https://github.com/oracle/oci-react-samples.git
	</copy>
	```
  You should now see `oci-react-samples` in your root directory

## Task 5: Start the Setup

The setup script uses terraform, bash scripts, and SQL to automate the creation of the resources needed for this lab. The script will ask for the necessary components to automate resource creation. 


1. Run the following sequence of commands to start the setup:

	```
	<copy>
	source oci-react-samples/mtdrworkshop/env.sh
	source oci-react-samples/mtdrworkshop/setup.sh
	</copy>
	```

2. If the previous steps were done correctly, the setup will ask for your OCID. 

  	![User OCID](images/terminal-user-ocid.png " ")

  	To find your user's OCID navigate to the upper right within the OCI console and click on your username. Copy your user's OCID by clicking copy

	![Copy user OCID](images/copy-user-ocid.png " ")

3. The setup will then ask for your compartment OCID. If you have a compartment, enter the compartment's OCID. If you do not have a compartment then hit enter and it will create a compartment under the root compartment for you automatically. 

	![Compartment OCID](images/compartment-ocid-ask.png " ")

	To use an existing compartment, you must enter the OCID of the compartment yourself. To find the OCID of an existing compartment, click on the Navigation Menu of the cloud console, navigate to **Identity & Security** and click on **Compartments**

	![Navigate compartment](images/compartment-navigate.png " ")

	Select and navigate to the appropriate compartment. Finally, copy the OCID of the compartment you wish to provision resources under.

	![Compartment OCID](images/compartment-ocid.png " ")


4. Next the setup will create an authentication token for your tenancy so that docker can log in to the Oracle Cloud Infrastructure Registry. If there is no space for a new Auth Token, the setup will ask you to remove an auth token then hit enter when you are ready. Select Auth Tokens under resources and delete one auth token if you have too many

	![Delete Token](images/delete-auth-token.png " ")

5. The setup will ask you to enter the admin password for the database. Database passwords must be 12 to 30 characters and contain at least one uppercase leter, one lowercase letter, and one number. The password cannot contain the double quote (") character or the word "admin".

	![Database password](images/db-password-prompt.png " ")
    
6. The setup should complete in around 20 minutes to complete. During the setup, the cloud shell will output its progress so keep an eye on it to see exactly what it's doing. If there are any errors, you should check the logs located in the `$MTDRWORKSHOP_LOG` directory. The setup will update you with the progress of the resource creation. Wait for the setup to complete to move on to the next lab

	![Setup progress feedback](images/resource-creation-update.png " ")

## Task 6: Complete the Setup

When the setup is done running, you will see a message: **SETUP VERIFIED**

1. Observe the provisioned resources. You can view the log files in the $MTDRWORKSHOP_LOG directory. The command below will show you all the log files. You can view the contents of the files if you'd like.

	```
	<copy>
	ls -al $MTDRWORKSHOP_LOG
	</copy>
	```

2. Check that the Oracle Autonomous Database has been provisioned, under `Oracle Database -> Autonomous Database -> Autonomous Transaction Processing`
	![Navigate to DB](images/navigate-to-atp.png " ")

	![Observe ADB](images/observe-provisioned-db.png " ")

3. Check that the Kubernetes cluster has been provisioned on the OCI Console, under `Developer Services -> Containers & Artifacts -> Kubernetes Clusters (OKE)`

	![Navigate to OKE](images/navigate-to-oke.png " ")

	![Observe OKE](images/observe-provisioned-cluster.png " ")

4. Check that the Oracle Container Registries for the backend and frontend code has been provisioned, under `Developer Services -> Containers & Artifacts -> Container Registry`
	![Navigate to OCR](images/navigate-to-cr.png " ")

	![Observe OCR](images/observe-provisioned-ocr.png " ")

You may now **proceed to the next lab**.

## Acknowledgements

* **Authors** -  - Kuassi Mensah, Dir. Product Management, Java Database Access; Norman Aberin, Developer Advocate JDBC
* **Contributors** - Jean de Lavarene, Sr. Director of Development JDBC/UCP
* **Last Updated By/Date** - Norman Aberin, Developer Advocate, August 2023
