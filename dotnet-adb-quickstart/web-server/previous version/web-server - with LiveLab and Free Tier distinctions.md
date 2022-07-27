# Provision and Set Up the Web Server and Networking

## Introduction

In this lab, you will provision and configure an Oracle Cloud Infrastructure Linux compute host and NGINX web server. You will then setup ASP.NET Core support for NGINX and tests the web server is working properly. Finally, you will configure the Virtual Cloud Network to setup connectivity between the compute and database layers.

Oracle Cloud Infrastructure Compute lets you provision and manage compute hosts, known as instances. You can launch instances as needed to meet your compute and application requirements. After you launch an instance, you can access it securely from your computer, restart it, attach and detach volumes, and terminate it when you're done with it. Any changes made to the instance's local drives are lost when you terminate it. Any saved changes to volumes attached to the instance are retained.

Oracle Cloud Infrastructure (OCI) Compute lets you create multiple Virtual Cloud Networks (VCNs). These VCNs will contain security lists, compute instances, load balancers and many other types of network assets.

Be sure to review [Best Practices for Your Compute Instance](https://docs.cloud.oracle.com/iaas/Content/Compute/References/bestpracticescompute.htm) for important information about working with your Oracle Cloud Infrastructure Compute instance.

Estimated Time: 30 minutes

[](youtube:09kahbIF0Ew)

### Objectives
In this lab, you will:
- Create a compute instance
- Connect to the compute instance
- Install and configure NGINX web server
- Create and configure the VCN

### Prerequisites

-   This lab requires completion of the **Getting Started** section in the Contents menu on the left.
  
## Task 1: Create <if type="freetier">a Web Server on </if>a Compute Instance

Oracle Cloud Infrastructure  offers both Bare Metal and Virtual Machine instances:

- **Bare Metal**  - A bare metal compute instance gives you dedicated physical server access for highest performance and strong isolation.
- **Virtual Machine**  - A Virtual Machine (VM) is an independent computing environment that runs on top of physical bare metal hardware. The virtualization makes it possible to run multiple VMs that are isolated from each other. VMs are ideal for running applications that do not require the performance and resources (CPU, memory, network bandwidth, storage) of an entire physical machine.

An Oracle Cloud Infrastructure VM compute instance runs on the same hardware as a Bare Metal instance, leveraging the same cloud-optimized hardware, firmware, software stack, and networking infrastructure.

1. Click the **Navigation Menu** in the upper left. Navigate to **Compute**, and select **Instances**.

	![](images/compute-instances.png " ")

2. On the drop-down menu on the left side of the web page, select the compartment that you wish to create the VM instance. Then, click the **Create Instance** button. This will launch a VM instance for this lab.
  ![](images/create-instance.png)

3. The Create Compute Instance wizard will launch.
    <if type="freetier">Enter **Web-Server** as the name of the server. Click **Edit** on the **Networking** area of the page.</if>
    <if type="livelabs">Enter your username + *-Instance* as the name of the server.</if>

    <if type="freetier">
    ![Create step 1](images/instance-name.png " ")
    </if>
    <if type="livelabs">
    ![](images/create-compute-livelabs-2.png)
    </if>

<if type="livelabs">
4. Click *Change Shape* to choose a VM shape.

    ![](images/create-compute-livelabs-3.png)

5. Select *Intel Skylake*, then select **VM.Standard.2.1** as the shape, and click **Select Shape**.

    ![](images/create-compute-livelabs-4.png)</if>

3. In the Networking section, most of the defaults are perfect for our purposes. However, you will need to scroll down and select the **Assign a public IPv4 address** option.

    <if type="freetier">
    ![Create step 2](images/assign-ip.png " ")</if>

    <if type="livelabs">
    ![](images/create-compute-livelabs-4b.png)</if>

    >**Note:** You need a public IP address, so that you can SSH into the running instance later in this lab.

4. Scroll down to the **Add SSH keys** area of the page. Select **Paste public keys** and paste the SSH key that you created earlier in ***Generate SSH Keys*** Lab. Press the **Create** button to create your instance.

    ![](images/ssh-keys.png)

    Launching an instance is simple and intuitive with few options to select. The provisioning of the compute instance will complete in less than a minute, and the instance state will change from *PROVISIONING* to *RUNNING*.

5. Once the instance state changes to *RUNNING*, you can SSH to the Public IP address of the instance. The Public IP address is noted under *Instance Access*.

    <if type="freetier">
    ![Create step 3](images/public-ip.png " ")</if>

    <if type="livelabs">
    ![](images/compute-livelabs-running/png)</if>

## Task 2: Connect to the Instance <if type="freetier">and Install NGINX Web Server</if>

>**Note**: You may need to log in as the *admin* user to use cloud shell.

1. To connect to the instance, use Cloud Shell and enter the following command:

    >**Note:** For Oracle Linux VMs, the default username is **opc**

    ```
    <copy>ssh -i <private_ssh_key> opc@<public_ip_address></copy>
    ```

    ![](images/ssh.png)

<if type="freetier">    
2. For this lab, we are going to install an NGINX web server and try to connect to it over the public Internet. *Make sure you have SSH'ed into the Linux instance* and run following commands:

    >**Note:** NGINX web server is a free, open-source web server. The NGINX server hosts web content, and responds to requests for this content from web browsers.

    - Install NGINX

        ```
        <copy>sudo yum install httpd -y</copy>
        ```

    - Start the NGINX server and configure it to start after system reboots

        ```
        <copy>sudo apachectl start
        sudo systemctl enable httpd</copy>
        ```

    - Run a quick check on NGINX configurations

        ```
        <copy>sudo apachectl configtest</copy>
        ```

    - Create firewall rules to allow access to the ports on which the HTTP server listens

        ```
        <copy>sudo firewall-cmd --permanent --zone=public --add-service=http
        sudo firewall-cmd --reload</copy>
        ```

    - Create an index file for your web server

        ```
        <copy>sudo bash -c 'echo This is my Web-Server running on Oracle Cloud Infrastructure >> /var/www/html/index.html'</copy>
        ```

3. Open your browser and navigate to `http://<public_ip_address>` (the IP address of the Linux VM)

    >**Note:** Your browser will not return anything because port 80 was not opened into the Security Lists

4. Click the **Navigation Menu** in the upper left. Navigate to **Networking**, and select **Virtual Cloud Networks**. Then click on the VCN name you created for this practice.

	![](https://raw.githubusercontent.com/oracle/learning-library/master/common/images/console/networking-vcn.png " ")

5. Now click **Security Lists** on the left navigation bar for the VCN.

    ![Click on Security Lists](images/security-list.png " ")

6. Click on the **Default Security List**.

7. Here you need to open port 80. Click **Add Ingress Rules** and add the following values as shown below:

    - **Source Type:** CIDR
    - **Source CIDR**: 0.0.0.0/0
    - **IP Protocol:** TCP
    - **Source Port Range:** All
    - **Destination Port Range:** 80
    - Click **Add Ingress Rules** at the bottom

    ![Add Ingress Rule](images/ingress-rule.png " ")

8. Navigate to `http://<public_ip_address>` (the IP address of the Linux VM) in your browser. And now you should see the index page of the web server we created above.

    ![Open you browser to the public IP address](images/browser.png " ")

## Troubleshooting

1. If you are unable to see the webserver on your browser, possible scenarios include:

    - VCN Security Lists is blocking traffic, Check VCN Security List for ingress rule for port 80
    - Firewall on the linux instance is blocking traffic

        - `# sudo firewall-cmd --zone=public --list-services` (this should show http service as part of the public zone)
        - `# sudo netstat -tulnp | grep httpd` (an httpd service should be listening on the port 80, if it’s a different port, open up that port on your VCN SL)

    - Your company VPN is blocking traffic

2. If you cannot successfully run the `sudo` commands, please make sure you have SSH'ed into your compute instance by following Task 2 -> Step 1.
</if>

You have completed this lab. You may now **proceed to the next lab**.

## Acknowledgements

- **Author** - Rajeshwari Rai, Prasenjit Sarkar, Alex Keh
- **Last Updated By/Date** - Alex Keh, June 2022