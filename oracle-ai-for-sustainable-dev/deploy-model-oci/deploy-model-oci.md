# Deploy Your Own ChatGPT/AI Model On OCI

## Introduction

This lab walks you through the steps to deploy your own LLM (such as Chat GPT) on OCI. 
Estimated Time: 30 minutes

### Objectives

In this lab, you will:
- Deploy a Large Language Models using NVIDIA OCI Bare Metal Compute Instances (NVIDIA A10 Tensor Core GPUs), with an inference server called vLLM.

### Prerequisites

This lab assumes you have:
- An Oracle Cloud account
- SSH Keys

[![Deploying LLMs with NVIDIA GPUs on OCI Compute Bare Metal](https://github.com/oracle-devrel/oci-terraform-genai-llm-on-gpuvms/blob/main/img/a10_Custom_Inference.jpg?raw=true)](https://www.youtube.com/watch?v=ol5-SQhnKx)


## Task 1: Deploy Infrastructure

   1. Clone the repository:

      git clone https://github.com/oracle-devrel/oci-terraform-genai-llm-on-gpuvms

   2. Create/edit a terraform.tfvars file with the following 9 variables (compartment, tenancy, region, user OCIDs, and key location fingerprint model_path huggingface_access_token and ssh_public_key):

   3. `cd oci-terraform-genai-llm-on-gpuvms` and vi terraform.tfvars to include the following

       ```
       <copy>
      # Authentication
      tenancy_ocid         = "OCID of OCI Tenancy"
      user_ocid            = "OCID of OCI User "
      fingerprint          = "OCI User fingerprint"
      private_key_path     = "OCI User private key path"
      # Region
      region = "OCI Region"
      # Compartment
      compartment_ocid = "OCID of OCI Compartment"
      #LLM Information
      model_path = "PATH of your LLM - example meta-llama/Meta-Llama-3-8B"
      huggingface_access_token = "READ access token from Hugging face"
      ssh_public_key="SSH Public key to access the BM"
       </copy>
       ```
     
      The private key and fingerprint need to be added to your OCI user within your tenancy, in Identity >> Domains >> OracleIdentityCloudService >> Users. You can use the section on "API Keys" to create a key pair and obtain the tenancy and user OCIDs.

      If you don't have one already, you can create a public-private keypair by running `ssh-keygen`

   4. Depending on the compute shape you want to use, modify `variables.tf` (instance_shape variable) and setup.sh (parallel_gpu_count). If you have a cluster of n GPUs, the GPU count should also be n.

   5. Execute the Terraform plan & apply:
       ```
       <copy>
        terraform init
        terraform plan
        terraform apply
       </copy>
       ```
      
   6. (Optional) After you're done with development and want to delete the stack, run the following command:
       ```
       <copy>
        terraform destroy
       </copy>
       ```
      Note: this action is irreversible!

## Task 2: Execution Workflow
   
   1. These are the created OCI resources with the Terraform stack:

      - OCI VM based on a GPU Image
      - OCI API Gateway and Deployment, which exposes the calls to the LLM through an API hosted on OCI

   2. `setup.sh` is executed inside the Terraform script (you don't need to run it).

      With your own HF access token, to be able to pull the Large Language Model.

      This script will install all necessary software libraries, modules, and load the LLM.

      It will start and provide an inference endpoint, so we can later call the model through an API if we want to.

## Task 3: Use the LLM
   
   - By default, the startup script exposes LLM inference with an OpenAI-compatible route. This framework basically allows us to Plug and play models easily, as well as bringing exposed API endpoints to a common framework, even with models that are very different from standard GPT models. It also enables new supported features like streaming / Chat completion/embeddings/detokenization...
   - Some of the possible routes (OpenAI compatible) using the vLLM are:
      - /v1/models
     - /v1/completion
     - /v1/chat/completion

   After Terraform has completed, refer the execution outcome to fetch the URL and API key:
   ```
   <copy>
   terraform output LLM_URL
   "https://XXXX.<OCIREGION>/path/name"
   terraform output API_KEY
   "AlphaNumeric..."
   </copy>
   ```

We can run the currently enabled models in our LLM server.

Make sure to set the variables url and token with the information from the previous step.

   1. Asking for available models using curl:

export URL="<LLM_URL value>"
export TOKEN="<API_KEY value>"
curl -k $URL/v1/models  -H "Authorization: Bearer $TOKEN"

   2. Asking for available models using Python:

python scripts/api_gw_llm.py

   3. Chat completion using Python OpenAI library in this file:
   ```
   <copy>
   python scripts/completions_llm.py
   </copy>
   ```

   Basic Troubleshooting

   1. LLM inference is not ready or getting 504 error code when trying the URL:

      - Login to the VM where you've deployed the solution using the SSH private-key you created in chapter 1.
      - Check the startup logs - Default path /home/opc/llm-init/init.log.
      - For any failures, refer to setup.sh to know about which exact steps to run manually
      - Check the vLLM service is up and running:
   ```
   <copy>
   sudo systemctl status vllm-inference-openai.service
   </copy>
   ```
 
   2. Details about LLM usage or response. We are capturing inference logs under path /home/opc/vllm-master with in file vllm_log_file.log. Incase wish to push the logs to a specific path,update file bash.sh and bash_openai.sh with in the same path and restart the service.
   ```
   <copy>
   #Update below line with in file bash.sh or bash_openai.sh
   export vllm_log_file=<new absolute path to the logs>
   sudo systemctl restart  vllm-inference-openai.service
   </copy>
   ```


## Acknowledgements
* **Author** - Nacho Martínez Rincón, Data Scientist Advocate
* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Last Updated By/Date** - Paul Parkinson, 2024
