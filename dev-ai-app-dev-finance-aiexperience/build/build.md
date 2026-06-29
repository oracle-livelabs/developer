# Step by step: Implement RAG with Oracle AI Database 

## Introduction

In this lab, you build a construction project review engine with Oracle AI Database and OCI Generative AI. Connect to the database, explore the sample project-intake data, and invoke a large language model to generate project guidance and risk explanations. Building on earlier exercises, you’ll apply Python to deliver a fully integrated, AI-powered construction engineering review application.

This lab uses some of the basic coding samples you created in lab 3, such as cursor.execute and more.

Estimated Time: 30 minutes

### Objectives

* Build the complete construction project review application as seen in lab 1
* Use OCI Generative AI to generate contextual project recommendations
* Use Python to connect to an Oracle AI Database instance and run queries
* Explore project intake data and extract relevant information

### Prerequisites

This lab assumes you have:

* An Oracle Cloud account
* Completed lab 1: Run the demo

## Task 1: Login to JupyterLab

1. To navigate to the development environment, click **View Login Info**. Copy the Development IDE Login Password. Click the Start Development IDE link.

    ![Open Development Environment](./images/dev-env.png =50%x*)

2. Paste in the Development IDE Login Password that you copied in the previous step. Click **Login**.

    ![Login](./images/jupyter-login.png " ")

1. Click the blue "+". This will open the Launcher. 

    ![Open Launcher](./images/launcher.png " ")

## Task 2: Get familiar with the development environment

1. Review the different elements in JupyterLab:

    **File browser (1):** The file browser organizes and manages files within the JupyterLab workspace. It supports drag-and-drop file uploads, file creation, renaming, and deletion. Users can open notebooks, terminals, and text editors directly from the browser. Navigation is fast and intuitive, with breadcrumbs and context menus that surface relevant actions. Users can right-click files to access options like duplicate, shutdown kernel, or open with a specific editor.

    **Launcher (2 and 3):** The launcher offers a streamlined entry point for starting new activities. Users can create Jupyter Notebooks for interactive coding with live code execution, visualizations, and rich markdown. The terminal provides direct shell access, enabling command-line operations within the JupyterLab environment. These two tools form the core of most workflows, supporting both interactive analysis and system-level tasks from a single interface.

    ![JupyterLab Launcher](./images/jupyter.png " ")

## Task 3: View created tables in Jupyter Lab

1. Navigate back to your terminal window.

    ![Open Terminal](./images/terminal.png " ")

2. Navigate to `db_setup_script_2.sql` under the `dbinit` folder. Here is where you can see all the tables that support this construction engineering scenario.

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

You will query the sample project intake record from the `project_profiles_dv` JSON duality view, which combines `PROJECT_SPONSORS`, `CONSTRUCTION_PROJECT_REQUESTS`, and related tables. This task will:

- **Define a Function**: Create a reusable function `fetch_project_data` to query the database by project record ID, extracting the JSON data for a specific project submission.

- **Use an Example**: Fetch the sample project record `PROJ_1000` for James Smith, who is acting as the project sponsor in this scenario.

- **Display the Results**: Format the retrieved data into a pandas DataFrame for a clear, tabular presentation, showing key details like sponsor name, location, annual revenue, site risk score, requested budget, and current committed spend.

