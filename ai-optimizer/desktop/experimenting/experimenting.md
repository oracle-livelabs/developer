# Experimenting with Models, Parameters and Techniques

## Introduction

In this lab, we will experiment with different configurations, adjusting parameters and using various LLMs to observe how the answers vary.

> **NOTE**: The answers received by any LLM are based on probabilistic models. Therefore, the answer received in your own testing might differ from the ones shown in this documentation.

Estimated Lab Time: 15 minutes

### Objectives

In this lab, you will:

* Test different parameter configurations and compare the resulting answers
* Apply various distance metrics to the same set of questions and evaluate how the answers differ
* Experiment with different vector stores and compare the answers

### Prerequisites

This lab assumes you have:

* All previous labs successfully completed

## Task 1: Play with the Parameters

Using the **TEST1** vector store, you will experiment with the main parameters configured as shown below to observe how answer quality changes. We will begin by adjusting the **Temperature** parameter. For the first test, set the Temperature to 0 to minimize creativity in the responses. Then, repeat the same question with a different Temperature value to observe how the answers change.

**IMPORTANT**: After each question—regardless of whether you're repeating the same one with different settings—be sure to clear the history by clicking the **Clear** button. We will start by testing the first question.

* LLM: llama3.1
* TopK: 4
* Search Type: Similarity
* Temperature: 0
* Vector Store: TEST1

```text
Q: In Oracle Database 23ai, how do I determine the accuracy of my vector indexes?

A: The user wants to determine the accuracy of their vector indexes in Oracle Database 23c. According to the provided documentation, there are several ways to achieve this:
1. Use the DBMS_VECTOR.INDEX_ACCURACY_QUERY procedure: This procedure provides an accuracy report for a top-K index search for a specific query vector and a specific target accuracy.
2. Use the DBMS_VECTOR.INDEX_ACCURACY_REPORT function: This function captures accuracy values achieved by approximate searches using a particular vector index for a certain period of time.
3. Use the INDEX_VECTOR_MEMORY_ADVISOR procedure to determine the vector memory size.
Here is an excerpt from the documentation:
To verify the accuracy of a vector index, you can use the DBMS_VECTOR.INDEX_ACCURACY_QUERY function. This function takes four parameters: OWNER_NAME, INDEX_NAME, QV (query vector), and TOP_K (top K results).
The user can also refer to the Oracle Database AI Vector Search User's Guide for more information on determining the accuracy of their vector indexes.
Document references:
* DBMS_VECTOR.INDEX_ACCURACY_QUERY procedure in the provided text
* DBMS_VECTOR.INDEX_ACCURACY_REPORT function in the provided text
* INDEX_VECTOR_MEMORY_ADVISOR procedure in the provided text
```

* LLM: llama3.1
* TopK: 4
* Search Type: Similarity
* Temperature: 1
* Vector Store: TEST1

```text
Q: In Oracle Database 23ai, how do I determine the accuracy of my vector indexes?

A: To determine the accuracy of your vector indexes in Oracle Database 23c AI, you can use the DBMS_VECTOR.INDEX_ACCURACY_QUERY procedure.
According to the provided documentation, this procedure provides an accuracy report for a top-K index search for a specific query vector and a specific target accuracy
Here's how you can do it:
Declare the necessary variables:

declare
    q_v VECTOR; 
    report varchar2(128);

Initialize the query vector q_v with the desired vector (in this case, [0,1,1,0,0]):

q_v := to_vector('[0,1,1,0,0]');

Execute the DBMS_VECTOR.INDEX_ACCURACY_QUERY procedure:

exec DBMS_VECTOR.INDEX_ACCURACY_QUERY('OWNER_NAME', 'INDEX_NAME', q_v, TOP_K, target_accuracy);

Replace 'OWNER_NAME', 'INDEX_NAME', TOP_K, and target_accuracy with your actual values.
This will provide you with an accuracy report for the specified vector index.
Additionally, you can use the DBMS_VECTOR.INDEX_ACCURACY_REPORT function to capture accuracy values achieved by approximate searches using a particular vector index for a certain period of time.
```

**COMMENT**: As you can see, setting the Temperature to 1 increases the variability of the output, often resulting in an answer that differs significantly from the previous one.

We will now experiment with the **TopK** parameter, while keeping Temperature fixed at 0 to minimize output variability.

**IMPORTANT**: After each question—regardless of whether you're repeating the same one with different settings—be sure to clear the history by clicking the **Clear** button.

Let's move onto a different question and see the results:

* LLM: llama3.1
* TopK: 4
* Search Type: Similarity
* Temperature: 0
* Vector Store: TEST1

