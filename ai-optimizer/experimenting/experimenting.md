# Experimenting with Models, Parameters and Techniques

## Introduction

*Describe the lab in one or two sentences, for example:* This lab walks you through the steps to ...

Estimated Lab Time: -- minutes

### Objectives

*List objectives for this lab using the format below*

In this lab, you will:
* Objective 1
* Objective 2
* Objective 3

### Prerequisites (Optional)

*List the prerequisites for this lab using the format below. Fill in whatever knowledge, accounts, etc. is necessary to complete the lab. Do NOT list each previous lab as a prerequisite.*

This lab assumes you have:
* An Oracle Cloud account
* All previous labs successfully completed


*This is the "fold" - below items are collapsed by default*

## Task 1: Concise Task Description

Using the TEST1 vector store, you will experiment with the main parameters set as shown below to observe how the quality of the answers changes. We will set the *Temperature* parameter to 0 in order to minimize the variabilty of the answers.

**IMPORTANT**: Clear the history by pressing the **Clear** button after each question — even if you're repeating the same question with different parameters. We will start by testing the first question.

  * LLM: llama3.1
  * TopK: 4
  * Search Type: Similarity
  * Temperature: 0

```
Q: Which Java environment should be used to run this example?

A: The best Java environment for running this example is an Integrated Development Environment (IDE) like IntelliJ IDEA, which supports Java development and includes tools for debugging, testing, and deploying code. However, if you do not have access to a specific IDE, or need another option, a standard Java Development Kit (JDK) with its associated tools will work. But, specifically for this example, it is recommended to use Oracle JDK, as the guide uses Oracle-specific components such as JdbcBeanImpl and relies on Oracle JDBC drivers. Here is why the correct answer cannot be directly retrieved from the documents, but still inferred: The title of the section "Web Server" implies that this guide assumes a standard web server setup. Later in the guide it mentions Maven Central to download the necessary JDBC drivers, which also supports standardizing on Oracle JDK and other commonly used Java distributions.
No specific information regarding version support or alternatives for running this sample are mentioned within the provided text. So our inference would be based off common practices of selecting a Java environment that works well with many libraries and frameworks like Maven Central, suggesting Oracle JDK as the likely Java environment to use in order to run and test the HR application correctly.
```

  * LLM: llama3.1
  * TopK: 10
  * Search Type: Similarity
  * Temperature: 0

```
Q: Which Java environment should be used to run this example?

A: Based on the text provided, it appears that you are asking about using a specific Java environment to run an example. However, I will provide a concise answer as per your SystemMessage. The Oracle JDBC Thin driver requires a JDK (Java Development Kit) or JRE (Java Runtime Environment) version 8 or later to work. Therefore, to run the HR Web application example provided in this guide, you should use:

Oracle JDK 8 or later

This is because the ojdbc8-production pulls all the required JDBC jars from the Maven Central Repository, which is compatible with Java 8 and later versions.

Please note that I have assumed your question was about the specific Java environment needed to run the example. If my interpretation is incorrect, please provide more context or clarify your question, and I'll do my best to assist you.
```

**COMMENT**: As you can see, with more chunks provided, the bot also mentions other technologies such as Oracle JDBC, the JVM, and Oracle Database.

Now let's move onto the second question and see the results:

  * LLM: llama3.1
  * TopK: 4
  * Search Type: Similarity
  * Temperature: 0

```
Q: Which kind of database you can use to run the Java Web example application?

A: You can use an Oracle Database to run the Java Web example application. The provided text mentions that "Oracle Database is a relational database that you can use to store, modify and use data" and also includes the components required for development such as Oracle Database, J2SE or JDK, Apache Maven, IntelliJ, and Apache Tomcat. More specifically, it notes that "To develop the Java web application, you need a working installation of Oracle Database along with the HR schema." Therefore, based on this information, an Oracle Database is suitable for running the HR Web application example mentioned in the text.
```
  * LLM: llama3.1
  * TopK: 10
  * Search Type: Similarity
  * Temperature: 0

```
Q: Which kind of database you can use to run the Java Web example application?

A: According to the provided text, you can use an "Oracle Autonomous Database" or the "Oracle Database Cloud Services" which offers access to Oracle Cloud Free Tier that provides two autonomous databases for unlimited time. 

More specifically:

Option 1: Oracle Autonomous Database
Option 2: Oracle Database Cloud Services (Cloud Free Tier) with two Autonomous Databases.

You can use either of these options to run the Java Web example application.
```
**COMMENT**: In the second answer, the Oracle Cloud Free Tier is mentioned.

By conducting these few tests, we have discovered how shifting a single parameter can lead to very different answers. More specifically to this case, we can assume that using 10 chunks as the TopK value for similar vectors provides more specific results than the default value of 4.

## Task 2: Concise Task Description

1. Step 1 - tables sample

  Use tables sparingly:

  | Column 1 | Column 2 | Column 3 |
  | --- | --- | --- |
  | 1 | Some text or a link | More text  |
  | 2 |Some text or a link | More text |
  | 3 | Some text or a link | More text |

2. You can also include bulleted lists - make sure to indent 4 spaces:

    - List item 1
    - List item 2

3. Code examples

    ```
    Adding code examples
  	Indentation is important for the code example to appear inside the step
    Multiple lines of code
  	<copy>Enclose the text you want to copy in <copy></copy>.</copy>
    ```

4. Code examples that include variables

	```
  <copy>ssh -i <ssh-key-file></copy>
  ```

## Learn More

*(optional - include links to docs, white papers, blogs, etc)*

* [URL text 1](http://docs.oracle.com)
* [URL text 2](http://docs.oracle.com)

## Acknowledgements
* **Author** - Lorenzo De Marchis, Developer Evangelist, May 2025
* **Contributors** - Mark Nelson, John Lathouwers, Corrado De Bari, Jorge Ortiz Fuentes
* **Last Updated By** - Lorenzo De Marchis, May 2025