1. Copy and paste the code below into the new notebook.

    ```python
    <copy>
def fetch_project_data(project_id):
        cursor.execute(
            "SELECT data FROM project_profiles_dv WHERE JSON_VALUE(data, '$._id') = :project_id",
            {'project_id': project_id}
        )
        result = cursor.fetchone()
        return json.loads(result[0]) if result and isinstance(result[0], str) else result[0] if result else None

selected_project_id = "PROJ_1000"
project_json = fetch_project_data(selected_project_id)

if project_json:
        project_request = project_json.get("projectRequests", [{}])[0]
        print(f"Project Sponsor: {project_json['sponsorFirstName']} {project_json['sponsorLastName']}")
        print(f"Project Review Status: {project_request['projectStatus']}")

        desired_fields = [
            ("Project Record ID", selected_project_id),
            ("Project Request ID", project_request.get("requestId", "")),
            ("Sponsor First Name", project_json.get("sponsorFirstName", "")),
            ("Sponsor Last Name", project_json.get("sponsorLastName", "")),
            ("City", project_json.get("city", "")),
            ("State", project_json.get("state", "")),
            ("Zip Code", project_json.get("zipCode", "")),
            ("Annual Revenue", project_json.get("annualRevenue", 0)),
            ("Project Name", project_request.get("projectName", "")),
            ("Project Type", project_request.get("projectType", "")),
            ("Site Risk Score", project_request.get("siteRiskScore", 600)),
            ("Requested Project Budget", project_request.get("requestedProjectBudget", 0)),
            ("Current Committed Spend", project_request.get("currentCommittedSpend", 0)),
            ("Estimated Duration Days", project_request.get("estimatedDurationDays", 0)),
            ("Permit Complexity", project_request.get("permitComplexity", "")),
            ("Project Review Status", project_request.get("projectStatus", "Pending Review"))
        ]

        df_project_details = pd.DataFrame(
            {field_name: [field_value] for field_name, field_value in desired_fields}
        )
        display(df_project_details)

else:
        print("No data found for project record ID:", selected_project_id)
    </copy>
    ``` 

2. Click the "Run" button to see James Smith’s project intake profile. The output will include a brief summary of the project sponsor and current review status followed by a detailed table. If no data is found for the specified ID, a message will indicate this, helping you debug potential issues like an incorrect ID or empty database. The output will display a DataFrame containing the project intake details for the selected project record.

    ![Open Terminal](./images/lab4task3.png " ")


If you completed Lab 1: Run the Demo earlier, this is what gets printed out when the project reviewer opens the sample project record for `PROJ_1000`. You just rebuilt that project summary view.

## Task 6: Create a function to generate recommendations for the project

In a new cell, define a function `generate_project_recommendations` to generate project recommendations.

With the project profile in place, you will use OCI Generative AI to generate personalized construction project recommendations.

Here’s what we’ll do:
- **Fetch Project Option Data**: Retrieve the available project-option records and combine them with the selected project data from `PROJECT_OPTION_CATALOG`.
- **Build a Prompt**: Construct a structured prompt that combines the sponsor profile with the project request and instructs the LLM to evaluate the proposed construction work and recommend next steps (`APPROVE`, `REQUEST INFO`, or `DENY`) based solely on this data.
- **Use OCI Generative AI**: Send the prompt to the <mark>**meta.llama-3.2-90b-vision-instruct**</mark> model via OCI’s inference client, which will process the input and generate a response.
- **Format the Output**: Display the recommendations with structured sections covering the project evaluation, top options, and explanations.

