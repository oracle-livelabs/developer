<h1>Introduction</h1>

Even though natural language processing (NLP) enables a skill to perform naturalistic interactions with its users, it can't fully replicate how a live agent visualizes an actual object and reacts accordingly to customer inquiries and complaints. In these labs, you'll learn how you can build a skill that can also react to customer sentiment and recognize physical objects though the help of various Oracle Cloud Infrastructure (OCI) AI services.

Estimated Time: 90 minutes

## Before you Begin
In these labs, you'll build out a Pizza skill and integrate it with Oracle Cloud Infrastructure (OCI) AI services.

### Background
Oracle Digital Assistant is an environment for building _digital assistants_, which are user interfaces driven by artificial intelligence (AI) that help users accomplish a variety of tasks in natural language conversations. Digital assistants consist of one or more _skills_, which are individual chatbots that are focused on specific types of tasks.

In this lab, you will create a skill that can be used for interactions with a pizzeria, including ordering pizzas and canceling orders. As part of this process, you will:
 - Define intents, utterances, entities.
 - Design a conversation flow.
 - Validate, debug and test your skill.

### What Do You Need?
Access to the  Oracle Cloud Infrastructure (OCI) console, which is used to provision the Oracle Digital Assistant instance.

***Note:*** If you are using an Oracle-hosted Digital Assistant instance for this tutorial, the OCI service permissions that are described in Lab 1 have been already defined, so you can skip Lab 1. However, if you're using your own OCI environment (such as a trial instance) you must complete Lab 1 or else you won't be able complete Labs 4, 5, and 6.

 - The starter skill, **HOL4303StarterSkillv11(1.1).zip**, which is included with this tutorial. [Download this file to your local system](https://objectstorage.eu-amsterdam-1.oraclecloud.com/n/idppdqf7rmfq/b/HOL/o/HOL4303StarterSkillv11(1.1).zip) for your reference.
 
 - Access to Oracle Digital Assistant Version 22.06 or higher
		



## Acknowledgements

* **Author** - John Basset, Barry Hiern, Daniel Teixeira
* **Contributor** - Anshuman Panda
* **Last Updated By/Date** - Daniel Teixeira, October 2022