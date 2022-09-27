## Introduction

The Oracle Digital Assistant can manage when the users upload documents or pictures during the conversation, but it does not look into the content of those uploads. 

The OCI AI Vision service brings another AI capability that allows us to detect objects, recognize text and label images. It is also able to identify and extract data from documents such as invoices, receipts, resumes, passports, payslip, drivers license and many more.

In this LAB we will  configure the dedicated flow that will allow the user to upload a voucher where the AI Vision service will validate the voucher.

## Task 1: Map the flow to intent

1.  The started skill has a **intent.apply.voucher**, but we need to map it to the intent.
2.  In Flows, press **Map Flow**, and map flow **intent.apply.voucher** to intent **pizza.apply.voucher**

![](images/map.PNG =20%x*  "")

## Task 2: Use the Vision service to validate a voucher

-   Let's explore the steps of the existing **intent.apply.voucher** flow

![](images/flow.png =90%x*  "") 

1. **askVoucher**: The flow starts with a message from the assistant towards the user, asking for an upload of the voucher.

-   This is the message sent to the user
![](images/askvoucher3.png =20%x*  "") 

2. **base64**: This state will pick up the uploaded picture and encode it into a base64 (this is required as the AI Vision Service accepts base64 encoded images). 
  <br>Behind the scenes there is a Custom Component already deployed that will take care of this. 

* ***NOTE:*** Custom components allow us to use a bot-node-js SDK to implement complex logic or integrations. It is out of scope for this HOL.

![](images/b64.png =20%x*  "") 

The output will be a base64 payload and that will be stored in a variable named **b64**

![](images/b64_2.png =20%x*  "") 


3. **callRestService**: Here we call the OCI AI Service Vision, by using the previously configured REST service.
<br>You can see there is an error in this state, which means we need to configure it properly.

![](images/callrest.png =10%x*  "") 
  
![](images/rest.png =20%x*  "") 

*   Select **AnalyzeImage**

![](images/rest2.png =20%x*  "") 

*   Select **POST**

*   Press **Expression** and paste:
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


![](images/rest3.png =20%x*  "") 

Select the existing variable called **output**. 

4. **setVariable**: The output of the REST request will contain all the extracted words, so we want to store that in a variable.

![](images/set.png =20%x*  "") 

```
${output.value.responsePayload.imageText.words[1].text}
```

5. **Switch**: Then we have a Switch statement that will check the value of the variable and based on that take the appropriate transition.

![](images/switch.png =20%x*  "") 


***NOTE***: This is a very simplistic approach to the Vision service. We do not know the type of image being uploaded and may need a more robust approach to handle the REST request. The goal of this LAB was just to show the Power of the OCI AI Vision service. 

## Task 3: Test the Flow
1.	Train the Skill using “Trainer tm” and once trained open the skill in the Bot Preview

Type:
```
I have a voucher
```

![](images/voucher1.PNG =20%x*  "") 

when prompted to upload a voucher, press the **attach button** and use one of the below URL options (copy the URL):

* [Pizza Voucher for 25 $](https://objectstorage.eu-amsterdam-1.oraclecloud.com/n/idppdqf7rmfq/b/HOL/o/Pizza%2BVoucher25.png)

* [Beer Voucher](https://objectstorage.eu-amsterdam-1.oraclecloud.com/n/idppdqf7rmfq/b/HOL/o/Beer.png)

* [Pizza Voucher for 15 $](https://objectstorage.eu-amsterdam-1.oraclecloud.com/n/idppdqf7rmfq/b/HOL/o/Pizza%2BVoucher15.png)


![](images/voucher.PNG =30%x*  "") 

![](images/result.PNG =40%x*  "") 

![](images/result2.PNG =40%x*  "") 



This ends the Hands-on lab!

In this short session you have expanded on the “Pizza Order” bot and would have seen how the Digital Assistant can easily utilise the sophisticated capabilities presented by the OCI AI services.