1. Copy and paste the code in a new cell:

    ```python
    <copy>
    # Fetch project option data
cursor.execute("SELECT option_id, provider_name, project_package, financing_rate, mobilization_fee, time_to_start, min_site_risk_score, max_budget_to_revenue_ratio, min_annual_revenue, required_site_prep_percent, requires_government_coordination FROM project_option_catalog")
df_project_options = pd.DataFrame(cursor.fetchall(), columns=["OPTION_ID", "PROVIDER_NAME", "PROJECT_PACKAGE", "FINANCING_RATE", "MOBILIZATION_FEE", "TIME_TO_START", "MIN_SITE_RISK_SCORE", "MAX_BUDGET_TO_REVENUE_RATIO", "MIN_ANNUAL_REVENUE", "REQUIRED_SITE_PREP_PERCENT", "REQUIRES_GOVERNMENT_COORDINATION"])

# Generate Recommendations
def generate_project_recommendations(project_id, project_json, df_project_options):
        project_request = project_json.get("projectRequests", [{}])[0]
        available_options_text = "\n".join([f"{option['OPTION_ID']}: {option['PROJECT_PACKAGE']} | {option['FINANCING_RATE']}% financing rate | Minimum Site Risk Score: {option['MIN_SITE_RISK_SCORE']} | Max Budget-to-Revenue Ratio: {option['MAX_BUDGET_TO_REVENUE_RATIO']}" for option in df_project_options.to_dict(orient='records')])
        project_profile_text = "\n".join([f"- {key.replace('_', ' ').title()}: {value}" for key, value in {**project_json, **project_request}.items() if key not in ["embedding_vector", "ai_response_vector", "chunk_vector"]])

        prompt = f"""<s>[INST] <<SYS>>You are a Construction Project Review AI. Use only the provided context to evaluate the proposed project and recommend the best next steps. Choose only from APPROVE, REQUEST INFO, or DENY. Format results as plain text with numbered sections (1. Comprehensive Project Evaluation, 2. Top 3 Recommended Options, 3. Recommendation Explanations, 4. Final Suggestion). Use newlines between sections.</SYS>> [/INST]
        [INST]Available Project Options:\n{available_options_text}\nProject Submission Profile:\n{project_profile_text}\nTasks:\n1. Comprehensive Project Evaluation\n2. Top 3 Recommended Options\n3. Recommendation Explanations\n4. Final Suggestion</INST>"""

        print("Generating AI response...")
        print(" ")
        
        genai_client = oci.generative_ai_inference.GenerativeAiInferenceClient(config=oci.config.from_file(os.getenv("OCI_CONFIG_PATH", "~/.oci/config")), service_endpoint=os.getenv("ENDPOINT"))

        chat_detail = oci.generative_ai_inference.models.ChatDetails(
            compartment_id=os.getenv("COMPARTMENT_OCID"),
            chat_request=oci.generative_ai_inference.models.GenericChatRequest(messages=[oci.generative_ai_inference.models.UserMessage(content=[oci.generative_ai_inference.models.TextContent(text=prompt)])], temperature=0.0, top_p=1.00),
            serving_mode=oci.generative_ai_inference.models.OnDemandServingMode(model_id="meta.llama-3.2-90b-vision-instruct") #here is where we are calling our llm
        )
        chat_response = genai_client.chat(chat_detail)
        recommendations = chat_response.data.chat_response.choices[0].message.content[0].text

        return recommendations

    recommendations = generate_project_recommendations(selected_project_id, project_json, df_project_options)
    print(recommendations)
    </copy>
    ```

2. Click the "Run" button to execute the code. Note that this will take time to run. Be patient while the LLM evaluates the construction request and returns its recommendations.

    ![Run task 4](./images/lab4task4.png " ")

3. Review the output. In the demo, this is where you selected the **Navigate to Decisions** button as the project reviewer. You just used AI to generate project guidance that would otherwise have required a lengthy manual review.

    >*Note:* Your result may be different due to non-deterministic character of generative AI.

    ![ai recommendation](./images/task4recommendations.png " ")

## Task 7: Chunk & Store the Recommendations 

In this section we will be chunking and storing the recommendations.

- We delete prior chunks for this project record.
- We use `VECTOR_CHUNKS` to insert the chunks.
- The chunks will be inserted into `PROJECT_RECOMMENDATION_CHUNK` with unique `CHUNK_ID` = (`size + chunk_offset`).
- We display a data frame summary to show the chunks.

1. Copy the following code and run it in a new cell:

    ```python
    <copy>
    # Clean any prior chunks for this project record
cursor.execute("DELETE FROM PROJECT_RECOMMENDATION_CHUNK WHERE PROJECT_ID = :project_id", {'project_id': selected_project_id})
connection.commit()

# Choose your chunk sizes (add more like 200, 500 if you want)
chunk_sizes = [50]  # e.g., [50, 200, 500]

# Insert chunks using VECTOR_CHUNKS. Make CHUNK_ID unique by (size  + chunk_offset).
for size in chunk_sizes:
        insert_sql = f"""
            INSERT INTO PROJECT_RECOMMENDATION_CHUNK (PROJECT_ID, CHUNK_ID, CHUNK_TEXT)
            SELECT :project_id,
                :chunk_size + vc.chunk_offset,
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
            {'project_id': selected_project_id, 'chunk_size': size, 'rec_text': recommendations}
        )

# Fetch chunks for preview
cursor.execute("""
    SELECT CHUNK_ID, CHUNK_TEXT
      FROM PROJECT_RECOMMENDATION_CHUNK
     WHERE PROJECT_ID = :project_id
  ORDER BY CHUNK_ID
""", {'project_id': selected_project_id})
rows = cursor.fetchall()

# Build a compact dataframe
def _lob_to_str(v): return v.read() if isinstance(v, oracledb.LOB) else v

items = []
for cid, ctext in rows:
        txt = _lob_to_str(ctext) or ""
        items.append({
            "CHUNK_ID": cid,
            "Chars": len(txt),
            "Words": len(txt.split()),
            "Preview": (txt[:160] + "…") if len(txt) > 160 else txt
        })

    df_chunks = pd.DataFrame(items).sort_values("CHUNK_ID")
    connection.commit()
print(f"✅ Task 7 complete: recommendation chunked for project record {selected_project_id} (sizes: {chunk_sizes}).")
display(df_chunks)
    </copy>
    ```

