# Using Retrieval Augmented Generation

## Introduction

Now that you’ve created the vector stores, you can begin testing the knowledge base built in Lab 2. In this Lab, you will test the knowledge stored in the `TEST1` vector store, which serves as an example of an augmented LLM based on publicly available sources.

Estimated Time: -- minutes

### Objectives

In this lab, you will:
* Enable the RAG functionality in the *Chat* window
* Ask questions and receive answers enhanced by relevant context stored in the vector database
* Compare results across different configurations

### Prerequisites

This lab assumes you have:
* An Oracle Cloud account
* All previous labs successfully completed

## Task 1: Enable RAG

To enable the *RAG* functionality, follow these steps:

1. Navigate to the *Chat* tab from the left-side menu

2. Clear the history by pressing the **Clear** button, and select the **llama3.1** model for the initial test.
    
    ![clear-model](./images/clear-model.png)

3. Scroll down the left-side pane and check the **Enable RAG?** box. 

    ![enable-rag](./images/enable-rag.png)

4. In the **Select Alias** dropdown, choose the `TEST1` vector store table. The remaining fields in the **Vector Store** will be automatically populated, as each one represents a search parameter used to configure the selected vector store. 

    ![select-vector-store](./images/select-vector-store.png)

    In this case, selecting the alias is sufficient to retrieve the correct store. However, you also get visibility into the parameters that were used to create the chunks and their corresponding embedding vectors.

## Task 2: Ask questions with RAG enabled

Now that RAG is enabled, we can test it by asking the same questions submitted in *Lab 1*. Previously, the LLM provided generic answers, as the content was either not part of its training data or not sufficiently addressed in the questions:

```
Which kind of database you can use to run the Java Web example application?
```
```
Which Java environment should be used to run this example?
```
Using the TEST1 vector store, you will experiment with the main parameters set as shown below to observe how the quality of the answers changes.
**IMPORTANT**: Clear the history by pressing the **Clear** button after each question — even if you're repeating the same question with different parameters.

  * LLM:llama3.1
  * TopK: 4
  * Search Type: Similarity
  * Temperature: 0

```
Q: Which Java environment should be used to run this example?

A: The best Java environment for running this example is an Integrated Development Environment (IDE) like IntelliJ IDEA, which supports Java development and includes tools for debugging, testing, and deploying code. However, if you do not have access to a specific IDE, or need another option, a standard Java Development Kit (JDK) with its associated tools will work. But, specifically for this example, it's recommended to use Oracle JDK, as the guide uses Oracle-specific components such as JdbcBeanImpl and relies on Oracle JDBC drivers. Here is why the correct answer cannot be directly retrieved from the documents, but still inferred: The title of the section "Web Server" implies that this guide assumes a standard web server setup. Later in the guide it mentions Maven Central to download the necessary JDBC drivers, which also supports standardizing on Oracle JDK and other commonly used Java distributions.
No specific information regarding version support or alternatives for running this sample are mentioned within the provided text. So our inference would be based off common practices of selecting a Java environment that works well with many libraries and frameworks like Maven Central, suggesting Oracle JDK as the likely Java environment to use in order to run and test the HR application correctly.
```

  * LLM: gpt-4o-mini
  * TopK: 10
  * Search Type: Similarity
  * Temperature: 0

```
Q: Which Java environment should be used to run this example?

A: Based on the text provided, it appears that you are asking about using a specific Java environment to run an example. However, I will provide a concise answer as per your SystemMessage. The Oracle JDBC Thin driver requires a JDK (Java Development Kit) or JRE (Java Runtime Environment) version 8 or later to work. Therefore, to run the HR Web application example provided in this guide, you should use:

Oracle JDK 8 or later

This is because the ojdbc8-production pulls all the required JDBC jars from the Maven Central Repository, which is compatible with Java 8 and later versions.

Please note that I've assumed your question was about the specific Java environment needed to run the example. If my interpretation is incorrect, please provide more context or clarify your question, and I'll do my best to assist you.
```

**COMMENT**: As you can see, with more chunks provided, the bot also mentions other technologies such as Oracle JDBC, the JVM, and Oracle Database.



## Learn More

*(optional - include links to docs, white papers, blogs, etc)*

* [URL text 1](http://docs.oracle.com)
* [URL text 2](http://docs.oracle.com)

## Acknowledgements
* **Author** - <Name, Title, Group>
* **Contributors** -  <Name, Group> -- optional
* **Last Updated By/Date** - <Name, Month Year>
