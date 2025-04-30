# (Optional) Generating Microservice Code

## Introduction

The AI Optimizer allows you to export the configured chatbot as a ready-to-run microservice built using Java, Spring Boot and the Spring AI framework. This microservice runs independently from the AI Optimizer, relying solely on the created vector store table and the selected LLM servers. 

In the current release, only fully self-contained Ollama configurations (embedding + chat model) or OpenAI-based configurations are supported.

### Objectives

In this lab, you will:
* Export a RAG configuration as *SpringAI* microservice
* Start the Springboot microservice
* Test the RAG-based microservice

### Prerequisites 

To run the microservice exported you need:
  * JDK 21.x 
  * Apache Maven 3.8.x
  * curl command

## Task 1: Export the SpringAI Microservice (Ollama version)

* First, navigate to the *Chat* tab, select **llama3.1** as the **Chat model** and choose **TEST1** as the vector store alias:

   ![select-test1](./images/select-test1.png)

   This configuration will use the Ollama LLM server provider for both the embedding model and the chat model.

* Now navigate to the *Settings* tab from the left side menu. Here, you should find the *Download SpringAI* button available.

   If you see a message like this:

  ![notollama](./images/diff-llm-springai.png)

   don't worry — simply select **llama3.1** as the Chat model, and the button will appear.

* Click the `Download SpringAI` button to export the Ollama-based microservice:
   
   ![download-springai](./images/download-springai.png)


## Task 2: Start the SpringAI microservice 

If you have completed *Task 1* from this lab, you should have downloaded a *spring_ai.zip* file. Follow these steps to start it:

* Unzip the file in a subdirectory

* Open a terminal window, navigate to the subdirectory, and set executable permissions on `start.sh` using the command: `chmod 755 ./start.sh`.

* Now start the microservice with:

   ```
   ./start.sh
   ```
   If the Spring Boot application starts successfully, you should see something like this in your terminal logs

   ![microservice-started](./images/microservice-started.png)

Now you are all set for testing the microservice!

## Task 3: Test the Microservice

The microservice you just started exposes a web service that accepts HTTP GET requests at:

  * `http://localhost:8080/v1/chat/completions` — to use RAG via the OpenAI-compatible REST API.
  * `http://localhost:8080/v1/service/llm` — to chat directly with the underlying LLM.
  * `http://localhost:8080/v1/service/search/`— to search for documents similar to the message provided.

To test it, run a curl command like this in a new terminal:

  ```
  curl -X POST "localhost:8080/v1/chat/completions" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your_api_key" \
     -d '{"message": "Can I use any kind of development environment to run the example?"}'  
  ```

The response using RAG with the TEST1 vector store will look like this:

  ``` 
  {
    "choices": [
      {
        "message": {
          "content": "Yes, you can use any kind of development environment to run the example, but for ease of development, the guide specifically mentions using an integrated development environment (IDE). It uses IntelliJ IDEA Community version as an example for creating and updating the files for the application (see Document 96EECD7484D3B56C). However, you are not limited to this IDE and can choose any development environment that suits your needs."
        }
      }
    ]
  }
  ```
You can see how the microservice retrieves relevant context from the vector store, producing an answer similar to the one previously obtained using the RAG functionality within the AI Optimizer.

You can also send a curl request without leveraging RAG:

```
  curl --get --data-urlencode 'message=Can I use any kind of development environment to run the example?' localhost:8080/v1/service/llm 
  ```

     and it will produce an ungrounded answer like this:

  ```
  {
    "completion": "Yes, you can use various development environments to run examples, depending on the programming language and the specific example you are working with. Here are some common options:\n\n1. **Integrated Development Environments (IDEs)**:\n   - **Visual Studio Code**: A versatile code editor that supports many languages through extensions.\n   - **PyCharm**: Great for Python development.\n   - **Eclipse**: Commonly used for Java development.\n   - **IntelliJ IDEA**: Another popular choice for Java and other languages.\n   - **Xcode**: For macOS and iOS development (Swift, Objective-C).\n\n2. **Text Editors**:\n   - **Sublime Text**: A lightweight text editor with support for many languages.\n   - **Atom**: A hackable text editor for the 21st century.\n   - **Notepad++**: A free source code editor for Windows.\n\n3. **Command Line Interfaces**:\n   - You can run"
  }
  ```
You can see that the answer is very generic compared to the RAG-enhanced one.

## Task 4 (optional): Execute the OpenAI variant

Proceed as in the previous step, selecting **TEST2** as the vector store alias and **gpt-4o-mini** as the **Chat model**. In the terminal where you run the Spring Boot microservice, make sure that your **OPENAI_API_KEY** is correctly set as environment variable. 
