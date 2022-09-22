<h1>Introduction</h1>

While using natural language processing within a chatbot allows for more natural interaction with an end user, it can sometimes be difficult to fully replicate the ability of a live agent to both visualize the real-world object being discussed as well as respond to the user's reactions during the discussion. We investigate how integrating various Oracle Cloud Infrastructure (OCI) AI services can help drive the nature of the conversation. Experiment with enhancing Oracle Digital Assistant so the chatbot can recognize physical objects being discussed and react to user sentiment in conversation._

## Before you Begin
In this tutorial, you're going to build out a partially built “Pizza skill, to bring in an “order pizza” process as well as introducing the use of the OCI AI services to expand on the native Natureal Language Processing (NLP) capabilities of the Oracle Digital Assistant. functionality that will flow to an existing skill that already has a completed cancel order flow.

### Background
Oracle Digital Assistant is an environment for building _digital assistants_, which are user interfaces driven by artificial intelligence (AI) that help users accomplish a variety of tasks in natural language conversations. Digital assistants consist of one or more _skills_, which are individual chatbots that are focused on specific types of tasks.

In this lab, you will create a skill that can be used for interactions with a pizzeria, including ordering pizzas and canceling orders. As part of this process, you will:
 - Define intents, utterances, entities.
 - Design a conversation flow.
 - Validate, debug and test your skill.

### What Do You Need?
 - Access to the OCI Console  - As used to provision the instance of the Oracle Digital Assistant.

**Note:** If you are using an Oracle hosted ODA instance for this tutorial, the required OCI service permissions as described in LAB 1 below have been already defined and you could skip that section.  If you are using your own OCI environment (such as a Trial instance) please perform the steps in LAB 1 prior to building out your Digital Assistant.

 - The starter skill, **AIServiceStarterSkill.zip**, which is included with this tutorial. [Download this file to your local system](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-skill/files/PizzaKing_Complete(1.0).zip) for your reference.
 
 - Access to Oracle Digital Assistant Version 22.06 or higher
		



## Acknowledgements

* **Author** - Barry Hiern, Daniel Teixeira
* **Last Updated By/Date** - Daniel Teixeira, October 2022