# Provision your instances

## Introduction

This lab walks you through the process of provisioning an Oracle Visual Builder Studio instance and a separate Oracle Visual Builder instance, assuming you don't already have both available to you. If you do, you can skip this lab—but make sure your VB Studio instance is authorized to access your Visual Builder instance before you move on to the next lab.

Estimated Time: 20 minutes

### About this Lab

If you just created a Cloud Account using the instructions in the previous lab, you might want to wait before you attempt to create Visual Builder and VB Studio instances. It could take anywhere between 10 and 30 minutes for a new user account to be fully provisioned (you'll get a email when provisioning is complete). If you already have a Cloud Account, you don't need to wait. Either way, make sure you've signed in to Oracle Cloud as an OracleIdentityCloudService user. *Note: If you log in using an Oracle Cloud Infrastructure (OCI) account, the navigation menu to Visual Builder won't show.*

### Objectives

In this lab, you will:

* Create an instance of Visual Builder
* Create an instance of VB Studio
* Authorize the VB Studio instance to access the Visual Builder instance

### Prerequisites

This lab assumes you have:

* An Oracle Cloud Account
* A Chrome browser

## Task 1: Create a Visual Builder instance

Before you provision a VB Studio instance, create a Visual Builder instance to host the web app you'll create in VB Studio. Visual Builder is a managed service that provides everything your apps need to run successfully, including a web server and a built-in database.

1. Create a compartment to host OCI resources for your Visual Builder instance. You can use the root compartment and the tenancy user that was created when the OCI account was created, but a dedicated compartment is the recommended approach.

   a. On the Oracle Cloud console, click the navigation menu ![Menu icon](images/hamburger.png) in the upper left corner, then select **Identity & Security** and  **Compartments**.

   ![This image shows navigation to Identity & Security, then Compartments under Identity.](https://oracle-livelabs.github.io/common/images/console/id-compartment.png "")

   b. Click **Create Compartment**.

   ![This image shows a list of existing compartments on the Compartments page. The Create Compartment button is highlighted.](images/oci-compartments-create.png "")

   c. Enter `VBCompartment` as the name, add a description (for example, `VBCompartment for workshop`), and leave the Parent Compartment set to the default root compartment. Click **Create Compartment**.

   ![This image shows the Create Compartment dialog with fields filled in.](images/oci-compartments-vb-create-details.png "")

2. From the navigation menu, select **Developer Services**, then **Visual Builder**.

    ![Navigation to Visual Builder under Developer Services is shown.](images/platform.png "")

3. On the Instances page, click the **Compartment** filter next to Applied filters, select the `VBCompartment` you created to host the Visual Builder instance, and click **Apply filter**.
        ![This image shows the Instances screen, with the Compartment filter next to Applied filters set to VBCompartment. The Create Instance button is also shown.](images/create-instance.png "")

4. Click **Create Instance**.

5. On the Create instance screen, give your instance a unique name, one that is unlikely to be chosen by another user. Leave all other fields as is for the purposes of this tutorial. Click **Create Visual Builder instance**.

    ![This image shows details of the Create instance page, with the Name set to myVisualBuilder, Consumption model set to Metered (Universal Credit), Compartment set to VBCompartment, and Nodes set to 1. The Choose network access section is partially shown. The right bottom corner shows the Create Visual Builder instance button.](images/detail.png "")

   When instance creation completes successfully, the instance shows as **Active** in the Status column. If you don't see the status change, try refreshing your browser.

    ![The newly provisioned myVisualBuilder instance is listed under the Name column, with its state in the Status column set to Active.](images/vb-instance-created.png " ")

## Task 2: Create a VB Studio instance

Provision a VB Studio instance to develop and deploy a web app. You can create only one VB Studio instance in an Oracle Cloud account. Before you attempt to create an instance, make sure your account has no other VB Studio instance provisioned.

1. Your VB Studio instance requires OCI resources such as VMs for builds and storage buckets for project data. It's recommended that you create a dedicated compartment to host these resources, so they aren't mixed with your other resources. To create a dedicated compartment for VB Studio resources:

   a. Click the navigation menu ![Menu icon](images/hamburger.png), select **Identity & Security**, then **Compartments**..

     ![This image shows navigation to Identity & Security, then Compartments under Identity.](https://oracle-livelabs.github.io/common/images/console/id-compartment.png "")

   b. Click **Create Compartment**.

      ![This image shows a list of existing compartments on the Compartments page. The Create Compartment button is highlighted.](images/oci-compartments-create-vbs.png "")

   c. Enter `VBStudioCompartment` as the Name, add a description (for example, `VBStudioCompartment for workshop`), and leave the Parent Compartment set to the default root compartment. Click **Create Compartment**.

      ![This image shows the Create Compartment dialog with fields filled in.](images/oci-compartments-create-details.png "")

2. From the navigation menu, select **Developer Services**, then **Visual Builder Studio**.

   ![Navigation to Visual Builder Studio under Developer Services is shown.](images/oci-service-navigation-vbs.png "")

3. On the Visual Builder Studio instances page, click **Create Visual Builder Studio**.

    ![The Visual Builder Studio Instances page is shown, with the Create Visual Builder Studio  button highlighted.](images/create-instance-vbs.png "")

4. On the Instance Name screen, give your instance a unique name and make sure your root compartment is selected. Click **Next**.

   ![This image shows the Instance Name screen. The Instance Name is entered as vbstudio-devinstance and the Compartment field is set to root.](images/detail-vbs.png "")

5. On the CI/CD Setup screen, select the `VBStudioCompartment` you created previously and make sure you select **Yes, I authorize this** to allow Oracle to create instances on your behalf.

   ![This image shows the CI/CD Setup screen, with the root compartment selected.](images/confirm-vbs.png "")

   *Note: If you don't provide authorization, your instance is provisioned with a built-in OCI account that provides access to a minimal set of resources (one free VM build executor with fixed software in the default build executor template). You'll also need to manually authorize this VB Studio instance to access your Visual Builder instance.*

   Click **Create Visual Builder Studio**.

   When your instance is created, its details show in the Instance Info tab. You'll also receive an email with the subject **Verify your Oracle Visual Builder Studio email**. Make sure you click the URL link in the email body to verify your email. This is required to receive email notifications from VB Studio.

## Task 3: Authorize VB Studio to access Visual Builder

Your VB Studio instance must be authorized to access Visual Builder instances connected to your OCI account. This step is mostly required if your VB Studio instance was provisioned with a built-in OCI account, but there may be other scenarios where this authorization is missing. Therefore, it's recommended that you always check your VB Studio instance's details to make sure the policy statement that enables this access is correctly defined.

1. Click the navigation menu ![Menu icon](images/hamburger.png), select **Identity & Security**, then **Policies**.

   ![This image shows navigation to Identity & Security, then Compartments under Identity.](https://oracle-livelabs.github.io/common/images/console/id-policies.png "")

2. From the Compartment list on the left side of the Policies page, select the root compartment.

3. Make sure a VB Studio policy that contains *all* of these statements is defined:

    ```text
    <copy>
    Allow any-user to inspect all-resources in tenancy where request.principal.id in ('<VBS_instance_OCID>')
    Allow any-user to read visualbuilder-instance in tenancy where request.principal.id in ('<VBS_instance_OCID>')
    Allow any-user to read integration-instance in tenancy where request.principal.id in ('<VBS_instance_OCID>')
    </copy>
    ```

   where `<VBS_instance_OCID>` is the OCID of this VB Studio instance, shown on the instance's Instance Info tab.

   * If a policy doesn't exist:

      a. Click **Create Policy**.

      b. Give the policy a name (`VBStudioPolicy`, for example) and a description (`Policy for VB Studio`, for example).

      c. Make sure the root compartment is selected.

      d. Click **Show Manual Editor** next to Policy Builder, then paste the preceding policy statement in the text area.

      e. Click **Create**.

   * If a policy exists but is missing one of the preceding statements:

      a. Select the existing policy.

      b. Click **Edit Policy Statements**.

      c. Select **Advanced** under Policy Builder, then add the missing policy statement in the text area.

      d. Click **Save Changes**.

## Task 4: Access VB Studio

1. From the navigation menu, select **Developer Services** and **Visual Builder Studio**.

2. Select your VB Studio instance's name, then click **Service Console**.

   ![This image shows the Instance Details page of the newly provisioned VB Studio instance, named vbstudio-devinstance. Under the instance name the Service Console button is highlighted.](images/vbs-instance-created.png "")

   The VB Studio console opens in a new browser tab, on the Organization page in the Projects tab.
   ![This image shows the landing page when VB Studio is opened.](images/vbs-home.png "")

   When you first log in, you see the Welcome page with a link to an introductory video, along with a news feed of additional screens. Close **X** to dismiss the news feed and expand your work area. Close the news banner prompt.

   Now is a good time to set your preferences. To do this, click the user initials in the upper right corner, and select **Preferences**. Use this page to change your display name, set an avatar, change the email address, or set email notification preferences. The email address (yours as well as that of any teammates you add to the project) must be verified and notifications set properly to be able to receive email.

   ![This image shows the options available when the User icon is clicked. Preferences is selected.](images/preferences.png "")

   You are now ready to create a project, but before you do that, check if your instance is connected to the built-in free account. Click the **OCI Account** tab. If you see your OCI account connected (as shown here), you can [jump to the next lab](#next) and get started with creating a project:

   ![This image shows the OCI Account tab when the tenancy's OCI account is connected, with details of Tenancy OCID, Compartment OCID, Home Region, and Storage Namespace listed.](images/oci-account-connected.png "")

   If you see something similar to this image, it means your instance is connected to the built-in free account. This is likely if you did *not* authorize Oracle to create instances to run builds:

   ![This image shows the OCI Account tab when a free Built-in account is connected to the tenancy. A Built-in Free section on the left shows the instance connected using this free account. On the right, a Connect Your Own section provides an option to connect your own OCI Account to the instance.](images/oci-free-account.png "")

   In this case, you will need to create your VM build executor as described in the next task before you proceed with the rest of the workshop.

## Task 3: Create the Free VM Build Executor

If you did *not* authorize Oracle to create instances on your behalf when provisioning your VB Studio instance, create your free VM build executor.

1. Click the **Build Executors** tab, then click **Create Free VM Build Executor**.

   ![This image shows the Build Executors tab when a free Built-in account is connected to the tenancy. A Free VM Build Executor section on the left provides a button to create a free VM build executor. On the right, a Custom Build Executors section provides an option to connect your own OCI Account to the instance to access unlimited build executors.](images/create-free-vm.png "")

   A new VM build executor is created. If the status of the compute VM corresponding to the executor is Available, Pending, or Stopped, you can go ahead and start your job, but be aware that:
      * Pending: The VM isn't available, so your job may take up to 10 minutes longer while the VM is created.
      * Stopped: Your job will take just a few moments longer while the VM is started.
      * Available: Your job should process immediately.

   You may **proceed to the next lab**.

## Acknowledgements

* **Author** - Sheryl Manoharan, VB Studio User Assistance, November 2021
* **Last Updated By/Date** - Sheryl Manoharan, October 2024
