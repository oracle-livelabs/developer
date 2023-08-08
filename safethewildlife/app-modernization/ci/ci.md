# Containerize and migrate to OCI Container Instances

## Introduction

In this lab, we will create container images for the application components and deploy them to the [OCI Container Instances](https://www.oracle.com/cloud/cloud-native/container-instances/) service. Container Instances is an excellent tool for running containerized applications, without the need to manage any underlying infrastructure. Just deploy and go.

To help streamline the process, you'll use a custom script to create and publish container images to the [OCI Container Registry](https://www.oracle.com/cloud/cloud-native/container-registry/). Container Registry makes it easy to store, share, and managed container images. Registries can be private (default) or public.

Estimated Time: 15 minutes

Watch the video below for a quick walk-through of this lab.
[AppDev Multiplayer Lab 2](videohub:xxx)

### Prerequisites

- Oracle Cloud Account.
- Be an OCI administrator in your account (in Free Tier, you are an administrator by default).
- Finish the previous Lab.

## Task 1: Prepare the environment

1. Run the script to set the environment in the Cloud Shell. This script will:

    - check dependencies
    - create self-signed certificates, if needed
    - log into the container registry to validate credentials
    - print component versions.

    ```
    <copy>npx zx scripts/setenv.mjs</copy>
    ```

  ![setenv-command](./images/setenv-command.png)

2. The script will ask for the following information. At _`Autonomous Database Compartment Name`_ you just press _**ENTER**_ to select the root compartment. If you are familiar with [OCI compartments](https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managingcompartments.htm), then feel free to pick an existing compartment name.

  ![Setenv compartment](./images/setenv-compartment.png)

3. At _`Autonomous Database name`_ you just type `multiplayer`.

    ```
    <copy>multiplayer</copy>
    ```

  ![Setenv ADB name](./images/setenv-adb-name.png)

4. At _`Autonomous Database password`_ you can use the _`Suggested Password`_ in yellow. It is a password generated on the fly by `openssl` for you.

    > NOTE: your password will be different to the one on the picture.

  ![Setenv ADB password](./images/setenv-adb-password.png)

5. Create and publish the **`server`** container image. It might take up to 5 minutes.

    ```
    <copy>npx zx scripts/release.mjs server</copy>
    ```

  ![release server](./images/release-server.png)

6. Create and publish the **`web`** container image. It might take up to 5 minutes.

    ```
    <copy>npx zx scripts/release.mjs web</copy>
    ```

  ![release web](./images/release-web.png)

7. Run the `ci.mjs` command that will give you information about how to create your container instance.

    ```
    <copy>npx zx scripts/ci.mjs</copy>
    ```

  ![ci command](./images/ci-command.png)

    > _**ci.mjs**_ Is a [Google ZX](https://github.com/google/zx) script. We use ZX because if you don't know Bash Shell programming, it is based on JavaScript and it is easy to read. If you know Bash Shell then, ZX is just a wrap on plain Bash Shell. The script will call several [OCI CLI](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/cliconcepts.htm) commands to get information from OCI Container Instances. The commands are complex enough that this script help you out.

8. Copy the yellow command, paste it on Cloud Shell, and run it.

  ![ci create command](./images/ci-create-command.png)

9. In the Web UI, you can navigate to **`Developer Services`** -> **`Container Instances`** to watch the progress of the deployment.

  ![menu ci](./images/menu-ci.png)

10. You will see the list of container instances. The one you created will be in `creating` state, or maybe already in `Active` state.

  ![ci list](./images/ci-list.png)

    > NOTE: if you selected your own comparment, make sure you select the compartment on the left dropdown.

11. Click on the `oci-Multiplayer` container instance.

  ![ci list click](./images/ci-list-click.png)

12. Inside the container instance, on the left-side menu, you can click `Containers` and, you will see the two containers, `WebContainer` and `ServerContainer`.

  ![ci container list](images/ci-container-list.png)

## Task 2: Create a Load Balancer

In this second and final task, you will add the Container Instance private IP address to the backend set of a new load balancer. This process will be done with Terraform so you can easily clean it up.

1. The Terraform file `terraform.tfvars` contains variables. You are going to generate that file by running the following command:

    ```
    <copy>npx zx scripts/tfvars.mjs ci</copy>
    ```

2. During the execution of the script, you will have to answer a few questions. The first one is the _CI Deployment Compartment Name_. You just press _**ENTER**_ to select the root compartment. If you are familiar with [OCI compartments](https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managingcompartments.htm), then feel free to pick an existing compartment name.

  ![tf ci compartment](images/tf-ci-compartment.png)

3. The second one will be the Private IP address. Copy the private IP address for your container instance on the OCI web console.

  ![tf ci private IP](images/tf-ci-private-ip.png)

4. The command will create the `tfvars` file, you can deploy a load balancer in front of your two containers with Terraform.

  ![tf ci completed](./images/tf-ci-completed.png)

5. Change the directory to `deploy/vm/tf-ci` with the following command:

    ```
    <copy>cd deploy/vm/tf-ci</copy>
    ```

6. Run Terraform Init to set up the Terraform environment.

    ```
    <copy>terraform init</copy>
    ```

  ![tf init](./images/tf-init.png)

7. Run Terraform apply to start creating the resources. It might take up to 7 minutes.

    ```
    <copy>terraform apply -auto-approve</copy>
    ```

  ![tf-apply-1](./images/tf-apply-1.png)

8. Copy the `lb_public_ip`. It is the Load Balancer public IP address.

  ![tf-output](images/tf-output.png)

9. Paste the Load Balancer public IP address on a browser tab and try the Container Instance deployment.

  ![game](images/game.png)

You may now [proceed to the next lab](#next).

## Acknowledgements

* **Author** - Victor Martin - Technology Product Strategy Director - EMEA
* **Author** - Wojciech (Vojtech) Pluta - Developer Relations - Immersive Technology Lead
* **Author** - Eli Schilling - Developer Advocate - Cloud Native and DevOps
* **Last Updated By/Date** - August, 2023
