# Your workshop environment

## Introduction

This lab introduces you to the workshop environement.

Estimated Time: ~10 minutes

### **Objectives**

In this lab, you will:
* Discover the OCI Cloud Shell and the OCI Cloud Editor.
* Do some minimal setup to prepare your environment.

## Task 1: Cloud Shell

To perform this workshop, you will use Java 19 on Oracle Cloud Infrastructure. In theory, you can also do the workshop on your own machine with Java 19 installed but in the interest of time, it is easier to use OCI. 

Cloud Shell is a browser-based terminal that provides an ephemeral Linux machine. Cloud Shell simplifies working with cloud resources on OCI. Under the hood, Cloud Shell uses an OCI pre-configured Virtual Machine with preinstalled tools, including Java. And as you will see in this workshop, Cloud Shell can also be used to develop simple applications.


To launch Cloud Shell, simply log on the OCI console via [cloud.oracle.com](https://cloud.oracle.com), and click the Cloud Shell icon on the top right.

  ![Starting Cloud Shell](../images/cs-start.png)

After 20~30 seconds, your Cloud Shell VM will be up and running, and your Cloud Shell terminal will be displayed in your browser.

  ![Cloud Shell started](../images/cs-started.png)

You now can use Cloud Shell as a regular shell.



## Task 2: Prepare your environment

This workshop uses Java 19 which was released in September 2022. And although Cloud Shell supports Java, it doesn't come yet with Java 19 support. So you will now install Java 19. And don't worry, this is easy.

In Cloud Shell, enter the following command.

```text
<copy>source <(wget -qO- https://objectstorage.us-phoenix-1.oraclecloud.com/n/jpginfra/b/j12022-hol-bucket/o/download.sh)</copy>
```

Now you can launch the setup script.

```text
<copy>setup-ce.sh</copy>

```
This script will take roughly a minute to execute, it will download and configure Java 19, set environment variables, configure Cloud Editor Java 19 support, etc. You can check and confirm that Java 19 is now installed.

```text
> <copy>java -version</copy>
openjdk version "19" 2022-09-20
OpenJDK Runtime Environment (build 19+36-2238)
OpenJDK 64-Bit Server VM (build 19+36-2238, mixed mode, sharing)
```

## Task 3: Cloud Editor


During the workshop, you will also also use Cloud Editor, a Cloud Shell feature that offers a browser-based modern text editor.

💡 `vi`, `vim`, `emacs` and `nano` are also pre-installed on the Cloud Shell VM.

To launch Cloud Editor, simply click, in the [OCI console](https://cloud.oracle.com), on the Cloud Editor icon on the top right, next to the Cloud Shell icon.

  ![Starting Cloud Editor](../images/ce-start.png)

Cloud Editor runs in the Cloud Shell VM but you don't have to start Cloud Shell to use Cloud Editor. If you don't, the Cloud Shell VM will automatically be started when Cloud Editor is launched.

💡 It is although required to perform Task 2 before launching Cloud Editor to have Java 19 properly set in Cloud Editor.

  ![Cloud Editor default layout](../images/cs-ce-horizontal.png)

By default, Cloud Shell and Cloud Editor use a stacked layout. You can adjust this layout to fit your preferences by clicking on the top-left "View" option.

  ![Cloud Editor default layout](../images/cs-ce-view.png)

You can also re-size, maximize, minimize, swap, close the Cloud Shell and/or the Cloud Editor window, and change fonts (check the "Gear" icon). You can also open Cloud Shell and Cloud Editor in different browser windows/tabs, etc. We suggest you spend 2 minutes getting familiar with both Cloud Shell and Cloud Editor.

💡 For the workshop, we suggest keeping both Cloud Shell and Cloud Editor open in the same window, and the workshop guide in a different browser window/tab.


## Task 4: Lab directories

This is not mandatory but it is probably cleaner to perform each Lab in its own directory. So we suggest to create, for each lab, the corresponding directory.

```text
mkdir ~/lab3
cd ~/lab3
…
```

Should you want to get at the end of this workshop a copy of the files you created, just use the Cloud Shell File Transfer feature to exchange files between your laptop and a Cloud Shell VM.

  ![Cloud Shell started](../images/cs-file-transfer.png)



## Remark

In the interest of time and in the spirit of explaining how things work, the samples you will develop in these hands-on labs sometimes take a few shortcuts. For example, potential errors are not always handled properly, arguments are not always validated, etc. Those and other aspects such as security, synchronization, testing, etc. are important matters that should always be properly handled in any code that will go into production but that is not the focus of this lab. Today's goal is to give you, in a short amount of time, an overview of Project Panama and offer you some initial hands-on experiences with the Panama APIs and its tool.

Congratulations, you are now all set for the next step!

## Learn More


* [Cloud Shell](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/cloudshellintro.htm) documentation
* [Code Editor](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/code_editor_intro.htm) documentation


## Acknowledgements
* **Author** - [Denis Makogon, DevRel, Java Platform Group - Oracle](https://twitter.com/denis_makogon)
* **Contributor** -  [David Delabassée, DevRel, Java Platform Group - Oracle](https://twitter.com/delabassee)
* **Last Updated By/Date** - David Delabassée, Oct. 1 2022
