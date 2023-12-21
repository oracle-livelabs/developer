# Setup environment (Optional Steps)

## Introduction

TBC - To be completed. 

Estimated time: 20 minutes

### Objectives

In this lab, you will:

* Create a new compartment for objects used in workshop
* Set policies for the new OCI group to manage a new compartment
* Create new policies for Vision service
* Create a new policy for Cloud Shell access

### Prerequisites

This lab assumes:

* You have an Oracle Cloud account with OCI and IDCS administration privileges or
* Your OCI and IDCS administrator can perform steps in this lab for you.
 
## Task 1: Log into OCI

1. Login into OCI

    To setup environment, you need OCI administrator's privileges. If you've got these privileges, login into OCI as described in the instructions in previous, **Get started**, lab.

    In case you haven't got OCI administrator's privileges, you should ask your OCI administrator to perform the rest of the tasks in this lab.

## Task 3: Create a new compartment

You will use one compartment for all required objects in this workshop, hence you need to create one.

1. Navigate to Compartments page

    In OCI console, open the **Navigator** menu. Navigate to **Identity & Security** and then choose **Compartments**.

    ![Navigate to Compartments](https://oracle-livelabs.github.io/common/images/console/id-compartment.png " ")

2. Create a new compartment

    The list of all active compartments is displayed. Click **Create Compartment** to start creating a new compartment.

    ![Create a new Compartment](./images/create-a-new-compartment.png " ")

3. Define compartment details

    This step is fairly straight forward. You just have to provide **Name**, **Description** and **Parent Compartment**. For example, name your compartment *X-Ray-Image-Classification*.

    Additionally, for better management and administration of your OCI environment you can optionally add Tags.

    click **Create Compartment**. 

    ![Define a new Compartment](./images/define-a-new-compartment.png =50%x*)
   
## Task 4: Create a new policy for compartment management

You need to create a **policy** which grants manage privileges in a new compartment to the new OCI group.

1. Navigate to **Policies** page

    Once again use **Navigator** to navigate to **Identity & Security** and now choose **Policies**.

    ![Navigate to Policies](https://oracle-livelabs.github.io/common/images/console/id-policies.png " ")

2. Create a new policy

    In the **Policies** page click **Create Policy**.

    ![Create a new policy](./images/create-a-new-policy.png =30%x*)

3. Define a new policy

    Provide a new Policy **Name** and **Description**.

    This policy is set at the *root* compartment level, therefore select the *root* compartment of your tenancy.

    In **Policy Builder** section, search for **Let compartment admins manage the compartment** in the **Common policy templates** pulldown list.

    Make sure **Groups** option is selected and then choose your newly created OCI Group from the list of available OCI Groups. For **Location**, select tenancy *root* compartment.

    ![Policy for compartment admins to manage the compartment](./images/policy-for-compartment-admins.png " ")

    Your policy should look like this:

     ```text
     <copy>Allow group OCI-X-Ray-Group to manage all-resources in compartment X-Rays-Image-Classification</copy>
     ```

4. Finish creating a new policy

     Click **Create** to create a new policy in your *root* compartment.

     ![Verify policy for compartment admins to manage the compartment](./images/verify-policy-for-compartment-admins.jpg)

     This is not the only required policy that is required for this workshop. You will return to this step to create additional policies later.

## Task 8: Create a new dynamic group and policies for Data Labeling

One of the tasks in this workshop will be data labeling. This is a process in which all images from your training image library will be assigned a single label that describe that specific image.  To be able to perform your data labeling process, you must perform the following prerequisite steps to:

* Create one new dynamic group and
* Set required policies for data labeling

To find out which steps you need to perform, you can navigate to **Data Labeling** page. You will find detailed instructions there.

1. (optional) Navigate to Data Labeling page

    From the **Navigator** menu select **Analytics & AI** and then **Data Labeling**.

    ![Navigate to Data Labeling](./images/navigate-to-data-labeling.png " ")

2. (optional) Open Datasets sub-page

    Click on **Datasets** link under **Data Labeling** on the left side of the page. This will open **Dataset list** page in selected Compartment (you might need to change compartment to the one you've created for this workshop).

    ![Open Datasets page](./images/open-datasets-page.png " ")

3. (optional) Verify data labeling prerequisites

    Expand **Show more information** to display what prerequisites have to be met before you can start your data labeling exercise. If these are not met, then Data Labeling might not run properly.

    ![Show more information for Data Labeling](./images/show-more-for-data-labeling.png " ")

    You have already created a new OCI group, hence creating a new OCI group is not needed. Continue with creating a new dynamic group.

4. Navigate to Dynamic Groups page

    From **Navigator** menu choose **Identity & Security** and then **Dynamic Groups**.

    ![Navigate to Dynamic Groups](./images/navigate-to-dynamic-groups.png " ")

5. Create a new dynamic group

    Click **Create** and define a new **Dynamic Group**.

    Provide **Name**, **Description** and enter the following statement to the **Matching Rules**:

    ```text
    <copy>ALL { resource.type = 'datalabelingdataset' }</copy>
    ```

    ![Define dynamic group for data labeling](./images/define-dynamic-group-for-data-labeling.png " ")

6. Verify your new dynamic group

    Verify that your **Dynamic Group** is properly defined.

    ![Verify dynamic group for data labeling](./images/verify-dynamic-group-for-data-labeling.png " ")

7. Set policies for data labeling

    From the **Navigator** menu select **Identity & Security** and then choose **Policies**.

    ![Navigate to policies](https://oracle-livelabs.github.io/common/images/console/id-policies.png " ")

8. Create a new policy for non-administrative users

    Make sure that you've selected your *root* compartment first. Then click **Create Policy**.

    The first policy is for non-administrative users. These users are members of previously created OCI Group.

    OCI Group needs the following privileges (assuming OCI Group is called *OCI-X-Ray-Group* and compartment's name is *X-Rays-Image-Classification*):

    ```text
    <copy>allow group OCI-X-Ray-Group to read buckets in compartment X-Rays-Image-Classification
    allow group OCI-X-Ray-Group to manage objects in compartment X-Rays-Image-Classification
    allow group OCI-X-Ray-Group to read objectstorage-namespaces in compartment X-Rays-Image-Classification
    allow group OCI-X-Ray-Group to manage data-labeling-family in compartment X-Rays-Image-Classification</copy>
    ```

    ![Define data labeling policy for non-administrative users](./images/define-policy-for-non-admin-users.png " ")

    Verify and double check all policies statements are properly entered and click **Create**.

    ![Verify data labeling policy for non-administrative users](./images/verify-policy-for-non-admin-user.png " ")

9. Create a new policy for dynamic group

    Repeat **Create Policy** for Dynamic Group you've created in the previous step. 

    Make sure that you've selected your *root* compartment.

    Enter the following statements (again assuming Dynamic Group is called *X-Ray-Image-Classification\_Dynamic\_Group* and compartment's name is *X-Rays-Image-Classification*):

    ```text
    <copy>allow dynamic-group X-Ray-Image-Classification_Dynamic_Group to read buckets in compartment X-Rays-Image-Classification
    allow dynamic-group X-Ray-Image-Classification_Dynamic_Group to read objects in compartment X-Rays-Image-Classification
    allow dynamic-group X-Ray-Image-Classification_Dynamic_Group to manage objects in compartment X-Rays-Image-Classification where any {request.permission='OBJECT_CREATE'}</copy>
    ```

    ![Define data labeling policy for Dynamic Groups](./images/define-policy-for-dynamic-groups.png " ")

    Verify and double check all policies statements are properly entered and click **Create**.

    ![Verify data labeling policy for Dynamic Groups](./images/verify-policy-for-dynamic-groups.png " ")

    You are now ready to start using Data Labeling service.

## Task 9: Create new policies for OCI Vision service

Similarly to Data Labeling service, you will require some privileges to use OCI Vision service. 

1. (optional) Navigate to Vision page

    Using **Navigator** (on the left) navigate to **Analytics & AI** and then choose **Vision**.

    ![Navigate to Vision](./images/navigate-to-vision.png " ")

2. (optional) Go to custom Projects sub-page

    You will see a menu of Vision options on the left side of the page. As you can see **Vision** service can be used for **Image Classification**, **Object Recognition** and **Document AI**. These services are ready to use services, so you can try them without any preparation.

    In your case, you will create your own custom model. So, Click **Projects**

    ![Go to Projects](./images/go-to-projects.png " ")

3. (optional) Review important information about custom projects

    When you open the **Projects** page, pay attention to **important information** note that is displayed at the top of the page. There are some policies required which need to be set before you create a new custom project and before you start training your models.

    ![Review Important Information](./images/review-important-information.png " ")

4. Set policies for Vision

    From the **Navigator** menu select **Identity & Security** and then choose **Policies**.

    ![Navigate to policies](https://oracle-livelabs.github.io/common/images/console/id-policies.png " ")

5. Create a new policy

    Click **Create Policy**.

    ![Navigate to Vision](./images/create-a-new-policy.png =30%x*)

6. Define policies to access Vision service

    Provide a name of a new policy and description in **Create Policy** dialog page. In the **Policy Builder** section enable **Show manual editor** and enter the following policy:

    ```text
    <copy>allow group OCI-X-Ray-Group to manage ai-service-vision-family in tenancy</copy>
    ```

    ![Define a new policy for Vision](./images/define-a-new-policy-for-vision.png =50%x*)

    Click **Create**.

7. Confirm Policy

    Wait until policy is created and verify it has been properly set.

    ![Verify a new policy for Vision](./images/verify-a-new-policy-for-vision.png =50%x*)
 

## Learn More

* [OCI Documentation](https://docs.oracle.com/en-us/iaas/Content/home.htm)

## Acknowledgements

* **Author** -  
* **Contributors** -   
* **Last Updated By/Date** -  