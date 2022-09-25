## Introduction

For the Digital Assistant to take advantage of the additional AI services available within the OCI environment, it is necessary to  grant the Digital Assistant itself access to the various AI Services APIs and REST endpoints.  This is achieved by applying the appropriate security policy within your OCI Tenancy. 

While the OCI AI services have SDKs for a number of different languages, including Java, Python, JavaScript, .Net etc. the easiest way to integrate these services into an ODA conversation is via their REST Service APIs.    By utilising the REST connector capability in ODA, the additional AI processing available within the AI services can be easily incorporated into the conversation flow. Thus adding additional functionality to the sophisticated Natural Language Processing (NLP) inherent within the Digital Assistant.


## Task 1: Granting Access to OCI AI services

**Note:** In the Oracle Cloud (OCI), access rights are defined, and scoped, within a set of hierarchical virtual “containers” referred to as compartments.  By associating a security policy with a compartment, all products provisioned within that compartment (or subsequent child containers) inherit, and enforce, the access rights defined in the policy.

1. Open the OCI Console for the tenancy used to provision your ODA instance and navigate to the **“Identity & Security” > “Policies”** page

![](images/1.OCI_Console.png =50%x*  "")  
	
	
2. In the Compartment Dropdown list, select the (root) compartment, the name of which will match that of the tenancy you created when activating your Oracle Cloud Account.

![](images/2.Compartment.png =20%x*  "")  

	
3. Having selected the Root compartment, click **[Create Policy]** to open the policy editor.  Fill in the form with the following details:
  | Property | Value |
 | ----------- | ----------------- |
 | Name | AIServicesAccessPolicy |
 | Description | Allow any users in the Tenancy to access the Language & Vision AI Services |
 | Compartment | Confirm this is pointing to your root compartment.  Tenancy Name -> Root |
	
4. Set the Policy Builder’s **“Show Manual Editor”** toggle to **“ON”**

5. Paste the following Policy statement into the Policy Builder

```
    allow any-user to use ai-service-language-family in tenancy
    allow any-user to use ai-service-vision-analyze-image in tenancy
``` 

6. Click Create and confirm the subsequent inclusion of the Policy Statements in the **AIServicesAccessPolicy** policy.

<!-- 
====================================================================
= Creating ODA REST Resources for the OCI AI Services              =
====================================================================
-->



## Task 2: OCI AI Language Service: Detect Language model



1. Open the ODA Builder, select **“Settings” > “API Services”** from the main menu

		
![](images/3.API_Services_Menu.png =40%x*  "") 


	
2. Click the **[+ Add REST Service]** button to bring up the Create REST Service Dialog

	
3. Create a REST Service Resource for the OCI AI Language Service: Detect Language model.

   -  Set the required properties in the Create REST Service Dialog.

 | Property | Value |
 | ----------- | ----------------- |
 | Name | DetectLanguage |
 | Endpoint | https://language.aiservice.**[Data-Center-Region]**.oci.oraclecloud.com/20210101/actions/detectDominantLanguage. <br><br> Where **[Data-Center-Region]** matches the home region to which you have provisioned your tenancy and the ODA instance. <br><br> eg: language.aiservice.**ap-sydney-1**.oci.oraclecloud.com  |
 | Description | REST Resource for AI Language Service – Detect Language |
 | Methods | **POST** <br> Choose the POST method from the drop-down list displayed when you click on the Methods field. |


![](images/4.Create_REST_Service.png =20%x*  "") 


- Click **[Create]** to create the initial REST Resource definition.

	


4. Supply Security credentials for the API call.

ODA REST Connector resources supports several different credential types to authenticate to secured REST Services.  The Oracle Cloud Infrastructure includes the “OCI Resource Principal” credential type.  This allows a service to securely call another service, within the same tenancy, without the need to supply individual user credentials.
	
- Set the Authentication Type to **“OCI Resource Principal”**

		
![](images/5.OCI_Resource_Principal.png =20%x*  "") 

		
- Within the Methods section, confirm that the POST Method is highlighted.  If not already expanded, click on the Request Chevron (>) to expose the properties of the REST request.
		
- Confirm that the **Content Type** is defined as **application/json**

		
- Copy the following JSON into the request’s “Body” definition as an example Payload

	```
    {"text": "Bom dia queria pedir uma pizza"}
    ```
	
    **Note:** You can click on the [Use Edit Dialog] to load the JSON document into a larger Editor window if there is insufficient space to edit the JSON within the field directly.
	
![](images/6.Language_Request_Body.png =50%x*  "") 

		
   
5. Test the validity of the REST Resource by Clicking on the **[> Test Request]** button.

![](images/7.Language_Response_Payload.png =30%x*  "") 

  
6. If you did not receive a 200 Status with the corresponding payload indicating that the supplied input was in Portuguese, close the dialog and confirm the validity of the properties for the REST service.


If the outcome was successful (Status 200), click the **[Save as Static Response]** to save the response to be used as MOCK data if the service is not available as you build your Conversation flow.


 ![](images/8.Language_Response_Static.png =30%x*  "") 
		
  		
 		
