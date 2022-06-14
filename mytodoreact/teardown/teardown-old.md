# Teardown

## Introduction

In this lab, we will tear down the resources created in your tenancy and the directory in the Oracle cloud shell.

Estimates time: 10 minutes


### Objectives

* Undeploy and clean up resources 

### Prerequisites

* Have successfully completed the earlier labs

## **Task 1**: Delete the Workshop Resources

1. Run the following command to delete the resources created in you tenancy. It will delete everything except the compartment. It will take several minutes to run. The script will delete the Object Storage bucket,  Oracle Cloud Infrastructure Registry  repositories, OKE cluster, VCN, and databases.

    ```
    <copy>cd ~/mtdrworkshop/teardown;./destroy.sh</copy>
    ```

## **Task 2**: Delete the Directory

1. Delete the directory in your cloud shell where you installed the workshop.

    ```
    <copy>rm -rf ~/mtdrworkshop</copy>
    ```

## **Task 3**: Delete the Compartment

1. In the Oracle Cloud Console navigate to the **Compartments** screen in the **Identity** section. Select the compartment that was created for the workshop and delete it. 
>**Note:** even when the script in task 1 has completed, it can take some time for Oracle Cloud Infrastructure to fully remove all the resources. It will not be possible to delete the compartment until this has completed.

## Acknowledgements

* **Author** - Kuassi Mensah, Director Product Management
* **Original Author** - Richard Exley, Consulting Member of Technical Staff, Oracle MAA and Exadata
* **Last Updated By/Date** - Arabella Yao,  Database Product Manager, October 2021


