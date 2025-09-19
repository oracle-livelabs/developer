# Provision and set up the web server

## Introduction

In this lab, you will provision and configure an Oracle Cloud Infrastructure Linux compute host and NGINX web server. You will then setup ASP.NET Core for NGINX and test the web server is working properly. Finally, you will complete Virtual Cloud Network configuration for connectivity between the compute and database layers.

Oracle Cloud Infrastructure Compute lets you provision and manage compute hosts, known as instances. You can launch instances as needed to meet your compute and application requirements. After you launch an instance, you can access it securely from your computer, restart it, attach and detach volumes, and terminate it when you're done with it. Any changes made to the instance's local drives are lost when you terminate it. Any saved changes to volumes attached to the instance are retained.

Oracle Cloud Infrastructure (OCI) Compute lets you create multiple Virtual Cloud Networks (VCNs). These VCNs will contain security lists, compute instances, load balancers and many other types of network assets.

Be sure to review [Best Practices for Your Compute Instance](https://docs.cloud.oracle.com/iaas/Content/Compute/References/bestpracticescompute.htm) for important information about working with your Oracle Cloud Infrastructure Compute instance.

Estimated lab time: 20 minutes

### Objectives
In this lab, you will:
- Create a compute instance
- Connect to the compute instance
- Install and configure NGINX web server
- Create and configure the VCN

### Prerequisites

-   This lab requires completion of the **Get started** section and networking lab in the Contents menu on the left.
  
## Task 1: Create a Compute Instance

Oracle Cloud Infrastructure  offers both Bare Metal and Virtual Machine instances:

- **Bare Metal**  - A bare metal compute instance gives you dedicated physical server access for highest performance and strong isolation.
- **Virtual Machine**  - A Virtual Machine (VM) is an independent computing environment that runs on top of physical bare metal hardware. The virtualization makes it possible to run multiple VMs that are isolated from each other. VMs are ideal for running applications that do not require the performance and resources (CPU, memory, network bandwidth, storage) of an entire physical machine.

An Oracle Cloud Infrastructure VM compute instance runs on the same hardware as a Bare Metal instance, leveraging the same cloud-optimized hardware, firmware, software stack, and networking infrastructure.

1. Click the **Navigation Menu** in the upper left. Navigate to **Compute**, and select **Instances**.

	![Navigate to compute instance section](./images/compute-instances.png " ")

2. Click the **Create Instance** button. This will launch a VM instance for this lab.

    ![Start compute instance creation](./images/create-instance.png)

3. The Create Compute Instance wizard will launch.
    Enter **Web-Server** as the name of the server. Click **Change image** in the **Image and shape** section. 

    ![Enter a server name and begin editing the compute's image and shape](./images/name-instance.png " ")
   
4. The **Image and shape** section expands. Oracle Linux is the default selection. We will use Oracle Linux for the web server operating system.

    ![Choose Oracle Linux as the operating system](./images/choose-oracle-linux-os.png)

5. Scroll down. Select **Oracle Linux Cloud Developer 8** image radio button. This image includes .NET Software Development Kit.

    ![Select Oracle Linux Cloud Developer image](./images/choose-cloud-developer-image.png)

6. Once **Oracle Linux Cloud Developer 8** is selected, a pop up to review and accept the *Oracle Linux Cloud Developer Image Terms of Use* appears. Click the **Confirm** button to continue.

    ![Review and accept the image terms](./images/accept-os-image-terms.png)

7. Click the **Select image** button.

    ![Click Select image button](./images/select-image-button.png)

8. Now that the operating image has been selected, the compute instance's basic information is complete for this lab. Click the **Next** button at the bottom to proceed to the security section. 

    ![Click Next button after compute instance basic information has been entered](./images/basic-info-complete.png " ")

9. Leave the security setting at its default value. Click the **Next** button at the bottom to proceed to the networking section. 

    ![Click Next button after the security section is complete](./images/security-section-complete.png " ")

10. Enter the VNIC name, **OCI\_HOL\_VNIC**. Most of the remaining networking entries should be auto-populated. Review the screen shot below to verify the default entries match with the networking entries you have. 

    ![Enter VNIC name and review networking settings](./images/review-networking.png " ")

    **Note:** You need a public IP address to SSH into the running instance later in this lab. The default setting includes a public IP.

11. Scroll down to the **Add SSH keys** section. The **Generate a key pair for me** radio button should already be selected. <br><br>
    Click on the **Download private key** and **Download public key** buttons to save two files: **ssh-key-&lt;date&gt;.key** (private key) and **ssh-key-&lt;date&gt;.key.pub** (public key). <br><br>
    Keep the private key safe and don't share its content with anyone. The public key will be needed for Oracle Cloud Shell to secure cloud communications.

    ![Add and save SSH keys](./images/add-ssh-keys.png)

12. Click the **Next** button at the bottom to proceed to the storage section.  

    ![Click Next button after the networking section is complete](./images/networking-section-complete.png " ")

13. Leave the storage settings at their default values. Click the **Next** button at the bottom to proceed. 

    ![Click Next button after the storage section is complete](./images/storage-section-complete.png " ")

14. You may review the compute instance's settings. Once done, press the **Create** button at the bottom of the page to begin instance creation. 

    ![Click Create button to begin compute instance creation](./images/create-instance-button.png)

15. Launching an instance is simple and intuitive with few options to select. The compute instance provisioning will complete in less than a minute. The instance state will change from *PROVISIONING* to *RUNNING*. You now have a running Linux virtual machine compute instance.
 
     ![Complete compute instance creation](./images/completed-compute-instance.png)

## Task 2: Connect to the Instance via SSH

1. With a running compute instance, you can SSH to the public IP address of the instance. The public IP address is available under the **Details** tab in the *Instance Access* section. Record this IP address for use when you SSH and set up one-way TLS without wallets later on.

    ![Running compute instance with public IP address](./images/public-ip.png " ")

2. This lab uses Cloud Shell to connect to the compute instance. Open Cloud Shell by clicking the Developer Tools icon on the top right of the menu bar, then click **Cloud Shell**.

    ![Click Cloud Shell icon](./images/cloud-shell-icon.png)

>**Note**: You may need to log in as the *admin* user for Cloud Shell.

3. Cloud Shell will open. Open the Cloud Shell menu in the upper right of Cloud Shell. Click **Upload** to begin uploading the private key to the compute instance.

    ![Click Upload from menu](./images/cloud-shell-choose-upload.png)

4. Upload the private key through Cloud Shell that you auto-generated in the last task. Its default name is in the format, **ssh-key-&lt;date&gt;.key**. Either drop the file into the window or navigate to its location on your local machine. When completed, click the **Upload** button.

    ![Upload the private key](./images/cloud-shell-key-upload.png)

5. We will use SSH to securely connect to the compute instance. In Cloud Shell, move the private key to the **.ssh** directory and change into that directory. If the **.ssh** directory is not available, you can skip this step.

    ```
    <copy>mv <private_ssh_key> .ssh</copy>
    ```
    ```
    <copy>cd .ssh</copy>
     ```

6. Since this is a private key, assign permissions to protect the key from other users. Enter the following into Cloud Shell:

    ```
    <copy>chmod 600 <private_ssh_key></copy>
    ```

7. SSH into the compute instance. In Oracle Cloud Linux VMs, the default username is **opc**. The compute instance's public IP address is available from the cloud console. Run the following command from Cloud Shell:

    ```
    <copy>ssh -i <private_ssh_key> opc@<public_ip_address></copy>
    ```

8. If the host authenticity can't be established, you will be asked: "Are you sure you want to continue connecting (yes/no)?" To continue, answer yes.

    ```
    <copy>yes</copy>
    ```

9. After the completion of these command line steps, you will be connected to the compute instance.

    ![SSH into compute instance from Cloud Shell](./images/ssh.png)


## Task 3: Install and Configure NGINX Web Server and Setup VCN
   
For this lab, we are going to install an NGINX web server and connect to it over the public Internet. *Make sure you have completed the prior tasks so that you can SSH into the Linux instance*.

NGINX web server is a popular, free, and open-source web server. The NGINX server hosts web content, and responds to requests for this content from web browsers.

1. Run the following commands in Cloud Shell:

    - Install NGINX and its dependencies. This command can take some time to complete.

        ```
        <copy>sudo dnf install -y nginx</copy>
        ```

    - Edit the NGINX configuration file in a text editor, such as Nano, from Cloud Shell, to set the listening port to 81. This step is unnecessary if you intend to keep port 80 as the HTTP port. However, later lab steps assume port 81 is now the listening port.

        ```
        <copy>sudo nano /etc/nginx/nginx.conf</copy>
        ```

      After the text editor opens, search for the following two lines that use port 80 in the *server* context area:

        ```
        listen 80 default_server;
        listen [::]:80 default_server;
        ```

      Modify them to use port 81.

        ```
        <copy>listen 81 default_server;
        listen [::]:81 default_server;</copy>
        ```

      Exit Nano and save the file by typing **Ctrl-X**, then **Y**, and finally the carriage return.

    - Create firewall rules to allow access to HTTP on port 81.

        ```
        <copy>sudo firewall-cmd --permanent --add-service=http</copy>
        ```
        ```
        <copy>sudo firewall-cmd --permanent --add-port=81/tcp</copy>
        ```
        ```
	<copy>sudo firewall-cmd --reload</copy></copy>
        ```

    - Start the NGINX server and load the new web server settings.

        ```
        <copy>sudo systemctl start nginx</copy>
        ```

    - Run a quick check on NGINX status.

        ```
        <copy>sudo systemctl status nginx</copy>
        ```

2. Let's now open port 81 in the VCN security list. Click the **Navigation Menu** in the upper left. Navigate to **Networking**, and select **Virtual cloud networks**. 

     ![Navigate to configure the VCN](../networking/images/setup-vcn.png " ")

3. Click on the VCN you created earlier (i.e., OCI\_HOL\_VCN) under the **Virtual Cloud Networks** page area.

     ![Click on earlier created VCN](./images/click-vcn.png " ")

4. Now click **Security** tab on the navigation bar for the VCN.
 
     ![Click on Security tab](./images/security-tab.png " ")

5. The compartment's security lists will appear. Click on the **Default Security List**.

     ![Click on default security list](./images/default-security-list.png " ")

6. Click the **Security rules** tab.

     ![Click on security rules tab](./images/security-rules.png " ")

7. Open port 81 by clicking **Add Ingress Rules** and add the following values as shown below:

    - **Source Type:** CIDR
    - **Source CIDR**: 0.0.0.0/0
    - **IP Protocol:** TCP
    - **Source Port Range:** All
    - **Destination Port Range:** 81

    Click **Add Ingress Rules** at the bottom.

    ![Add ingress rule](./images/ingress-rule.png " ")

8. In your browser, navigate to *http://&lt;public_ip_address&gt;:81*. Use the Linux VM's IP address with the port to use appended since we're using a non-standard HTTP port. You should see the text you added to the web server's index page.

    ![Open you browser to the public IP address](./images/browser.png " ")

You have completed this lab. You may now **proceed to the next lab.**
## Troubleshooting

1. If you are unable to see the web server on your browser, possible scenarios include:

    - VCN Security Lists is blocking traffic. Check VCN Security List for ingress rule for port 81.
    - Firewall on the linux instance is blocking traffic. This command shows HTTP service as part of the public zone.

        ```
        <copy>sudo firewall-cmd --zone=public --list-services</copy>
        ```
        Check the NGINX service is listening on port 81. If it’s a different port, open up that port on your VCN security list.
        ```
        <copy>sudo netstat -tulnp | grep nginx</copy>
        ```

    - Your company VPN is blocking traffic.

2. If you cannot successfully run the `sudo` commands, make sure you can SSH into your compute instance by following Task 2.

## Acknowledgements

- **Author** - Rajeshwari Rai, Prasenjit Sarkar, Alex Keh
- **Last Updated By/Date** - Alex Keh, September 2025