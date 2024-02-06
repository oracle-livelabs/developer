# Setup environment

## Introduction

In this lab, we will set up Azure Vault and Azure Config access to it for microservices/applications.

### Objectives

In this lab, you will:

* Create Azure Vault.  Add secrets for password and wallet to the vault.
* Setup App Config access to the vault.

### Prerequisites

This lab assumes:

* You have an Oracle Cloud account with OCI and Tenancy administration privileges to create policies and compartments.

  > **Note:**  Policies are only required if you cannot create or use a OCI resources. If you are a tenancy administrator, you will have access to all the resources, and you can **optionally skip policy creations in this lab**.

## Task 1: Create Application Registration

   1. Click `New Registration`

      ![New App Registration](images/newappregistration.png)


   2. Create a new registration

      ![Create a new registration](images/registerapp.png)

      ![App registration](images/appregistration.png)

## Task 2: Create Vault and Secrets For Wallet and Password

   1. From the home screen, click `Key Vaults` and `Create`

      ![Create App Config](images/keyvaultsfromhomepage.png)

   2. Select the correct resource group, provide a name, and create the vault. (this is the equivalent of issuing the command `az keyvault create --name multicloudvault --resource-group myapp-rg`)

      ![Create App Config](images/createkeyvaultdetail.png)

   3. Select `Secrets` on the sidebar menu of the vault created in the previous step and then click `Generate/Import`

      ![Create App Config](images/createkeyvaultdetail.png)

   4. Name the secret `wallet` and provide the base64 value of the contents of cwallet.sso in the wallet zip as the secret value.
      You can issue the command `base64 -i /Users/pparkins/Downloads/Wallet_IndADW/cwallet.sso` to get this value.
      (this is the equivalent of issuing the command `az keyvault secret set --name wallet --vault-name multicloudvault --value "base64walletcontents"`

      ![Create App Config](images/walletvaultsecret.png)

   5. Repeat the same for `password`

## Task 3: Create Application Config with Access Roles

   1. Click `New Registration`

      ![Create App Config](images/createappconfig.png)

      ![Create App Config Success](images/createappconfigsuccess.png)

      ![Create App Config Overview](images/createappconfigoverview.png)


   2. Click `Access Control (IAM)` and click `Add role assignment`

      ![Access Control (IAM)](images/createappconfigiam.png)
 
      Search for and add App Config ownership/access roles.  Then click `Next`.
      ![Search for and add App Config roles](images/addroleassignmentaddrole.png)
      
      Search for and add members. Then click `Next`. 
      ![Search for and add members](images/addroleassignmentmembers.png)

      View Conditions. Then click `Next` and `Review + assign`.
      ![View Conditions](images/addroleassignmentconditions.png)

      Click `Check access` to verify access for user`.
      ![Check access](images/checkroleassignment.png)


## Task 4: Create App Config Secrets

   1. From the application configuration page click `Create` and then `Key Vault reference`

      ![Create App Config](images/appconfigcreate.png)


   2. Create the reference using the appropriate `Key`, `Key Vault`, and `Secret` value as shown here for the `wallet_location`.

      ![Create App Config Success](images/appconfigcreatedetail.png)


   3. Do the same for the `password` 


   4. Do the same for the `connect_descriptor` and `user` except select `Key Vault reference` when creating rather than `Key-value`


This concludes this lab. You can **proceed now to the next lab**.

## Learn More

* [OCI Documentation](https://docs.oracle.com/en-us/iaas/Content/home.htm)

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate, Oracle Database

* **Last Updated By/Date** - 2024.