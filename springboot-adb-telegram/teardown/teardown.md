# Teardown workshop resources

## Introduction

In this lab, we will tear down the resources created in your tenancy and the directory in the Oracle cloud shell

Estimated time: 5 minutes

### Objectives

* Delete the object storage bucket created in Lab 3
* Delete deployment created in Lab 3
* Run destroy script
* edit \~/.bashrc

### Prerequisites

* Have completed the earlier labs

## Task 1: Run the Destroy Script

1. Run the following command to delete the resources created in your tenancy. It will delete everything except the compartment and may take several minutes to run.

    ```
    <copy>
    cd $MTDRWORKSHOP_LOCATION
    source destroy.sh
    </copy>
    ```

## Task 2: Delete the Directory
<br>

1. Once the destroy script completes, delete the directory in your cloud shell where you have installed the workshop (typically *reacttodo*)

    ```
    <copy>
    cd $HOME
    rm -rf <directory\_name>
    </copy>
    ```

## Task 3: Edit \~/.bashrc

1. We must remove the line we added to \~/.bashrc in Lab 1. Run the following command to remove

    ```
    <copy>
    vi ~/.bashrc
    </copy>
    ```

2. Once you're inside \~/.bashrc, delete the following line (typically the last line, ending with *env.sh*) and save it (you may re-run the lab w/o cloning the repository).
    ```source $(pwd)/env.sh```

## Task 4: Delete the Compartment

1. In the Oracle Cloud Console, navigate to the **compartments** screen in the **Identity** section. Select the compartment that has been created for the workshop (if you didn't provide an existing one) and delete it
**Congratulations! You have completed the workshop**

## Acknowledgements

* **Authors** \- Kuassi Mensah\, Dir\. Product Management\, Java Database Access; Peter Song\, Developer Advocate JDBC
* **Original Author** \- Richard Exley\, Consulting Member of Technical Staff\, Oracle MAA and Exadata
* **Last Updated By/Date** \- Juarez Barbosa\, July 2023