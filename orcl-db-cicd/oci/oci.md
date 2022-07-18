# Oracle Cloud Infrastructure (OCI)

## Introduction

Development and deployment platforms can be created on Oracle Cloud Infrastructure. Development platform is a Compute Node using Cloud Developer Image, having some development packages and tools pre-installed. Deployment is performed on a Docker Container running in Container Cluster (OKE). At the same time, Oracle Cluster Infrastructure Registry (OCIR) is used to store the Docker Image resulted from the automated build, and used for the deployment. Application data is store inside Oracle Database Cloud Service, running on a Database System, and using Multitenant Architecture for consolidation and resource optimization.

In this lab we will create all the required components on OCI.

Estimated Lab Time: 60 minutes

## Task 1: Generate SSH Keys

1. On a linux machine you can generate the required ssh keys

    ````
    ssh-keygen
    ````

2. No passphrase (empty). This generates a Private key, and a Public OpenSSH key.

3. API Keys require PEM Public key. Convert Private key to Public PEM.

    ````
    openssl rsa -pubout -in ~/.ssh/id_rsa -out ~/.ssh/id_rsa_pub.pem
    ````

    >**Note** : If you receive an error like '*Expecting: ANY PRIVATE KEY*' when running the above command, it means your private key start with '*-----BEGIN OPENSSH PRIVATE KEY-----*'. We expect it to start with '*-----BEGIN RSA PRIVATE KEY-----*'. This can be fixed by executing:
    >````
    >ssh-keygen -p -N "" -m pem -f ~/.ssh/id_rsa
    >````

4. Some cloud instances require a Public SSH2 key. Convert Public OpenSSH to Public SSH2.

    ````
    ssh-keygen -e -f ~/.ssh/id_rsa.pub > ~/.ssh/id_rsa_ssh2.pub
    ````

5. List all keys.

    ````
    ls ~/.ssh/id_rsa*

    /home/oracle/.ssh/id_rsa      /home/oracle/.ssh/id_rsa_pub.pem
    /home/oracle/.ssh/id_rsa.pub  /home/oracle/.ssh/id_rsa_ssh2.pub
    ````
