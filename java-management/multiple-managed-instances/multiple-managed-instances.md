# Set up multiple Managed Instances and Management Gateway

## Introduction
The Management Gateway provides a single point of communication between the Management Agents (or any other customer-side products) and the Oracle Cloud Infrastructure.

Using the Management Gateway as the single point for traffic to and from the Oracle Cloud Infrastructure means that the enterprise firewall only needs to allow HTTPS communication from the host where the Management Gateway resides. This scenario allows installing Management Agent on the hosts which do not need to have direct access to the internet. Oracle recommends to configure the Management Gateway first and then the Management Agent on the other hosts.


  ![image of gateway concepts](/../images/gateway-concepts-diagram.png =400x*)
  
This lab walks you through the steps to install and configure Management Gateway on an on-premises host and have another on-premises host proxy through it to communicate with OCI network and JMS.

Estimated Time: 45 minutes

### Objectives

In this lab, you will:

* Install and configure Management Gateway on an on-premises host
* Verify the installation of Management Gateway
* Install Management Agent on another on-premises host and configure it to communicate to OCI network through Management Gateway


### Prerequisites

* You have signed up for an account with Oracle Cloud Infrastructure and have received your sign-in credentials.
* You are using an Oracle Linux image on your on-premises host machine to install Management Gateway.
* You are using an Oracle Linux image or Windows OS on your another on-premises host machine to install Management Agent.
* Access to the cloud environment and resources configured in the previous labs.
* The hosts, the one running Management Gateway and the one running Management Agent software, must be in same network.

## Task 1: Prepare gateway software and response file for Management Gateway installation

1. Sign in to the Oracle Cloud Console as an administrator using the credentials provided by Oracle, as described in [Signing into the Console](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/signingin.htm).
&nbsp;

2. Open navigation menu, click **Observability & Management**, and then click **Downloads and Keys** under **Management Agent**.  

  ![image of navigating to Management Agent page, Download and Keys section](/../images/navigate-to-management-agent.png)
  

  The Software Download pane will display at the top of the page.

  ![image of Software download pan view](/../images/software-download-pane-view.png)

3. The Software Download pane lists all the software available to download for the Management Agent and Management Gateway. Select the operating system that the Management Gateway will be installed on from the Download column. In this case, click on **Gateway for LINUX (X84_64)** link to download the Management Gateway software file.
  ![image of downloading management gateway software](/../images/download-gateway-software.png)

4. Alternatively, you can run the following command to download **Management Gateway software for Linux**. 
    ```
    <copy>
    wget oracle.mgmt-gateway.rpm https://objectstorage.us-ashburn-1.oraclecloud.com/n/idtskf8cjzhp/b/installer/o/Linux-x86_64/latest/oracle.mgmt_gateway.rpm
    </copy>
    ```    

5. On the same **Downloads and Keys** page, click on **Create key** to create a new **Install key**. An install key is issued against your identity domain and validates the authenticity of the installation. 
  ![image of clicking on create install key button](/../images/create-install-key.png)

6. Enter the required details in Create Key window and click **Create** button.

  ![image of entering details for Install key](/../images/create-install-key-popup.png)

7. On the Install Keys pane select the newly created Install Key. Then on the right side of the selected key, click the action menu and select **Download Key to File** option. 
  ![image of download key to file option](/../images/download-key-to-file-option.png)

8. Create a gateway.rsp response file on your host. This will be used by the Management Gateway installation script to read the parameters specific to your environment.

    ```
    <copy>
    nano /tmp/gateway.rsp
    </copy>
    ```   

  Copy and paste the contents of the install key file downloaded from the previous step into the editor.

  Customize following parameters:
    * **AgentDisplayName**: Add a display name for Management Gateway 
    * **GatewayPort**: 4479
    * Remove the parameters starting with Service.plugin.* parameter.These are agent parameters which are only used for agent installations

     > **Note:** This lab will be using **GatewayPort** 4479, but you can choose any port recommended by your organization.

  A sample response file is included for reference, modify AgentDisplayName and GatewayPort parameters accordingly.
  ![image of final response file](/../images/terminal-edit-install-key.png)

  To save the file, type CTRL+x. Before exiting, nano will ask you if you wish to save the file: Type y to save and exit, type n to abandon your changes and exit.



