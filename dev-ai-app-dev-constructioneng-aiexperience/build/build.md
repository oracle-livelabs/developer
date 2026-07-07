# Step by step: Implement RAG with Oracle AI Database

## Introduction

In this lab, you build a construction procurement engine with Oracle AI Database and OCI Generative AI. Connect to the database, explore the sample procurement data, and invoke a large language model to generate supplier recommendations and risk explanations. Building on earlier exercises, you’ll apply Python to deliver a fully integrated, AI-powered construction procurement application.

This lab uses some of the basic coding samples you created in lab 3, such as `cursor.execute` and more.

Estimated Time: 30 minutes

### Objectives

* Build the complete construction procurement application as seen in lab 1
* Use OCI Generative AI to generate contextual procurement recommendations
* Use Python to connect to an Oracle AI Database instance and run queries
* Explore procurement data and extract relevant information

### Prerequisites

This lab assumes you have:

* An Oracle Cloud account
* Completed lab 1: Run the demo

## Task 1: Login to JupyterLab

1. To navigate to the development environment, click **View Login Info**. Copy the Development IDE Login Password. Click the Start Development IDE link.

    ![Open Development Environment](./images/dev-env.png =50%x*)

2. Paste in the Development IDE Login Password that you copied in the previous step. Click **Login**.

    ![Login](./images/jupyter-login.png " ")

3. Click the blue `+`. This will open the Launcher.

    ![Open Launcher](./images/launcher.png " ")

## Task 2: Get familiar with the development environment

1. Review the different elements in JupyterLab:

    **File browser (1):** The file browser organizes and manages files within the JupyterLab workspace. It supports drag-and-drop file uploads, file creation, renaming, and deletion. Users can open notebooks, terminals, and text editors directly from the browser.

    **Launcher (2 and 3):** The launcher offers a streamlined entry point for starting new activities. Users can create Jupyter Notebooks for interactive coding with live code execution, visualizations, and rich markdown. The terminal provides direct shell access for command-line work in the same environment.

    ![JupyterLab Launcher](./images/jupyter.png " ")

## Task 3: View created tables in Jupyter Lab

1. Navigate back to your terminal window.

    ![Open Terminal](./images/terminal.png " ")

2. Navigate to `db_setup_CONSTENG_script_2.sql` under the
    `dbinit` folder. This script provisions the construction
    engineering tables, the `construction_projects_dv` JSON duality
    view, and the `CE_PROJECT_CHUNKS` table used later in the RAG flow.

    ![Tables](./images/tables.png " ")

## Task 4: Connect to Database

1. Click the **+** sign on the top left to open the Launcher.

    ![Open Launcher](./images/open-launcher.png " ")

2. Open a new notebook.

    ![Open Notebook](./images/open-notebook.png " ")

3. Copy the following code block into an empty cell in your notebook. This code block imports the `oracledb` Python driver and other libraries.

    ```python
    <copy>
    import os
    import json
    import oracledb
    import pandas as pd
    import oci
    import numpy as np
    import re
    from dotenv import load_dotenv
    from PyPDF2 import PdfReader

    load_dotenv()

    username = os.getenv("USERNAME")
    password = os.getenv("DBPASSWORD")
    dsn = os.getenv("DBCONNECTION")

    try:
        connection = oracledb.connect(user=username, password=password, dsn=dsn)
        print("Connection successful!")
    except Exception as e:
        print(f"Connection failed: {e}")

    cursor = connection.cursor()
    </copy>
    ```

4. Run the code block to connect to the database.

    ![Connect to Database](./images/lab4task1.png " ")

## Task 5: Create a function to retrieve project data from the database

You will query project data from the `construction_projects_dv` JSON
duality view, which combines `CE_PROJECTS`,
`CE_PROJECT_REQUIREMENTS`, `CE_SUPPLIER_EVALUATION`, and
`CE_SUPPLIER_RECOMMENDATION` into one JSON document. This task will:

- **Define a Function**: Create a reusable function
  `fetch_project_data` to query the database by project ID and
  extract the JSON data for one construction project.
- **Use an Example**: Fetch data for project `1001`
  (`Downtown Mixed-Use Tower`) to demonstrate the process.
- **Display the Results**: Format the retrieved data into a pandas
  DataFrame for a clear, tabular presentation, showing the project
  phase, required trade, procurement urgency, budget range, risk
  level, and current supplier evaluation.