2. Execute the code in a new cell.

    ![Run task 7](./images/task5.png " ")

3. Review the output to see the chunked project recommendations.

    ![Run task 7](./images/task7recs.png " ")

## Task 8: Create a function to create embeddings - Use Oracle AI Database to create vector data 

To handle follow-up questions, you will enhance the system with an AI Guru powered by Oracle AI Database’s Vector Search and Retrieval-Augmented Generation (RAG). The AI Guru will be able to answer questions about the construction project request and provide recommendations based on the data.

Before answering questions, we need to prepare the data by vectorizing the recommendations. This step:

   - **Stores Recommendations**: Inserts the full recommendation text (from previous cell) as a single chunk if not already present.

   - **Generates Embeddings**: This is a new feature in Oracle AI Database that allows you to create embeddings directly within the database, eliminating the need for external tools or APIs. The `dbms_vector_chain.utl_to_embedding` function takes the recommendation text as input and returns an embedding vector.

   - **Stores Embeddings**: Inserts the generated embedding vector into the `PROJECT_RECOMMENDATION_CHUNK` table.

1. Run and review the code in a new cell:

    ```python
    <copy>
    # Create embeddings for the project recommendation chunks
cursor.execute("""
    UPDATE PROJECT_RECOMMENDATION_CHUNK
       SET CHUNK_VECTOR = dbms_vector_chain.utl_to_embedding(
           CHUNK_TEXT,
           JSON('{"provider":"database","model":"DEMO_MODEL","dimensions":384}')
       )
     WHERE PROJECT_ID = :project_id
""", {'project_id': selected_project_id})
connection.commit()
print("✅ Task 8 complete: embedded vectors for PROJECT_RECOMMENDATION_CHUNK rows.")
    </copy>
    ```

2. Click the "Run" button to execute the code and review the output.

    ![vector](./images/task8.png " ")

## Task 9: Implement RAG with Oracle AI Database's Vector Search

Now that the recommendations are vectorized, we can process a reviewer’s question:

```Can we recommend any other options for James's construction project?```

This step:

   - **Vectorizes the question**: Embeds the question using `DEMO_MODEL` via `dbms_vector_chain.utl_to_embedding`.
   - **Performs AI Vector Search**: Retrieve the relevant recommendation text from the `PROJECT_RECOMMENDATION_CHUNK` table and find the most relevant project guidance using similarity search.
   - **Use RAG**: Combine the project profile, review rules, and retrieved recommendation context.

