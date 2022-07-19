# Introduction to Labs and Workshops

The labs in this workshop walk you through all the steps to **develop workshops** for LiveLabs.

  > **Note:** You can find information about creating images for compute instances and storing them in Marketplace in the [Creating Compute Images for Marketplace](https://oracle-livelabs.github.io/common/sample-livelabs-templates/create-labs/labs/workshops/compute/index.html) LiveLabs workshop.

## What are Labs and Workshops?
A lab is a new model adopted by the Database (DB) organization to enhance the tutorial experience. Labs are what the User Assistance community commonly knew as Oracle by Example (OBE). Labs can be combined to form a workshop, formerly known as Hands-on Lab or HOL, or a Learning Path.

An individual Markdown (.md) file is called a lab. A collection of labs is called a workshop. A LiveLabs workshop must contain more than one lab. You cannot create a single lab LiveLabs (LL) workshop. In most cases, this is not a problem since most of the LL workshops contain at least one common lab titled **Get Started** that guides the user on the different types of Cloud accounts.

## What is GitHub?
GitHub is a cloud-based version control system designed for software developers.
  * At the core of GitHub is Git, an open-source version control system that manages file versions and tracks the changes made by the members of a repository.
  * The Hub is a cloud-based repository that manages the storage of the files and provides a folder structure.
  ![GitHub cloud-based control infographic.](./images/git-hub-what-is-github.png " ")

## GitHub Projects and Repositories
GitHub is organized by projects. Each project has its repository (commonly referred to as a repo) that is accessed through a unique URL. As of January 2020, there were more than 190 million repositories on GitHub.

In the following simplified example, the three-drawer filing cabinet represents three GitHub projects (one drawer per project). Each project can contain one or more repositories, represented by folders in the example. In this example, project 2 (second drawer) has three repositories (folders) and we are viewing one of those repositories.

  ![GitHub project organization diagram.](./images/git-hub-projects-repositories.png " ")

## Oracle LiveLabs GitHub Project and Repositories

Beginning in May 2022, Oracle LiveLabs began moving from the oracle/learning-library repository to its own GitHub project [oracle-livelabs](https://github.com/oracle-livelabs), to ease the workshop development process and facilitate collaboration between Oracle product teams and customers. Instead of having all workshops in one GitHub repository, in the new GitHub project, we organize workshops into 24 GitHub repositories (as of Jun 2022), according to their council groups (products). Those repos are referred to as **Production**, since they are where customers view the completed LiveLabs workshops from.

+ You can access the **oracle-livelabs** GitHub project using the following URL:
  [https://github.com/oracle-livelabs](https://github.com/oracle-livelabs)

  ![GitHub access overview.](./images/github-oracle-livelabs.png " ")

  You should bookmark this URL, as you will use it often: **https://github.com/oracle-livelabs**

+ You can access each GitHub repository inside **oracle-livelabs** by appending the repository name to the URL above.

  For example, the URL for the database repository is:
  [https://github.com/oracle-livelabs/database](https://github.com/oracle-livelabs/database)

  ![GitHub Oracle repository.](./images//git-hub-oracle-repos.png " ")

  You should bookmark the repos that you will often use.

## LiveLabs Workshop Workflow

Before you start, please check LiveLabs ([developer.oracle.com/livelabs](https://developer.oracle.com/livelabs)) to see if there is already a workshop similar to the content you want to create. Please also check WMS ([bit.ly/oraclewms](https://bit.ly/oraclewms)) to see if there is already a workshop in development that resembles your content. If so, please contact that workshop team to see if you can cooperate on the workshop. If not, please proceed.

For a workshop to go from an idea to a LiveLabs workshop in production, it has to go through the following phases or statuses in WMS. You can refer to this section to see your current and next steps.

1. After the workshop team submits the workshop request (see details in Lab 1 -> Task 1), the workshop is in *Submitted* status. The workshop's *council* group will review the workshop within 2-3 business days. Council will either approve the workshop and move it to *Approved*, or ask the workshop team for more information and move it to *More Info Needed*.
>**Note:** If workshop teams have not heard back from the council for more than 3 business days, please follow up with your council group. To find your council members, go to WMS, under **People & Role Reports**, select **Workshop Council Members**, and you can find your council members.

   ![Submitted](./images/submitted.png " ")

1. Council asks workshop team for *more information*. The workshop team will respond to the council via the **Message the Team** tab in WMS to get the workshop approved.
  ![More Info Needed](./images/more-info-needed.png " ")

3. Council *approves* the workshop. Now, the workshop team can start developing the workshop. Refer to the notification email to see your action items.
  ![Approved](./images/approved.png " ")

4. Workshop team will move the workshop to *In Development* when they start workshop development. The workshop team can refer to Lab 1 to Lab 4 to see workshop development-related instructions.
  ![In Development](./images/in-development.png " ")

5. After development, the workshop team will move the workshop status to *Self QA*. Follow Lab 4 -> Task 8 to self-QA the workshop. After Self QA, the workshop team will move the workshop status to *Self QA Complete* and send the completed Self QA form to the stakeholders.
  ![Self QA](./images/self-qa.png " ")

  Workshop authors can watch the video below on how to self-QA your workshop. Stakeholders can also watch the video below to learn how to verify the QA of a workshop.
  [](youtube:8tirP-hibsk)

6. The workshop's *stakeholders* will verify the QA within 2 business days. They will either send workshop team issues to fix, or move the workshop to *Completed* status, meaning the workshop is ready for production.
  ![Self QA Complete](./images/self-qa-complete.png " ")

7. The workshop is *completed* and is ready for publishing! Workshop teams will submit a publishing request, and the LiveLabs team will approve it. After the publishing request is approved, the workshop will be live in LiveLabs automatically within a business day.
  ![Completed](./images/completed.png " ")


## Develop LiveLabs Workshops Workflow
The following diagram shows the general workflow process that your need to follow to set up your environment to develop labs and workshops. Most of the tasks are performed only once.

![LiveLabs workflow infographic.](./images/git-hub-workflow-flow-chart.png " ")

## Workshop Objectives
  * Set up the GitHub environment.
  * Install and use GitHub Desktop Client.
  * Fork repositories you need in the Oracle LiveLabs GitHub project (copy repositories' content to GitHub).
  * Clone your forked repositories (copy repositories' content to the local machine).
  * Understand the lab folders' structure.
  * Install and use Atom Editor and the LiveLabs Markdown templates to develop content.
  * Review a few Markdown features.
  * Perform GitHub operations to commit your developed content to the main (production) repository in the Oracle LiveLabs GitHub project.
  * Host workshops and labs in LiveLabs and optionally in OHC (User Assistance only).

## Lab Breakdown
- **Lab 1:** Get Started with Git and Set up the Environment
- **Lab 2:** Understand the Oracle LiveLabs Folder Structure
- **Lab 3:** Use A Text Editor to Develop Markdown Content
- **Lab 3a:** Common Markdown Features for Content Development
- **Lab 4:** Use GitHub Desktop to Commit to the GitHub Repository
- **Optional Lab 5:** Add GitHub Hosted Labs and Workshops to OHC

## What's Next?

  **You are all set to begin the labs! Click Lab 1: Get Started with Git and Set up the Environment in the Contents menu.**

## Want to learn more about LiveLabs workshops and GitHub?
  * [Oracle LiveLabs](https://apexapps.oracle.com/pls/apex/f?p=133:1)
  * [Get started with GitHub](https://docs.github.com/en/get-started)

## Acknowledgements

* **Authors:**
    * Anuradha Chepuri, Principal User Assistance Developer, Oracle GoldenGate
    * Lauran Serhal, Principal User Assistance Developer, Oracle Database and Big Data
* **Contributors:**
    * Aslam Khan, Senior User Assistance Manager, ODI, OGG, EDQ
    * Arabella Yao, Product Manager, Database Product Management
* **Last Updated By/Date:**
    * Arabella Yao, Jun 2022