1. Copy and paste the code below into the new notebook.

    ```python
    <copy>
    def fetch_project_data(project_id):
        cursor.execute(
            """
            SELECT data
            FROM construction_projects_dv
            WHERE JSON_VALUE(data, '$._id') = :project_id
            """,
            {"project_id": project_id}
        )
        row = cursor.fetchone()
        if not row:
            return None
        return json.loads(row[0]) if isinstance(row[0], str) else row[0]


    selected_project_id = 1001
    project_json = fetch_project_data(selected_project_id)

    if project_json:
        requirement = (project_json.get("requirements") or [{}])[0]
        evaluation = (project_json.get("supplierEvaluations") or [{}])[0]
        recommendation = evaluation.get("recommendation") or {}
        supplier = recommendation.get("supplier") or {}

        print(f"Project: {project_json.get('projectName', '')}")
        print(
            "Status:",
            evaluation.get(
                "evaluationStatus",
                project_json.get("evaluationStatus", "Pending Review")
            )
        )

        desired_fields = [
            ("Project ID", selected_project_id),
            ("Project Name", project_json.get("projectName", "")),
            ("Location", project_json.get("location", "")),
            ("Project Type", project_json.get("projectType", "")),
            ("Project Phase", project_json.get("projectPhase", "")),
            ("Required Trade", requirement.get("tradeCategory", "")),
            ("Material Need", requirement.get("materialNeed", "")),
            (
                "Procurement Urgency",
                requirement.get("procurementUrgency", "")
            ),
            ("Budget Range", requirement.get("budgetRange", "")),
            ("Risk Level", requirement.get("riskLevel", "")),
            ("Evaluation ID", evaluation.get("evaluationId", "")),
            ("Recommended Supplier", supplier.get("supplierName", "")),
            ("Supplier Fit Score", recommendation.get("fitScore", "")),
            (
                "Evaluation Status",
                evaluation.get(
                    "evaluationStatus",
                    project_json.get("evaluationStatus", "Pending Review")
                )
            )
        ]

        df_project_details = pd.DataFrame(
            {field_name: [field_value] for field_name, field_value in desired_fields}
        )
        display(df_project_details)
    else:
        print("No data found for project ID:", selected_project_id)
    </copy>
    ```

2. Click the **Run** button to see `Downtown Mixed-Use Tower`.
    The output will include a brief summary followed by a detailed
    table. If no data is found for the specified ID, a message will
    indicate this and help you debug an incorrect project ID or an
    incomplete setup script.

    ![Open Terminal](./images/lab4task3.png " ")

    If you completed Lab 1: Run the Demo earlier, this is what gets
    printed out when the construction procurement officer opens project
    `1001`.

## Task 6: Create a function to generate supplier recommendations

In a new cell, define a function `generate_supplier_recommendations`
to generate supplier recommendations.

With the project profile in place, you will use OCI Generative AI to
generate a construction-specific supplier evaluation.

Here’s what we’ll do:

- **Fetch Supplier Recommendation Records**: Retrieve the supplier
  recommendation rows already staged in `CE_SUPPLIER_RECOMMENDATION`
  and combine them with the selected project data.
- **Build a Prompt**: Construct a structured prompt that combines
  the project profile, sourcing requirements, and supplier records.
  The LLM must choose only from `APPROVE`, `REQUEST INFO`, or `DENY`.
- **Use OCI Generative AI**: Send the prompt to the
  `meta.llama-3.2-90b-vision-instruct` model via OCI’s inference
  client.
- **Format the Output**: Display the recommendation using the same
  supplier-evaluation sections used in the Seer Construction app.