## Task 2: Install Management Gateway
1. Open the terminal. 

2. Navigate to the directory where you have downloaded the management gateway RPM file and run the following command to install the RPM file: 

    ```
    <copy>

    JDK_DIR=$(find /usr/bin/java)
    sudo JAVA_HOME="${JDK_DIR}" rpm -ivh <rpm_file_name.rpm>

    </copy>
    ```   

  The output will look similar to the following:
    ```
      Preparing...        ################################# [100%]
  Checking pre-requisites
      Checking if any previous gateway service exists        
  Checking if OS has systemd or initd
      Checking available disk space for gateway install
      Checking if /opt/oracle/mgmt_agent directory exists
      Checking if 'mgmt_agent' user exists
      Checking Java version
              Trying /usr/bin/java
              Trying default path /usr/bin/java
              Java version: 1.8.0_282 found at /usr/bin/java
      Checking gateway version
  Updating /  installing...
    1:oracle.mgmt_gateway-<VERSION>################################# [100%]

  Executing install
          Unpacking software zip
          Copying files to destination dir (/opt/oracle/mgmt_agent)
          Initializing software from template
          Checking if JavaScript engine is available to use
          Creating 'mgmt_gateway' daemon        
          Gateway Install Logs: /opt/oracle/mgmt_agent/installer-logs/installer.log.0

          Setup gateway using input response file (run as any user with 'sudo' privileges)
          Usage:
                  sudo /opt/oracle/mgmt_agent/agent_inst/bin/setupGateway.sh opts=[FULL_PATH_TO_INPUT.RSP]

          Gateway install successful
      ```   

3. Configure the management gateway by running the setupGateway.sh script using a response file. 

    ```
    <copy>
    sudo /opt/oracle/mgmt_agent/agent_inst/bin/setupGateway.sh opts=/tmp/gateway.rsp
    </copy>
    ```  


    The output will look similar to the following: 

    ```
    
Executing configure
       Parsing input response file
       Validating install key
       Generating communication wallet
       Generating security artifacts
       Registering Management Gateway
               Found service plugin(s): [GatewayProxy]

Starting gateway...
Gateway started successfully

Starting plugin deployment for: [GatewayProxy]
Deploying service plugin(s)......Done.
        GatewayProxy : Successfully deployed external plugin

Gateway setup completed and the gateway is running.
In the future gateway can be started by directly running: sudo systemctl start mgmt_gateway

Please make sure that you delete <user_home_directory>/gateway.rsp or store it in secure location.

Creating Wallets
Wallets created successfully
Waiting for Gateway to start...
Gateway Proxy started successfully
   
    ``` 

4.  Delete the gateway.rsp file after successful configuration.

    ```
    <copy>
    sudo rm /tmp/gateway.rsp
    </copy>
    ```  

5. As we set the Gateway port to 4479. Open this port on the host firewall by configuring the firewall. 

    ```
    <copy>
    sudo firewall-cmd --zone=public --permanent --add-port=4479/tcp

    sudo firewall-cmd --reload
    </copy>
    ```  

    > **Note:** This set of commands is specifically for Oracle Linux. Please adjust the commands based on your Operating System and Setup.

6. Take note of IP address of the host by running following command.
    ```
    <copy>
    ifconfig
    </copy>
    ```  
    The output may look like this.

  ![image of result of ifconfig command](/../images/terminal-ip-address.png)

    This IP address will be used as value for `ProxyHost` in Management Agent response file in Task 4.
  
## Task 3: Verify the Management Gateway installation 

