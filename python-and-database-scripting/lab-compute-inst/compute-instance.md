# Set up compute instance

## Introduction

This lab will show you how to setup a compute instance.

Estimated Time: 10 minutes

### Objectives

In this lab, you will:

- Setup a compute instance -- NOT NEEDED ANYMORE
- Login to the compute instance using Cloud Shell - NOT NEEDED ANYMORE
- Download the livelab material required for the lab

### Prerequisites

This lab assumes you have: 
- An Oracle Free Tier or Paid Cloud account 


*Note: If you have a **Free Trial** account, when your Free Trial expires your account will be converted to an **Always Free** account. You will not be able to conduct Free Tier workshops unless the Always Free environment is available. **[Click here for the Free Tier FAQ page.](https://www.oracle.com/cloud/free/faq.html)***

## Task 1: Create Compute Instance -- NOT NEEDED ANYMORE - DELETE

1.  Login to your Oracle Cloud Account
2.  Click the **Navigation** Menu in the upper left, navigate to **Compute** and select **Instances**

	![](https://oracle-livelabs.github.io/common/images/console/compute-instances.png " ")

3. Create a new Instance with minimum configuration:
    - Name: livelab_python
    - Compartment: root

    Note that the Oracle Linux 8 compute instance already has Python 3.6.8 installed. If you are running the lab from your own laoptop, you'd need to install Python 
    - Windows: Python xxx minimum
    - Mac OS: Python yyy minimum


4.  Look for the instance you just created and write down the public IP address.
    -	Download the private key
    -	Launch a Cloud shell 
    -	Drag and drop the private key to the console
    -	SSH to the Compute Instance (ssh -i ~/.ssh/ ssh-key.key opc@192.9.130.185)


## Task 2: Create a Public Bucket -- NOT NEEDED ANYMORE - Delete 
1.  Specify a name for the bucket
2.  Upload .zip to the bucket
    - sample code
3. Create Pre-Authenticated Request to the bucket:
    - Type: Object
Note down the URL of the Pre-Authenticated Request - this is needed to wget the .zip file

## Task 3: Connect to Your Instance

Launch Oracle Cloud Shell.  This is a compute instance with Python 3.6.8 installed. We are going to use it in order to run the lab. 

### Oracle Cloud Shell

1. To re-start the Oracle Cloud shell, go to your Cloud console and click the cloud shell icon to the right of the region.  *Note: Make sure you are in the region you were assigned*

    ![](./images/cloudshell.png " ")

2.  Go to **Compute** -> **Instances** and select the instance you created (make sure you choose the correct compartment)
3.  On the instance homepage, find the Public IP address for your instance.

    ![Public IP](./images/db19c-freetier-step5-1.png " ")


You may now **proceed to the next lab**.

## Appendix:  Teraform and Resource Manager
Terraform is a tool for building, changing, and versioning infrastructure safely and efficiently.  Configuration files describe to Terraform the components needed to run a single application or your entire datacenter.  In this lab a configuration file has been created for you to build network and compute components.  The compute component you will build creates an image out of Oracle's Cloud Marketplace.  This image is running Oracle Linux 7.

Resource Manager is an Oracle Cloud Infrastructure service that allows you to automate the process of provisioning your Oracle Cloud Infrastructure resources. Using Terraform, Resource Manager helps you install, configure, and manage resources through the "infrastructure-as-code" model. To learn more about OCI Resource Manager, take a watch the video below.

[](youtube:udJdVCz5HYs)

### Oracle Cloud Marketplace
The Oracle Cloud Marketplace is a catalog of solutions that extends Oracle Cloud services.  It offers multiple consumption modes and deployment modes.  In this lab we will be deploying the free Oracle Enterprise Manager 13c Workshop marketplace image.

[Link to OCI Marketplace](https://www.oracle.com/cloud/marketplace/)

## Appendix: Troubleshooting Tips

If you encountered any issues during the lab, follow the steps below to resolve them.  If you are unable to resolve, please skip to the **Need Help** section to submit your issue via our  support forum.
1. Can't login to instance
2. Invalid public key
3. Limits Exceeded
4. Database Creation stuck at 3x %
5. Apply job is stuck in provisioning state

### Issue 1: Can't login to instance
Participant is unable to login to instance

#### Tips for fixing Issue #1
There may be several reasons why you can't login to the instance.  Here are some common ones we've seen from workshop participants
- Incorrectly formatted ssh key (see above for fix)
- User chose to login from MAC Terminal, Putty, etc and the instance is being blocked by company VPN (shut down VPNs and try to access or use Cloud Shell)
- Incorrect name supplied for ssh key (Do not use sshkeyname, use the key name you provided)
- @ placed before opc user (Remove @ sign and login using the format above)
- Make sure you are the oracle user (type the command *whoami* to check, if not type *sudo su - oracle* to switch to the oracle user)
- Make sure the instance is running (type the command *ps -ef | grep oracle* to see if the oracle processes are running)
- Not enough memory for instance (see Issue #4)


### Issue 2: Invalid public key
![](images/invalid-ssh-key.png  " ")

#### Issue #2 Description
When creating your SSH Key, if the key is invalid the compute instance stack creation will throw an error.

#### Tips for fixing for Issue #2
- Go back to the instructions and ensure you create and **copy/paste** your key into the stack correctly. 
- Copying keys from Cloud Shell may put the key string on two lines.  Make sure you remove the hard return and ensure the key is all one line.
- Ensure you pasted the *.pub file into the window.
1.  Click on **Stack**-> **Edit Stack** -> **Configure Variables**.
2.  Repaste the correctly formatted key
3.  Click **Next**
4.  Click **Save Changes**
5.  Click **Terraform Actions** -> **Apply**

### Issue 3: Limits Exceeded
![](images/no-quota.png  " ")

#### Issue #3 Description
When creating a stack your ability to create an instance is based on the capacity you have available for your tenancy. 

#### Fix for Issue #3
If you have other compute instances you are not using, you can go to those instances and delete them.  If you are using them, follow the instructions to check your available usage and adjust your variables.

*Please ensure that you are NOT running this in the **Always Free** Tier. This workshop does not run on the Always Free tier, you must have available cloud credits.  Go to **Governance** -> **Limits, Quotas and Usage,** select **compute**, ensure that you have **more than** the micro tier available.  If you have only 2 micro computes, your account has transitioned to an Always Free.  This means that the promotional period of 30 days has expired or you have run out of credits, this workshop will NOT run.*

1. Click on the Hamburger menu, go to **Governance** -> **Limits, Quotas and Usage**
2. Select **Compute**
3. These labs use the following compute types.  Check your limit, your usage and the amount you have available in each availability domain (click Scope to change Availability Domain)
4. Look for Standard.E2, Standard.E3.Flex and Standard2
5. This workshop requires at least 4 OCPU and a minimum of 30GB of memory.  If you do not have that available you may request a service limit increase at the top of this screen.  If you have located capacity, please continue to the next step.
6.  Click on the Hamburger menu -> **Resource Manager** -> **Stacks**
7.  Click on the stack you created previously
8.  Click **Edit Stack** -> **Configure Variables**.
9.  Scroll down to Options
10. Change the shape based on the availability you have in your system
11. Click **Next**
12. Click **Save Changes**
13. Click **Terraform Actions** -> **Apply**

### Issue 4: Database Creation stuck at 3x%
When tailing the log, the database creation seems stuck.

#### Issue #4 Description
Database creation requires at least 30GB of memory.  

#### Fix for Issue #4
1.  Click on Compute -> Instance and verify that your instance created was VMStandard.E2.4 and higher.  If you chose 2.2 or a smaller shape, the instance creation will fail, you will need to rerun your stack and recreate your instance.  The instance has run out of memory and won't be able to create
2.  A known issue has been identified that the create script may take longer, if it has been over 2 hours, please submit an issue.
  
### Issue 5: Apply job is stuck in provisioning state
When the apply job is running certain browsers may not reflect the correct state

#### Fix for Issue #5
Reload your browser


## Acknowledgements
- **Author** - Veronica Dumitriu
- **Contributors** - Sanjay Narvekar, Troy Anthony, Anoosha Pilli, Arabella Yao, Kamryn Vinson, Jeffrey Malcolm Jr.
- **Last Updated By/Date** - Veronica Dumitriu, July 2022