1. Copy and paste the code in a new cell:

    ```python
    <copy>
    cursor.execute(
        """
        SELECT
            eval.EVALUATION_ID,
            rec.RECOMMEND_ID,
            rec.RECOMMENDATION,
            rec.FIT_SCORE,
            rec.RISK_LEVEL,
            rec.EXPLANATION,
            rec.STRENGTHS,
            rec.MISSING_INFORMATION,
            supplier.SUPPLIER_ID,
            supplier.SUPPLIER_NAME,
            supplier.CATEGORY,
            supplier.REGION,
            supplier.CAPACITY_STATUS,
            supplier.CAPABILITY_SUMMARY
        FROM CE_SUPPLIER_EVALUATION eval
        JOIN CE_SUPPLIER_RECOMMENDATION rec
            ON rec.RECOMMEND_ID = eval.RECOMMEND_ID
        JOIN CE_SUPPLIERS supplier
            ON supplier.SUPPLIER_ID = rec.SUPPLIER_ID
        WHERE eval.PROJECT_ID = :project_id
        ORDER BY rec.FIT_SCORE DESC, eval.EVALUATION_ID
        """,
        {"project_id": selected_project_id}
    )
    df_supplier_recommendations = pd.DataFrame(
        cursor.fetchall(),
        columns=[
            "EVALUATION_ID",
            "RECOMMEND_ID",
            "RECOMMENDATION",
            "FIT_SCORE",
            "RISK_LEVEL",
            "EXPLANATION",
            "STRENGTHS",
            "MISSING_INFORMATION",
            "SUPPLIER_ID",
            "SUPPLIER_NAME",
            "CATEGORY",
            "REGION",
            "CAPACITY_STATUS",
            "CAPABILITY_SUMMARY"
        ]
    )


    def generate_supplier_recommendations(project_id, project_json, df_supplier_recommendations):
        requirement = (project_json.get("requirements") or [{}])[0]
        evaluation = (project_json.get("supplierEvaluations") or [{}])[0]
        recommendation = evaluation.get("recommendation") or {}

        available_data_text = "\n".join([
            (
                f"Supplier Evaluation {row['EVALUATION_ID']}: "
                f"{row['SUPPLIER_NAME']} | Decision: {row['RECOMMENDATION']} | "
                f"Fit Score: {row['FIT_SCORE']} | Risk: {row['RISK_LEVEL']} | "
                f"Capacity: {row['CAPACITY_STATUS']} | "
                f"Explanation: {row['EXPLANATION']} | "
                f"Missing Information: {row['MISSING_INFORMATION']}"
            )
            for row in df_supplier_recommendations.to_dict(orient="records")
        ])

        project_profile_text = "\n".join([
            f"- Project Name: {project_json.get('projectName', '')}",
            f"- Location: {project_json.get('location', '')}",
            f"- Project Type: {project_json.get('projectType', '')}",
            f"- Project Phase: {project_json.get('projectPhase', '')}",
            f"- Project Summary: {project_json.get('projectSummary', '')}",
            f"- Required Trade: {requirement.get('tradeCategory', '')}",
            f"- Material Need: {requirement.get('materialNeed', '')}",
            f"- Required Certification: {requirement.get('requiredCertification', '')}",
            f"- Delivery Window: {requirement.get('deliveryWindow', '')}",
            f"- Procurement Urgency: {requirement.get('procurementUrgency', '')}",
            f"- Budget Range: {requirement.get('budgetRange', '')}",
            f"- Risk Level: {requirement.get('riskLevel', '')}",
            f"- Current Evaluation Status: {evaluation.get('evaluationStatus', '')}",
            f"- Current Recommended Supplier: {recommendation.get('supplier', {}).get('supplierName', '')}"
        ])

        question = "Generate a supplier evaluation for this project."
        prompt = f"""
You are an AI supplier evaluation assistant for construction engineering procurement.

Analyze the selected project and supplier data below. Do not ask for more
project details unless the supplied data is actually missing. Produce the
analysis now.

Industry:
Construction Engineering

User request:
{question}

Selected project profile:
{project_profile_text}

Project and supplier JSON:
{json.dumps(project_json, default=str)}

Available supplier recommendation records:
{available_data_text}

Decision rules:
- Use APPROVE when the supplier is a strong fit and material risks are controlled.
- Use REQUEST INFO when inspection logs, capacity confirmation, certificates,
  submittals, RFIs, safety records, or schedule evidence are missing.
- Use DENY when the supplier cannot satisfy core technical, compliance,
  delivery, or safety requirements.
- For evidence that says documentation is complete and risk is Low,
  recommend APPROVE.
- For Harbor Seismic Retrofit, deny the current suppliers and recommend
  submitting a new RFP because the supplier pool does not meet DBE, AISC,
  NCR, and logistics requirements.
- For North Campus Lab Expansion, treat an uploaded technical addendum PDF
  as new evidence and explicitly reflect it in the re-analysis.

Return a concise, decision-ready supplier evaluation with these exact sections:

Project Summary
Key Sourcing Requirements
Top 3 Supplier Recommendations
Risks and Missing Information
Actionable Steps
"""

        print("Generating AI response...")
        print(" ")

        genai_client = oci.generative_ai_inference.GenerativeAiInferenceClient(
            config=oci.config.from_file(os.getenv("OCI_CONFIG_PATH", "~/.oci/config")),
            service_endpoint=os.getenv("ENDPOINT")
        )

        chat_detail = oci.generative_ai_inference.models.ChatDetails(
            compartment_id=os.getenv("COMPARTMENT_OCID"),
            chat_request=oci.generative_ai_inference.models.GenericChatRequest(
                messages=[oci.generative_ai_inference.models.UserMessage(
                    content=[oci.generative_ai_inference.models.TextContent(text=prompt)]
                )],
                temperature=0.0,
                top_p=1.00
            ),
            serving_mode=oci.generative_ai_inference.models.OnDemandServingMode(
                model_id="meta.llama-3.2-90b-vision-instruct"
            )
        )
        chat_response = genai_client.chat(chat_detail)
        return chat_response.data.chat_response.choices[0].message.content[0].text


    recommendations = generate_supplier_recommendations(
        selected_project_id,
        project_json,
        df_supplier_recommendations
    )
    print(recommendations)
    </copy>
    ```

