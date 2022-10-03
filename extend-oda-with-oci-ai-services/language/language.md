
## Introduction

While the Oracle Digital Assistant implements a sophisticated multi-lingual NLP engine that natively supports a range of languages, there still may be languages that the skill can't understand. In this case, your skill needs to alert users that their messages are in a unsupported language. To detect the language, your skill can utilize the OCI AI-Language APIs. In this case, it's the DetectLanguage API. 

For this Tutorial, we will replace the default **intent.unresolved** flow, with a custom version that calls the AI service to determine the language of any utterance the bot was unable to understand.
This will follow a similar process to the **Detect Sentiment** flow above.

## Task 1: Sending an Unsupported Language Response to Users


1. Click <strong>Flows</strong> in the left navbar.
	
2. Click **+ Add Flow** .

    *   **Name** - `intent.unresolved.with.language.check`
    *   **Description** - `Customized unresolved intent flow that calls the OCI Select Language service.`
    *   **Intent Name** - `Not Defined`
    	

    -   Select <strong>Open created flow afterwards</strong> and then click <strong>Create</strong>.

			
3. Because you want to check the language of the utterance when this flow is called, the first state in this  flow will be a Call REST Service state. To add this state, choose <strong>Service Integration > Call REST Service</strong> from the Add state dialog (or enter REST in the Add state dialog's Search field).

    *   **Name** - `CallLanguageService`
    *   **Description** - `Call OCI Language API – Detect Language`


    -   Click <strong>Insert</strong>.
			
4. In the **CallLanguageService** Component page of the property inspector select the **DetectLanguage** REST service from the dropdown list.

	
5. Select the **POST** method from the Methods dropdown list.

	
6. Because you need to pass the unresolved utterance to the DetectLanguage API, you need to update the REST service request to include a reference to the user's latest input. To do this:

	- Switch **on** the Expression switch for the Request Body

	- Paste the following into the Request Body Field
			
            
            { "text": "${system.message.messagePayload.text}" }
            
			
	- Click outside the field to accept the input.

7. Confirm that the **Response Mode** is set to **Use Actual REST API Response**

	
8. As Flow Scoped variables are only available within the flow in which they were created, create another “Flow” variable in which to store the Response from the AI REST service.  As these need only be unique within the current flow, we can use the same name as before.

    * Create > Flow Scope Variable

    *   **Name** - `AIServicePayload`
    *   **Description** - `Variable to hold AI Service Response`
    *   **Variable Type** - **MAP**

    - Click **Apply** to create the variable
			
9. Open the **Transitions page** of the proprety inspector


10. Click on  ![](../images/add.png =1%x*  "") next to the **Action** to enter the  Transitions based on the outcome (success/error) of the REST Service call.

	
11. Select **failure** from the **Action Name** dropdown list.

	
12. Select **Add State** from the **Transition To** dropdown list.

	
13. Add a **Send Message** component to the flow to indicate an invalid REST service call.
    *   **Name** - `RequestFailed`
    *   **Description** - `Unsuccessful REST Request Message`

    - Click **Insert** button to add component to the flow.

14. Cick the **RequestFailed** state to open the Component page of its property inspector.

15. Enter the FreeMarker expression that references the resource bundle for the output message that displays when the service fails.

		${rb('requestFailed.message')}

	
16. With the failure transition complete, you need to add the **success transition** to the **CallLanguageService** state
    *   Select the **CallLanguageService** state in the Flow to expose its component palette and navigate to the **Transitions** tab.

	
17. Click on the ![](../images/add.png =1%x*  "") next to the “Action” to enter another Transition based on the outcome of the REST Service call.

	
18. Select **success** from the **Action Name** dropdown list.

	
19. Select **Add State** from the **Transition To** dropdown list.  This time add an **Invoke flow** component (you can find it under **Flow Control > Invoke Flow**)
    *   **Name** - `RespondToLanguage`
    *   **Description** - `Calling a predefined flow to respond to the language used in the given utterance`

		

20. Select the **respond.to.language** flow from the choice of available flows in the dropdown list.

21. Click on ![](../images/add.png =1%x*  "") next to the **Input Parameters** to specify the data to be passed to this flow.  In this case we want to pass in the ‘language’ that was detected in the utterance.

22. Choose the **language** parameter from the dropdown list.

23. Paste the following FreeMarker expression to retrieve the language detected in the  utterance.

        ${AIServicePayload.value.responsePayload.languages[0].name}

	- Click ![](../images/save.png =1%x*  "") ("Tick") to save the parameter definition.
     ![](images/parameter.png =20%x*)
			
24. To ensure that this flow executes when the user enters an utterance in a language for which this skill has not been trained:

 - Click <strong>Main Flow</strong> from the list of flows.
 - In the Events tab, expand Built-In Events. 
 - Select UnresolvedIntent. Then click ![](images/edit.png =2%x*).
 - Select <strong> intent.unresolved.with.language.check</strong> from the Mapped Flow list. Then click <strong>Apply</strong>.

***Congratulations!*** You've completed the custom unresolved intent flow that utlizes the OCI AI Language API.


<!-- 
====================================================================
= TEST OUT THE FLOW                                                =
====================================================================
-->
## Task 2: Test the Flow
1. Click <strong>Preview</strong>, located at the upper right.

2. Enter a phrase in English for which the skill has not been trained and hence would call the unresolved intent.

    **_“I want to order a Hamburger”_**
		
3. Now try the same phrase in other languages.

    **Chcę zamówić hamburgera” (Polish)**<br>
    **햄버거를 주문하고 싶어요” (Korean)**<br>
    **Vreau să comand un hamburger” (Romanian)**
	

