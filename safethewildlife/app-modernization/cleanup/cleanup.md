# Clean Up (optional)

## Destroy Infrastructure

In this lab, you are going to destroy all the resources you have created on Oracle Cloud to make sure your tenancy is clean from everything done during this workshop.

Estimated Time: 10 minutes

Watch the video below for a quick walk-through of this lab.
[AppDev Multiplayer Lab 4](videohub:xxx)

### Prerequisites

- Oracle Cloud Account.
- Be an OCI administrator in your account (in Free Tier, you are an administrator by default).
- Finish the previous Lab.

## Task 1: Kubernetes

1. Run on Cloud Shell the delete command to clean up Kubernetes. This might take a couple of minutes.

    ```bash
    <copy>kubectl delete -k deploy/k8s/overlays/prod</copy>
    ```

  ![kubectl delete](images/kubectl-delete.png)

2. Go to **`Developer Services`** -> **`Kubernetes Cluster (OKE)`**.

  ![OKE Menu](./images/menu-oke.png)

3. Click on the dots at the row of your Kubernetes Cluster, on the right. On the submenu, click **Delete**.

  ![oke delete button](./images/oke-delete-button.png)

4. Confirm the deletion by typing the name of the cluster, in bold at the top. Click **Delete**.

  ![oke delete button](./images/oke-delete-confirm.png)

## Task 2: VMs and Container Instances.

1. Make sure you are still on the directory `deploy/vm/tf-ci`.

    ```
    <copy>cd ~/oci-multiplayer/deploy/vm/tf-ci</copy>
    ```

2. Run Terraform destroy to delete the resources.

    ```
    <copy>terraform destroy -auto-approve</copy>
    ```

  ![tf ci destroy](./images/tf-ci-destroy.png)

  ![tf ci destroy completed](./images/tf-ci-destroy-completed.png)

3. Change the directory back to the root of the project with the following command:

    ```
    <copy>cd ~/oci-multiplayer</copy>
    ```

4. Run the `ci.mjs` command that will give you information about how to delete your container instance.

    ```
    <copy>npx zx scripts/ci.mjs</copy>
    ```

  ![ci](./images/ci.png)

5. Copy and paste on the console the second yellow command to delete the container instance.

  ![ci copy](./images/ci-copy.png)

6. On the list of container instances, you will see the id of your container instance. Replace `CONTAINER_INSTANCE_OCID` with the id and run the command.

  ![ci paste](./images/ci-paste.png)

7. Confirm that you are sure you want to delete this resource by typing `y`.

  ![ci yes](./images/ci-yes.png)

8. Clean also the infrastructure from Lab 1 by running this command:

    ```
    <copy>./scripts/stop_VM.sh</copy>
    ```

  ![tf destroy](./images/tf-destroy.png)

1. When Terraform completes the `destroy` you will get this green message.

  ![tf destroy completed](./images/tf-destroy-completed.png) 

## Task 3: Autonomous Database and Networking

1. Navigate to **`Oracle Databases`** -> **`Autonomous Transaction Processing`**.

  ![menu adb](./images/menu-adb.png)

2. Click on the dots at the row of your Autonomous Database, on the right. On the submenu, click **Terminate**.

  ![adb delete button](./images/adb-delete-button.png)

3. Confirm the termination by typing the name of the Autonomous Database, `multiplayer`. Click **Terminate Autonomous Database**.

  ![adb delete confirm](./images/adb-delete-confirm.png)

4. Navigate to **`Oracle Databases`** -> **`Autonomous Transaction Processing`**.

  ![menu vcn](./images/menu-vcn.png)

5. Click on the VCN listed that starts with `oke-vcn-quick...`.

  ![vcn list click](./images/vcn-list-click.png)

6. Click on **Delete**.

  ![vcn delete button](./images/vcn-delete-button.png)

7. Click on **Scan**.

  ![vcn delete scan](./images/vcn-delete-scan.png)

8.  Wait for the scanning to finish. When the Delete All button is active, click it.

  ![vcn scan delete all](./images/vcn-scan-delete-all.png)

9.  After a few seconds, all resources in the VCN will be deleted.

10.  Congratulations, you have completed the clean-up of this workshop.


## Acknowledgements

* **Author** - Victor Martin - Technology Product Strategy Director - EMEA
* **Author** - Wojciech (Vojtech) Pluta - Developer Relations - Immersive Technology Lead
* **Last Updated By/Date** - August, 2023