2. Click the **Run** button to execute the code. Note that this will
    take time to run. Be patient while the LLM evaluates the project
    and returns its supplier recommendations.

    ![Run task 4](./images/lab4task4.png " ")

3. Review the output. In the demo, this is where you selected the
    **Navigate To Project Decisions** button as the construction
    procurement manager.

    >*Note:* Your result may be different due to the non-deterministic nature of generative AI.

    ![ai recommendation](./images/task4recommendations.png " ")

## Task 7: Chunk & Store the Recommendations

In this section we will chunk and store the recommendations.

- We delete only the prior `AI Recommendation` chunks for this
  project and keep the seeded construction context rows.
- We use `VECTOR_CHUNKS` to split the generated recommendation text.
- The chunks are inserted into `CE_PROJECT_CHUNKS` with a
  collision-safe `CHUNK_ID` based on the current maximum chunk ID.
- We display a data frame summary so you can confirm the chunks that
  will be used by RAG.

1. Copy the following code and run it in a new cell:

    ```python
    <copy>
    if not recommendations:
        raise ValueError(
            "No recommendations text available to chunk. Run Task 6 first."
        )

    cursor.execute(
        """
        DELETE FROM CE_PROJECT_CHUNKS
        WHERE PROJECT_ID = :project_id
          AND SOURCE_TYPE = 'AI Recommendation'
        """,
        {"project_id": selected_project_id}
    )
    connection.commit()

    cursor.execute("SELECT NVL(MAX(CHUNK_ID), 0) FROM CE_PROJECT_CHUNKS")
    base_chunk_id = (cursor.fetchone()[0] or 0) + 1

    chunk_sizes = [50]

    for size in chunk_sizes:
        insert_sql = f"""
            INSERT INTO CE_PROJECT_CHUNKS (
                CHUNK_ID,
                PROJECT_ID,
                SUPPLIER_ID,
                SOURCE_TYPE,
                CHUNK_TEXT
            )
            SELECT
                :base_chunk_id + vc.chunk_offset,
                :project_id,
                NULL,
                'AI Recommendation',
                vc.chunk_text
            FROM (SELECT :rec_text AS txt FROM dual) s,
                VECTOR_CHUNKS(
                    dbms_vector_chain.utl_to_text(s.txt)
                    BY words
                    MAX {size}
                    OVERLAP 0
                    SPLIT BY sentence
                    LANGUAGE american
                    NORMALIZE all
                ) vc
        """
        cursor.execute(
            insert_sql,
            {
                "base_chunk_id": base_chunk_id,
                "project_id": selected_project_id,
                "rec_text": recommendations
            }
        )

    cursor.execute(
        """
        SELECT CHUNK_ID, CHUNK_TEXT
        FROM CE_PROJECT_CHUNKS
        WHERE PROJECT_ID = :project_id
          AND SOURCE_TYPE = 'AI Recommendation'
        ORDER BY CHUNK_ID
        """,
        {"project_id": selected_project_id}
    )
    rows = cursor.fetchall()


    def _lob_to_str(v):
        return v.read() if isinstance(v, oracledb.LOB) else v


    items = []
    for cid, ctext in rows:
        txt = _lob_to_str(ctext) or ""
        items.append(
            {
                "CHUNK_ID": cid,
                "Chars": len(txt),
                "Words": len(txt.split()),
                "Preview": (txt[:160] + "…") if len(txt) > 160 else txt
            }
        )

    df_chunks = pd.DataFrame(items).sort_values("CHUNK_ID")
    connection.commit()
    print(
        "✅ Task 7 complete: recommendation chunked for project "
        f"{selected_project_id} (sizes: {chunk_sizes})."
    )
    display(df_chunks)
    </copy>
    ```

