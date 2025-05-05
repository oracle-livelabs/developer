# Get started - Installation and Setup

## Introduction

The AI Optimizer is available to install in your own environment, which may be a developer’s desktop, on-premises data center environment, or a cloud provider. It can be run either on bare-metal, within a container, or in a Kubernetes Cluster.

This walkthrough will guide you through a basic installation of the Oracle AI Optimizer and Toolkit (the AI Optimizer). It will allow you to experiment with GenAI, using Retrieval-Augmented Generation (RAG) with Oracle Database 23ai at the core.

You will run four container images to establish the “Infrastructure”:

* On-Premises LLM - llama3.1
* On-Premises Embedding Model - mxbai-embed-large
* Vector Storage - Oracle Database 23ai Free
* The AI Optimizer

Estimated Time: 5 minutes

### Objectives

* Perform a full on-premise installation of the **Oracle AI Optimizer and Toolkit**

### Prerequisites

This lab assumes you have:

* An Integrated Development Editor (like Visual Studio Code)
* Python 3.11 (for running Bare-Metal)
* Container Runtime e.g. docker/podman (for running in a Container)
* Internet Access (docker.io and container-registry.oracle.com)
* 100G of free disk space.
* 12G of usable memory.
* Sufficient GPU/CPU resources to run the LLM, embedding model, and database

## Task 1:  LLM - llama3.1

o enable the _ChatBot_ functionality, access to a **LLM** is required. The walkthrough will use [Ollama](https://ollama.com/) to run the _llama3.1_ **LLM**.

1. Start the *Ollama* container:

   The Container Runtime is native:

   ```bash
   podman run -d --gpus=all -v ollama:$HOME/.ollama -p 11434:11434 --name ollama docker.io/ollama/ollama
   ```
   {{% /tab %}}
   {{% tab title="MacOS (Silicon)" %}}
   The Container Runtime is backed by a virtual machine.  The VM should be started with **12G memory** and **100G disk space** allocated.

   ```bash
   podman run -d -e OLLAMA_NUM_PARALLEL=1 -v ollama:$HOME/.ollama -p 11434:11434 --name ollama docker.io/ollama/ollama
   ```

   **Note:**
   AI Runners like Ollama, LM Studio, etc. will not utilize Apple Silicon's "Metal" GPU when running in a container. This may change as the landscape evolves.

   You can install and run Ollama natively outside a container and it will take advantage of the "Metal" GPU.  Later in the Walkthrough, when configuring the models, the API URL for the Ollama model will be your hosts IP address.

   {{% /tab %}}
   {{% tab title="Windows" %}}
   The Container Runtime is backed by a virtual machine.  The VM should be started with **12G memory** and **100G disk space** allocated.

   ```bash
   podman run -d --gpus=all -v ollama:$HOME/.ollama -p 11434:11434 --name ollama docker.io/ollama/ollama
   ```

   **Note:**
   AI Runners like Ollama, LM Studio, etc. will not utilize non-NVIDIA GPUs when running in a container. This may change as the landscape evolves.

   You can install and run Ollama natively outside a container and it will take advantage of non-NVIDIA GPU.  Later in the Walkthrough, when configuring the models, the API URL for the Ollama model will be your hosts IP address.
   {{% /tab %}}
   {{< /tabs >}}

2. Pull the **LLM** into the container:

   ```bash
   podman exec -it ollama ollama pull llama3.1
   ```

3. Test the **LLM**:

   {{% notice style="code" title="Performance: Fail Fast..." icon="circle-info" %}}
   Unfortunately, if the below `curl` does not respond within 5-10 minutes, the rest of the walkthrough will be unbearable.
   If this is the case, please consider using different hardware.
   {{% /notice %}}

   ```bash
   curl http://127.0.0.1:11434/api/generate -d '{
   "model": "llama3.1",
   "prompt": "Why is the sky blue?",
   "stream": false
   }'
   ```

## Acknowledgements
- **Created By/Date** - Kay Malcolm, Database Product Management, March 2020
- **Contributors** - John Peach, Kamryn Vinson, Rene Fontcha, Madhusudhan Rao, Arabella Yao
- **Last Updated By** - Ramona Magadan, February 2025