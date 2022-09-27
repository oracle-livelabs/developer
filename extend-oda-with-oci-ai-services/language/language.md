
## Introduction

While the Oracle Digital Assistant implements a sophisticated multi-lingual NLP engine, that natively supports a range of languages, there is likely to be the need to respond accordingly if the language used is not one supported natively.  That is, notifying the user that the bot is not able to understand the given language.	
To detect which language was entered, and subsequently print it out in the message to the user, the Digital Assistant can again utilise the OCI AI-Language APIs.  In this case using the **DetectLanguage** API.
For this Tutorial, we will replace the default **intent.unresolved** flow, with a custom version that calls the AI service to determine the language of any utterance the bot was unable to understand.
This will follow a similar process to the **Detect Sentiment** flow above.

## Task 1: Respond to the user if their utterance is in a Foreign Language


1. Navigate to the Flow Designer page for your skill.
	
2. Click **+ Add Flow** button to add a new flow to the skill using the following properties.

    *   **Name** - `intent.unresolved.with.language.check`
    *   **Description** - `Customised Unresolved Intent flow that calls the OCI AI Select Language service`
    *   **Intent Name** - `Not Defined`
    	

Check **open created flow afterwards** and click **Create**

			
3. As we want to check the language, as soon as the Flow is called, add a **Call REST Service** component as the Start State for the flow.

    *   **Name** - `CallLanguageService`
    *   **Description** - `Call OCI Language API – Detect Language`


Click **Insert** to update the flow
			
4. In the **CallLanguageService** component palette select the **DetectLanguage** REST service from the dropdown list.

	
5. Select the **POST** method from the Methods dropdown list.

	
6. As we want to pass the utterance that was unresolved to the Language API, update the REST service request to include a reference to the user’s latest input

	- Set the Request Body – **Expression** switch to **ON**

	- Paste the following into the Request Body Field
				```
            { "text": "${system.message.messagePayload.text}" }
            ```
			
	- Click outside the field to accept the input.

7. Confirm that the **Response Mode** is set to **Use Actual REST API Response"**

	
8. As Flow Scoped variables are only available within the flow in which they were created, create another “Flow” variable in which to store the Response from the AI REST service.  As these need only be unique within the current flow, we can use the same name as before.
    *   **Name** - `AIServicePayload`
    *   **Description** - `Variable to hold AI Service Response`
    *   **Variable Type** - **MAP**


    - Click **Apply** to create the variable
			
9. Navigate to the **Transitions** tab at the top of the **CallLanguageService** component Palette.


10. Click on the ![](../images/add.png =1%x*  "") next to the **Action** to enter the appropriate Transitions based on the outcome of the REST Service call.

	
11. Select **failure** from the **Action Name** dropdown list.

	
12. Select **Add State** from the **Transition To** dropdown list.

	
13. Add a **Send Message** component to the flow to indicate an invalid REST service call. Again because it is scoped to the specific flow we can reuse the component name.
    *   **Name** - `RequestFailed`
    *   **Description** - `Unsuccessful REST Request Message`

    - Click **Insert** button to add component to the flow.

14. Select the **RequestFailed** state in the flow to launch the component’s property Palette and navigate to the component Tab.

15. Again, enter the failed message Resource Bundle reference to print the appropriate output message, if the REST service fails.

		${rb('requestFailed.message')}

	
16. Select the **CallLanguageService** state in the Flow to expose its component palette and navigate to the **Transitions** tab.

	
17. Click on the ![](../images/add.png =1%x*  "") next to the “Action” to enter another Transition based on the outcome of the REST Service call.

	
18. Select **success** from the **Action Name** dropdown list.

	
19. Select **Add State** from the **Transition To** dropdown list.  This time add an **Invoke flow** component.
    *   **Name** - `RespondToLanguage`
    *   **Description** - `Calling a predefined flow to respond to the language used in the given utterance`

		

20. Select the **respond.to.language** flow from the choice of available flows in the dropdown list.

21. Click on the ![](../images/add.png =1%x*  "") next to the **Input Parameters** to specify the data to be passed to this flow.  In this case we want to pass in the ‘language’ that was detected in the utterance.

22. Choose the **"language"** parameter from the dropdown list.

23. Paste the following ${freemarker expression} to retrieve the language detected in the  utterance.

        ${AIServicePayload.value.responsePayload.languages[0].name}

	- Click the ![](../images/save.png =1%x*  "") ("Tick") to save the parameter definition
			
24. To ensure this flow is executed if the user enters an utterance in a language for which the Bot has not been trained.

25. Select **Main Flow** in the main list of flows and click on the “Unresolved Intent” entry under “Built-In Event” to expose the edit pencil icon.
			
	  ![](images/l1.png.png =60%x*  "")
      
26. Select **intent.unresolved.with.language.check** from the list of available flows and click **[Apply]**

	![](images/l2.png.png =60%x*  "")

This completes the development of the custom Unresolved Intent flow that utilises the OIC AI-Language API to detect if the language used is one that is supported by the Bot.


<!-- 
====================================================================
= TEST OUT THE FLOW                                                =
====================================================================
-->
## Task 2: Test The Flow
1. Test the flow by testing the intent in the conversation preview.

2. Enter a phrase in English for which the Bot has not been trained and hence would call the unresolved intent.

   - **_“I want to order a Hamburger”_**
		
3. Now try the same phrase in other languages

   - **Chcę zamówić hamburgera” (Polish)**
   - **햄버거를 주문하고 싶어요” (Korean)**
   - **Vreau să comand un hamburger” (Romanian)**
		

This ends the Hands-on lab!

In this short session you have expanded on the “Pizza Order” bot and would have seen how the Digital Assistant can easily utilise the sophisticated capabilities presented by the OCI AI services.