2. Execute the code in a new cell.

    ![Run task 7](./images/task5.png " ")

3. Review the output to see the chunked supplier recommendation text.

    ![Run task 7](./images/task7recs.png " ")

## Task 8: Create embeddings - Use Oracle AI Database to create vector data

To handle follow-up questions, you will enhance the system with an
AI Guru powered by Oracle AI Database’s Vector Search and
Retrieval-Augmented Generation (RAG). The AI Guru will answer
questions about the project and supplier recommendation.

Before answering questions, we need to prepare the data by
vectorizing the recommendation chunks. This step:

- **Uses the Recommendation Chunks**: Works with the `AI Recommendation`
  rows you inserted into `CE_PROJECT_CHUNKS` in Task 7.
- **Generates Embeddings**: Uses
  `dbms_vector_chain.utl_to_embedding` to create vectors directly
  in the database.
- **Stores Embeddings**: Updates the `CHUNK_VECTOR` column in
  `CE_PROJECT_CHUNKS`.

1. Run and review the code in a new cell:

    ```python
    <copy>
    vp = json.dumps(
        {
            "provider": "database",
            "model": "DEMO_MODEL",
            "dimensions": 384
        }
    )

    cursor.execute(
        """
        UPDATE CE_PROJECT_CHUNKS
        SET CHUNK_VECTOR = dbms_vector_chain.utl_to_embedding(
            CHUNK_TEXT,
            JSON(:vp)
        )
        WHERE PROJECT_ID = :project_id
          AND SOURCE_TYPE = 'AI Recommendation'
        """,
        {"vp": vp, "project_id": selected_project_id}
    )
    updated = cursor.rowcount or 0
    connection.commit()
    print(
        "✅ Task 8 complete: embedded vectors for "
        f"{updated} CE_PROJECT_CHUNKS row(s)."
    )
    </copy>
    ```

2. Click the **Run** button to execute the code and review the output.

    ![vector](./images/task8.png " ")

## Task 9: Implement RAG with Oracle AI Database's Vector Search

Now that the recommendations are vectorized, we can process a user’s
question:

```text
Which supplier is the best fit for Downtown Mixed-Use Tower if we
prioritize complete documentation and delivery reliability?
```

This step:

- **Vectorizes the question**: Embeds the question using
  `DEMO_MODEL` via `dbms_vector_chain.utl_to_embedding`.
- **Performs AI Vector Search**: Retrieves the most relevant
  recommendation text from `CE_PROJECT_CHUNKS`.
- **Uses RAG**: Combines the project profile, supplier
  recommendation records, and retrieved chunk context.
- **Prevents Hallucinations**: Constrains the answer to supplier
  names that appear verbatim in the retrieved records and project
  context.

