# Create a Java application

## Introduction

Java Management Service (JMS) is a native Oracle Cloud Infrastructure (OCI) service that monitors Java deployments on OCI instances and instances running in customer data centers. It enables you to observe and manage the use of Java in your enterprise.

This lab walks you through the steps to create a simple Java Application in a Compute Instance, which we will monitor using the Java Management Service.

Estimated Time: 10 minutes

### Objectives

In this workshop, you will:

* Create a Oracle Linux Compute Instance on OCI
* Install Java on Compute Instance
* Create a simple Java application

### Prerequisites

* You have signed up for an account with Oracle Cloud Infrastructure and have received your sign-in credentials.
* You are using an Oracle Linux image for your Managed Instance for this workshop.
* Access to the cloud environment and resources configured in the previous workshop

## Task 1: Create a Compute Instance

1. Sign in to the Oracle Cloud Console as an administrator using the credentials provided by Oracle, as described in [Sign In for the First Time](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/signingin.htm).
&nbsp;

2. Use the **Create a VM Instance** wizard to create a new compute instance. The wizard performs the following tasks while installing an instance:
    * Creates and installs a Compute Instance running Oracle Linux.
    * Creates a VCN with the required subnet and components needed to connect your Oracle Linux instance to the internet.
    * Creates an `ssh` key pair you use to connect to your instance.


3. Follow these steps to install your Compute Instance using the **Create a VM Instance** wizard:
    From the main landing page, select **Create a VM Instance** wizard.
    ![image of quick actions menu on the main landing page](images/action-menu.png)

    The **Create Compute Instance** page is displayed. It has a section for **Placement**, **Image and shape**, **Networking**, **Add SSH keys**, and **Boot volume**.

    Choose the **Name** and **Compartment**. Select the compartment created previously.

    **Initial Options**
    * **Name**: `<name-for-the-instance>`
    * **Create in compartment**: `<your-compartment>`

      Ensure that you create the Compute Instance in a Compartment with correct set of Policies. Hence, in [Lab 2](?lab=set-up-oci-for-jms), if you had chosen Onboarding Wizard option, select `Fleet_Compartment` in **Create in compartment** field, else select the compartment that you have created.

      ![image of selecting correct compartment for the Compute Instance](images/instance-name-and-compartment.png)

    Enter a value in the **Name** field, or leave the default value unchanged.

    Review the Placement settings. Take the default values provided by the wizard. The following sample data and images is shown. The actual values change over time or differ in a different data center.

    **Placement**
    * **Availability domain**: AD-1 (For Free Tier, use **Always Free Eligible** option)
    * **Capacity type**: On-demand capacity
    * **Fault domain**: Oracle chooses the best placement

      ![image of placement for the Compute Instance](images/instance-placement.png)


    Review the **Image and shape** settings. Take the default values provided by the wizard.

    **Image**
    * **Image**: Oracle Linux 9
    * **Image build**: Default image build
    * **Shape**: Any AMD or Intel shape (For Free Tier, use **Always Free Eligible** option)
    * **OCPU count**: 1
    * **Memory (GB)**: 1
    * **Network bandwidth (Gbps)**: 1

      ![image of image and shape for the Compute Instance](images/instance-image-and-shape.png)

    Review the **Security** settings. Take the default values provided by the wizard.

    * **Shielded instance**: Disabled
    * **Confidential computing**: Disabled

      ![image of security for the Compute Instance](images/instance-security.png)


    Click **Next** to review the **Networking** settings.

    ![image of networking setting](images/instance-networking.png)

    If there are no VCNs available, click **Create new virtual cloud network**.

    ![image of networking settings with no vcns available](images/instance-vcn-create.png)

    Take the default values provided by the wizard.

    **Virtual cloud network**: vcn-'date'-'time'
    * **Subnet**: subnet-'date'-'time'
    * **Private IPv4 address**: Automatically assign private IPv4 address
    * **Public IPv4 address**: Automatically assign public IPv4 address

    ![image of networking settings with vcn name and subnet](images/instance-vcn-name.png)

    ![image of networking settings with ip address](images/instance-vcn-ip-address.png)

    Review the **Add SSH** keys settings. Take the default values provided by the wizard.

    Select the **Generate a key pair for me** option.

    Click **Save Private Key** and **Save Public Key** to save the private and public SSH keys for this compute instance.

    ![image of selecting save private key and save public key](images/ssh-keys-save-keys.png)

    If you want to use your own SSH keys, select one of the options to provide your public key. Ensure that you store your private key and public key files in a secure location. You cannot retrieve keys again after the compute instance has been created.

    ![image of selecting options to use own SSH keys](images/ssh-keys-use-own-keys.png)

    Review the **Boot volume** settings. Take the default values provided by the wizard.

    ![image of boot volume settings for Compute Instance](images/instance-boot-volume.png)

