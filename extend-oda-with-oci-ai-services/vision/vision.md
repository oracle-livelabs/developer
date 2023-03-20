## Introduction

The Oracle Digital Assistant can handle uploads of documents or images during the conversation, but it does not look into the content of those uploads.

The OCI AI Vision service brings another AI capability that allows the skill to detect objects and recognize text and label images. This API also enables the skill to identify and extract data from documents such as invoices, receipts, resumes, passports, payslips, drivers licenses, and many more.

In this Lab we will configure the dedicated flow that will allow the user to upload a voucher where the AI Vision service will validate the voucher.


## Task 1: Map the Flow to Intent

1.  The starter skill has a **intent.apply.voucher**, but we need to map it to the intent.
    - Click **Flows** in the left navbar, then click **Main Flow**.
    - Click  ![](../vision/images/add.png)  next to **Intent Events**.
    - Select **pizza.apply.voucher** from the Intent Name field.
    - Select **intent.apply.voucher** from the Mapped Flow field. Then click **Create**.
        ![](images/map.png =20%x*)



## Task 2: Use the Vision Service to Validate the Discount Voucher Uploaded by Users

1. Before you get to work, take a look at the existing flow **intent.apply.voucher**.  You'll complete this flow by adding the call to the OCI AI Service Vision. 

![](images/flow.png =90%x*  "") 

- **askVoucher**: The flow starts with a message requesting users to upload their discount pizza vouchers. ![](images/askvoucher3.png =20%x*  "") 

- **base64**: Because the AI Vision Service only accepts base64 encoded images, this state intercepts the uploaded image and encodes it as base64. A custom component (base64), which has already been deployed to this skill, handles the encoding.
![](images/b64.png =10%x*  "") 
**Note**: While this lab doesn't focus on custom components, it's worth noting that, using the <code>bots-node-sdk</code>, you can implement complex logic and integrations.

The output from the custom component is a base64 payload, which gets stored in a variable named **b64**.
![](images/b64_2.png =10%x*  "") 

2. When the custom component returns the base64 payload, the flow transitions to the **callRestService** state. You'll need to edit this state to call OCI AI Service Vision.

![](images/callrest.png =10%x*  "") 
  
![](images/rest.png =20%x*  "") 

- Click the callRestService state to open the Component page of its propety inspector.
- Select **AnalyeImage** from the Rest Service field.
- Select **Post** from the Method field.
![](images/rest2.png =15%x*  "") 
- Switch on **Expression** for the “request body” field.

- You're going to paste the following object into the Request Body field. Before you do, however, you must define the <bold>compartmentId</bold> key with the OCID value for the compartment that you set in _LAB 1: Task 1 - Granting Access to OCI AI Services_. 

```
{
    "features": [
        {
            "featureType": "TEXT_DETECTION"
        }
    ],
    "image": {
        "source": "INLINE",
        "data": "${b64.value}"
    },
    "compartmentId": "copy your ocid here"
	
}
```
The <code>"featureType": "TEXT_DETECTION"</code> means that the service detects text in the image. This service also accepts other types of analysis like <code>IMAGE_CLASSIFICATION</code> and <code>OBJECT_DETECTION</code>. 
<br><code>"data": "${b64.value}"</code> extracts the value of the b64 variable that stores the base64 payload.

 - From the Result Variable menu, select **output**.


![](images/rest3.png =20%x*  "") 

3. Now that you've created the REST call, take a look at the states that hold the output of the REST call and 

 - **setVariable**: The output of the REST call contains all of the extracted words, which are stored in the voucher variable named in this state.

 - **Switch**: Checks the value stored in the voucher variable and then routes the flow accordingly. 

Note: The goal of this lab is to just introduce you to the potential of the OCI AI Vision service, so we took a very simplistic approach. In the real world, you would need a more robust approach to handle a variety of images. 


## Task 3: Test the Flow
1.	Train the skill using Trainer Tm. This might take a few minutes.
2. When the training completes, click **Preview**. 
3. Enter _I have a voucher_.

![](images/voucher1.png =20%x*  "") 

4. When prompted to upload a voucher, click **Attach** and then copy one of the following URLs into the Attachement URL field:

- Pizza Voucher for $25:
<a href = 'https://objectstorage.eu-amsterdam-1.oraclecloud.com/n/idppdqf7rmfq/b/HOL/o/Pizza%2BVoucher25.png'>https://objectstorage.eu-amsterdam-1.oraclecloud.com/n/idppdqf7rmfq/b/HOL/o/Pizza%2BVoucher25.png</a> 

- Beer Voucher: 
<a href = 'https://objectstorage.eu-amsterdam-1.oraclecloud.com/n/idppdqf7rmfq/b/HOL/o/Beer.png'>https://objectstorage.eu-amsterdam-1.oraclecloud.com/n/idppdqf7rmfq/b/HOL/o/Beer.png</a>

- Pizza Voucher for $15:
<a href = 'https://objectstorage.eu-amsterdam-1.oraclecloud.com/n/idppdqf7rmfq/b/HOL/o/Pizza%2BVoucher15.png'>https://objectstorage.eu-amsterdam-1.oraclecloud.com/n/idppdqf7rmfq/b/HOL/o/Pizza%2BVoucher15.png</a>


![](images/voucher.png =30%x*  "") 

![](images/result.png =40%x*  "") 

![](images/result2.png =40%x*  "") 



***Congratulations!*** In this session, you've expanded the pizzeria skill and enhanced it with Oracle Cloud Infrastructure (OCI) AI services.


