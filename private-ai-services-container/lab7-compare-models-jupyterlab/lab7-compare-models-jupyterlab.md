# Lab 7: How to choose the right model? Compare Embedding Models in JupyterLab

## Introduction

In this lab, you compare Private AI text embedding models from a JupyterLab notebook.

Model choice is not only about picking the largest or newest model. A model should be tested with your own content and your own questions, because the best choice depends on result quality, response time, language needs, and available resources.

You will use the same short set of sample texts with each model. Then you will ask the same question and compare:
- which text each model ranks highest
- how long the embedding requests take
- which model feels like the best fit for your use case

This lab keeps the code simple. It calls the Private AI Services Container directly and does not create or change database tables.

Estimated Time: 15 minutes

### Objectives

In this lab, you will:
- List the text embedding models available in Private AI Services Container
- Select a few models to compare
- Generate fresh vectors with each model
- Compare the search result and elapsed time for each model

### Prerequisites

This lab assumes:
- You completed Labs 1-2
- JupyterLab is available
- Private AI Services Container is reachable as `http://privateai:8080`

## Task 1: Create a Notebook

1. In JupyterLab, click the **Launcher** tab.

2. Click **Python 3** under **Notebook**.

3. Rename the notebook:

    ```text
    compare-private-ai-models.ipynb
    ```

## Task 2: Check Private AI and List Models

1. Paste this code into the first notebook cell and run it:

    ```python
    <copy>import requests
    import time
    import math

    PRIVATEAI_BASE_URL = "http://privateai:8080"

    health = requests.get(f"{PRIVATEAI_BASE_URL}/health", timeout=20)
    print("Health status:", health.status_code)
    health.raise_for_status()

    models_response = requests.get(f"{PRIVATEAI_BASE_URL}/v1/models", timeout=20)
    models_response.raise_for_status()
    models = models_response.json().get("data", [])

    text_models = []
    for model in models:
        model_id = model.get("id")
        capabilities = [c.upper() for c in model.get("modelCapabilities", [])]
        if model_id and "TEXT_EMBEDDINGS" in capabilities:
            text_models.append(model_id)

    print("Text embedding models:")
    for model_id in text_models:
        print("-", model_id)</copy>
    ```

2. Confirm that the output shows at least one text embedding model.

    Good models to compare include:
    - `all-minilm-l12-v2`
    - `all-mpnet-base-v2`
    - `multilingual-e5-base`
    - `multilingual-e5-large`

## Task 3: Choose Models to Compare

1. Paste this code into the next notebook cell and run it:

    ```python
    <copy>preferred_models = [
        "all-minilm-l12-v2",
        "all-mpnet-base-v2",
        "multilingual-e5-base",
    ]

    compare_models = [m for m in preferred_models if m in text_models]

    if not compare_models:
        compare_models = text_models[:3]

    if not compare_models:
        raise RuntimeError("No text embedding models were found in /v1/models.")

    print("Models selected for this test:")
    for model_id in compare_models:
        print("-", model_id)</copy>
    ```

2. If you want to compare different models, edit the `preferred_models` list and run the cell again.

## Task 4: Prepare Simple Test Data

1. Paste this code into the next notebook cell and run it:

    ```python
    <copy>documents = [
        "Oracle AI Database stores vectors and runs similarity search in SQL.",
        "Private AI Services Container serves embedding models inside your environment.",
        "JupyterLab notebooks are useful for quick experiments and model testing.",
        "ORDS can publish database logic through REST APIs.",
        "Image search can use CLIP models to compare text queries with image vectors.",
    ]

    query = "How can I test embedding models in a notebook?"

    print("Query:")
    print(query)</copy>
    ```

2. You can change the `query` text later and rerun the comparison.

## Task 5: Compare Results

1. Paste this code into the next notebook cell and run it:

    This cell defines two small helper functions and then runs the same test for each selected model. You do not need to edit the code.

    ```python
    <copy>def embed(model_id, inputs):
        started = time.perf_counter()
        response = requests.post(
            f"{PRIVATEAI_BASE_URL}/v1/embeddings",
            json={"model": model_id, "input": inputs},
            timeout=120,
        )
        elapsed = time.perf_counter() - started
        response.raise_for_status()
        vectors = [item["embedding"] for item in response.json()["data"]]
        return vectors, elapsed


    def cosine_similarity(a, b):
        dot = sum(x * y for x, y in zip(a, b))
        size_a = math.sqrt(sum(x * x for x in a))
        size_b = math.sqrt(sum(y * y for y in b))
        return dot / (size_a * size_b)


    for model_id in compare_models:
        document_vectors, document_time = embed(model_id, documents)
        query_vector, query_time = embed(model_id, [query])
        query_vector = query_vector[0]

        scores = []
        for document, vector in zip(documents, document_vectors):
            scores.append((cosine_similarity(query_vector, vector), document))

        best_score, best_document = sorted(scores, reverse=True)[0]

        print()
        print("Model:", model_id)
        print("Best match:", best_document)
        print("Similarity:", round(best_score, 4))
        print("Embedding time:", round(document_time + query_time, 3), "seconds")</copy>
    ```

2. Review the output for each model.

    Focus on:
    - whether the best match makes sense for the query
    - whether the similarity score is higher or lower
    - whether the embedding time is acceptable

## Task 6: Try Your Own Query

1. Change the `query` value from Task 4. For example:

    ```python
    <copy>query = "Which option helps me expose search as a REST API?"</copy>
    ```

2. Run Task 5 again.

3. Try another query:

    ```python
    <copy>query = "How do I search images with natural language?"</copy>
    ```

4. Run Task 5 again.

## Task 7: Decide Which Model Fits Best

Use this simple guide:

| What You Need | What to Look For |
| --- | --- |
| Fast experiments | Lower embedding time |
| Better English semantic search | Better matches for your English test queries |
| Multilingual search | Better matches when your test queries or documents use more than one language |
| Small resource footprint | Smaller or faster models from `/v1/models` |
{: title="Model Guide"}

For many first tests, start with `all-minilm-l12-v2`. Move to a larger model when the smaller model is fast but does not return the matches you expect.

## Conclusion

In this lab, you compared embedding models by running the same query and documents through each model.

When you review the results, remember these points:
- A higher similarity score means a stronger match inside the same model.
- Similarity scores are most useful for ranking results returned by one model.
- Do not choose a model only because its raw similarity number is higher than another model. Different models can produce scores on different scales.
- If several models return the same best match, the faster model is often the better first choice.
- If a slower model returns better matches for your real queries, the extra time may be worth it.

Use the comparison as a practical test. The best model is the one that returns the results a user expects, with acceptable response time, for the real content you plan to search.

## Acknowledgements
- **Author** - Oracle LiveLabs Team
- **Last Updated By/Date** - Oracle LiveLabs Team, April 2026
