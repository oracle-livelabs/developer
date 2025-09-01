# Apply Deployment Rule Set

## Introduction

This lab will guide you through the process of applying Deployment Rule Set (DRS) on your managed Java 8 instances. It's important to note that DRS functionality is only supported up to JDK 8.

Estimated Time:  35 minutes

### Objectives

In this lab, you will:

* Create and sign a DRS JAR file for deployment
* Upload a signed DRS JAR file to manage rules across all the managed instances in a fleet
* Manage the DRS for selected instances
* Verify DRS actions has been applied on the managed instances

### Prerequisites

* You have signed up for an account with Oracle Cloud Infrastructure and have received your sign-in credentials.
* You are using an Oracle Linux image or Windows OS on your Managed Instance for this workshop
* Access to the cloud environment and resources configured in Lab 1.
* Java Development Kit (JDK) installed with command line access
* Your managed instances should have JDK 8 to see the effects of DRS on them.
* For more in-depth information about DRS, you can explore the official Oracle documentation: [Deployment Rule Set](https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/deployment_rules.html)

## Task 1: Create and Sign a Deployment Rule Set File

### ***Step 1:***  Create the ruleset.xml File

1. Open your preferred text editor (Notepad++, VS Code, or any plain text editor).

2. Create a new file and save it as `ruleset.xml`.

