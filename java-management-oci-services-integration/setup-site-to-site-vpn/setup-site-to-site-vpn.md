# Set up Site-to-Site VPN

## Introduction

Site-to-Site VPN provides a site-to-site IPSec connection between your on-premises network and your virtual cloud network (VCN). The IPSec protocol suite encrypts IP traffic before the packets are transferred from the source to the destination and decrypts the traffic when it arrives. Site-to-Site VPN was previously referred to as VPN Connect and IPSec VPN.

In this lab, you will follow the scenario where an on-premises network would have private access to the Oracle Services such as JMS using Site-to-Site VPN.

The set up image is given for your reference.
![image of on-premises network private access to oracle services](images/network-sgw-transit-basic-layout-with-gateways.png)


Typically the following types of personnel are involved in setting up Site-to-Site VPN with Oracle Cloud Infrastructure: 

* **Dev Ops team member** (or similar function) who uses the Oracle Cloud Infrastructure Console to set up the cloud components required for the virtual network and Site-to-Site VPN.

* **Network engineer** (or similar function) who configures the customer-premises equipment (CPE) device with information provided by the Dev Ops team member.

This lab walks you through the steps to set up Site-to-Site VPN between your on-premises network and your virtual cloud network (VCN). 



Estimated Time: 1 hour

### Objectives

In this lab, you will:

* Set up VCN and additional networking components 
* Set up CPE object
* Set up IPSec connection
* Configure on-premises CPE


### Prerequisites

* You have signed up for a paid account with Oracle Cloud Infrastructure and have received your sign-in credentials.
* Access to the cloud environment and resources configured in the [Manage Java Runtimes, Applications and Managed Instances Inventory with Java Management Service Workshop](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=912).

 > **Note:** This lab requires paid OCI account as Service Gateway is not available in Free tier.


## Task 1: Gather information


1. Before getting started with set up of Site-to-Site VPN, you can learn about Networking and IPSec concepts at these links:
    *  [Networking Overview](https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/overview.htm)
    *  [Site-to-Site VPN Overview](https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/overviewIPsec.htm)

2. Moving forward, you must gather the following information:

    * IPv4 CIDR block for the OCI VCN.

        * In this lab example, we will create a new VCN in Task 2 with the IPv4 CIDR block of **20.0.0.0/16**. 

    * IP address range of the private network (in CIDR notation) that you wish to connect to OCI through Site-to-Site VPN.

        * Get the private IP address of your host using the following command.
        ```
        <copy>
        ifconfig
        </copy>
        ```  
        For example, imagine that your host has a IP address of 192.168.11.22 (obtained using `ifconfig`).


        * If you only want this host in the private network to communicate with OCI using Site-to-Site VPN, then the IP address range is: 192.168.11.22 to 192.168.11.22 →  192.168.11.22/32 (In CIDR notation).

        * If you want a range of IP address (eg. 192.168.11.0 to 192.168.11.255) to communicate with OCI using Site-to-Site VPN, then the IP address range is 192.168.11.0 to 192.168.11.255 → 192.168.11.0/24 (In CIDR notation).

    * Local IP address of your CPE.

        * Get the local private IP address of your host using the following command.
            ```
            <copy>
            ifconfig
            </copy>
            ``` 

    * Public IP address of your CPE.

        * Get the public IP address of your host using the following command.
            ```
            <copy>
            curl ifconfig.me
            </copy>
            ``` 

> **Note:** Your public IP address may change over time depending on your setup with your Internet Service Provider (ISP). Do validate your public IP address again when performing this step. 

Take note of these details. These details will be used in upcoming tasks. You can always revisit this Task, to verify the details.    


## Task 2: Set up VCN in OCI

1. Sign in to the Oracle Cloud Console as an administrator using the credentials provided by Oracle, as described in [Signing into the Console](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/signingin.htm).
&nbsp;

