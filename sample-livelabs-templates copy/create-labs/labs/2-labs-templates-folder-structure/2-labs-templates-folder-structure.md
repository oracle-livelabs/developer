# Understand the Oracle LiveLabs folder structure

## Introduction

This lab describes the prescribed folder structure that we need to follow for developing LiveLabs workshops.

### Objectives

* Understand the **Oracle LiveLabs** folder structure.
* Familiarize yourself with the components of the workshop and the lab folders.

## Task 1: Folder Structure of the Oracle LiveLabs

The following image shows a folder structure of the **sample-workshop** that is opened in the **Visual Studio Code** Editor. Inside each repository in [Oracle LiveLabs](https://github.com/oracle-livelabs), there is a **sample-livelabs-templates**  folder. You can see this structure at the following URL [https://github.com/oracle-livelabs/common/tree/main/sample-livelabs-templates/sample-workshop](https://github.com/oracle-livelabs/common/tree/main/sample-livelabs-templates/sample-workshop). You can get started with workshop development by copying this sample workshop folder.

![Example of workshop structure.](./images/sample-workshop-structure.png " ")

## Task 2: Understand the Components of the Workshop and Lab Folders
  The following describes the components of the above example:
  * The root folder of this example is the name of the workshop, **sample-workshop**. Direct links to the workshop files will be coming soon.

>**Note:** You will be creating your project folder anywhere within your cloned repository. If you have not done so, please look into the [Oracle LiveLabs GitHub project](https://github.com/oracle-livelabs) to see different repositories and decide on a repository for your workshop. If no existing repository fits your workshop, please contact our LiveLabs team. (See more details about this in Lab 3 → Task 4.)

  * Each lab has its own folder, for example, **data-load**, **introduction**, **provision**, etc., each containing:
    * a **files** folder (optional) that contains the files used in this lab.
    * an **images** folder that contains the screenshots used in this lab.
    * a **.md** file that contains this lab's content.
  * The **workshops** folder contains the **desktop**, **sandbox** (previously livelabs), and/or **tenancy** (previously freetier) folder, each containing:
    * an `index.html` file, which is executed when it is accessed by a browser. You can copy this file from the *sample-workshop* folder and use it without changes.
    * a `manifest.json` file defines the structure of the workshop that the `index.html` file renders. You can copy this file from the *sample-workshop* folder, but you need to customize it for your workshop.
    * a `README.md` file (optional), which contains the summary of the entire workshop. You can view it from your git repository.

    The following screenshot shows a sample `manifest.json` file that is opened in the **Visual Studio Code** Editor.

    >**Note:** Ensure that the appropriate stakeholder email is listed by ***help***. If the *include* and *variables* do not apply to your workshop, you should remove them, to ensure your workshop can render properly.

    ![Sample manifest json file.](./images/manifest.png " ")

This concludes this lab. You may now **proceed to the next lab**.

## (Optional) Task 3: Customize Workshop for Events

Sometimes, the workshop team may want to *customize the workshop for an upcoming event*, for example, having a different introduction of the workshop, adding or removing some labs. Meanwhile, the workshop team doesn't want to affect the workshop already in production. They can have this customized version of the workshop in production by following the instructions below.

Under the `workshops` folder, the workshop team can create an event folder. Just like the `desktop`, `freetier`, and/or `livelabs` folder that already existed, this event folder also contains an `index.html` file and a `manifest.json` file. The workshop team can customize the workshop by updating the `manifest.json` file. Then, the workshop team can use the link to the event folder for the event, leaving other workshops untouched.

Refer to Lab 3a -> Task 2 to use conditional formatting for the event's content.

Refer to Lab 4 -> Task 9 to request to publish the workshop of type *Event*.

## (Optional) Task 4: Multiple Workshops Use the Same Lab Files

![Multiple Workshops Use the Same Lab Files](./images/multiple-workshops.png)

If you have multiple workshops that use the same lab files except for common labs (in this example, *install-spatial-studio-mp* and *intro-to-spatial-studio* both use the lab *create-project*), you should use the multiple workshop folder structure above.

Under the `workshops` folder, you will create a `workshop 1` folder (in this example, *install-spatial-studio-mp*). That `workshop 1` folder will contain a desktop, freetier, and/or livelabs folder, each containing an index.html, a manifest.json file, and an introduction Markdown file (if you have different introductions for freetier and livelabs versions). If you have the same introduction for freetier and livelabs versions, then you can have an introduction folder just like in Task 1 and Task 2.

Refer to Lab 3a -> Task 2 to use conditional formatting for different versions of the workshop.

## Acknowledgements

* **Author:**
    * Anuradha Chepuri, Principal User Assistance Developer, Oracle GoldenGate
* **Contributors:**
    * Lauran Serhal, Principal User Assistance Developer, Oracle Database and Big Data User Assistance
    * Aslam Khan, Senior User Assistance Manager, ODI, OGG, EDQ
    * Arabella Yao, Product Manager, Database Product Management
    * Madhusudhan Rao, Product Manager, Database Product Management

* **Last Updated By/Date:** Arabella Yao, Jun 2022