# Text Detection And Summarization For Health Report Results

## Introduction

This lab will show you how to use Oracle Database, OCI Vision AI Text Detection, and Oracle Gen AI services
The use case involves the interpretation health test results and recommended steps for everyday individuals.

Estimated Time:  3 minutes


### Objectives

-   Use Oracle Database, OCI Vision AI Text Detection, and Oracle Gen AI

### Prerequisites

- Completion of Setup lab and "Run AI App" lab

## Task 1: Configure and run the chat bot application

   1. Open a terminal/shell.

   2. cd to the `python-rag-chatbot` directory where the workshop src exists, ie `cd [workspace_src_directory]/python-rag-chatbot`.

   3. Generate a `security_token_file` and an oci config profile entry that contains it.
      Simply issue the following command (providing the correct values for `--config-file` and `--profile`)

      This technique bring up a browser for you to authenticate and receive and write the token file locally and update your .oci/config file with the same..

      When  prompted, provide the name of the profile you would like to create:

       ```text
       <copy>oci session authenticate ; oci iam region list --config-file /Users/YOURHOMEDIR/.oci/config --profile MYSPEECHAIPROFILE --auth security_token</copy>
       ```

      * Note: After some period of time, if the token is not renewed, `AUTHENTICATION_FAILURE: Could not authenticate` will be thrown and this command will need to be re-run.
      * More information can be found here: https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/clitoken.htm

   4. Run `pip install -r requirements.txt`
   
   5. Check you config_rag.py file and make sure your API endpoint belongs to chicago region and select the database you would like to use, such as Chroma or Oracle Database 23ai

   6. Set your compartment_id OICD inside the files init_rag_streamlit_exp.py and init_rag.py 
   
   7. Change the database type you need to modify at config file and you see the logic inside create_vector_store
   
   8. Start a container for the 23ai database by running docker or podman command as documented, such as `podman run -d --name 23ai -p 1521:1521 -e ORACLE_PWD=[YOURPASSWORD] -v oracle-volume:/Users/pparkins/oradata container-registry.oracle.com/database/free:latest`

   9. Create and configure a `vector` tablespace and user
   
   10. Add the connection information for this Oracle database to init_rag_streamlit.py and init_rag_streamlit_exp.py
   
   11. Run `./run_oracle_bot_exp.sh`

   12.  You will now see a streamlit chat bot and can ask questions about the Oracle documentation or add documentation, rerun, and add questions about it.


You may now **proceed to the next lab.**..

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Author** - Pankaj Tiwari, Programmer 
* **Last Updated By/Date** - Paul Parkinson, 2024
