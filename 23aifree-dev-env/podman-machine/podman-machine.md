# Create a Podman machine

## Introduction

Creating a Podman machine on Windows or macOS is essential because Podman requires a Linux-based environment to run containers.

Unlike Linux systems, Windows and macOS do not natively support the container runtime required by Podman.
The Podman machine acts as a lightweight virtual machine, providing the necessary Linux kernel and runtime environment to manage and execute containers seamlessly.
This ensures compatibility with containerized workloads, enabling you to run, test, and develop containerized applications effectively on non-Linux operating systems.

>**Note:** In this workshop, we will provide instructions exclusively using Podman Desktop. If you prefer, you can also create a Podman machine using the command line. For users of Docker/Docker Desktop, you will also need to create a Docker Desktop VM or Docker virtual machine. While the underlying concept is similar, the steps may differ slightly. To ensure accuracy, we recommend consulting the official Docker documentation for detailed guidance.

Estimated Time: 10 minutes

### Objectives

Create a Podman machine

## Task 1: Open Podman Desktop

1. Launch Podman Desktop from your applications/start menu.

2. If it's your first time running Podman Desktop, you may be prompted to initialize a Podman machine.

## Task 2: Navigate to the Podman Machine configuration and ensure no Podman machine is running

1. In the Podman Desktop interface, click **Settings** in the sidebar.

    ![Podman Desktop settings](./images/podman-settings.png)

2. In case you have already a Podman Machine running, stop it. We will create a new one.

    ![Stop podman machine](./images/stop-machine.png)

## Task 3: Create a new Podman Machine

1. Click on **Create New...** to start configuring a new Podman Machine

    ![create new podman machine](./images/create-new.png)

2. Provide an name and configure CPU, Memory, and Disk Size according to resources available on your computer. We recommend to use at least:

    - 2 CPUs
    - 4GB RAM
    - 20 GB Disk Size

    ![configure new podman machine](./images/machine-details.png)

    You can also enable the option **Start the machine now**.

3. Click **Create** to confirm the configuration. It will take a few moments to create the new Podman Machine. You should see the machine running in the resource overview screen.

    ![new podman machine is running](./images/machine-running.png)


## Task 4 (optional): Experiment

1. Feel free to configure a Podman Machine that suits your requirements of performance. 

## Appendix - Create Podman Machine using the command line

1. Open a terminal. And run the following command to list all available virtual machines.

    ```bash
    $ <copy>
    podman machine ls
    </copy>
    ```

    ![list podman machines](./images/list-vms.png)


2. Stop any running running machines:

    ```bash
    $ <copy>
    podman machine stop &lt;NAME&gt;
    </copy>
    ```

3. Create a new Podman Machine using the following command:

    ```bash
    $ <copy>
    podman machine init --cpus 2 --memory 4096 --disk-size 20 23ai-machine
    </copy>
    ```

    This command will create a new virtual machine with 2 CPUs, 4 GB RAM with a disk size of 20 GB. The name is *23ai-machine*.

    ![init machine](./images/init-machine.png)    

4. Start your new Podman Machine (in case it is not automatically started):

    ```bash
    $ <copy>
    podman machine start 23ai-machine
    </copy>
    ```

5. Check the list of your Podman Machines:
   
    ```bash
    $ <copy>
    podman machine ls
    </copy>
    ```
    ![list podman machines](./images/list-vms2.png)

## Congratulations!
Let's continue with the next lab.


## Acknowledgements
* **Author** - Kevin Lazarz, Database Product Management
* **Last Updated By/Date** - Kevin Lazarz, December 2024