4. Click **Create** to create the instance. Provisioning the system might take several minutes.

   ![image of creating compute instance](images/compute-create-instance.png)

5. You have successfully created an Oracle Linux instance.

## Task 2: Access and setup your Instance via SSH

1. Open the navigation menu and click **Compute**. Under **Compute**, click **Instances**.

    ![image of console navigation to instance](images/console-navigation-instance.png)

2. Click the link to the Instance you created in the previous step.

3. From the **Instance Access** section of the **Instance** Details page, note down the **Public IP address** generated by the system. Use this IP address to connect to your Instance.

   > **Note:** The **Username** shown in the instance details is by default **opc**.

  ![image of compute instance details with public ip highlighted](images/compute-public-ip.png)

4. Open a **Terminal** or **Command Prompt** window. Change into the directory where you stored the SSH encryption keys you created.To use the SSH command, change the read and write permissions of your key with this command

```
<copy>
chmod 400 <path-to-private-key/your-private-key-file>
</copy>
```

5. Connect to your instance with this SSH command

```
<copy>
ssh -i <path-to-private-key/your-private-key-file> opc@<x.x.x.x>
</copy>
```

6. You should be able to login to your instance now.

> **NOTE:** The following steps are required if you have created an Always Free-eligible compute with 1 OCPU and 1 GB memory

7. The memory allocated for Always Free-eligible computes is insufficient for this workshop. The next few steps increases the swapsize to handle this limitation.

8. Switch to the root user.

```
<copy>
sudo su
</copy>
```

9. Execute the following command as sudo to increase the default swapsize.

```
<copy>
swapoff -a && rm -f /.swapfile && fallocate -l 4G /.swapfile && mkswap /.swapfile && chmod 600 /.swapfile && swapon -a
</copy>
```

10. You should see the following output.

  ![image of swapsize being updated](images/instance-changeswapfile.png)

11. It is also highly recommended to update your oracle cloud agent for your OCI compute instance.

```
<copy>
dnf update -y oracle-cloud-agent
</copy>
```

## Task 3: Install Java and create a simple Java application on your Compute Instance

1. Install Oracle JDK 17 using dnf

    ```
    <copy>
    sudo dnf -y install jdk-17
    </copy>
    ```
    Or you can use yum
     ```
     <copy>
     sudo yum -y install jdk-17
     </copy>
     ```

    To check the installed Java version, you can check using `-version`.
    ```
    <copy>
    java -version
    </copy>
    ```

2. Build your Java application.

    In the **Terminal** window, create a Java file by entering this command:

      ```
      <copy>
      nano HelloWorld.java
      </copy>
      ```

    In the file, paste the following text:

      ```
      <copy>
      public class HelloWorld {
        public static void main(String[] args) throws InterruptedException{
          System.out.println("This is my first program in java");
          int number=15;
          System.out.println("List of even numbers from 1 to "+number+": ");
          for (int i=1; i<=number; i++) {
            //logic to check if the number is even or not
            //if i%2 is equal to zero, the number is even
            if (i%2==0) {
              System.out.println(i);
              Thread.sleep(2000);
            }
          }
        }//End of main
      }//End of HelloWorld Class
      </copy>
      ```

3. To save the file, type **CTRL+x**. Before exiting, nano will ask you if you want to save the file: Type **y** and **Enter** to save and exit.

You may now **proceed to the next lab.**

## Learn More

* Use the [Troubleshooting](https://docs.oracle.com/en-us/iaas/jms/doc/troubleshooting.html#GUID-2D613C72-10F3-4905-A306-4F2673FB1CD3) chapter for explanations on how to diagnose and resolve common problems encountered when installing or using Java Management Service.

* If the problem still persists or it is not listed, then refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section. You can also open a support service request using the **Help** menu in the OCI console.


## Acknowledgements

* **Author** - Esther Neoh, Java Management Service
* **Last Updated By** - El Maalmi Ayoub , Jul 2025
