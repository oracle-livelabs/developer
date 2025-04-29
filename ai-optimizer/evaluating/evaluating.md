# Evaluating Performance

We are confident that changing some parameters the quality and accuracy of the answers improve. But are we sure that on a large scale deployment a specific setup can be reliable on hundreds or thousands of different questions?

In this lab you will discover the *Testbed* feature. The Testbed helps you to test your chatbot massively, by generating a Q&A test dataset and automatically try against your current configuration. 

## Task 1: Navigate to the Testbed tab

Access the *Testbed* from the left side menu:

![testbed](./images/testbed.png)

As a first step, you can either upload a pre-existing Q&A test set (either from a local file or from a stored collection inside the database) or generate a new one from a local PDF file.

## Task 2: Generate a Q&A Test dataset

The Optimizer allows to generate as many questions and answer you desire, based on a single document, that it's part of the knowledge base you have stored as vector store with their own embeddings. You can enable test dataset generation by selecting the corresponding radio button:

![generate](./images/generatenew.png)

1. Upload a document 
    
    Upload the same document that was used to create the vector store. You can easily download it from [this link](https://docs.oracle.com/en/database/oracle/oracle-database/23/tdpjd/get-started-java-development.pdf).

2. Increase the number of questions to be generated to 10 or more 
    
    Keep in mind that the process it's quite long, especially if you are willing to use a local LLM without enough hardware capacity. In case you choose to use an OpenAI remote model, the process will be affected less by the number of Q&As to be generated.

3. Leave the default option for:
    * Q&A Language Model: **gpt-4o-mini**
    * Q&A Embedding Model: **text-embedding-3-small**

4. Click on **Generate Q&A** button and wait until the process is over:

    ![patience](./images/patience.png)

5. Browse the questions and answers generated:

    ![qa_browse](./images/qa_browse.png)

    Note that the **Question** and the **Answer** fields are editable, allowing you to modify the proposed Q&A pairs based on the **Context** (which is randomly extracted and not editable) as well as the **Metadata** set by the Testbed engine. In the *Metadata* field you'll find a **topic** tag that classifies each Q&A pair. 
    
    The topic list is generated automatically by analyzing the text and is assigned to each Q&A. It will be used in the final report to break down the **Overall Correctness Score** and identify areas where the chatbot lacks precision.

    The **Download** button allows you to export and edit the generated Q&A dataset. You can open it in VS Code to review its content.

    ![qa_json](./images/qa_json.png)

6. Update the **Test Set Name** 
    
    Replace the automatically generated default name to make it easier to identify the test dataset later when running repeated tests on different chatbot configurations. For example, change it from:

    ![default_test_set](./images/default_test_set.png)

    change it in :

      ![test_rename](./images/test_rename.png)


## Task 3: Evaluate the Q&A Testset

* On the left pane menu:

  * Under **Language Model Parameters**, select in the **Chat model** dropdown list **gpt-4o-mini**
  * **Enable RAG?** if for any reason hasn't been selected
  * Choose in the **Select Alias** dropdown list the **TEST2** value.
  * Leave unchanged the default parameters on the left pane.

* Leaving the default one model to judge, **gpt-4o-mini**, click on **Start Evaluation** button and wait a few seconds. All the questions will be submitted to the chatbot as configured in the left pane:

  ![start_eval](./images/start_eval.png)

* Let's examine the result report, starting from the first part:

  ![result](./images/result_topic.png)

It shows:
  * The chatbot's **Evaluation Settings** as it has been configured in the left side playground, before start the massive test
  * The **RAG Settings** for the Database and the relative Vector Store selected, with the name of the embedding **model** used and all the parameters set, from **chunk_size**, to the **top_k**.
  * The **Overall Correctness Score** that represents the percentage between the total number of questions submitted and the answers considered correct by the LLM used to judge the response compared the reference answer.
  * The **Correctness By Topic**: each question in the test dataset comes with a tag that represents the topic it belongs to. The list of topics it's extracted automatically at the creation step of the Q&A synthetic dataset. 

The second part of the report provides details about each single questions submitted, with a focus on the collection by **Failures** and the **Full Report** list. To show all the fields, scrool from the right to left to see all info. In the following picture the second frame has been scrolled:

  ![result](./images/result_question.png)

  * **question**: question submitted
  * **reference_asnwer**: represents the anwers that is considered correct an we aspect quite similar to the answer will be provided by the agent
  * **reference_context**: the section of document extracted and used to create the Q&A
  * **agent_answer**: the answer provided by the chatbot with the current configuration and knowledge base as vectorstore
  * **correctness_reason**: it reports eventually why has been judged not correct. If the answer 
  has been considered right you'll see **None** as value.

* You can get a copy of the results as an HTML page reporting the *Overall Correctness Score* and *Correctness By Topic* only, cliccking on the **Download Report** button. Click it to view how is the report. 

* You can also dowload the **Full Report** and **Failures** list as a *.csv* file selecting each frame as shown in the following snapshot:

  ![csv](./images/download_csv.png)

* Now let's test through an external saved test datset, that you can download [here](https://raw.githubusercontent.com/oracle-samples/ai-explorer/refs/heads/cdb/docs/hol/artifacts/getting_started-30_testset.json) with 30 questions already generated. If you want to drop some Q&A that are not meaningful in your opinion, update it, save and reload as local file, following the steps shown in this snapshot:

  ![load_tests](./images/load_tests.png)

* Now redo the test to get the **Overall Correctness Score** with much more Q&A pairs.

* Let's change the Chat model parameters, setting to **0** the Model **Temperature** in the left pane, section **Language Model Parameters**. Why? The Q&As generated are usually done with a low level of creativity to be less random in the content and express the core concepts avoiding "frills". So, repeat the test to check if there are any improvements in the **Overall Correctness Score**. 

* To compare with previous results, click on dropdown list unde **Previous Evaluations for...** and click on **View** button to show the overall report.

  ![previous](./images/previous.png)

* Repeat the tests as many time you desire changing: **Vector Store**, **Search Type** and **Top K** to execute the same kind of tuning you have done at the previous steps with just a few interactive questions, now on a massive test on curated and comparable assets.