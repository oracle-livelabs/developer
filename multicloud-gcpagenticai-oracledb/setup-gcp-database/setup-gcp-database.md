# Deploy Oracle AI Database and GCP Compute Instance

## Introduction

In this lab, you will deploy Oracle Autonomous Database on Oracle Cloud Infrastructure and set up a compute instance on Google Cloud Platform that will serve as the foundation for your agentic AI applications.

Estimated Time: 20 minutes

### Objectives

* Provision Oracle Autonomous Database with AI features enabled
* Create a compute instance on GCP with necessary AI/ML libraries
* Configure networking between GCP and Oracle Cloud
* Set up Python environment with required dependencies

### Prerequisites

* Oracle Cloud account with credits available
* Google Cloud Platform account with Vertex AI enabled
* Access to create resources in both clouds

## Task 1: Create Oracle Autonomous Database

1. Log in to Oracle Cloud Console

2. Navigate to **Autonomous Database** from the main menu

3. Click **Create Autonomous Database**

4. Configure the database:
   - **Compartment**: Select your compartment
   - **Display name**: `AgenticAI_DB`
   - **Database name**: `AGENTICAIDB`
   - **Workload type**: Transaction Processing
   - **Deployment type**: Serverless
   - **Database version**: 26ai (or latest available)
   - **OCPU count**: 1
   - **Storage**: 1 TB
   - **Auto scaling**: Enabled

5. Create administrator credentials:
   - **Username**: ADMIN
   - **Password**: Create a strong password (save this securely)

6. Choose network access:
   - Select **Secure access from everywhere** (for this workshop)
   - For production, configure private endpoints

7. Click **Create Autonomous Database**

8. Wait for the database to provision (approximately 2-3 minutes)

   

## Task 2: Enable AI Features

1. Once the database is provisioned, click on the database name

2. Click **Database Actions** > **SQL**

3. Sign in with ADMIN credentials

4. Verify AI Vector Search is available:
   ```sql
   SELECT * FROM V$VERSION;
   ```

5. The database is now ready with built-in AI capabilities including:
   - AI Vector Search
   - Select AI

## Task 3: Download Wallet

1. From the Autonomous Database details page, click **Database Connection**

2. Click **Download Wallet**

3. Create a wallet password and download the ZIP file

4. Save this wallet file - you'll need it for connecting from GCP

   

## Task 4: Create GCP Compute Instance

1. Log in to Google Cloud Console

2. Navigate to **Compute Engine** > **VM instances**

3. Click **Create Instance**

4. Configure the instance:
   - **Name**: `agentic-ai-workstation`
   - **Region**: Choose a region (e.g., us-central1)
   - **Zone**: Select any zone in the region
   - **Machine type**: e2-standard-4 (4 vCPUs, 16 GB memory)
   - **Boot disk**: 
     - OS: Ubuntu 22.04 LTS
     - Size: 50 GB

5. Under **Identity and API access**:
   - Service account: Compute Engine default service account
   - Access scopes: Allow full access to all Cloud APIs

6. Under **Firewall**:
   - Allow HTTP traffic
   - Allow HTTPS traffic

7. Click **Create**

   

## Task 5: Connect to GCP Instance and Setup Environment

1. Once the instance is running, click **SSH** to connect

2. Update the system:
   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

3. Install Python and pip:
   ```bash
   sudo apt install python3-pip python3-venv -y
   ```

4. Install required libraries:
   ```bash
   sudo apt install python3-dev libpq-dev -y
   ```

5. Install Oracle Instant Client:
   ```bash
   sudo apt install alien libaio1 -y
   cd /tmp
   wget https://download.oracle.com/otn_software/linux/instantclient/2340000/oracle-instantclient-basic-23.4.0.24.05-1.el8.x86_64.rpm
   sudo alien -i oracle-instantclient-basic-23.4.0.24.05-1.el8.x86_64.rpm
   ```

6. Create a Python virtual environment:
   ```bash
   cd ~
   python3 -m venv ai-agent-env
   source ai-agent-env/bin/activate
   ```

7. Install Python packages:
   ```bash
   pip install --upgrade pip
   pip install oracledb
   pip install google-cloud-aiplatform
   pip install langchain langchain-google-vertexai
   pip install chromadb
   pip install numpy pandas
   ```

## Task 6: Upload and Configure Oracle Wallet

1. Upload the wallet ZIP file to your GCP instance:
   - Use `gcloud compute scp` or the SSH upload feature
   ```bash
   # From your local machine
   gcloud compute scp /path/to/Wallet_AGENTICAIDB.zip agentic-ai-workstation:~/
   ```

2. On the GCP instance, create wallet directory:
   ```bash
   mkdir -p ~/wallet
   cd ~/wallet
   unzip ~/Wallet_AGENTICAIDB.zip
   ```

3. Set environment variable:
   ```bash
   echo 'export TNS_ADMIN=$HOME/wallet' >> ~/.bashrc
   source ~/.bashrc
   ```

## Task 7: Test Database Connection

1. Create a test Python script:
   ```bash
   cat > ~/test_connection.py << 'EOF'
   import oracledb
   
   # Update with your credentials
   username = "ADMIN"
   password = "YourPassword"
   dsn = "agenticaidb_high"  # From tnsnames.ora
   
   try:
       connection = oracledb.connect(
           user=username,
           password=password,
           dsn=dsn,
           config_dir="/home/your_username/wallet",
           wallet_location="/home/your_username/wallet",
           wallet_password="YourWalletPassword"
       )
       print("Successfully connected to Oracle Database!")
       
       cursor = connection.cursor()
       cursor.execute("SELECT banner FROM v$version")
       for row in cursor:
           print(row)
       
       cursor.close()
       connection.close()
   except Exception as e:
       print(f"Error: {e}")
   EOF
   ```

2. Run the test:
   ```bash
   python test_connection.py
   ```

3. You should see a successful connection message and version information

## Task 8: Configure GCP Vertex AI Access

1. Enable Vertex AI API (if not already enabled):
   ```bash
   gcloud services enable aiplatform.googleapis.com
   ```

2. Set up authentication:
   ```bash
   gcloud auth application-default login
   ```

3. Test Vertex AI access:
   ```python
   cat > ~/test_vertex.py << 'EOF'
   from google.cloud import aiplatform
   import vertexai
   
   # Initialize Vertex AI
   PROJECT_ID = "your-project-id"  # Update this
   REGION = "us-central1"
   
   vertexai.init(project=PROJECT_ID, location=REGION)
   
   print(f"Vertex AI initialized for project: {PROJECT_ID}")
   print(f"Region: {REGION}")
   EOF
   ```

4. Update the script with your project ID and run:
   ```bash
   python test_vertex.py
   ```

Congratulations! You have successfully set up Oracle AI Database and a GCP compute instance with all necessary dependencies for building agentic AI applications.

You may now **proceed to the next lab**.

## Learn More

* [Oracle Autonomous Database Documentation](https://docs.oracle.com/en/cloud/paas/autonomous-database/)
* [GCP Compute Engine Documentation](https://cloud.google.com/compute/docs)
* [Vertex AI Setup](https://cloud.google.com/vertex-ai/docs/start/cloud-environment)

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Last Updated By/Date** - Paul Parkinson, December 2025
