# Install Podman

## Introduction

We provide high-level instructions for installing Podman Desktop and Visual Studio Code. If you encounter any difficulties during the installation of these products, please visit the respective software provider for assistance.

When you install Podman Desktop, it will also install podman and facilitate the configuration of the Virtual Machine required for running containers in an easy manner.

>**Note:** We are only providing installation instructions for Podman/Podman Desktop in this workshop. However, you can also use Docker Desktop and Docker to complete this workshop. 

Estimated Time: 10 minutes

### Objectives

Install and configure the tools required for the workshop.

## Option 1: Install Podman Desktop on MacOs

1. Visit the official [Podman Desktop](https://podman-desktop.io/).

2.  Navigate to the **Downloads** section.

3. Select the macOS version compatible with your architecture:

    - Intel-based Macs: Intel.
    - Apple Silicon: Apple Sillicon.
 
4. Install Podman Desktop

    - Once the download is complete, locate the **.dmg** file in your **Downloads** folder.
    - Double-click the **.dmg** file to open the installer.
    - Drag the Podman Desktop icon into the Applications folder.
    - Close the installer window and eject the mounted image.

5. Verify Installation

    - Open Finder and navigate to the Applications folder.
    - **Launch Podman Desktop**.
    - If prompted, approve any permissions requested by macOS security settings.


## Option 2: Install Podman Desktop on Microsoft Windows

1. Visit the official [Podman Desktop](https://podman-desktop.io/).

2.  Navigate to the **Downloads** section.

3. Select the Windows version compatible with your architecture:

    - Intel/Amd-based: 64.
    - ARM64: arm64.

4. Install Podman Desktop

    - Locate the downloaded .exe file in your **Downloads** folder.
    - **Double-click the .exe** file to start the installation.
    - Follow the on-screen instructions to complete the setup:
        - Agree to the license terms.
        - Choose the installation directory (default is recommended).
        - Allow the installer to add Podman to your system PATH.
        - Once installation is complete, click **Finish** to exit the installer.

## Option 3: Install Podman Desktop on Linux

Podman Desktop can be installed using `flatpak` format or by downloading the `tar.gz` file.

1. Visit the official [Podman Desktop](https://podman-desktop.io/).

2.  Navigate to the **Downloads** section.

3. Select the binary version:

    - flatpak.
    - tar.gz.

4. Install Podman Desktop:

    Option A: flatpak

    - Open a terminal and navigate to the directory where you downloaded the .flatpak file and run:
        ```bash
        $ <copy>
        flatpak install ./podman-desktop-1.15.0.flatpak
        </copy>
        ```
      > **Note**: Double-check the version!

    Option B: tar.gz

    - Open a terminal and navigate to the directory where you downloaded the .tar.gz file:
        - Extract archive:
            ```bash
            $ <copy>
            tar -xvf podman-desktop-*.tar.gz
            </copy>
            ```
        - Navigate to the extracted directory:
            ```bash
            $ <copy>
            cd podman-desktop-*
            </copy>
            ```
        - Launch Podman Desktop directly:
            ```bash
            $ <copy>
            ./podman-desktop
            </copy>
            ```


## Congratulations!
If you have come this far, I am certain that your installation was successful. Let's continue with the next lab.


## Acknowledgements
* **Author** - Kevin Lazarz, Database Product Management
* **Last Updated By/Date** - Kevin Lazarz, December 2024
