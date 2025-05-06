# Explore The Environment

## Introduction

In this lab, you will explore the environment that was created in the *Get Started* lab. You will set up the database connection, configure the OCI credentials, add new LLMs and Embedding models and test out the *Chat* feature for the first time.

Estimated Time: -- minutes

### Objectives

In this lab, you will:
* Set the connection to your Oracle Database 23ai
* Set your Oracle Cloud Infrastructure credentials for OCI connectivity
* Configure the LLMs and embedding models you will use in the following labs
* Test the *Chat* feature for the first time

### Prerequisites

This lab assumes you have:
* An Oracle Database 23ai up and running
* Completed the *Get Started* Lab

## Task 1: Set the DB connection

Let's check if the DB is correctly connected.

1. Navigate to the *Databases* tab on the left side pane:

	![Navigate to the Databases tab](images/database-navigation.jpg)

2. To configure the Oracle Database 23ai Free, you will need to enter the credentials:

   * Enter the Database Username: `WALKTHROUGH`
   * Enter the Database Password for the database user: `OrA_41_OpTIMIZER`
   * Enter the Database Connection String: `//localhost:1521/FREEPDB1`
   * Save
   
   ![Database configuration](images/database-config.png)


## Task 2: Set OCI Credentials

In the *OCI* configuration tab, you can add your **Oracle Cloud Infrastructure** (OCI) credentials to authenticate with your OCI tenancy. This will enable access to objects and documents stored in your cloud compartments.

1. Navigate to the *OCI* tab on the left-hand pane:

   ![Navigate to the Databases tab](images/oci-navigation.jpg)

2. Insert your OCI credentials. Detailed information on how to get the required credentials is available in the [Oracle Cloud Infrastructure Documentation](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/apisigningkey.htm#Required_Keys_and_OCIDs).

   If you have previously created a `.oci/config` file, the framework will automatically read this file at startup and load the credentials from the Default profile for authentication. To create one, follow the instructions available in the [Quickstart Documentation](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/cliinstall.htm#Quickstart).

   After entering your credentials, click the `Save` button. If the credentials are correct, a green confirmation pop-up will appear, indicating successful authentication to your tenancy.

   ![OCI credentials success](images/oci-credentials-success.png)



## Task 3: Configure LLMs

Let's check the models available for use. You'll need to navigate to the *Models* tab:

![models menu](images/models.jpg)

   * The default LLMs for chat completions are:

     ![llms](images/llms.png)

  * The default LLMs for embeddings are:

     ![embeddings](images/emb.png)

   Let's add another LLM to the Ollama models and enable it. Open a terminal a window and follow these steps:

  * Pull the llama3.2 LLM:

      ```bash
         ollama pull llama3.2
      ```
  * Now, you will need to enable in the model list. Go back to the *Models* tab, under the *Language Models* section and press the *Add* button. Now fill in the form that just appeared with the values shown in the following snapshot:

      ![new_llama32](images/addllama32.png)

  Now you are all set for using the *Chat* feature with the LLMs you just configured!

## Task 4: Test the *Chat* feature

The two LLMs availble could be tested right away, in order to understand their behavior with generic questions. First of all, navigate to the chat GUI

![chat](images/chat.jpg)

scroll down the left-side menu to find the **Chat model** menu:

![chat models](images/chatmodel.png)

and, with the **Enable RAG?** check-box unselected, choose the **gpt-4o-mini** and ask generic questions like:

```
Which kind of database can you use to run the Java Web example application?
```
```
Can I use any kind of development environment to run the example?
```

NOTICE: *if you see a **Database has no Vector Stores. Disabling RAG.** message above, don't panic! That's because you haven't created a vector store yet and thus you can't use the RAG functionality*.

As you can see, even if the questions mean to refer to a specific example, the LLM tends to answer in a generic way. 

## Learn More

* (optional) Now click the **Clear** button under the **History and Context** section, and choose the other available LLM, **llama3.1**. Then, ask the same questions and compare the results. Note that the History is enabled by default. The **Clear** button resets the *context window* and starts a fresh interaction with a model.

* (optional) Play with the **Temperature** parameter (and also the other parameters if you wish to!) and compare the quality of the answers, for each LLM that's available. Clear the history by pressing the **Clear** button after each cycle.

## Acknowledgements
* **Author** - <Name, Title, Group>
* **Contributors** -  <Name, Group> -- optional
* **Last Updated By/Date** - <Name, Month Year>