3. Define the rules for your organization using the elements and attributes specified in the Java Deployment Rule Set DTD.

   > **Note**: For detailed information on different rules that can be added to the ruleset, refer to the [Oracle Java Deployment Rule Set documentation](https://docs.oracle.com/javase/10/deploy/deployment-rule-set.htm).

4. Copy and paste the following example ruleset content:

      ```xml
      <copy>
      <?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE ruleset SYSTEM "deployment_ruleset.dtd">
      <ruleset version="1.3+">
      <rule>
            <id location="https://host.example.com" />
            <action permission="run" />
      </rule>
      <rule>
            <id />
            <action permission="block">
            <message>Blocked by corporate. Contact J. Smith, smith@host.example.com, if you need to run this app.</message>
            </action>
      </rule>
      </ruleset>
      </copy>
      ```

5. Customize the rules according to your organization's requirements and save the file.
![Screenshot of text editor showing the complete ruleset.xml file with XML syntax highlighting, displaying the ruleset structure with rule elements](images/ruleset-xml-content.png)

&nbsp;

### ***Step 2:*** Create a Keystore and Generate a Key Pair

1. Open a command prompt or terminal.

2. Navigate to the directory where you want to store your keystore file.

3. Run the following command to create a new keystore and generate a key pair:

      ```bash
      <copy>
      keytool -genkeypair -alias myalias -keyalg RSA -keysize 2048 -validity 365 -keystore mykeystore.jks
      </copy>
      ```

4. You will be prompted to:
![Terminal screenshot showing the keytool -genkeypair command being executed with the full command line visible](images/keytool-genkeypair-command.png)

   - Enter a password for the keystore (remember this password)
   - Provide your organization's information (name, organizational unit, organization, city, state, country code)
   - Confirm the information is correct

&nbsp;

### ***Step 3:*** Create a Certificate Signing Request (CSR)

1. In the same command prompt/terminal, run the following command to create a CSR:

      ```
      <copy>
       keytool -certreq -alias myalias -keystore mykeystore.jks -file mycsr.csr
      </copy>
      ```

2. Enter the keystore password when prompted.

3. The CSR file `mycsr.csr` will be created in your current directory.

      ![Terminal screenshot showing the keytool -certreq command execution for creating a certificate signing request](images/csr-generation-command.png)

&nbsp;

### ***Step 4:***  Obtain a Certificate

You have two options to obtain a certificate:

#### Option 1: Submit the CSR to a Trusted CA 

1. Submit the CSR (`mycsr.csr`) to a trusted Certificate Authority (e.g., VeriSign, GlobalSign, Let's Encrypt).

2. Follow the CA's process to obtain a certificate.

3. Save the issued certificate to a file (e.g., `mycert.cer`).

#### Option 2: Generate a Self-Signed Certificate 

1. Run the following command to generate a self-signed certificate:

      ```
      <copy>
      keytool -selfcert -alias myalias -keystore mykeystore.jks -validity 365
      </copy>
      ```

2. Enter the keystore password when prompted.

      ![Terminal screenshot showing the keytool -selfcert command execution with password prompt for generating a self-signed certificate](images/self-signed-cert-generation.png)

&nbsp;

### ***Step 5:***  Import the Certificate into the Keystore

> **Note**: This step is only required if you chose Option 1 (CA-issued certificate) in Step 4.

1. Run the following command to import the certificate into the keystore:

      ```
      <copy>
      keytool -importcert -alias myalias -keystore mykeystore.jks -file mycert.cer
      </copy>
      ```

2. Enter the keystore password when prompted.

3. Review the certificate details and type `yes` to confirm the import.

&nbsp;

### ***Step 6:*** Sign the ruleset.xml File

1. Create a JAR file containing the `ruleset.xml` file:

      ```
      <copy>
      jar -cvf DeploymentRuleSet.jar ruleset.xml
      </copy>
      ```

      ![ Terminal screenshot showing the jar -cvf command execution with output displaying the addition of ruleset.xml to DeploymentRuleSet.jar](images/jar-creation-command.png)
      
2. Sign the JAR file using the keystore and alias:

      ```
      <copy>
      jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore mykeystore.jks DeploymentRuleSet.jar myalias
      </copy>
      ```

3. Enter the keystore password when prompted.

4. The command will display verbose output showing the signing process.
![Terminal screenshot showing detailed verbose output from jarsigner including file processing, signature generation, and completion status](images/jar-signing-verbose-output.png)
  
&nbsp;

### ***Step 7:***  Verify the Signature

1. Run the following command to verify the signature:

      ```
      <copy>
      jarsigner -verify -verbose -certs DeploymentRuleSet.jar
      </copy>
      ```

2. This command should display:
   - Certificate information
   - Confirmation that the JAR file is properly signed
   - Status showing "jar verified"

3. If successful, you should see output similar to:
      ![Terminal screenshot showing successful verification output with certificate details and "jar verified" confirmation message](images/jar-verification-output.png)

The resulting `DeploymentRuleSet.jar` file is now created and signed, ready for deployment in the following tasks.

&nbsp;

## Task 2: Upload and Manage DRS for All Host Machines in Fleet

1. Prior to starting this lab, ensure that lifecycle management is enabled. Open the navigation menu, navigate to **Observability & Management**, Under **Java Management**, select **Fleets**.
   
      ![image of console navigation to java management service](images/console-navigation-fleet.png)

   In order to ensure the DRS can be applied to your fleet, make sure that **Lifecycle management** is enabled in your fleet.
   
      ![image of enabled lifecycle management in fleet details](images/fleet-details-lifecycle-management-enabled.png)

2. Open the navigation menu, click **Observability & Management**. Under **Java Management**, select **Fleets**.
   
      ![image of console navigation to java management service](images/console-navigation-fleet.png)

3. Under **Actions**, select **Configure Java runtime lifecycle management setting**. The **Lifecycle management settings** window should appear.
   
      ![image of modifying java runtime lcm settings](images/more-actions-modify-java-runtime-lcm-settings.png)

4. Under the **Lifecycle management settings** window, select the **Deployment Rule Set** tab. Upload your signed DRS JAR file. Note that an unsigned DRS JAR file will be invalid.
   
      ![image of uploading jar file in drs in lcm](images/lcm-settings-drs-upload-jar.png)

5. Click **Upload** to apply the DRS across all your managed instances in this fleet.
   
      ![image of upload jar file](images/drs-upload-jar.png)

6. A **Work Request** will be submitted.
   

7. After the **Work Request** you will be able to see that the DRS file is uploaded successfully. Click save.
   
      ![image of drs file uploaded successfully](images/drs-file-uploaded-successfully-and-save.png)

8. In order to manage DRS in all the managed instances in this fleet, under **More actions**, select **Manage Deployment Rule Set**.
   
      ![image of drs file uploaded successfully](images/more-actions-manage-drs-jar.png)

9. Under **Manage Deployment Rule Set**, you can choose to **Distribute DRS** or **Remove DRS** for all the managed instances observed in the fleet. In this example we will be demonstrating **Distribute DRS**. After selecting the option, click **Submit**
   
     ![image of distribute drs work request progress](images/manage-drs-submit.png)

10. You will be able to see the work request that is submitted. Note that this might take up to **15 mins**. While waiting for it to complete, you might want to consider progressing to the next task and revisiting the work request status at a later time.
   
      ![image of distribute drs work request progress](images/distribute-drs-work-request-progress.png)

11. After the work request has completed all the settings have been applied to your managed instances in the fleet.
   
      ![image of distribute drs work request progress](images/distribute-drs-work-request-success.png)

## Task 3: View the Uploaded DRS file in Object Storage

1. Open the navigation menu, click **Observability & Management**. Under **Java Management**, select **Fleets**.
   
      ![image of console navigation to java management service](images/console-navigation-fleet.png)

2. In the fleet details, click on object storage bucket link.
   
      ![image of fleet details object storage bucket](images/fleet-details-object-storage-bucket.png)

3. The uploaded DRS file is stored in **LCM** > **DRS** > **unique-id** > **file-name.jar**. 
   
      ![image of fleet details object storage bucket](images/object-storage-drs-jar.png)

## Task 4: (Optional) Managing DRS for a Single Managed Instance in a Fleet

1. Open the navigation menu, click **Observability & Management**. Under **Java Management**, select **Fleets**.
   
      ![image of console navigation to java management service](images/console-navigation-fleet.png)

2. In the fleet details, click on **Managed instances** tab and select the instance you want to manage DRS on.
   
      ![image of fleet details managed instances](images/fleet-details-managed-instances.png)

3. Click on **Manage Deployment Rule Set** 
   > **Note:** Make sure that you have already uploaded your DRS file successfully before proceeding with the task
   
   ![image of single managed instances](images/single-managed-instance.png)

4. Under **Manage Deployment Rule Set**, you can choose to **Distribute DRS** or **Remove DRS** for this managed instance. In this example we will be demonstrating **Distribute DRS**. After selecting **Distribute DRS** click **Submit** and a work request will be submitted.
   
      ![image of single managed instances distribute DRS](images/single-instance-distribute-drs.png)

5. You will be able to see the work request that is submitted. Note that this might take up to **15 mins**. While waiting for it to complete, you might want to consider progressing to the next task and revisiting the work request status at a later time.
   
      ![image of distribute drs work request progress](images/distribute-drs-work-request-progress-instance.png)

6. After the work request has completed all the settings have been applied to your managed instance in the fleet.
   
      ![image of distribute drs work request progress](images/distribute-drs-work-request-success.png)

## Task 5: (Optional) Managing DRS for Selected Instances in a Fleet

1. Open the navigation menu, click **Observability & Management**. Under **Java Management**, select **Fleets**.
   
      ![image of console navigation to java management service](images/console-navigation-fleet.png)

2. In the fleet details, under **Resources** part click on **Managed instances** to view the managed instances. Select the instances you want to apply DRS on. Next, under **More actions**, select **Manage Deployment Rule Set**.
   > **Note:** Make sure that you have already uploaded your DRS file successfully before proceeding with the task
   
   ![image of fleet details managed instances](images/managed-instances-more-actions.png)

3. Under **Manage Deployment Rule Set**, you can choose to **Distribute DRS** or **Remove DRS** for the selected instances. In this example we will be demonstrating **Distribute DRS**. After selecting **Distribute DRS** click **Submit** and a work request will be submitted.
   
      ![image of fleet details managed instances](images/manage-drs-submit.png)

4. You will be able to see the work request that is submitted. Note that this might take up to **15 mins**. While waiting for it to complete, you might want to consider progressing to the next task and revisiting the work request status at a later time.
   
      ![image of distribute drs work request progress](images/distribute-drs-work-request-progress.png)

5. After the work request has completed all the settings have been applied to your managed instance in the fleet.
   
      ![image of distribute drs work request progress](images/distribute-drs-work-request-success.png)

 You may now **proceed to the next lab.**

## Troubleshoot DRS issues

**For this lab**

   If you run into issues while setting up the DRS features, verify that the required policies are enabled. If you followed the instructions in workshop 1, these policies should already be in place. To confirm, open the navigation menu, click on **Identity & Security**, and select **Policies**.

   ![image of policies in console navigation](images/console-navigation-policies.png)

   In the **Root Compartment**, select **JMS Policy** and ensure that the policies listed below are included in **JMS Policy Statements**.

   ![image of jms policy in root compartment](images/policies-select-jms-policy.png)

   ```
    <copy>
    ALLOW GROUP FLEET_MANAGERS TO MANAGE fleet IN COMPARTMENT ${compartmentName}
    </copy>
   ```

   In your fleet compartment, select **JMS-Advanced-Features** and ensure that the policies listed below are included in **JMS-Advanced-Features Statements**.

   ![image of jms adv features in fleet compartment](images/policies-select-jms-adv-features.png)

   ```
    <copy>
    ALLOW dynamic-group JMS_Advanced_Features_Dynamic_Group to MANAGE object-family in compartment ${compartmentName}
    ALLOW resource jms SERVER-COMPONENTS to MANAGE object-family in compartment ${compartmentName}
    ALLOW group FLEET_MANAGERS to MANAGE object-family in compartment ${compartmentName}
    </copy>
   ```

## Learn More
* Refer to the [Advanced Features](https://docs.oracle.com/en-us/iaas/jms/doc/advanced-features.html), [Work Requests](https://docs.oracle.com/en-us/iaas/jms/doc/using-java-management-service.html#GUID-77AEEBC0-93A5-4E99-96D6-BEE0FEE4539F) sections of the JMS documentation for more details.

* Use the [Troubleshooting](https://docs.oracle.com/en-us/iaas/jms/doc/troubleshooting.html#GUID-2D613C72-10F3-4905-A306-4F2673FB1CD3) chapter for explanations on how to diagnose and resolve common problems encountered when installing or using Java Management Service.

* If the problem still persists or it is not listed, then refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section. You can also open a support service request using the **Help** menu in the OCI console.

## Acknowledgements

* **Author** - Chan Wei Quan, Java Management Service
* **Last Updated By** - Hannah Wong, Ayoub El Maalmi  , Jul 2025