6. View the contents of all ssh key files.
    ````
    tail -n +1 ~/.ssh/id_rsa*

    ==> /home/oracle/.ssh/id_rsa <==
    -----BEGIN RSA PRIVATE KEY-----
    MIIEpQIBAAKCAQEA6P1ouD4rDlZdMYUbAJJUPh55rR2GKf3PUNIg//1xI86JNvUb
    y0a6zMGDjqd+oHw2cSmANf7nGvQtLlf9UxTQujCtscD1eX5wTjyqgJ1RVrVFqG6y
    Qo0bwfnHA0cpKt8DHPCOHnv2Iy6aOtoJxf7sBk2LHKWQJq6+TUW5JYoAmEPq71M4
    sN9MaqXwp8oB0SXEwnyV8RRmttHNnVTX5N3rOANCQMCXZ9SDPA/1Hh/9ZbAU9bVw
    vFo0nZaaUiZahupzN0xDH1iyL1tkRRRV7ZgQ+XQWqnt31iGfLvpj9l1HUHO0/2FM
    eMtoL4Guwa24LsgfA6Q6MQWjlX5YtrA+5MCGjQIDAQABAoIBAQCZGKsPJgq0yRtD
    xusPXRfuGahqkNPwE89+lBULIUaO+NBBRJ6W3Esy8JW5z2XtnrFHerW8xVqm43ws
    z7SuOydMsV/xRZIH24WAY2zGRpmEGGlFXDfWc1KiC7cx+Dic6x3ojklUzq/WPnEp
    6swxRmlhWuLmWAR45qo1rHMUr7HkWrthc3FGs/g4cn6bwQoQcGPEjmY7oZhD7EFx
    p2PYr/6KtHkp422UqoyULdF9gundoapzpqiA8KCatzsoba39h+TLl/krvjl5UPC5
    Y00KHdG4nehkxZxYeTcuUdaNXzVW3WEnxBaoATJmvwbemrfxEXP/P8aMrrbT8xkH
    S7oDd8IhAoGBAP+qNGNDMegUFlc9O4MA6brZ8vEDFuSLY3WH0Y42COkyuzH/9OGM
    nr1yoFfMDYDtGFKEbRej5DAerjVlO8xUDyRDhCiIevs2zmpPgZuCHMw8E2JS9RZM
    owq1pUjYP4b3EiUrDtN2mZwW7CAnSHoRT6+8REBtzUJGv2IR3l3jRv1TAoGBAOlL
    mF+d3nowKovHGtly0VfTOB1hOOJYTE8PhAQbPU4kvxNy/SAZLRwcUFX3Ebqf/yXy
    rc9riV03qw7lijbRL9nkuaptcomaqJhPhv2uVHBoD/53r3a2HhawKOV6V8FDoZ8E
    XwmCpa3+IkrxgryYNQQg4PaxQolVubPcAWF2XBCfAoGAedajIKrlHbR08R49PjEx
    Mdqr7C+MuV20CE6xjxQxKvECRNG14cch3ybBQxX7WXWkIa76TknMdSIp40hbNwTY
    Mm/6i1Z/RTjZJdC9814OW0ZF9pWSNw5OpMvr+MsVezxDaXMbnarniXtjC++smn+l
    eho+bHXnW65bhmD9l8C4FAECgYEA3jwy9LLQYhlMDkcm3omvvjfpNqOMqqFuX8np
    +ndwWOZMVtytIEybWjHmnV10uBD930pkJDjOa8xB2Tj0BvAS40AtVZpZB5gajq0D
    bNkKeuHGiqO8tBscYoSBEMkQm3wvk+l4FvkrlqmGRVn3LmzX5AzmAFovhd/xvNIR
    RqSXYwUCgYEAoPa/aG2iMapdJUzZvOzISQ8HIlCkV8xvMC6y/VfEgqc4oFIA9dx/
    8VSc19DjUDrcjwwDMZefSq8aMTgpbDZIe8AWsTpyxt70e52qru1JcG3VjhXY9ETs
    goijgKBVsc1tQc9ourBiVD5QvqDIsSQdoVSvtJ8IP/AztOOkWsm/9vs=
    -----END RSA PRIVATE KEY-----
    
    ==> /home/oracle/.ssh/id_rsa.pub <==
    ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDo/Wi4PisOVl0xhRsAklQ+HnmtHYYp/c9Q0iD//XEjzok29RvLRrrMwYOOp36gfDZxKYA1/uca9C0uV/1TFNC6MK2xwPV5fnBOPKqAnVFWtUWobrJCjRvB+ccDRykq3wMc8I4ee/YjLpo62gnF/uwGTYscpZAmrr5NRbkligCYQ+rvUziw30xqpfCnygHRJcTCfJXxFGa20c2dVNfk3es4A0JAwJdn1IM8D/UeH/1lsBT1tXC8WjSdlppSJlqG6nM3TEMfWLIvW2RFFFXtmBD5dBaqe3fWIZ8u+mP2XUdQc7T/YUx4y2gvga7BrbguyB8DpDoxBaOVfli2sD7kwIaN oracle@devtest2019

    ==> /home/oracle/.ssh/id_rsa_pub.pem <==
    -----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6P1ouD4rDlZdMYUbAJJU
    Ph55rR2GKf3PUNIg//1xI86JNvUby0a6zMGDjqd+oHw2cSmANf7nGvQtLlf9UxTQ
    ujCtscD1eX5wTjyqgJ1RVrVFqG6yQo0bwfnHA0cpKt8DHPCOHnv2Iy6aOtoJxf7s
    Bk2LHKWQJq6+TUW5JYoAmEPq71M4sN9MaqXwp8oB0SXEwnyV8RRmttHNnVTX5N3r
    OANCQMCXZ9SDPA/1Hh/9ZbAU9bVwvFo0nZaaUiZahupzN0xDH1iyL1tkRRRV7ZgQ
    +XQWqnt31iGfLvpj9l1HUHO0/2FMeMtoL4Guwa24LsgfA6Q6MQWjlX5YtrA+5MCG
    jQIDAQAB
    -----END PUBLIC KEY-----

    ==> /home/oracle/.ssh/id_rsa_ssh2.pub <==
    ---- BEGIN SSH2 PUBLIC KEY ----
    Comment: "2048-bit RSA, converted by oracle@devtest2019 from OpenSSH"
    AAAAB3NzaC1yc2EAAAADAQABAAABAQDo/Wi4PisOVl0xhRsAklQ+HnmtHYYp/c9Q0iD//X
    Ejzok29RvLRrrMwYOOp36gfDZxKYA1/uca9C0uV/1TFNC6MK2xwPV5fnBOPKqAnVFWtUWo
    brJCjRvB+ccDRykq3wMc8I4ee/YjLpo62gnF/uwGTYscpZAmrr5NRbkligCYQ+rvUziw30
    xqpfCnygHRJcTCfJXxFGa20c2dVNfk3es4A0JAwJdn1IM8D/UeH/1lsBT1tXC8WjSdlppS
    JlqG6nM3TEMfWLIvW2RFFFXtmBD5dBaqe3fWIZ8u+mP2XUdQc7T/YUx4y2gvga7BrbguyB
    8DpDoxBaOVfli2sD7kwIaN
    ---- END SSH2 PUBLIC KEY ----
    ````
    >**Note** : Use these keys as examples, and for training purpose only. It is highly recommended to create your own SSH keys for your development environments.