```text
Q: In Oracle Database 23ai, how do I convert string text to embeddings using PL/SQL?

A: To generate a vector embedding from an input text string in Oracle Database 23c, you can use the UTL_TO_EMBEDDING PL/SQL function. This function is designed to take a text string as input and return its equivalent vector embedding.
To convert a text string to an embedding using this function, follow these steps:
The database needs to have access to an external vector embedding model stored either internally in the database or accessed through a third-party BINARY vector embedding.
Construct your query such that it makes a call on UTL_TO_EMBEDDING. This function likely requires at least one parameter which would be the text string to convert into embeddings.
For example, if you have a table with a column named 'text' where each row contains the string for conversion:

SELECT UTL_TO_EMBEDDING(text) FROM YOUR_TABLE;

Make sure that your database setup includes the access details required for whatever vector embedding model is being referenced. Without knowing more about how UTL_TO_EMBEDDING function expects setup on such models within Oracle databases, it's not possible to offer more specifics than this.
```

* LLM: llama3.1
* TopK: 10
* Search Type: Similarity
* Temperature: 0
* Vector Store: TEST1

```text
Q: In Oracle Database 23ai, how do I convert string text to embeddings using PL/SQL?

A: To convert a string text to an embedding using PL/SQL in Oracle Database 23c (not 23ai, as there is no such version), you can use the DBMS_VECTOR package.
Here's a simple example:

DECLARE 
  input  CLOB;
  v      VECTOR;

BEGIN
  input := 'Your string here';
  SELECT dbms_vector.utl_to_embedding(input, json('{"provider":"database", "model":"doc_model"}')) INTO v FROM dual;

  DBMS_OUTPUT.PUT_LINE(DBMS_VECTOR.util_serialize(v));
END;
/
In this code:
input is the string you want to convert.
"{'provider\":\"database\", \"model\":\"doc_model\"}" is a JSON object that specifies the vectorization model (in this case, an in-database model named 'doc_model').
The DBMS_OUTPUT.PUT_LINE(DBMS_VECTOR.util_serialize(v)) statement then outputs a JSON representation of the generated embedding.
Note: Make sure you have loaded your ONNX model into Oracle Database first by using dbms_math.load_onnx_model package (which is not shown in this code snippet).
Note that there are similar methods for converting strings to binary embeddings outside the database through APIs, and it requires more parameters depending on which kind of embedding or library you use.
```

**COMMENT**: As you can see, increasing the TopK parameter prompts the LLM to retrieve a larger number of vectors from the vector database. This provides the model with more contextual information to rely on when using RAG, resulting in significantly different answers compared to the example with TopK set to 4.

## Task 2: Use a different Distance Metric

We will now observe how using a different distance metric can lead to a different answer. For this test, we will set Temperature to 0 and TopK to 4.

**IMPORTANT**: After each question—regardless of whether you're repeating the same one with different settings—be sure to clear the history by clicking the **Clear** button.

* LLM: llama3.1
* TopK: 4
* Search Type: Similarity
* Temperature: 0
* Vector Store: TEST1

```text
Q: In Oracle Database 23ai, how do I determine the accuracy of my vector indexes?

A: To determine the accuracy of your vector indexes in Oracle Database 23c (not 23ai), you can use the DBMS_VECTOR package.
According to the documentation provided, you have two options:
DBMS_VECTOR.INDEX_ACCURACY_QUERY: This function allows you to verify the accuracy of a vector index for a given query vector, top-K, and target accuracy. You can call this function by passing in the OWNER_NAME, INDEX_NAME, QV (query vector), TOP_K (top K results), and TARGET_ACCURACY as parameters.
DBMS_VECTOR.INDEX_ACCURACY_REPORT: This function captures the accuracy values achieved by approximate searches using a particular vector index for a certain period of time.
Here's an example code snippet that demonstrates how to use DBMS_VECTOR.INDEX_ACCURACY_QUERY:

DECLARE 
    q_v VECTOR; 
    report CLOB;

BEGIN
    q_v := TO_VECTOR('[0,1,1,0,0]');

    REPORT := DBMS_VECTOR.INDEX_ACCURACY_QUERY(
        OWNER_NAME => 'VECTOR_USER',
        INDEX_NAME => 'VIDX_HNSW',
        QV => q_v,
        TOP_K => 10,
        TARGET_ACCURACY => 0.8);

    DBMS_OUTPUT.PUT_LINE(report);
END;

Make sure to replace the placeholder values with your actual OWNER_NAME, INDEX_NAME, and vector values.
I hope this helps!
```

* LLM: llama3.1
* Top K: 4
* Fetch K: 20
* Degree of Diversity: 0.5
* Search Type: Maximal Marginal Relevance
* Temperature: 0
* Vector Store: TEST1

