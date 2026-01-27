
# Build the RAG Chatbot engine

## Introduction

In this lab we will implement a RAG (Retrieval Augmented Generation) chatbot using vector similarity search and Generative AI / LLMs.

We will guide you through the process of loading and parsing a pdf file, integrating it with an Oracle 26ai database, and employing the Google Cloud Platform to order it and run the Python code and Generative AI services needed for the chatbot.

Oracle Database 26ai will be used as the vector store. In this lab, we will use a pdf file as the source data, but you can apply these steps to other data types including audio and video. **Gemini 2.5 Flash (gemini-2.5-flash)**, a multimodal model from Google AI, is leveraged for RAG.

High-level steps followed in this lab:

1. Load your document.

2. Transform the document to text.

3. Chunk the text document into smaller pieces.

4. Using an embedding model, embed the chunks as vectors into Oracle Database 26ai.

5. Ask the question for the prompt, the prompt will use the same embedding model to vectorize the question.

6. The question will be passed to Oracle Database 26ai and a similarity search is performed on the question.

7. The results (context) of the search and the prompt are passed to the LLM to generate the response.

    ![Ragdesign](./images/ragdesign.png "Ragdesign")


Estimated Time: 50 minutes

### Objectives


1. Implement a RAG chatbot using vector similarity search and Generative AI/LLMs.
2. Load and parse a FAQ-like text file, integrating it with an Oracle 26ai database.
3. Employ the Google Cloud Platform to order and run the Python code and Generative AI services needed for the chatbot.
4. Use the Oracle Database 26ai vector database to store and retrieve relevant information.
5. Leverage the Gemini Generative AI service (Vertex AI) to generate high-quality responses to user queries.

### Required Artifacts

- A pre-provisioned instance of an Autonomous Database.
- Google Cloud Compute VM instance.

## Task 1: Enable Vertex AI API

In this section, you will be enabling Vertex AI API to be used later in the lab.

1.	From Google Cloud Console go to the main menu and click **Vertex AI** and **Dashboard**.

    ![Gcp Vertexai Menu](./images/gcp-vertexai-menu.png "Gcp Vertexai Menu")

2. The will launch the **Vertex AI Dashboard**. On the Dashboard click **Enable all recommended APIs**.

    ![Gcp Get Started Vertexai](./images/gcp-get-started-vertexai.png "Gcp Get Started Vertexai")

3. After the API is enabled, confirm the same from the **Dashboard**.

    ![Gcp Enabled Vertexai](./images/gcp-enabled-vertexai.png "Gcp Enabled Vertexai")

## Task 1.5: Authenticate with Google Cloud

Before running the Jupyter notebook, set up Application Default Credentials (ADC) for Vertex AI access.

1. Open a terminal on your GCP VM (or local machine if using local VSCode) and run:

    ```
    <copy>
    gcloud auth application-default login --no-launch-browser
    </copy>
    ```

2. Enter **Y** to continue when prompted.

    ![Enter Y To Continue](./images/enter-Y-to-continue.png "Enter Y To Continue")

3. Copy the link and paste it in a browser.

    ![Copy Link](./images/copy-link.png "Copy Link")

4. The browser will prompt you to login to your Google Cloud Account. After login, allow the application to use your cloud credentials.

    ![Login Page](./images/login-page.png "Login Page")
    ![Allow Application](./images/allow-application.png "Allow Application")

5. Copy the authorization code and paste it back in the terminal window.

    ![Copy Code](./images/copy-code.png "Copy Code")
    ![Paste Code](./images/paste-code.png "Paste Code")

    **Note:** This authentication step must be completed before running the Jupyter notebook, as the notebook requires Vertex AI access.

## Task 2: Launch VSCode

We will use Visual Studio Code (VSCode) to run our Jupyter Notebook.

**Note:** If your Oracle Autonomous Database has a **public endpoint** and is accessible from your local machine, you can use VSCode locally without SSH. Otherwise, use VSCode's Remote Explorer to connect to the GCP VM.