### Using OCI Console:

1. Open navigation menu, click **Observability & Management**, and then click **Agents** under **Management Agent**.  

  ![image of navigating to Management Agent page, Agents section](/../images/navigate-to-agents-page.png)

2. Select the correct compartment from left hand side panel. In this case it is `Fleet_Compartment`. You should be able to see newly created Management gateway in the **Agents and Gateways** list.

  ![image of verification on running Management Gateway](/../images/view-management-gateway.png)

### Using Command Line Interface on Linux:

1. Login to the host using a user with sudo privileges.

2. Run the following command to check Management Gateway service status:

    For Oracle Linux 6: 
     ```
    <copy>
   sudo /sbin/initctl status mgmt_gateway
    </copy>
    ```  
    

    For Oracle Linux 7 or Oracle Linux 8: 
     ```
    <copy>
   sudo systemctl status mgmt_gateway
    </copy>
    ```
   
    If the Management Gateway is running, the output of the command should look like this.

    ![image of Management Gateway logs](/../images/management-gateway-status.png)

    For more details, check the log file: 
    
     ```
    <copy>
     cat /opt/oracle/mgmt_agent/plugins/GatewayProxy/stateDir/log/mgmt_gateway.log
    </copy>
    ```
    The logs may look like this.

    ![image of Management Gateway logs](/../images/management-gateway-status-logs.png)



## Task 4:  Configure Management Agents after Management Gateway installation


After installing the Management Gateway, you will need to configure each Management Agent to use the Management Gateway **during the initial agent installation process**.


* A fleet, `fleet_1`, has already been setup during [Lab 2](?lab=setup-a-fleet) and you should have access to the downloaded install key file.


* To prepare agent software and response file for Management Agent installation, follow [Task 1 of Lab 5](?lab=set-up-of-management-agent-linux) for Linux OS and [Task 1 of Lab 6](?lab=set-up-of-management-agent-windows) for Windows OS.

* While preparing the response file you must add value for these additional parameters to configure the proxy:
    * **ProxyHost**: The IP address of host that is running Management Gateway
    * **ProxyPort**: 4479 
 
  A sample response file is included for reference.
  ![image of final response file](/../images/response-file-parameters.png)

* Follow [Task 2 - 6 to  of Lab 5](?lab=set-up-of-management-agent-linux) to Install, configure and verify Management Agent installation on Linux OS and [Task 2 - 6 of Lab 6](?lab=set-up-of-management-agent-windows) for Windows OS.




## Task 5: Verify detection of Managed Instance
1. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click on **Fleets** under **Java Management**.

  ![image of console navigation to java management](/../images/console-navigation-jms.png)

2. Select the compartment that the fleet is in and click the fleet.

3. Click **Managed Instance** under **Resources**. If tagging, installation of management agents and communication between Management Gateway and Management Agent is successful, Managed Instance will be indicated on the Fleet Main Page.

  You should be able to see new Managed Instance with latest time stamp.

  ![image of managed instance after successful installation](/../images/successful-installation.png)



You may now **proceed to the next lab.**

## Troubleshoot Management Gateway issues

**For Task 1 Step 4**

* To download the Management Gateway software from a different commercial region, edit the above download URL and replace it with the corresponding region's Object Storage API end point. For details, see [Object Storage Service API](https://docs.oracle.com/iaas/api/#/en/objectstorage/20160918/). 


## Learn More

* Use the [Troubleshooting](https://docs.oracle.com/en-us/iaas/management-agents/doc/troubleshoot-management-gateway-installation-issues.html) chapter for explanations on how to diagnose and resolve common problems encountered when installing or using Management Gateway.

* If the problem still persists or if the problem you are facing is not listed, please refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section or you may open a a support service request using the **Help** menu in the OCI console.

## Acknowledgements

* **Author** - Bhuvesh Kumar, Java Management Service
* **Last Updated By** - Bhuvesh Kumar, June 2022
