## Introduction

The Oracle Digital Assistant can manage when the users upload documents or pictures during the conversation, but it does not look into the content of those uploads. 

The OCI AI Vision service brings another AI capability that allows us to detect objects, recognize text and label images. It is also able to identify and extract data from documents such as invoices, receipts, resumes, passports, payslip and many more.

In this LAB we will create a new intent where the user can apply a voucher, and the dedicated flows that will allow the user to upload a voucher where the AI Vision service will validate the voucher.

Allowed values are:
•	INVOICE
•	RECEIPT
•	RESUME
•	TAX_FORM
•	DRIVER_LICENSE
•	PASSPORT
•	BANK_STATEMENT
•	CHECK
•	PAYSLIP
•	OTHERS


The type of image analysis requested. The allowed values are:
•	IMAGE_CLASSIFICATION: Label the image.
•	OBJECT_DETECTION: Identify objects in the image with bounding boxes.
•	TEXT_DETECTION: Recognize text in the image.



## Task 1: Use the Vision service to validate a voucher

TODO
Let’s explore and apply some changes to the the existing **apply.voucher** flow

![](images/flow.gif =90%x*  "") 

This flow will be triggered for the event Intent "pizza.apply.voucher", and will
The flow starts with an askVoucher state, that will prompt the user to upload a picture of the voucher (the pictures will be provided later in the LAB)

![](images/askvoucher.png =20%x*  "") 

![](images/askvoucher2.png =20%x*  "") 

![](images/askvoucher3.png =20%x*  "") 



The second state will pick up the uploaded picture and encode it into base64 (this is required as the AI Vision Service accepts base64 encoded images). Behind the scenes there is a Custom Component *already deployed that will take care of this. 

*Custom components allow us to use a bot-node-js SDK to implement complex logic or integrations. Out of scope for this HOL

![](images/b64.png =20%x*  "") 

![](images/b64_2.png =20%x*  "") 

After the base64 we have 2 possible paths (error and success)



Then we call the AI Service Vision, with the LABEL TEXT_DETECTION. This means we will read the text from the voucher.

Configure the Service – select the REST API, provide Payload woth expression, and create an output variable







![](images/rest.png =20%x*  "") 

Select AIVISION

![](images/rest2.png =20%x*  "") 


SLECT POST

Press Expression and paste
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
    "compartmentId": "ocid1.compartment.oc1..aaaaaaaavrseiwy3uhon3lkj5ysalqxhezfr3pkkwdgunwkqdumd2pxplpja"
	
}


![](images/rest3.png =20%x*  "") 

Select output



After we have success or failure. 


The output of the REST request will contain all the extracted words, so we want to store that in a variable.

In success we store the variable

![](images/set.png =20%x*  "") 

```
${output.value.responsePayload.imageText.words[1].text}
```

Then we have a Switch statement that will check the value of the variable and based on that take the appropriate transition.

![](images/switch.png =20%x*  "") 


***NOTE***: This is a very simplistic approach to the Vision service. We do not know the type of image being uploaded and may need a more robust approach to handle the REST request. The goal of this LAB was just to show the Power of the OCI AI Vision service. 

## Task 2: Test the Flow
1.	Train the Skill using “Trainer tm” and once trained open the skill in the Bot Preview

Type:
```
I have a voucher
```

when prompted to upload a voucher use: TODO

2.	TODO