1. Copy the code block below to implement RAG:

    ```python
    <copy>
question = "Can we recommend any other options for James's construction project?"

def vectorize_question(q):
        cursor.execute("""
            SELECT dbms_vector_chain.utl_to_embedding(
                :q,
                JSON('{"provider":"database","model":"DEMO_MODEL","dimensions":384}')
            ) FROM DUAL
        """, {'q': q})
        return cursor.fetchone()[0]

print("Processing your question using AI Vector Search across chunked recommendations...")

try:
        q_vec = vectorize_question(question)

        # Retrieve top recommendation chunks (across all sizes) for this project record
        cursor.execute("""
            SELECT CHUNK_ID, CHUNK_TEXT
            FROM PROJECT_RECOMMENDATION_CHUNK
            WHERE PROJECT_ID = :project_id
            AND CHUNK_VECTOR IS NOT NULL
            ORDER BY VECTOR_DISTANCE(CHUNK_VECTOR, :qv, COSINE)
            FETCH FIRST 4 ROWS ONLY
        """, {'project_id': selected_project_id, 'qv': q_vec})
        retrieved = [
            (r[0], r[1].read() if isinstance(r[1], oracledb.LOB) else r[1])
            for r in cursor.fetchall()
        ]

        if not retrieved:
            # Fallback to full text as one chunk
            retrieved = [(0, recommendations)]

        # Prepare clean context for the LLM
        cleaned = [re.sub(r'[^\w\s\d.,\-\'"]', ' ', t).strip() for _, t in retrieved]
        docs_as_one_string = "\n=========\n".join(cleaned) + "\n=========\n"

        # Rebuild available project options + project profile
        available_options_text = "\n".join(
            [f"{option['OPTION_ID']}: {option['PROJECT_PACKAGE']} | {option['FINANCING_RATE']}% financing rate | "
            f"Minimum Site Risk Score: {option['MIN_SITE_RISK_SCORE']} | Max Budget-to-Revenue Ratio: {option['MAX_BUDGET_TO_REVENUE_RATIO']} | "
            f"Mobilization Fee: ${option['MOBILIZATION_FEE']} | Time to Start: {option['TIME_TO_START']} days"
            for option in df_project_options.to_dict(orient='records')]
        )
        project_request = project_json.get("projectRequests", [{}])[0]
        project_profile_text = "\n".join(
            [f"- {k.replace('_',' ').title()}: {v}"
            for k, v in {**project_json, **project_request}.items()
            if k not in ["embedding_vector","ai_response_vector","chunk_vector"]]
        )

        rag_prompt = f"""\
<s>[INST] <<SYS>>
You are AI Construction Project Guru. Use only the provided context to answer. Do not mention sources outside of the provided context.
Do NOT provide warnings, disclaimers, or exceed the specified response length.
Keep under 300 words. Be specific and actionable. Have the ability to respond in Spanish, French, Italian, German, and Portuguese if asked.
<</SYS>> [/INST]
[INST]
Question: "{question}"

# Context (top chunks from prior AI recommendations):
{docs_as_one_string}

# Available Project Options:
{available_options_text}

# Project Submission Profile:
{project_profile_text}

Tasks:
1) Provide a direct answer to the question.
2) Briefly justify based on the project profile and available options.
[/INST]"""

        print("Generating AI response...")

        genai_client = oci.generative_ai_inference.GenerativeAiInferenceClient(
            config=oci.config.from_file(os.getenv("OCI_CONFIG_PATH","~/.oci/config")),
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
        ai_response = chat_response.data.chat_response.choices[0].message.content[0].text
        ai_response = re.sub(r'[^\w\s\d.,\-\'"]', ' ', ai_response)

        print("\n🤖 AI Construction Project Guru Response:")
        print(ai_response)

        # Print which chunks were retrieved (for transparency/debug)
        print("\n📑 Retrieved Chunks Used in Response:")
        for cid, text in retrieved:
            preview = text[:140].replace("\n", " ") + ("..." if len(text) > 140 else "")
            print(f"[Chunk {cid}] : {preview}")

except Exception as e:
        print(f"RAG flow error: {e}")
    </copy>
    ```

2. Click the "Run" button to execute the code.

    ![ask question](./images/task7.png " ")

3. Review the result.

    >*Note:* Your result may be different due to non-deterministic character of generative AI.

    ![rag](./images/task7results.png " ")

## Summary

Congratulations! You implemented a RAG process in Oracle AI Database using Python.

To summarize:

* You created a function to connect to Oracle AI Database using the Oracle Python driver `oracledb`.
* You created a function to retrieve project intake data.
* You created a function to connect to OCI Generative AI and create an initial project recommendation.
* You created a function to create embeddings of the project recommendation data using Oracle AI Database.
* And finally, you implemented a RAG process in Oracle AI Database using Python.

Congratulations, you completed the lab!

You may now proceed to the next lab.

## Learn More

* [Code with Python](https://www.oracle.com/developer/python-developers/)
* [Oracle AI Database Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/)

## Acknowledgements
* **Authors** - Francis Regalado
* **Last Updated By/Date** - Uma Kumar, December 2025