```text
Q: In Oracle Database 23ai, how do I determine the accuracy of my vector indexes?

A: To determine the accuracy of your vector indexes in Oracle Database 23c (note: not 23ai), you can use the DBMS_VECTOR.INDEX_ACCURACY_QUERY procedure.
According to the provided documentation and example usage, you need to:
Declare a query vector (q_v) using the TO_VECTOR function.
Call the INDEX_ACCURACY_QUERY procedure with q_v as a parameter, along with other optional parameters as needed (e.g., target accuracy).
Here's an adapted code snippet from the example usage:

DECLARE
    q_v            VECTOR;
    report        VARCHAR2(128);

BEGIN
    q_v := to_vector('[0,1,1,0,0]');

    -- Set other parameters as needed, e.g., target accuracy
    REPORT := DBMS_VECTOR.INDEX_ACCURACY_QUERY(q_v, <target_accuracy>);
END;
/
This will provide an accuracy report for the specified query vector and target accuracy.
Alternatively, you can use the TOVECTOR function to insert vector data into your application.
```

**COMMENT**: In this case, even though the MMR retrieves 20 chunks and removes results that differ by less than 50% in diversity, ultimately providing 4 top-K results that should offer more varied information, the results are better than with a plain similarity search using top-K = 4. This approach can, for example, increase efficiency in production, as it directly provides the 4 top-K chunks, rather than adding an extra step in the execution process that involves computing and fetching the 4 most diverse chunks from the 20 top-K results retrieved.

## (Optional) Task 3: Compare two different vector stores

> **NOTE**: You can perform this task only if you have access to [OpenAI APIs](https://platform.openai.com/settings/organization/api-keys).

We can also explore how different combinations of **LLMs** and vector stores can produce markedly different answers. To test this, we’ll experiment with various pairings—and introduce a completely new question, purely for exploration purposes.

**IMPORTANT**: After each question—regardless of whether you're repeating the same one with different settings—be sure to clear the history by clicking the **Clear** button.

* LLM: llama3.1
* TopK: 4
* Search Type: Similarity
* Temperature: 0
* Vector Store: TEST1

```text
Q: In Oracle Database 23ai, how do I create a vector column?

A: To create a vector column in Oracle Database 23c1, you can use the VECTOR data type. The syntax to declare a vector column is as follows:

CREATE TABLE table_name (
    id NUMBER,
    embedding VECTOR
);

You don't need to specify the number of dimensions or their format initially. This allows you to enter vectors of different dimensions with various formats. You can use the TO_VECTOR function with specific dimensions and format if needed, as shown in a note in your passage.
Here is an example SQL statement that creates a vector column without specifying dimensions and format (simplified):

CREATE TABLE my_vectors (
    id NUMBER,
    embedding VECTOR
);

You can then insert data into the embedding column using either a string representation of the vector or the explicit use of the TO_VECTOR function with specific number of dimensions, format, or storage format.
```

* LLM: gpt-4o-mini
* TopK: 4
* Search Type: Similarity
* Temperature: 0
* Vector Store: TEST2

```text
Q: In Oracle Database 23ai, how do I create a vector column?

A: To create a vector column in Oracle Database 23ai, you can declare a table with a column of the VECTOR data type. Here is a simple example:

CREATE TABLE my_vectors (id NUMBER, embedding VECTOR);

In this example, the embedding column is defined as a VECTOR type. You do not need to specify the number of dimensions or their format if you want flexibility. If you want to impose constraints, you can specify them like this:

CREATE TABLE my_vectors (id NUMBER, embedding VECTOR(768, INT8));

In this case, each vector must have 768 dimensions formatted as INT8. For more detailed information, see the section on creating tables using the VECTOR data type in the documentation.
```

**COMMENT**: Although the overall content remains essentially the same, we can observe notable differences in both the syntax and structure of the answers. The OpenAI-based configuration produces a more concise and precise response, whereas the Ollama-based output is more verbose—and even contains a typo. These differences are largely due to the distinct chunking sizes used by the two vector stores.

These few examples offer just a glimpse of the cross-testing possibilities available to users. The range of parameters you can experiment with is much broader. The **AI Optimizer and Toolkit** is specifically designed to help you identify the configuration that best suits your needs.

## Learn More

* Cross-test vector stores and models. For example, you can test **llama3.1** while using the **text-embedding-3-small** vector store.
* Try setting the Temperature parameter to its maximum value—you’ll see how creative an LLM can become!
* Experiment with other available parameters across different questions to explore the full range of behavior.

## Acknowledgements

* **Author** - Lorenzo De Marchis, Developer Evangelist, May 2025
* **Contributors** - Mark Nelson, John Lathouwers, Corrado De Bari, Jorge Ortiz Fuentes, Andy Tael
* **Last Updated By** - Lorenzo De Marchis, May 2025