Please use VSCode's Remote Explorer function to connect to your remote VM. If you don't know how to do that, please see [this tutorial first](https://code.visualstudio.com/docs/remote/ssh).

1. Launch VSCode on your local machine and connect to the remote VM. Click the **Search Bar** and select **Show and Run Commands**.

    ![Vscode Show Run Command](./images/vscode-show-run-command.png "Vscode Show Run Command")

2. Type **Remote-SSH** and select **Remote-SSH: Connect to Host...**.

    ![Vscode Remote Ssh](./images/vscode-remote-ssh.png "Vscode Remote Ssh")

3. Enter the IP address of the Google Compute VM Instance that we provisioned earlier in this workshop and press **Enter**.

    ![Vscode Select Ssh Host](./images/vscode-select-ssh-host.png "Vscode Select Ssh Host")

4. On the next VSCode Window, verify that you have remotely connected to the Compute VM instance. Left bottom corner has a message **SSH: IP Address**.

    ![Vscode Confirm Ssh](./images/vscode-confirm-ssh.png "Vscode Confirm Ssh")

## Task 3:  Setup the Python environment

1. Launch a terminal session in VSCode. After connecting to the VM instance update the softwares installed.

    ```
    <copy>
    sudo apt update
    </copy>
    ```

2. Install Python 3 and pip (if not already installed):

    ```
    <copy>
    sudo apt install -y python3 python3-pip python3-venv
    </copy>
    ```

3. Clone the repository and navigate to the project directory:

    ```
    <copy>
    git clone https://github.com/paulparkinson/oracle-ai-for-sustainable-dev.git
    cd oracle-ai-for-sustainable-dev/oracle-ai-database-gcp-vertex-ai
    </copy>
    ```

4. Create and activate a Python virtual environment:

    ```
    <copy>
    python3 -m venv venv
    source venv/bin/activate
    </copy>
    ```

    **Note:** This venv will be used for both the Jupyter notebook and the Python applications (run via `./run.sh`). Always activate it with `source venv/bin/activate` before working on this project.

5. Configure the `.env` file with your credentials. Copy the example file and edit it:

    ```
    <copy>
    cp .env_example .env
    # Edit .env with your actual credentials
    </copy>
    ```

    Your `.env` file should contain:

    ```
    DB_USERNAME=ADMIN
    DB_PASSWORD=your_password
    DB_DSN=your_connection_string_high
    DB_WALLET_PASSWORD=your_wallet_password
    DB_WALLET_DIR=/path/to/wallet
    GCP_PROJECT_ID=your_project_id
    GCP_REGION=us-central1
    ```

6. Install all Python dependencies (with venv activated):

    ```
    <copy>
    pip install --upgrade pip
    pip install -r python/requirements.txt
    </copy>
    ```

    **Note:** This installs all required packages including oracledb, langchain, streamlit, and Vertex AI libraries. The same venv is used for both the Jupyter notebook and the Python applications.

7. The notebook is available at `oracle-ai-database-gcp-vertex-ai/notebooks/oracle_ai_database_gemini_rag.ipynb`. 

## Task 4: Run the RAG application code snippets in Jupyter notebook

1. Open the `oracle_ai_database_gemini_rag.ipynb` file in VSCode and continue reading while executing the code cells below. Click **Open** to open the Jupyter Notebook.

    ![Vscode Confirm Ssh](./images/vscode-confirm-ssh.png "Vscode Confirm Ssh")
    
2. Select the `oracle_ai_database_gemini_rag.ipynb` file located at `oracle-ai-database-gcp-vertex-ai/notebooks/oracle_ai_database_gemini_rag.ipynb`.

    ![Vscode Select File](./images/vscode-select-file.png "Vscode Select File")

3. On clicking Run to execute the first code snippet, you will be prompted to install and enable extensions (Python and Jupyter).

    ![Install Enable Extensions](./images/install-enable-extensions.png "Install Enable Extensions")

    After installing the required extensions you will be prompted to choose the **Kernel Source**. Select **Python Environments**.

    ![Python Envs](./images/python-envs.png "Python Envs")

    Upon installing required Python Kernel, select the Python Environment (the venv you created).

    ![Select Python](./images/select-python.png "Select Python")

    Running cells with Python requires the ipykernel package. Click **Install** if prompted.

    **Important:** When selecting the kernel, choose the Python interpreter from your venv: `oracle-ai-database-gcp-vertex-ai/venv/bin/python`

4. Run the RAG application code snippets in Jupyter notebook.

    Now you're ready to run each code snippet in sequence starting from the top in Jupyter. To run a code snippet, select the cell of the code and click Run to execute the code.

    When the code snippet has completed running a number will appear in the square brackets. You can then proceed to the next cell and code snippet. Some of the code will print an output so you can get feedback.At any time you can also re-run the code snippets in the Jupyter cell.

    Python libraries and modules have already been installed for this RAG application. Note the libraries for LangChain and a new library for the Oracle AI Vector Search, OracleVS and Vertex AI, vertexai.

    ```
    <copy>
    # Import libraries and modules

    import sys
    import array
    import time
    import oci
    import os
    from dotenv import load_dotenv
    from PyPDF2 import PdfReader
    #from sentence_transformers import CrossEncoder
    from langchain.text_splitter import CharacterTextSplitter
    from langchain_community.embeddings import HuggingFaceEmbeddings
    from langchain_community.vectorstores.utils import DistanceStrategy
    from langchain_community.llms import OCIGenAI
    from langchain_core.prompts import PromptTemplate
    from langchain.chains import LLMChain
    from langchain_core.runnables import RunnablePassthrough
    from langchain_core.output_parsers import StrOutputParser
    from langchain_community.vectorstores import oraclevs
    from langchain_community.vectorstores.oraclevs import OracleVS
    from langchain_core.documents import BaseDocumentTransformer, Document
    from langchain_community.chat_models.oci_generative_ai import ChatOCIGenAI
    from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
    import oracledb

    from langchain_huggingface import HuggingFaceEmbeddings

    # suppersing warning messages
    from tqdm import tqdm, trange

    print("Successfully imported libraries and modules")
    </copy>
    ```

5. This next code snippet defines the function to include metadata with the chunks. Select the code snippet and click Run.

    ```
    <copy>
    # Function to format and add metadata to Oracle 26ai Vector Store

    def chunks_to_docs_wrapper(row: dict) -> Document:
        """
        Converts text into a Document object suitable for ingestion into Oracle Vector Store.
        - row (dict): A dictionary representing a row of data with keys for 'id', 'link', and 'text'.
        """
        metadata = {'id': row['id'], 'link': row['link']}
        return Document(page_content=row['text'], metadata=metadata)
    print("Successfully defined metadata wrapper")
    </copy>
    ```

6. This code connects to Oracle Database 26ai using credentials from the `.env` file. The notebook automatically loads these values. Select the code snippet and click Run.

    **Note:** The notebook loads credentials from the `.env` file you configured earlier. The code in the notebook looks like this:

    ```python
    import oracledb
    from dotenv import load_dotenv

    # Load environment variables from .env file (in parent directory)
    env_path = os.path.join(os.path.dirname(os.getcwd()), '.env')
    load_dotenv(dotenv_path=env_path, override=True)

    # Get database credentials from environment variables
    un = os.getenv("DB_USERNAME")
    pw = os.getenv("DB_PASSWORD")
    dsn = os.getenv("DB_DSN")
    wallet_path = os.getenv("DB_WALLET_DIR")
    wpwd = os.getenv("DB_WALLET_PASSWORD", "")

    connection = oracledb.connect(
        config_dir=wallet_path,
        user=un, 
        password=pw, 
        dsn=dsn,
        wallet_location=wallet_path,
        wallet_password=wpwd
    )
    ```

    Simply run the cell - no need to manually edit credentials in the notebook.

7. Load the Document

    The document in our use case is in PDF format. We are loading a PDF document and printing the total number of pages, and printing page 1 for your visual feedback.

    ```
    <copy>
    # Load the document

    # creating a pdf reader object
    pdf = PdfReader('oracle-database-26ai-new-features-guide.pdf')

    # print number of pages in pdf file 
    print("The number of pages in this document is ",len(pdf.pages)) 
    # print the first page 
    print(pdf.pages[0].extract_text())
    </copy>
    ```

8. The code transforms each page of the PDF document to text. Click Run to execute the code.

    ```
    <copy>
    # Transform the document to text

    if pdf is not None:
    print("Transforming the PDF document to text...")
    text=""
    for page in pdf.pages:
        text += page.extract_text()
    print("You have transformed the PDF document to text format")
    </copy>
    ```

9. Split the text into chunks

    Our chunk size will be 800 characters, with an overlap of 100 characters with each chunk. Note: Chunk sizes vary depending on the type of document you are embedding. Chat messages may have smaller chunk size, and larger 100 page essays may have larger chunk sizes.

    ```
    <copy>
    # Chunk the text document into smaller chunks
    text_splitter = CharacterTextSplitter(separator="\n",chunk_size=800,chunk_overlap=100,length_function=len)
    chunks = text_splitter.split_text(text)
    print(chunks[0])
    </copy>
    ```

10. The code adds metadata such as id to each chunk for the database table. Click Run to execute the code.

    ```
    <copy>
    # Create metadata wrapper to store additional information in the vector store
    """
    Converts a row from a DataFrame into a Document object suitable for ingestion into Oracle Vector Store.
    - row (dict): A dictionary representing a row of data with keys for 'id', 'link', and 'text'.
    """
    docs = [chunks_to_docs_wrapper({'id': f'{page_num}', 'link': f'Page {page_num}', 'text': text}) for page_num, text in enumerate(chunks)]
    print("Created metadata wrapper with the chunks")
    </copy>
    ```

11. Set up Oracle AI Vector Search and insert the embedding vectors

    The embedding model used in this lab is **all-MiniLM-L6-v2** from HuggingFace. **docs** will point to the text chunks. The connection string to the database is in the object **connection**. The table to store the vectors and metadata are in **RAG_TAB**. We use **DOTPRODUCT** as the algorithm for the nearest neighbor search. Note: Embedding models are used to vectorize data. To learn more about embedding models, see the LiveLabs on Oracle AI Vector Search.

    ```
    <copy>
    # Using an embedding model, embed the chunks as vectors into Oracle Database 26ai.

    # Initialize embedding model
    model_4db = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    # Configure the vector store with the model, table name, and using the indicated distance strategy for the similarity search and vectorize the chunks
    s1time = time.time()
    knowledge_base = OracleVS.from_documents(docs, model_4db, client=connection, table_name="RAG_TAB", distance_strategy=DistanceStrategy.DOT_PRODUCT, )     
    s2time =  time.time()      
    print( f"Vectorizing and inserting chunks duration: {round(s2time - s1time, 1)} sec.")
    You have successfully uploaded the document, transformed it to text, split into chunks, and embedded its vectors in Oracle Database 26ai.
    </copy>
    ```

12. Connect to the database and run a sample query on the table to confirm records were inserted into the table.

    ```
    <copy>
    table_name = "RAG_TAB"

    with connection.cursor() as cursor:
        # Define the query to select all rows from a table
        query = f"SELECT * FROM {table_name}"

        # Execute the query
        cursor.execute(query)

        # Fetch all rows
        rows = cursor.fetchall()

        # Print the rows
        for row in rows[:5]:
            print(row)
    </copy>
    ```

13. The code issues a prompt related to the document we loaded. Click Run to execute the code.

    ```
    <copy>
    user_question = 'List maximum availability features of 26ai'
    print ("The prompt to the LLM will be:",user_question)
    </copy>
    ```

14. The code records the timing for searching the database. It's quick! Click Run to execute the code.

    ```
    <copy>
    # Setup timings to check performance

    # code not needed, only used for measuring timing
    if user_question:
        s3time =  time.time()
        result_chunks=knowledge_base.similarity_search(user_question, 5)
        print(result_chunks)
        s4time = time.time()
        print( f"Search user_question and return chunks duration: {round(s4time - s3time, 1)} sec.")
        print("")
    </copy>
    ```

15. Initialize Vertex AI for LLM response generation.

    Continue running the code from Jupyter Notebook. We will be using Vertex AI for this lab. The notebook uses the PROJECT_ID and REGION from your `.env` file. Import the library vertexai and initiate Vertex AI.

    ```
    <copy>
    import vertexai

    PROJECT_ID = "project_id"  # Enter Project ID
    REGION = "region"  # Enter Region eg. us-east4

    # Initialize Vertex AI SDK
    vertexai.init(project=PROJECT_ID, location=REGION)
    import time
    </copy>
    ```

    ```
    <copy>
    from google.cloud import aiplatform

    # LangChain
    import langchain
    from langchain.chat_models import ChatVertexAI
    from langchain.embeddings import VertexAIEmbeddings
    from langchain.llms import VertexAI

    # Utils
    from langchain.schema import HumanMessage, SystemMessage
    from pydantic import BaseModel

    print(f"LangChain version: {langchain.__version__}")

    # Vertex AI

    print(f"Vertex AI SDK version: {aiplatform.__version__}")
    </copy>
    ```

16. The code below sets up the **Vertex AI Service** to use **gemini-2.5-flash**. Click Run to execute the code.

    ```
    <copy>
    import vertexai
    from langchain_google_vertexai import VertexAI

    # set the LLM to get response
    llm = VertexAI(
        model_name="gemini-2.5-flash",
        max_output_tokens=8192,
        temperature=1,
        top_p=0.8,
        top_k=40,
        verbose=True,
    )
    </copy>
    ```

17. The code below builds the prompt template to include both the question and the context, and instantiates the knowledge base class to use the retriever to retrieve context from Oracle Database 26ai. Click Run to execute the code.

    ```
    <copy>
    # Set up a template for the question and context, and instantiate the database retriever object

    template = """Answer the question based only on the following context:
                {context} Question: {question} """
    prompt = PromptTemplate.from_template(template)
    retriever = knowledge_base.as_retriever(search_kwargs={"k": 10})
    print("The template is:",template)
    print(retriever)
    </copy>
    ```

18. Invoke the chain

    This is the key part of the RAG application. It is the LangChain pipeline that chains all the components together to produce an LLM response with context. The chain will embed the question as a vector. This vector will be used to search for other vectors that are similar. The top similar vectors will be returned as text chunks (context). Together the question and the context will form the prompt to the LLM for processing. And ultimately generating the response.

    The code defines the RAG chain process and invokes the chain. Click Run to execute the code.

    ```
    <copy>
    # Chain the entire process together, retrieve the context, construct the prompt with the question and context, and pass to LLM for the response

    s5time = time.time()
    print("We are sending the prompt and RAG context to the LLM, wait a few seconds for the response...")
    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
            | prompt
            | llm
            | StrOutputParser()
    )

    response = chain.invoke(user_question)
    print(user_question)
    print(prompt)
    print(response)
    # Print timings for the RAG execution steps

    s6time = time.time()
    print("")
    print( f"Send user question and ranked chunks to LLM and get answer duration: {round(s6time - s5time, 1)} sec.")
    </copy>
    ```

    Click Run to execute the congrats code.

    ```
    <copy>
    print("")
    print("Congratulations! You've completed your RAG application with AI Vector Search in Oracle Database 26ai running on Oracle Database@Google Cloud using Vertex AI - Gemini")
    </copy>
    ```

## Task 5: Run the RAG Application with Interactive UI

In this task you will run the RAG application interactively using a simple user interface. You can select and load from several PDF documents, and ask your own question in the prompt. This is the same application with the 7 essential RAG steps as the previous tasks but demonstrates use through a user interface.

1. From the VSCode terminal, ensure you're in the `oracle-ai-database-gcp-vertex-ai` directory with the venv activated:

    ```
    <copy>
    cd oracle-ai-database-gcp-vertex-ai
    source venv/bin/activate
    </copy>
    ```

2. Your credentials should already be configured in the `.env` file from Task 3. The Streamlit application automatically reads from this file.

3. Run the interactive menu script and select option 1 (Streamlit RAG Application):

    ```
    <copy>
    ./run.sh
    </copy>
    ```
    
    This launches a menu where you can select:
    - **Option 1**: Streamlit RAG Application (port 8502)
    - Other options for different agent implementations
    
    Alternatively, run the Streamlit app directly:
    
    ```
    <copy>
    streamlit run python/oracle_ai_database_langchain_streamlit.py --server.port 8502
    </copy>
    ```

    

4. Click **Open in Browser** to launch the application in a browser. If the prompt doesn't show up, open a browser and launch the application - http://IP-Address-of-Compute-VM:8501.

    

    Your application will now be running. Simply follow the UI.

5. Click the **Browse files** button and load a PDF document.

    After a few seconds the PDF document will be loaded, transformed to text, chunked, and vectorized into Oracle Database 26ai.

    A prompt area will now appear for you to ask a question about your PDF. You can type in your own question or use the suggestions listed below.

6. Type a question and hit return.
    
    In a few seconds the LLM will answer the question and respond with context stored in Oracle Database 26ai.

    

Suggestions

For the Oracle Database 26ai documentation:

* What are the new features in Oracle Database 26ai
* Tell me more about AI Vector Search
* Tell me more about new enhancement to SQL
* Tell me more about JSON Relational Duality
* List 5 new features of Oracle 26ai database

### Conclusion

In this task you ran a RAG application with a UI using the same steps for RAG leveraging Oracle Database@Google Cloud and Google Vertex AI. The blueprint is the same. Now it's your turn. Experiment with different transformers for different data sources. It could be video, audio, text and more. They're all embedded as vectors in Oracle Database 26ai.

By using AI Vector Search in Oracle Database 26ai, you can build RAG applications with important context without having to retrain the LLM. The context is stored, searched and retrieved from Oracle Database 26ai and passed to Google Vertex AI Gemini Flash Model to generate accurate, up to date, and targeted responses to your prompts.

## Task 6: (Optional) Understand HuggingFace vs Vertex AI Embeddings - Comparison

This task explains the two embedding approaches available for Oracle AI Vector Search and helps you choose the right one for your use case.

### Embedding Options

**1. HuggingFace Embeddings** (`all-MiniLM-L6-v2`)
- ✅ Free, runs locally
- ✅ No API dependencies (works offline)
- ✅ 384 dimensions (smaller vectors, less storage)
- ⚠️ Lower quality compared to enterprise-grade solutions
- ⚠️ Requires local compute resources

**2. Vertex AI Embeddings** (`text-embedding-004`)
- ✅ Enterprise-grade quality (95-98% accuracy)
- ✅ 768 dimensions (richer semantic information)
- ✅ State-of-the-art Google technology
- ⚠️ Paid service (~$0.00001 per 1K characters)
- ⚠️ Requires GCP authentication and internet

### Quick Comparison

| Aspect | HuggingFace | Vertex AI |
|--------|-------------|-----------|
| **Cost** | Free | ~$0.50-5/month typical usage |
| **Dimensions** | 384 | 768 |
| **Quality** | Good (85-90%) | Excellent (95-98%) |
| **Execution** | Local | Cloud API |
| **Setup** | Simple | Requires GCP project |
| **Best For** | Development, demos, learning | Production, enterprise apps |

### Storage Requirements (for 1000 chunks)

- **HuggingFace**: ~1.5 MB (384 floats × 4 bytes × 1000)
- **Vertex AI**: ~3 MB (768 floats × 4 bytes × 1000)

### When to Use Each

**Use HuggingFace When:**
- Learning or development environment
- Cost is the primary concern
- No GCP access or offline operation needed
- Working on local machine or demos

**Use Vertex AI When:**
- Production deployment
- Quality and accuracy are critical
- Already using GCP infrastructure
- Enterprise or commercial application
- Budget allows minimal API costs

### Current Implementation

The production application (`oracle_ai_database_langchain_streamlit.py`) uses **Vertex AI text-embedding-004** for:
- Better semantic understanding
- Production-quality results
- Integration with existing GCP services
- 768-dimensional vectors for richer context

For learning and local development, the HuggingFace version remains valuable for cost-free experimentation and understanding embedding fundamentals.

### Note on Migration

If you need to switch between embedding models, you must re-embed all documents since the vector dimensions differ (384 vs 768). The vectors are not compatible and cannot be mixed in the same table.

You may now **proceed to the next lab**.

## Acknowledgements

- **Authors/Contributors** - Paul Parkinson, Dev Advocate  
                           - Vivek Verma, Master Principal Cloud Architect, North America Cloud Engineering
- **Last Updated By/Date** - Paul Parkinson, January 2026