7. The basic integration of ODA to the **OCI-AI Service Language – Detect Language** is now complete.


## Task 3: OCI AI Language Service: Detect Sentiment model

Now we do the same for the Language Sentiment API service.

1. Create a new REST Service Resource for the **OCI AI Language Service: Detect Sentiment Model**, following the same steps as above (from step #2) and using the following details.

   | Property | Value |
   | ----------- | ----------------- |
   | Name | DetectSentiment |
   | Endpoint | https://language.aiservice.**[Data-Center-Region]**.oci.oraclecloud.com/20210101/actions/batchDetectLanguageSentiments <br> <br> Where **[Data-Center-Region]** matches the home region to which you have provisioned your tenancy and the ODA instance. <br><br> eg: language.aiservice.**ap-sydney-1**.oci.oraclecloud.com |
   | Description | REST Resource for AI Language Service – Detect Sentiment |
   | Methods | POST |
   | Authentication Type | OCI Resource Principal |
   | Methods - Content Type | Application/json |
   | Methods - Body | { "documents": [{ <br>"key":  "pizzaFB",<br> "text": "The pizza turned up quickly and was still piping hot.  It tasted great! I’ll order again"  }] } |


2. Add the required additional Parameter to the URI by clicking on the (+) next to the Parameters section.
3. Enter the following details for the new Parameter

 | Property | Value |
 | ----------- | ----------------- |
 | level | SENTENCE | Query |




    - Click on the “Tick” to accept the parameter

4. Test the Validity of the REST Service Resource by clicking on the [> Test Request] button
    - If the outcome was successful (Status 200), click the [Save as Static Response] to save the response payload as MOCK data if the service is not available during the chatbot’s development.
5. The basic integration of ODA to the **OCI-AI Service Language – Detect Sentiment** is now complete.



## Task 4: OCI AI Vision Service: Analyze Image

1. Open the ODA Builder, select **“Settings” > “API Services”** from the main menu

	
	
2. Click the **[+ Add REST Service]** button to bring up the Create REST Service Dialog

	
3. Create a REST Service Resource for the OCI AI Vision Service: Analyze Image.

   -  Set the required properties in the Create REST Service Dialog.

 | Property | Value |
 | ----------- | ----------------- |
 | Name | AnalyzeImage |
 | Endpoint | https://vision.aiservice.<**[Data-Center-Region]**.oci.oraclecloud.com/20220125/actions/analyzeImage. <br><br> Where **[Data-Center-Region]** matches the home region to which you have provisioned your tenancy and the ODA instance. <br><br> eg: vision.aiservice.**ap-sydney-1**.oci.oraclecloud.com  |
 | Description | REST Resource for AI Vision Service – Analyze Image |
 | Methods | **POST** <br> Choose the POST method from the drop-down list displayed when you click on the Methods field. |


![](images/createvision.png =20%x*  "") 


- Click **[Create]** to create the initial REST Resource definition.

	


4. Supply Security credentials for the API call.

ODA REST Connector resources supports several different credential types to authenticate to secured REST Services.  The Oracle Cloud Infrastructure includes the “OCI Resource Principal” credential type.  This allows a service to securely call another service, within the same tenancy, without the need to supply individual user credentials.
	
- Set the Authentication Type to **“OCI Resource Principal”**

		
![](images/5.OCI_Resource_Principal.png =20%x*  "") 

		
- Within the Methods section, confirm that the POST Method is highlighted.  If not already expanded, click on the Request Chevron (>) to expose the properties of the REST request.
		
- Confirm that the **Content Type** is defined as **application/json**

		
- Copy the following JSON into the request’s “Body” definition as an example Payload

	```
    {
    "features": [
        {
            "featureType": "TEXT_DETECTION"
        }
    ],
    "image": {
        "source": "INLINE",
        "data": “iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg== "
    },
    "compartmentId": "ocid1.compartment.oc1..aaaaaaaavrseiwy3uhon3lkj5ysalqxhezfr3pkkwdgunwkqdumd2pxplpja"
}

    ```
	
       **NOTE:** the “data” payload is a base64 encoded message for a 1 pixel picture. This request needs a base64 payload for the image we want to analyse.
	


-   The compartmentId is the ocid of the compartment where the ODA instance is located (or the root compartment in the tenancy).

In the OCI Console go to **Compartments**
![](images/ocid.png =20%x*  "") 
Copy the **OCID** of the root comparment (or the one where the ODA instance is located)
![](images/comp.png =30%x*  "") 

		
   
5. Test the validity of the REST Resource by Clicking on the **[> Test Request]** button.

![](images/7.Language_Response_Payload.png =30%x*  "") 

  
6. If you did not receive a 200 Status with the corresponding payload indicating that the supplied input was in Portuguese, close the dialog and confirm the validity of the properties for the REST service.


If the outcome was successful (Status 200), click the **[Save as Static Response]** to save the response to be used as MOCK data if the service is not available as you build your Conversation flow.


 ![](images/response.png =30%x*  "") 
		
  		
 		
7. The basic integration of ODA to the **OCI-AI Vision – Analyze Image** is now complete.