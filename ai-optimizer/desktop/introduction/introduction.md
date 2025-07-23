# Introduction

## About this Workshop

The **Oracle AI Optimizer and Toolkit** (the **AI Optimizer**) provides a streamlined environment where developers and data scientists can explore the potential of Generative Artificial Intelligence (**GenAI**) combined with Retrieval-Augmented Generation (**RAG**) capabilities. By integrating Oracle Database AI Vector Search, the AI Optimizer enables users to enhance existing Large Language Models (**LLMs**) through RAG. This method significantly improves the performance and accuracy of AI models, helping to avoid common issues such as knowledge cutoff and hallucinations.

* **GenAI**: Powers the generation of text, images, or other data based on prompts using pre-trained LLMs.
* **RAG**: Enhances LLMs by retrieving relevant, real-time information allowing models to provide up-to-date and accurate responses.
* **Vector Database**: A database, including Oracle Database 23ai, that can natively store and manage vector embeddings and handle the unstructured data they describe, such as documents, images, video, or audio.

Estimated Time: 120 minutes

### Objectives

In this workshop, you will learn how to:

* Install the **Oracle AI Optimizer and Toolkit** (the **AI Optimizer**)
* Explore the AI Optimizer environment
* Embed documents in a vector format within **Oracle Database 23ai**
* Use Retrieval Augmented Generation (**RAG**) techniques
* Experiment with different models, parameters and techniques
* Evaluate model performances with the *Testbed* functionality
* Export a RAG-based *Springboot* Microservice
* Use the AI Optimizer as an API Server

### Prerequisites

This lab assumes you have:

* An **Oracle Database 23ai** up and running (see ["Get Started"](https://markxnelson.github.io/developer/ai-optimizer/workshops/desktop/index.html?lab=get-started) to get one) 
* An Integrated Development Editor (like Visual Studio Code)
* Python 3.11 (for running Bare-Metal)
* Container Runtime e.g. docker/podman (for running in a Container)
* Access to an Embedding and Chat Model:
  * On-Premises Models
  * (optional) API Keys for Third-Party Models (e.g., OpenAI API Keys that you can get [here](https://platform.openai.com/settings/organization/api-keys))

## Acknowledgements

* **Author** - Lorenzo De Marchis, Developer Evangelist, May 2025
* **Contributors** - Mark Nelson, John Lathouwers, Corrado De Bari, Jorge Ortiz Fuentes, Andy Tael
* **Last Updated By** - Lorenzo De Marchis, May 2025