2. Create the VCN
    * Open navigation menu, click **Networking**, and then click **Virtual Cloud Networks** option. 
    ![image of navigating to Virtual Cloud Networks section](images/navigate-to-vcn.png)

    * Select the compartment where you want to create the VCN. In this case, select `Fleet_Compartment`.

    * Click **Create VCN**.
    ![image of step to create a new VCN](images/create-vcn.png)

    * Enter the following values:
        * **Create in Compartment**: Leave as is.
        * **Name**: A descriptive name for the cloud network. 
        * **IPv4 CIDR Block**: 20.0.0.0/16 as mentioned in Task 1.

        ![image of details for new VCN](images/details-for-new-vcn.png)

    * Click **Create VCN**.
     ![image of saving a new VCN](images/save-new-vcn.png)


## Task 3: Create Dynamic Routing Gateway (DRG) and attach it to your VCN

1. Create the Dynamic Routing Gateway (DRG)
    * Open the navigation menu and click **Networking**. Under **Customer Connectivity**, click **Dynamic Routing Gateway**.
    ![image of navigating to Dynamic Routing Gateway section](images/navigate-to-dynamic-routing-gateway.png)

    * Click **Create Dynamic Routing Gateway**.
    ![image of step to create a new Dynamic Routing Gateway](images/create-new-drg.png)

    * Enter the following values:
        * **Create in Compartment**: Leave as is (the VCN's compartment).
        * **Name**: A descriptive name for the DRG.

        ![image of details for new DRG](images/details-for-new-drg.png) 
        
    * Click **Create Dynamic Routing Gateway**.
    ![image of saving a new DRG](images/save-new-drg.png)

2. Attach the DRG to the VCN
    * Click the name of the DRG you created in previous step.
    ![image of newly created DRG](images/newly-created-drg.png)

    * Under **Resources**, click **Virtual Cloud Networks Attachments**.

    * Click **Create Virtual Cloud Network Attachment**.
    ![image of creating new VCN attachment](images/create-vcn-attachment.png)

    * Select the VCN that you created in step 1. 
    ![image of details of VCN attachment](images/details-for-new-drg-att.png)


    * Click **Create Virtual Cloud Network Attachment**.
    ![image of save new VCN attachment](images/save-new-drg-att.png)


## Task 4: Create Service Gateway (SGW)

SGW provides a path for private network traffic between your VCN and supported services in the Oracle Services Network (example: Java Management Service). For more information, see [Access to Oracle Services: Service Gateway](https://docs.oracle.com/en-us/iaas/Content/Network/Tasks/servicegateway.htm#Access_to_Oracle_Services_Service_Gateway).


1. Create the Service Gateway (SGW)
    * Open navigation menu, click **Networking**, and then click **Virtual Cloud Networks** option.
    ![image of navigating to Virtual Cloud Networks section](images/navigate-to-vcn.png)

    * Select the VCN you have created in step 1.
    * Under **Resources**, click **Service Gateway**.
    * Click **Create Service Gateway**.
    ![image of save new Service Gateway](images/create-new-service-gateway.png)


    * Enter the following values:
        * **Create in Compartment**: Leave as is (the VCN's compartment).
        * **Name**: A descriptive name for the SGW. 
        * **Services**: Select **All IAD Services In Oracle Services Network** from the drop down list.

        ![image of details for new Service Gateway](images/details-for-service-gateway.png)
      * Click **Create Service Gateway**.
      ![image of save new Service Gateway](images/save-service-gateway.png)



## Task 5: Set up Route tables and Route rules in your VCN for SGW and DRG 

1. Create a Route Table and Route Rule for SGW

    * Open the navigation menu, click **Networking**, and then click **Virtual Cloud Networks**.
    ![image of navigating to Virtual Cloud Networks section](images/navigate-to-vcn.png)

    * Select the VCN you have created in step 1.
    * Under **Resources**, click **Route Tables**.
    * Click **Create Route Table**.
    ![image of creating new Route Table](images/create-new-route-table.png)
    
    * Enter the following values:
        * Name: A descriptive name for the route table 
        * Create in compartment: Leave as is.
        * Click **+ Another Route Rule**, and enter the following:
            * **Target Type**: Service Gateway.
            * **Destination Service**: Select **All IAD Services In Oracle Services Network** from the drop down list.
            * **Compartment**: The compartment where the service gateway is located.
            * **Target**: The service gateway that you have created.
            * **Description**: An optional description of the rule.

        ![image of creating new Route Table for SGW](images/route-table-for-sgw.png)
                
    * Click Create Route Table.
    ![image of saving new Route Table for SGW](images/save-changes-route-table-for-sgw.png)

2. Create a Route Table and Route Rule for DRG

    * On the same **Route Tables** page, click **Create Route Table**.
     ![image of creating new Route Table](images/create-new-route-table.png)

    * Enter the following values:
        * **Name**: A descriptive name for the route table 
        * **Create in compartment**: Leave as is.
        * Click **+ Another Route Rule**, and enter the following:
            * **Target Type**: Dynamic Routing Gateway. 
            * **Destination CIDR Block**: The CIDR for your on-premises network (see the list of information gathered in Task 1).
            * **Description**: An optional description of the rule.
        
        ![image of details of new Route Table for DRG](images/route-table-for-drg.png)
        
    * Click **Create**.
   

    * Both the newly created Route Tables should look like this.
    ![image of both new Route Tables](images/all-route-tables.png)



3. Add SGW Route Rule in DRG attachment
    * Open the navigation menu, click **Networking**, and then click **Virtual Cloud Networks**.
    ![image of navigating to Virtual Cloud Networks section](images/navigate-to-vcn.png)

    * Select the VCN you have created in step 1.
    * Under **Resources**, click **Dynamic Routing Gateways Attachments**.
    * Click the Attachment that you have created.
    ![image of dynamic routing gateway page](images/dynamic-routing-gateways-attachments-page.png)

    * Click **Edit**.
     ![image of editing DRG](images/edit-drg-attachment.png)

    * Click **Show Advanced Options**.
    ![image of configuring  DRG](images/show-advanced-options-drg-att.png)

    * Toggle to **VCN route table** tab.
    ![image of configuring DRG](images/toggle-to-vcn-route-table.png)

    * Select **Select Existing** radio button and then select the Route rule for DRG from drop down list, that you have created.
    ![image of configuring DRG](images/select-route-rule.png)

    * Click **Save Changes**.
    ![image of saving the configuration of DRG](images/save-new-route-rule.png)


4. Add DRG Route Rule in SGW
    * Open the navigation menu, click **Networking**, and then click **Virtual Cloud Networks**.
    ![image of navigating to Virtual Cloud Networks section](images/navigate-to-vcn.png)

    * Select the VCN you have created in step 1.
    * Under **Resources**, click **Service Gateway**.
    ![image of service gateway page](images/select-service-gateway.png)

    * Click on more options button and select **Associate Different Route Table**.
    ![image of editing service gateway](images/edit-service-gateway.png)

    
    * Select the Route rule for DRG from drop down list, that you have created.
    ![image of configuring SGW](images/associate-route-rule-to-sgw.png)

    * Click **Associate Different Route Table**.
    ![image of saving configuration SGW](images/save-associate-route-rule-to-sgw.png)


## Task 6: Setup a CPE object and IPSec connection

In this task, you will create the CPE object and IPSec tunnels and configure the type of routing for them (static routing). CPE object is a virtual representation (on Oracle side) of your CPE device (on on-premises network).

1. Create CPE object

    * Open the navigation menu and click **Networking**. Under **Customer Connectivity**, click **Customer-Premises Equipment**.
    ![image of navigating to Customer connectivity section](images/navigate-to-customer-connectivity.png)

    * Click **Create Customer-Premises Equipment**.
     ![image of creating new Customer Premises Equipment](images/create-cpe.png)

    * Enter the following values:
        * **Create in Compartment**: Leave as is (the VCN's compartment).
        * **Name**: A descriptive name for the CPE object.
        * **IP Address**: The public IP address of the actual CPE/edge device at your end of the VPN (see the list of information to gather in Task 1).
        * **Vendor**: Select Libreswan.
        * **Platform/Version**: Select the latest version available.

        ![image of details of new Customer Premises Equipment](images/details-of-new-cpe.png)

    * Click **Create CPE**.
    ![image of saving new Customer Premises Equipment](images/save-details-of-cpe.png)


2. Create IPSec Connection
    * Open the navigation menu and click **Networking**. Under **Customer Connectivity**, click **Site-to-Site VPN**.
    ![image of navigating to Customer connectivity section](images/navigate-to-site-to-site.png)

    * Click **Create IPSec Connection**.
    ![image of creating new IPSec Connection](images/create-ipsec-connection.png)


    * Enter the following values:

        * **Create in Compartment**: Leave as is (the VCN's compartment).
        * **Name**: Enter a descriptive name for the IPSec connection. 
        * **Customer-Premises Equipment Compartment**: Leave as is (the VCN's compartment).
        * **Customer-Premises Equipment**: Select the CPE object that you created earlier.
        * **Dynamic Routing Gateway Compartment**: Leave as is (the VCN's compartment).
        * **Dynamic Routing Gateway**: Select the DRG that you created in Task 2.
        * **Static Route CIDR**: The CIDR for your on-premises network (see the list of information gathered in Task 1).

        ![image of details of IPSec Connection](images/details-of-ipsec.png)




    * On the Tunnel 1 tab:

        * **Tunnel Name**: Enter a descriptive name for the tunnel (optional).
        * **Routing Type**: Select Static Routing.

        ![image of details of IPSec Connection tunnel 1](images/details-of-tunnel-1.png)


    * On the Tunnel 2 tab:

        * **Tunnel Name**: Enter a descriptive name for the tunnel (optional).
        * **Routing Type**: Select Static Routing.

        ![image of details of IPSec Connection tunnel 2](images/details-of-tunnel-2.png)



    * Click **Create IPSec Connection**.
    ![image of saving IPSec Connection](images/save-ipsec-details.png)


    * Created IPSec connection displays tunnel information that includes:

        * The Oracle VPN IP address (for the Oracle VPN headend).
        * The tunnel's IPSec status.
        * To view the tunnel's shared secret, click the tunnel to view its details, and then click Show next to Shared Secret.

    * Use **CPE Configuration Helper** to create **Configuration Output** .
        * Click on **Open CPE Configuration Helper**.
        ![image of Open CPE Configuration Helper](images/ipsec-config-helper-page.png)

        * Click **Create Content**.
        ![image of Create Content in Configuration Helper](images/ipsec-cpe-config-helper.png)

        * Download the configuration file.
        ![image of Downloading the configuration file](images/ipsec-config-output.png)

        * The **Configuration File** will be used in Task 7 to Configure the CPE.



## Task 7: Configure CPE on your on-premises host
On your on-premises network you need to install Libreswan as a CPE ( Customer-Premises Equipment) so traffic can flow between your on-premises network and virtual cloud network (VCN) via Site-to-Site VPN.

1. Install Libreswan on your on-premises host.
    ```
    <copy>
    sudo yum -y install libreswan
    </copy>
    ```   

2. Depending on the Linux distribution you're using, you might need to enable IP forwarding on your interface to allow clients to send and receive traffic through Libreswan.

3. In the Terminal window, edit the `sysctl.conf` by entering this command:
    ```
    <copy>
    sudo nano /etc/sysctl.conf
    </copy>
    ```  
    In the file, paste the following text:

    ```
    <copy>
    net.ipv4.ip_forward=1
    net.ipv4.conf.all.accept_redirects = 0
    net.ipv4.conf.all.send_redirects = 0
    net.ipv4.conf.default.send_redirects = 0
    net.ipv4.conf.eth0.send_redirects = 0
    net.ipv4.conf.default.accept_redirects = 0
    net.ipv4.conf.eth0.accept_redirects = 0
    </copy>
    ```  
    
    In the above example, our network interface is the Ethernet network interface **eth0**. If you're using an interface other than **eth0**, change **eth0** in lines 5 and 7 to the correct network interface for your machine. 
    
    You can obtain your network interface details from your network engineer or use the following command.

    ```
    <copy>
    ip link show
    </copy>
    ```  

    The private IP address should look like 192.168.XXX.XXX.

    To save the file, type CTRL+x. Before exiting, nano will ask you if you wish to save the file: Type y to save and exit, type n to abandon your changes and exit.

    The file may look like this:
    ![image of sysctl configuration file](images/sysctl-demo-screen.png)

4. Apply the updates with:
    ```
    <copy>
    sudo sysctl -p
    </copy>
    ``` 
5. The Libreswan configuration uses the following variables. Determine the values before proceeding with the configuration. We recommend you to use the **Configuration File**, downloaded in last Task, to fill these details.

    * **${cpeLocalIP}**: Replace placeholder with the private IP address of your Libreswan device (see list of gathered information in Task 1).
    * **${cpePublicIpAddress}**: Replace placeholder with The public IP address for Libreswan (see list of gathered information in Task 1). 
    * **${oracleHeadend1}**: For the first tunnel, the Oracle public IP endpoint obtained from the **Configuration File**.
    * **${oracleHeadend2}**: For the second tunnel, the Oracle public IP endpoint obtained from the **Configuration File**.
    * **${vti1}**: Replace placeholder with a any name for the first Tunnel. For example, `vti1`.
    * **${vti2}**: Replace placeholder with a any name for the second Tunnel. For example, `vti2`.
    * **${sharedSecret1}**: The pre-shared key for the first tunnel obtained from the **Configuration File**. 
    * **${sharedSecret2}**: The pre-shared key for the second tunnel obtained from the **Configuration File**. 

        The information in configuration file may look like this (highlighted Oracle public IP endpoints and pre-shared keys):
        ![image of downloaded configuraion file](images/downloaded-config-file.png)


7. In the Terminal window, edit the `/etc/ipsec.d/oci-ipsec.conf` by entering this command:
    ```
    <copy>
    sudo nano /etc/ipsec.d/oci-ipsec.conf
    </copy>
    ```  
    In the file, paste the following text and replace variable values:
    ```
    <copy>
    conn oracle-tunnel-1
     left=${cpeLocalIP}
     leftid=${cpePublicIpAddress} # See preceding note about 1-1 NAT device
     right=${oracleHeadend1}
     authby=secret
     leftsubnet=0.0.0.0/0 
     rightsubnet=0.0.0.0/0
     auto=start
     mark=5/0xffffffff # Needs to be unique across all tunnels
     vti-interface=${vti1}
     vti-routing=no
     ikev2=no # To use IKEv2, change to ikev2=insist 
     ike=aes_cbc256-sha2_384;modp1536
     phase2alg=aes_gcm256;modp1536
     encapsulation=yes
     ikelifetime=28800s
     salifetime=3600s
conn oracle-tunnel-2
     left=${cpeLocalIP}
     leftid=${cpePublicIpAddress} # See preceding note about 1-1 NAT device
     right=${oracleHeadend2}
     authby=secret
     leftsubnet=0.0.0.0/0
     rightsubnet=0.0.0.0/0
     auto=start
     mark=6/0xffffffff # Needs to be unique across all tunnels
     vti-interface=${vti2}
     vti-routing=no
     ikev2=no # To use IKEv2, change to ikev2=insist 
     ike=aes_cbc256-sha2_384;modp1536
     phase2alg=aes_gcm256;modp1536 
     encapsulation=yes
     ikelifetime=28800s
     salifetime=3600s
    </copy>
    ```  

    To save the file, type CTRL+x. Before exiting, nano will ask you if you wish to save the file: Type y to save and exit, type n to abandon your changes and exit.

    The file may look like this:
    ![image of ipsec configuration file](images/ipsec-conf-demo.png)



7. Now, in the Terminal window, edit the `/etc/ipsec.d/oci-ipsec.secrets` by using this command:
    ```
    <copy>
    sudo nano /etc/ipsec.d/oci-ipsec.secrets
    </copy>
    ```  
    In the file, paste the following text and replace variable values:
    ```
    <copy>
    ${cpePublicIpAddress} ${oracleHeadend1}: PSK "${sharedSecret1}"
    ${cpePublicIpAddress} ${oracleHeadend2}: PSK "${sharedSecret2}"
    </copy>
    ```  

    To save the file, type CTRL+x. Before exiting, nano will ask you if you wish to save the file: Type y to save and exit, type n to abandon your changes and exit.

    The file may look like this:
    ![image of ipsec secrets file](images/ipsec-secrets-demo.png)

8. Restart Libreswan service.

    ```
    <copy>
    sudo service ipsec restart
    </copy>
    ```  

9. Check the status of IPSec service.
    ```
    <copy>
    sudo service ipsec status
    </copy>
    ```  

    The tunnel is established if you see lines that include the following in ipsec status logs:

    ```
    <copy>
    STATE_MAIN_I4 (IKE SA established)
    </copy>
    ```  

    ```
    <copy>
    STATE_QUICK_I2 (IPsec SA established)    
    </copy>
    ```  




    If you do not see these lines, then please follow the suggestions at [Site-to-Site VPN Troubleshooting](https://docs.oracle.com/en-us/iaas/Content/Network/Troubleshoot/ipsectroubleshoot.htm) page.

10. Once the IPSec service is up and running, check if the virtual tunnel interfaces are up or down by using the following command.

    ```
    <copy>
    ip link show
    </copy>
    ```  
    Here's an example of the `ip link show` output:
    ![image of tunnel interface](images/tunnel-interfaces.png)





11. In order to reach the full range of services on Oracle Service Network (OSN) through the tunnel, you need to add to the routing table, all the OSN CIDR for the region where the tenancy resides. The full IP ranges are defined [here](https://docs.oracle.com/en-us/iaas/tools/public_ip_ranges.json). Each CIDR block can be manually added to the route table using the following command:

    ```
    <copy>
    ip route add ${OsnCidrBlock} nexthop dev ${vti1} nexthop dev ${vti2}    
    </copy>
    ``` 

    We can make the process of adding all the OSN CIDR blocks to your routing table easier, by automating it using the following bash script:

* Open terminal and create a bash script file.
    ```
    <copy>
    sudo nano json-parser.sh
    </copy>
    ```  
* Add the following code in the file.

    ```
    <copy>
#!/bin/bash

wget https://docs.oracle.com/en-us/iaas/tools/public_ip_ranges.json

read -p "Enter region name: " VAR
read -p "Enter tunnel 1 interface name: " vti1
read -p "Enter tunnel 2 interface name: " vti2
VAR1=$(echo "$VAR" | sed 's/$/"/' | sed 's/./"&/')
TAG=$(echo "OSN" | sed 's/$/"/' | sed 's/./"&/')

REGION=$(jq '.regions[1].region' public_ip_ranges.json)
FLAG="FALSE"

for (( i = 0; i <= 50; i++ ))      ### Outer for loop ###
do
    REGION=$(jq '.regions['$i'].region' public_ip_ranges.json)

    if [[ "$REGION" == "$VAR1" ]]; then
      echo "$REGION"

      for (( j = 0; j <= 100; j++ ))      ### inner for loop ###
            do
                VALUES=$(jq '.regions['$i'].cidrs['$j'].tags[0]' public_ip_ranges.json)
                 if [[ "$VALUES" == "$TAG" ]]; then
                      IP=$(jq '.regions['$i'].cidrs['$j'].cidr' public_ip_ranges.json)

                      OSNCidrBlock=$( echo "$IP" | sed 's/^.//;s/.$//')
                      echo "$OSNCidrBlock"
                      TMP=$( sudo ip route add "$OSNCidrBlock" nexthop dev "$vti1" nexthop dev "$vti2")

                      FLAG="TRUE"

                 else
                	echo -ne ""
                 fi
      done

  else
      echo  -ne ""
    fi

done

if [[ "$FLAG" == "FALSE" ]]; then
      echo "Wrong Region Identifier!"
      echo "Please refer to https://docs.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm and find the correct Region Identifier."
 
 else
        echo -ne ""
 fi

    </copy>
    ```  

* Change the permission of bash script file.
    ```
    <copy>
    sudo chmod 777 json-parser.sh
    </copy>
    ``` 

* Run the script.
    ```
    <copy>
    ./json-parser.sh
    </copy>
    ``` 

    The script will prompt up for three parameters. 
    * **Region Identifier:** Input the Region Identifier for the Region Name.
    
        * Please check your Home region from OCI Console Top bar. 
        ![image of region identifier page](images/region-identifier.png)

        * Then go to [Region Identifiers](https://docs.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm) page to check the correct Region Identifier name for your region.
        ![image of region identifier page details](images/region-identifier-details.png)



        For example the Region identifier for `US East (Ashburn)` is `us-ashburn-1`.

        


    * **Tunnel 1 interface name:** Value of ${vti1}, you set in step 6. 
    * **Tunnel 2 interface name:** Value of ${vti2}, you set in step 6.

        If the Region identifier name is wrong, the script will prompt up the message:

        ```
        <copy>
        Wrong Region Identifier!
        Please refer to https://docs.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm and find the correct Region Identifier.

        </copy>
        ``` 
        
         If the tunnel interfaces are not valid, the script output will have the below given line:

        ```
        <copy>
        Cannot find device "<user input tunnel interface name>"
        Error: cannot parse nexthop
        </copy>
        ``` 


* Once the script has run successfully, please execute the following command to check the newly added ip routes for Oracle Service Network.
    ```
    <copy>
    ip route show
    </copy>
    ``` 

    Output might look like this.
    ![image of ip route table](images/ip-route-table.png)


     > **Note:** Manual addition to IP route table does not persist on restart. You need to re-run json-parser.sh to add those routes again upon restart of your Libreswan host.

## Task 8: Setup Management Gateway and Management Agent
Once you have finishing setting up Site-to-Site VPN, you can install and configure Management Gateway on same host as Libreswan and Management Agent on other on-premises host (in the same network) to demonstrate the working of Site-to-Site VPN setup along with JMS.

* Follow [Manage Java Runtimes, Applications and Managed Instances Inventory with Java Management Service Workshop, Lab 6](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=912) to install, configure and verify Management Gateway and Management Agent.


## Task 9: Verify the Site-to-Site VPN set up

1. Verify IPSec connection
    * Open the navigation menu and click **Networking**. Under **Customer Connectivity**, click **Site-to-Site VPN**.
    ![image of navigating to Customer connectivity section](images/navigate-to-site-to-site.png)

    * Select the IPSec Connection that you have created.

    * Check **IPSec Status**
    ![image of verification of IPSec connection](images/verify-ipsec-connection.png)

        The **IPSec Status** for both tunnels should be **Up**.

2. Verify Management Gateway and Agent installation
    * In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Agents** under **Management Agent**.
    ![image of console navigation to access management agent overview](images/management-agent-overview.png)

    * From the Agents  and Gateway list, look for the gateway and agent that was recently installed. The **Availability** should be **Active**.
    ![image of agents main page](images/agent-and-gateway-page.png)

3. Verify detection of Managed Instance 


    * In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click on **Fleets** under **Java Management**.
    ![image of console navigation to java management](images/console-navigation-jms.png)

    * Select the compartment that the fleet is in and click the fleet.

    * Click **Managed Instance** under **Resources**. If tagging, installation of management agents and communication between Management Gateway and Management Agent is successful, Managed Instance will be indicated on the Fleet Main Page.

    * You should be able to see new Managed Instance with latest time stamp.
    ![image of managed instance after successful installation](images/successful-installation.png)




4. Testing the setup by blocking traffic at Service Gateway
    * Open navigation menu, click **Networking**, and then click **Virtual Cloud Networks** option.
    ![image of navigating to Virtual Cloud Networks section](images/navigate-to-vcn.png)

    * Select the VCN you have created.
    * Under **Resources**, click **Service Gateway**.
    * Select the Service Gateway that you created and click more options (three dots).
    ![image of more options for SGW](images/service-gateway-block-traffic.png)

    * Select `Block traffic`.
    * Service Gateway **State** will change from **Available** to **Blocked**.
    ![image of changed state](images/blocked-service-gateway.png)

    * After 5-10 mins, on the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Agents** under **Management Agent**.
    ![image of console navigation to access management agent overview](images/management-agent-overview.png)

    * From the Agents and Gateway list, look for the gateway and agent that was recently installed. The **Availability** should be **Silent**.
    ![image of agents main page](images/silent-agent-and-gateway.png)

    * **Conclusion**: As the traffic from on-premises host is being routed to OCI via VPN and within OCI  through DRG and SGW, the Agents and Gateway change status from `Active` to `Silent`, as soon as the SGW traffic is `Blocked`.






## Learn More

* If the problem still persists or it is not listed, then refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section. You can also open a support service request using the **Help** menu in the OCI console.


## Acknowledgements

* **Author** - Bhuvesh Kumar, Java Management Service
* **Last Updated By** - Sherlin Yeo, March 2023