1. Copy the code block below to implement RAG:

    ```python
    <copy>
    question = (
        "Which supplier is the best fit for Downtown Mixed-Use Tower "
        "if we prioritize complete documentation and delivery reliability?"
    )


    def vectorize_question(q):
        cursor.execute(
            """
            SELECT dbms_vector_chain.utl_to_embedding(
                :q,
                JSON('{"provider":"database","model":"DEMO_MODEL","dimensions":384}')
            )
            FROM DUAL
            """,
            {"q": q}
        )
        return cursor.fetchone()[0]


    print("Processing your question using AI Vector Search...")

    try:
        q_vec = vectorize_question(question)

        cursor.execute(
            """
            SELECT CHUNK_ID, CHUNK_TEXT
            FROM CE_PROJECT_CHUNKS
            WHERE PROJECT_ID = :project_id
              AND CHUNK_VECTOR IS NOT NULL
            ORDER BY VECTOR_DISTANCE(CHUNK_VECTOR, :qv, COSINE)
            FETCH FIRST 4 ROWS ONLY
            """,
            {"project_id": selected_project_id, "qv": q_vec}
        )
        retrieved = [
            (
                row[0],
                row[1].read() if isinstance(row[1], oracledb.LOB) else row[1]
            )
            for row in cursor.fetchall()
        ]

        if not retrieved:
            retrieved = [(0, recommendations)]

        requirement = (project_json.get("requirements") or [{}])[0]
        available_data_text = "\n".join([
            (
                f"Supplier Evaluation {row['EVALUATION_ID']}: "
                f"{row['SUPPLIER_NAME']} | Decision: {row['RECOMMENDATION']} | "
                f"Fit Score: {row['FIT_SCORE']} | Risk: {row['RISK_LEVEL']} | "
                f"Capacity: {row['CAPACITY_STATUS']} | "
                f"Explanation: {row['EXPLANATION']} | "
                f"Missing Information: {row['MISSING_INFORMATION']}"
            )
            for row in df_supplier_recommendations.to_dict(orient="records")
        ])
        project_profile_text = "\n".join([
            f"- Project Name: {project_json.get('projectName', '')}",
            f"- Location: {project_json.get('location', '')}",
            f"- Project Phase: {project_json.get('projectPhase', '')}",
            f"- Required Trade: {requirement.get('tradeCategory', '')}",
            f"- Delivery Window: {requirement.get('deliveryWindow', '')}",
            f"- Budget Range: {requirement.get('budgetRange', '')}",
            f"- Risk Level: {requirement.get('riskLevel', '')}"
        ])
        context_text = "\n========\n".join(text for _, text in retrieved)

        rag_prompt = f"""<s>[INST] <<SYS>>
You are the AI Procurement Guru for construction engineering.
Use only the supplied project profile, supplier recommendation
records, and retrieved context.
Do not invent supplier names.
Only use supplier names that appear verbatim in the supplier
recommendation records or retrieved context.
If the evidence is insufficient, say so plainly.
Keep the answer under 220 words and make it decision-ready.
<</SYS>> [/INST]
[INST]
Question: "{question}"

Selected Project Profile:
{project_profile_text}

Available Supplier Recommendation Records:
{available_data_text}

Retrieved Context:
{context_text}

Tasks:
1. Answer the question directly.
2. Justify the answer using fit, risk, delivery, and documentation signals.
3. If there is a reasonable backup supplier, name it briefly.
[/INST]"""

        print("Generating AI response...")

        genai_client = oci.generative_ai_inference.GenerativeAiInferenceClient(
            config=oci.config.from_file(os.getenv("OCI_CONFIG_PATH", "~/.oci/config")),
            service_endpoint=os.getenv("ENDPOINT")
        )
        chat_detail = oci.generative_ai_inference.models.ChatDetails(
            compartment_id=os.getenv("COMPARTMENT_OCID"),
            chat_request=oci.generative_ai_inference.models.GenericChatRequest(
                messages=[oci.generative_ai_inference.models.UserMessage(
                    content=[oci.generative_ai_inference.models.TextContent(text=rag_prompt)]
                )],
                temperature=0.0,
                top_p=0.90
            ),
            serving_mode=oci.generative_ai_inference.models.OnDemandServingMode(
                model_id="meta.llama-3.2-90b-vision-instruct"
            )
        )
        chat_response = genai_client.chat(chat_detail)
        ai_response = (
            chat_response.data.chat_response.choices[0]
            .message.content[0].text
        )

        print("\\n🤖 AI Procurement Guru Response:")
        print(ai_response)

        print("\\n📑 Retrieved Chunks Used in Response:")
        for cid, text in retrieved:
            preview = text[:140].replace("\\n", " ")
            if len(text) > 140:
                preview += "..."
            print(f"[Chunk {cid}] : {preview}")

    except Exception as e:
        print(f"RAG flow error: {e}")
    </copy>
    ```

2. Click the **Run** button to execute the code.

    ![ask question](./images/task7.png " ")

3. Review the result.

    >*Note:* Your result may be different due to the non-deterministic nature of generative AI.

    ![rag](./images/task7results.png " ")

## Summary

Congratulations! You implemented a RAG process in Oracle AI Database using Python.

To summarize:

* You created a function to connect to Oracle AI Database using the Oracle Python driver `oracledb`.
* You created a function to retrieve construction project data.
* You created a function to connect to OCI Generative AI and create
  supplier recommendations.
* You created embeddings of supplier recommendation chunks using
  Oracle AI Database.
* And finally, you implemented a RAG process in Oracle AI Database using Python.

Congratulations, you completed the lab.

You may now proceed to the next lab.

## Learn More

* [Code with Python](https://www.oracle.com/developer/python-developers/)
* [Oracle AI Database Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/)

## Acknowledgements
* **Authors** - Francis Regalado
* **Last Updated By/Date** - Taylor Zheng, Uma Kumar, Deion Locklear, Daniet Hart, July 2026