## Task 2: Login to Oracle Cloud Infrastructure

1. Oracle cloud console URL: [https://console.eu-frankfurt-1.oraclecloud.com](https://console.eu-frankfurt-1.oraclecloud.com)

- Tenant: oci-tenant
- Username: oci-username
- Password: oci-password

## Task 3: Create Network

1. Click on hamburger menu ≡, then Networking > **Virtual Cloud Networks**. 
2. Click **Start VCN Wizard**.

3. Select **VCN with Internet Connectivity**. Start VCN Wizard.

- VCN Name: [Your Initials]-VCN (e.g. VLT-VCN)
- Compartment: [Your Compartment]

4. Next. Create.

### Create Subnet

5. When complete, under Networking > **Virtual Cloud Networks**. 
6. Click **[Your Initials]-VCN** for details. Click **Create Subnet**.

- Name: Public LB Subnet-[Your Initials]-VCN (e.g. Public LB Subnet-VLT-VCN)
- Subnet Type:  Regional
- CIDR Block: 10.0.2.0/24
- Route Table: Default Route Table for [Your Initials]-VCN
- Subnet Access: Public Subnet
- DHCP Options: Default DHCP Options for [Your Initials]-VCN
- Security List: Default Security List for [Your Initials]-VCN

7. **Create Subnet**.

## Task 4: Create Database

1. Click on hamburger menu ≡, then **Bare Metal, VM, and Exadata** under Databases. **Create DB System**.

- Select a compartment: [Your Compartment]
- Name your DB system: [Your Initials]-DB (e.g. VLT-DB)
- Select a shape type: Virtual Machine
- Select a shape: VM.Standard2.1
- Add public SSH keys: Upload SSH key files > id_rsa.pub
- Choose a license type: Bring Your Own License (BYOL)

2. Specify the network information.

- Virtual cloud network: [Your Initials]-VCN
- Client Subnet: Public Subnet
- Hostname prefix: [Your Initials]-host (small case, e.g. vlt-host)

3. Next.

- Database name: [Your Initials]DB (e.g. VLTDB)
- Database version: 19c
- PDB name: PDB01
- Password: WelCom3#2020_
- Select workload type: Transaction Processing

4. **Create DB System**.

## Task 5: Create Compute Instance

1. Click on hamburger menu ≡, then Compute > **Instances**. 
2. Click **Create Instance**.

- Name: [Your Initials]-VM (e.g. VLT-VM)
- Image or operating system: Change Image > Oracle Images > Oracle Cloud Developer Image
- Virtual cloud network: [Your Initials]-VCN
- Subnet: Public Subnet
- Assign a public IP address
- Add SSH keys: Choose SSH key files > id_rsa.pub

3. Create.

## Task 6: Create Container Cluster

1. Click on hamburger menu ≡, then Developer Services > **Container Clusters (OKE)**. 
2. Click **Create Cluster**.

3. Select **Custom Create** > **Launch Workflow**.

- Name: [Your Initials]cluster (e.g. VLTcluster)
- Kubernetes Dashboard Enabled
- Tiller (Helm) Enabled

4. Next.

- VCN: [Your Initials]-VCN
- Kubernetes Service LB Subnets: Public LB Subnet-[Your Initials]-VCN

5. Next.

- Node Pool Name: [Your Initials]-pool
- Image: Oracle-Linux-7.7-latest
- Shape: VM.Standard.E2.1
- Number of nodes: 2
- Availability Domain: any
- Subnet: Public Subnet
- Public SSH Key: paste the content of id_rsa.pub

    ````
    ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDo/Wi4PisOVl0xhRsAklQ+HnmtHYYp/c9Q0iD//XEjzok29RvLRrrMwYOOp36gfDZxKYA1/uca9C0uV/1TFNC6MK2xwPV5fnBOPKqAnVFWtUWobrJCjRvB+ccDRykq3wMc8I4ee/YjLpo62gnF/uwGTYscpZAmrr5NRbkligCYQ+rvUziw30xqpfCnygHRJcTCfJXxFGa20c2dVNfk3es4A0JAwJdn1IM8D/UeH/1lsBT1tXC8WjSdlppSJlqG6nM3TEMfWLIvW2RFFFXtmBD5dBaqe3fWIZ8u+mP2XUdQc7T/YUx4y2gvga7BrbguyB8DpDoxBaOVfli2sD7kwIaN oracle@devtest2019
    ````

6. Next. **Create Cluster**. Close.

7. Copy the Cluster OCID in your notes text file, Cluster Id: ocid1.cluster.oc1.eu-frankfurt-1.aa[some_long_string]mu2d

## Task 7: Create Container Repository

1. Click on hamburger menu ≡, then Developer Services > **Registry (OCIR)**. 
2. Click **Create Repository**.

- Repository Name: [Your Initials]rep (small case, e.g. vltrep)
- Access: Private

3. **Create Repository**.

## Task 8: Create Authentication Token

1. Click on profile icon 👤 on upper right corner, then on the name of your user. It opens Identity > Users > User Details page. 
2. On the lower left side menu, click on **Auth Tokens**.
 
3. Click **Generate Token**.

- Description: CICD Token

4. Generated Token: **Copy this token for your records in a text file on your computer** in a notes text file. It will not be shown again.

## Task 9: Create API Key

1. In the same dialog, or click on profile icon 👤 on upper right corner, then on the name of your user. It opens Identity > Users > User Details page. 
2. On the lower left side menu, click on **API Keys**.

3. Click **Add Public Key**. Select **Paste Public Keys**.

- Public Key: paste the content of id_rsa_pub.pem

    ````
    -----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6P1ouD4rDlZdMYUbAJJU
    Ph55rR2GKf3PUNIg//1xI86JNvUby0a6zMGDjqd+oHw2cSmANf7nGvQtLlf9UxTQ
    ujCtscD1eX5wTjyqgJ1RVrVFqG6yQo0bwfnHA0cpKt8DHPCOHnv2Iy6aOtoJxf7s
    Bk2LHKWQJq6+TUW5JYoAmEPq71M4sN9MaqXwp8oB0SXEwnyV8RRmttHNnVTX5N3r
    OANCQMCXZ9SDPA/1Hh/9ZbAU9bVwvFo0nZaaUiZahupzN0xDH1iyL1tkRRRV7ZgQ
    +XQWqnt31iGfLvpj9l1HUHO0/2FMeMtoL4Guwa24LsgfA6Q6MQWjlX5YtrA+5MCG
    jQIDAQAB
    -----END PUBLIC KEY-----
    ````

4. Click Add. Save the **Fingerprint** in your notes text file.

## Task 10: Gather OCID Values

1. During the workshop, we will need some OCID values from Oracle Cloud console. Get these values and save them in your text notes file.

### User OCID

2. In the same dialog, or click on profile icon 👤 on upper right corner, then on the name of your user. Copy OCID: ocid1.user.oc1..aa[some_long_string]xi5q

### Tenancy OCID

3. Click on hamburger menu ≡, then Administration > **Tenancy Details**. Copy OCID: ocid1.tenancy.oc1..aa[some_long_string]3gfa

### Compartment OCID

4. Click on hamburger menu ≡, then Identity > **Compartments**. Click on your Compartment. Copy OCID: ocid1.compartment.oc1..aa[some_long_string]s6ha

## Acknowledgements

- **Author** - Valentin Leonard Tabacaru
- **Last Updated By/Date** - Valentin Leonard Tabacaru, Principal Product Manager, DB Product Management, May 2020

## Need Help?
Please submit feedback or ask for help using our [LiveLabs Support Forum](https://community.oracle.com/tech/developers/categories/livelabsdiscussions). Please click the **Log In** button and login using your Oracle Account. Click the **Ask A Question** button to the left to start a *New Discussion* or *Ask a Question*.  Please include your workshop name and lab name.  You can also include screenshots and attach files.  Engage directly with the author of the workshop.

If you do not have an Oracle Account, click [here](https://profile.oracle.com/myprofile/account/create-account.jspx) to create one.

