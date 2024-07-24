# Real-time Speech Transcription and NL2SQL/Select AI for doctor-patient conversations and EHRs

## Introduction

This lab will show you how to use I other data.

Healthcare Communication and Management (Goal 3: Good Health and Well-being)

	•	Application: Use speech transcription and NLP to transcribe and analyze doctor-patient conversations in real-time, generating structured data for Electronic Health Records (EHRs).
	•	Benefit: This can improve patient care by ensuring accurate and detailed medical records, enhancing diagnosis and treatment through better data analysis.
	•	Goal: Ensure healthy lives and promote well-being for all at all ages.

Estimated Time:  25 minutes


### Objectives

-   Use OCI Real-time Speech Transcription and Oracle Database NL2SQL/Select AI to analyze in real-time and generate EHRs of doctor-patient conversations.

### Prerequisites

- Completion of Setup lab

## Task 1: Do the setup in the "Chat with Your Data in Autonomous Database Using Generative AI" workshop

   1.  Go here: https://apexapps.oracle.com/pls/apex/r/dbpm/livelabs/run-workshop?p210_wid=3831



## Task 2: Build and run Python applicaiton

   1. Open a terminal/shell.

   2. cd to the `python-realtimespeech-selectai` directory where the workshop src exists, ie `cd [workspace_src_directory]`.

   3. Token-based authentication: https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/clitoken.htm

       ```text
       <copy>oci session authenticate ; oci iam region list --config-file /Users/YOURHOMEDIR/.oci/config --profile MYSPEECHAIPROFILE --auth security_token</copy>
       ```
      ![Create Security Token](images/createsecuritytoken.png " ")

      * Note: After some period of time, if the token is nto renewed, `AUTHENTICATION_FAILURE: Could not authenticate` will be thrown and this command will need to be re-run.

   4. In RealtimeClient.py, update **line 144** with your `compartmentId` and update **line 32** with your `authentication method` and `profile`

   5.  Install required Python libraries
   
      ```bash
      <copy>pip install -r requirements.txt</copy>
      ```

   6. Run Python File

      ```bash
        <copy>python src/RealtimeSpeechSelectAI.py</copy>
      ```

   8.  Allow access to the microphone if necessary and speech commands.
       You will see the words you speech in the console output.

   9. Say "select AI " and then remain silent and notice the return from the database for that NL2SQL/ Select AI query.

   7. Make changes in RealtimeSpeechSelectAI.py to further enhance the application...

        - modify the various parameters for the audio capture.
        - modify the various parameters for the realtime service. 
        - modify the Speech AI service endpoint if required.


You may now **proceed to the next lab.**..

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Last Updated By/Date** - Paul Parkinson, 2024
