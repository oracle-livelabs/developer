Before you Begin
----------------

This 30-minute tutorial shows you how to create a dialog flow declaratively using the Visual Flow Designer.

### Background

In this tutorial, you're going to add an order pizza flow to an existing skill that already has a completed cancel order flow. Your order pizza flow will branch to this existing flow. This pizza skill is a simplified version of the PizzaSkill - Visual Flow Designer that's described in [Tour of the Visual Flow Designer Sample Skill](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer-sample/).

### What Do You Need?

*   The starter skill, [`Visual_Flow_Designer_Starter_Skill.zip`](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/Visual_Flow_Designer_Starter_Skill(1.1).zip), which is included with this tutorial. Download this file to your local system.
*   Access to Oracle Digital Assistant Version 22.04 or higher

Explore the Starter Skill
-------------------------

If this skill is not already in your instance:

1.  Log into Oracle Digital Assistant.
2.  Click ![This is an image of the menu icon.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/top_menu.png) in the top left corner to open the side menu.
3.  Expand **Development** and then click **Skills**.
4.  Hide the menu by clicking it again.
5.  Click **Import Skill** (located at the upper right). You will see a warning (_Imported Ok, but note..._). You can ignore this warning.
6.  Browse to, then select `Visual_Flow_Designer_Starter_Skill.zip`.

If the skill has already been imported and/or you will be sharing the instance with others who might do this tutorial, clone the skill:

1.  On the Skills page, within the tile for `Visual_Flow_Designer_Starter_Skill`, click the Options menu icon, and select **Clone**.
2.  In the Display Name field, enter `<YourInitials>Visual_Flow_Designer_Starter_Skill`.
3.  Select **Open cloned skill afterwards**. Then click **Clone**.

### Review the Artifacts

If it's not already open, open Visual\_Flow\_Designer\_Skill by clicking the tile. Then take a look at the following artifacts.

2.  Intents ![This is an image of the Intents icon in the left navbar.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/intent_icon.png) -- Take a look at the **pizza.reg.orderPizza**, **pizza.reg.cancelPizza**, **pizza.ans.calories**, and **ans.proc.vegetarianPizza** intents. Note the conversation names for the **pizza.ans.calories**, and **ans.proc.vegetarianPizza** intents. In this tutorial, you'll either create flows for these intents, or reference them when you branch the dialog flow.
3.  Entities ![This is an image of the Entities icon in the left navbar.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/entities_icon.png) -- You'll declare variables for two of the composite bag entities: **cbe.pizza**, which supports the pizza menu, and **cbe.confirmation**, which is used to branch the flow. The resolution logic for cbePizza is executed through an entity event handler.
4.  Resource Bundles ![This is an image of the Resource Bundles icon in the left navbar.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/resource_bundles_icon.png) -- Following best practices, the prompts in this tutorial are executed through resource bundles, not through text strings. You'll reference the following resource bundles in your flow:
    
    Resource Bundle Key
    
    String
    
    `answerIntentIntroMessage1`
    
    `Hello! You were asking about`
    
    `answerIntentIntroMessage2`
    
    `Here's your answer:`
    
    `cbe.confirmation.message`
    
    `Your order is on the way.`
    
    `cbe.confirmation.prompt1`
    
    `You ordered a {0} {1} pizza. Is that right?`
    
    `pizza.messages.orderPizzaStart`
    
    `Hey, there! Let's get this order started!`
    
    `systemFlowName_ans.about.calories`
    
    `the calorie content of our pizzas`
    
    `systemFlowName_ans.proc.vegetarianPizza`
    
    `vegetarian pizzas`
    
5.  Reference flows -- This skill includes a set of reference flows to help you out if you run into problems. These flows are meant only as guides, not as functioning flows. Because they are not mapped to any events or reference any variables, the Visual Flow Designer notes these flows as having errors ![This is an image of the Error icon.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/error_icon.png). You can ignore them.

![Description of reference_flows.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/reference_flows.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/reference_flows.txt)

Tip:

You can use these flow as a quick reference. If you need a fully functioning skill, take a look at `Completed_VFD_Skill`. You can import [`this skill`](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/Completed_VFD_Skill(1.1).zip) to your instance if it's not already there.

Create Skill-Level Variables
----------------------------

You're going to start off by declaring a variable for the cbe.pizza entity.  
This variable will set the values for the pizza size and type. Because both the parent flow and the child flows need these values, you must create a skill-level variable so that all flows can access the values.  

1.  Click **Flows** ![This is an image of the Flows icon.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/flows_icon.png) in the left navbar.
2.  Click **Main Flow**.
![This is an image of the Main Flow link.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/main_flow.png)4.  Click **Skill Variables**.
![This is an image of the Skill Variables link.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/flow_designer_skill_variables.png)6.  Click **Add Variable** (located under **Custom Variables**).
![This is an image of the Add Variable button](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/add_variable_button_main_flow.png)8.  For the name, enter `pizza`.
9.  For the description, enter `Resolves the pizza menu`.
10.  Select **Entity** as the variable type, then select **cbe.pizza** as the entity name.
11.  Click **Apply**.

![Description of create_skill_variable_pizza.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/create_skill_variable_pizza.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/create_skill_variable_pizza.txt)

Build the Answer Intent Flow
----------------------------

In this step, you're going to create an answer intent that handles user questions about calories and vegetarian options. In Visual Flow Designer, you don't need to create generic answer intent flow like this because the Main Flow presents answer intents automatically. But through the simple answer intent flow that you'll create in this step, you learn about creating and customizing a flow for a standard event, the group of Main Flow-level events for handling standard use cases like unresolved intent, answer intent, and dialog error.

1.  Click **Add Flow**.
![This is an image of the Add Flow button.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/add_flow_button.png)3.  In the Create Flow dialog, enter `pizza.ans.genericHandler` as the name.
4.  For the description, enter `Generic answer intent flow`. Then click **Create**.

![Description of create_generic_answer_flow.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/create_generic_answer_flow.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/create_generic_answer_flow.txt)

6.  In the dialog flow editor, hover over the Start node, click the menu ![Description of sample-arch-image.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/menu_icon.png), then click **Add start state**.

![Description of add_start_state.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/add_start_state.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/add_start_state.txt)

8.  Select **User messaging**, then **Display Multimedia Messages**.

![Description of display_multi_media_messages.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/display_multi_media_messages.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/display_multi_media_messages.txt)

10.  Choose **Display Intent answer**.
11.  Accept the default name (displayIntentAnswer).
12.  For the description, enter General answer. Then click **Insert**.

![Description of display_intent_answer.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/display_intent_answer.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/display_intent_answer.txt)

When you're done, the flow should include the displayIntentAnswer state:

![This is an image of the displayIntentAnswer node.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/answer_intent_flow_display_answer.png)16.  Click the displayIntentAnswer state to open its property inspector.
17.  Click **Component** in the property inspector. Then click **Edit Response Items**.

![Description of edit_response_item_display_intent_answer.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/edit_response_item_display_intent_answer.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/edit_response_item_display_intent_answer.txt)

19.  Take a look at the default message at the Apache FreeMarker expression for the `text` property that references an answer intent:
    
    Copy
    
    "${skill.system.event.value.intent.answer}"
    
20.  The default expression returns only the answer. To create a friendlier message that includes a greeting, and the conversation name, update the `text` property with the following expression. Then click **Apply**.
    
    Copy
    
    "${rb('answerIntentIntroMessage1')} ${rb('systemFlowName\_'+skill.system.event.value.intent.intentName)}. ${rb('answerIntentIntroMessage2')} ${skill.system.event.value.intent.answer}"
    
    This expression references the following resource bundles to enable the skill to output "Hello! You were asking about <conversation name>. Here is your answer: <answer text>.
    
    *   `answerIntentIntroMessage1` -- `Hello! You were asking about`
    *   `systemFlowName_` -- Resource bundle for conversation name strings.
    *   `answerIntentIntroMessage2`" -- `Here's your answer:`
    
    ![Description of edit_response_item_intent_answer.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/edit_response_item_intent_answer.png)
    
    [Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/edit_response_item_intent_answer.txt)
    

### Map the Answer Intent Flow to an Event

You've completed the answer intent flow, but it can't yet display any answers. To trigger this flow when users ask about calories or vegetarian options, you need to return to the Main Flow to map it to an event that's dedicated to handling answer intents.

1.  Click **Main Flow**.
2.  If it's not already open, click **Events**.
3.  Click ![This is an image of the Add Built-in Event icon.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/add_action_icon.png) next to Built-In Events.
![This is an image of the Add Built-in Event icon.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/add_built-in_event_icon.png)5.  Select **Answer Intent** from the Unhandled Event Type list.
6.  Select **pizza.ans.genericHandler** as the mapped flow. Then click **Create**.

![Description of answer_intent_mapping.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/answer_intent_mapping.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/answer_intent_mapping.txt)

### Test the Answer Intent

Now we'll use the Skill Tester to make sure that the intent is resolved correctly and also see how the flow works.

1.  Before you can chat with the skill, be sure that it's been trained with Trainer Tm:
    *   Click **Train**.
    ![This is an image of the Train icon.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/train.png)*   Choose **Trainer Tm**, then click **Submit**.
2.  Click **Preview** to open the Skill Tester.
![Preview icon](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/test-icon.png)4.  Enter _How many calories?_

![Description of test_answer_flow.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/test_answer_flow.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/test_answer_flow.txt)

6.  Click **Reset**, then enter _Can I get a vegetarian pizza?_
7.  For both of these responses, take a look at the traversal from the Main Flow to the displayIntentAnswer state of the pizza.ans.genericHandler flow.

![Description of answer_intent_routing.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/answer_intent_routing.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/answer_intent_routing.txt)

9.  When you're done, click **Reset** and then close the Skill Tester.
![This is an image of the Reset button.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/tester_reset.png)

Tip:

If you run into problems, take a look at the `Reference_pizza.ans.genericHandler` flow. This flow does not function because it is not mapped to the Answer Intent event.

In this step, you've created a flow that handles all answer intents. If you want to add actions related to the answer, then you can create a flow dedicated to just one answer intent. The `pizza.ans.proc.veggiePizza` flow in the [sample skill](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer-sample/), PizzaSkill - Visual Flow Designer, is an example of using an answer intent as an entry point to a transactional flow: users asking for vegetarian options get routed to the order pizza flow, where the pizza menu is filtered for its vegetarian options.

Create the Order Pizza Flow
---------------------------

In this step, you're going to create the skill's primary flow.

1.  Click **Flows** in the left navbar (if it's not already open), then click **Add Flow**.
2.  Enter `intent.reg.order` as the flow name.
3.  Enter `Order pizza` flow as the description.
4.  Select **pizza.reg.orderPizza** as the Intent Name. Then click **Create**.

![Description of create_flow_order_pizza.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/create_flow_order_pizza.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/create_flow_order_pizza.txt)

### Create the Flow-Level Variable

In this step, you're going to declare a variable for the cbe.confirmation entity, whose yes and no values support the branching action that you'll add to the flow later on. Because the branching action is unique to this flow, the value set for this variable needs to be confined to this flow only. Not only is its usefulness limited to the flow, but its lifespan is also. Unlike the skill-scoped pizza variable you created earlier, you're going to create this flow-scoped variable within the intent.reg.order flow, not within the main flow.

1.  Click **intent.reg.order**.
2.  Click **Configuration**.

![Description of order_pizza_flow_flow_variables.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow_flow_variables.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow_flow_variables.txt)

4.  Click **Add Variable**.
5.  Complete the dialog by adding the following values before clicking **Apply**.
    *   **Name** - `confirmation`
    *   **Description** - `Flow branching variable`
    *   **Variable Type** - **Entity**
    *   **Variable Name** - **cbe.confirmation**
    
    ![Description of order_pizza_flow_flow_variable.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow_flow_variable.png)
    
    [Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow_flow_variable.txt)
    

### Build the Order Pizza Flow

For this short flow, you'll create a state for the skill-scoped composite bag pizza entity along with two other states that output text messages for greeting the user and confirming the order.

1.  Click **Flow**.
2.  Hover over the menu in the Start node, then click **Add start state**.
3.  Select **Send Message**.

![Description of order_pizza_flow_add_send_message_state.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow_add_send_message_state.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow_add_send_message_state.txt)

5.  Name the state `startPizzaOrder`.
6.  For the description, enter `Greeting message` and then click **Insert**.
7.  Click the **startPizzaOrder** state to open its property inspector. Click **Component** if the Component page is not already open.
8.  Instead of entering a text string for the greeting message, reference the resource bundle:
    
    Copy
    
    ${rb('pizza.messages.orderPizzaStart')}
    

![Description of order_pizza_flow_startPizzaOrder_rb.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow_startPizzaOrder_rb.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow_startPizzaOrder_rb.txt)

10.  Hover over the startPizzaOrder state to display its menu icon ![Description of sample-arch-image.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/menu_icon.png). Click the menu icon, then click **Add state**.

![Description of sample-arch-image.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow_add_state.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow_add_state.txt)

12.  Choose **Resolve Composite Bag**.
13.  Name the state `resolvePizza`.
14.  Enter `Pizza menu` as then description. Then click **Insert**.

![Description of order_pizza_flow_resolve_pizza.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow_resolve_pizza.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow_resolve_pizza.txt)

Note the next transition line that's inserted automatically as you add states.

![Description of next_transition.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/next_transition.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/next_transition.txt)

18.  In the Component page, select **pizza** as the composite bag entity variable.

![Description of order_pizza_flow_resolve_bag_properties.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow_resolve_bag_properties.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow_resolve_bag_properties.txt)

20.  Click the menu in the resolvePizza state, then click **Add state**.
21.  Select **Send Message**.
22.  Name the state `confirmMessage`.
23.  Enter `Confirmation message` as the description. Then click **Insert**.
24.  In the Component page of the property inspector, reference the confirmation message resource bundle:
    
    Copy
    
    ${rb('cbe.confirmation.message')}
    
    When you're done, the flow should look like this:
    
    ![Description of first_completed_flow.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/first_completed_flow.png)
    
    [Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/first_completed_flow.txt)
    

### Test Out the Flow

Now we're going to test out the flow so far.

1.  Open the Skill Tester.
![This is an image of the Skill Tester icon](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/tester_icon.png)3.  Enter _Order pizza_. Then complete the order by selecting the pizza type and size.

![Description of partial_flow_skill_tester.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/partial_flow_skill_tester.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/partial_flow_skill_tester.txt)

5.  Note the routing from the Main Flow to the intent.reg.order flow and the subsequent traversal from the startPizzaOrder state to the confirmMessage state.

![Description of order_pizza_flow.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow.txt)

7.  Click **Reset** and then close the Skill Tester.

In this step, you learned how to create an intent event flow that references a skill-level variable and resource bundles.

If you're having trouble completing this flow, take a look at the Reference\_intent.reg.orderPizza\_1 flow. This flow does not function because it is not mapped to an intent and does not reference the pizza variable.

Call Another Flow
-----------------

To handle the situation where a user decides to cancel their order before it is sent, you're going to branch the conversation to the pre-existing cancel order flow, intent.reg.cancelOrder (accessed by clicking **Flows** > **intent.reg.cancelOrder** in the left navbar). This simple flow outputs "All right, you can peacefully forget about your pizza." using a Send Message state that references the `pizza.messages.cancelOrder` resource bundle.

![Description of cancel_order_flow.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/cancel_order_flow.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/cancel_order_flow.txt)

If you were writing the dialog definition in YAML instead of the Visual Flow Designer, the order pizza and cancel pizza flows would be part of a monolithic block of code. Because of the modular approach afforded by the Visual Flow Designer, you create separate flows which you link together.

1.  Hover over the next transition line between the resolvePizza and the confirmMessage states. Then click ![Description of sample-arch-image.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/add_state_to_transition.icon.png) to add a state to the next transition.

![Description of order_pizza_flow_insert_state.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow_insert_state.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow_insert_state.txt)

3.  From the Add State dialog, select the Resolve Entity template by selecting **User Messaging** > **Resolve Entities** > **Resolve Entity**, or by entering resolve entity in the Search field.
![This is an image of the Search field.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/search_for_resolve_entity.png)5.  Name the state `confirmSelection`.
6.  For the description, enter `Resolves Confirmation entity`. Then click **Insert**.

![Description of order_pizza_flow_confirm_selection.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow_confirm_selection.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow_confirm_selection.txt)

8.  In the Component page of the property inspector for the confirmSelection state, choose **confirmation** as the flow-scope variable.

![Description of order_pizza_flow_confirmation_properties.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow_confirmation_properties.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow_confirmation_properties.txt)

10.  Hover over the next transition line that's between the confirmSelection state and the confirmMessage state, then click ![This is an image of the add state icon.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/add_state_to_transition.icon.png).
11.  Choose **Flow Control**. Then choose **Invoke Flow**.
12.  Name the state `cancelCurrentOrder`.
13.  For the description, enter `Calls intent.reg.cancelOrder` and then click **Insert**.

![Description of order_pizza_flow_invoke_flow.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow_invoke_flow.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow_invoke_flow.txt)

15.  In Component page, select **intent.reg.cancelOrder**, the cancel order flow, as the flow that will be called when the dialog transitions to this state. If you were passing values like pizza size and pizza toppings to the cancel order flow, then you'd also define input parameters for this component.

![Description of order_pizza_flow_cancel_current_flow_flow.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow_cancel_current_flow_flow.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow_cancel_current_flow_flow.txt)

17.  Hover over the next transition line between the confirmSelection and cancelCurrentOrder states and click ![This is an image of the add state icon.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/add_state_to_transition.icon.png) once again.
18.  Choose **Flow Control**, then **Switch**.
19.  Name the state `routeSelection`.
20.  Enter `Branches conversation` as the description. Then click **Insert**.

![Description of order_pizza_flow_add_switch.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow_add_switch.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow_add_switch.txt)

22.  In the Component page of the property inspector for the routeSelection state, select **Expression**.
23.  You need to reference the Yes and No values from the confirmation variable that you created for this flow. To do this, paste the following expression into the field:
    
    Copy
    
    ${confirmation.value.confirmation.primaryLanguageValue}
    
    This expression uses the format for referencing an item in a composite bag entity: `${cbeVariableName.value.itemName.primaryLanguageValue}`.
    

![Description of order_pizza_flow_confirmation_fm.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow_confirmation_fm.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow_confirmation_fm.txt)

25.  Open the Transitions page of the property inspector for the routeSelection state.
26.  Select **End flow (implicit)** as the Next Transition.

![Description of order_pizza_dialog_flow_add_routing_action.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_dialog_flow_add_routing_action.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_dialog_flow_add_routing_action.txt)

28.  Click to ![This is an image of the add action icon.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/add_action_icon.png) (located next to Action) to create the Yes transition:
    *   For Action Name, enter **Yes**.
    *   For Transition to, select **ConfirmMessage**.
    *   Click **Save** ![This is an image of the save icon.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/save.png).
29.  Click to ![This is an image of the add action icon.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/add_action_icon.png) to create the No transition:
    *   For Action Name, enter **No**
    *   For Transition to, select **cancelCurrentOrder**
    *   Click **Save** ![This is an image of the save icon.](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/save.png).
    
    ![Description of order_pizza_flow_route_selection_transitions.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow_route_selection_transitions.png)
    
    [Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow_route_selection_transitions.txt)
    
    At this point, the flow should look like this. Note the No and Yes transitions branching from the routeSelection state. Note also that there's a next transition wired to the cancelCurrentOrder state.
    
    ![Description of flow_after_switch.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/flow_after_switch.png)
    
    [Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/flow_after_switch.txt)
    
30.  To prevent a transition from the cancelCurrentOrder state to the confirmMessage state:
    *   Open the property inspector for the cancelCurrentOrder state.
    *   Select the Transitions page.
    *   Select **End flow (implicit)** as the next transition.When you're done, the flow should look like this:

![Description of completed_flow.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/completed_flow.png)

[Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/completed_flow.txt)

### Test out the Flow

Repeat the prior conversation in the Skill Tester for both the Yes and No options.

1.  Open the Skill Tester.
![This is an image of the Skill Tester icon](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/tester_icon.png)3.  Enter _Order pizza_. Select the pizza type and size.
4.  When you reach the confirmSelection state, choose **Yes**.
    
    ![Description of confirmSelection_state_in_skill_tester.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/confirmSelection_state_in_skill_tester.png)
    
    [Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/confirmSelection_state_in_skill_tester.txt)
    
    The conversation routes from the Main Flow to the intent.reg.OrderPizza flow and culminates in the confirmMessage state.
    
    ![Description of order_pizza_flow_diagram.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/order_pizza_flow_diagram.png)
    
    [Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/order_pizza_flow_diagram.txt)
    

*   Click **Reset**.
*   Enter _Order pizza_ again. Select the pizza type and size.
*   When you reach the confirmSelection state, choose **No**.
    
    The conversation gets routed from the Main Flow, through the intent\_reg.orderPizza flow, and then finally to the intent.reg.cancelOrderflow because of the No answer given for the confirmSelection state.
    
    ![Description of cancel_order_flow_diagram.png follows](./Create a Dialog Flow with the Oracle Visual Flow Designer_files/cancel_order_flow_diagram.png)
    
    [Description of the illustration](https://docs.oracle.com/en/cloud/paas/digital-assistant/tutorial-visual-flow-designer/files/cancel_order_flow_diagram.txt)
    

In this step, you learned how to add states to an existing flow. Specifically, you added flow control states to a flow comprised exclusively made up of user interface states. Using the flow control states, you learned how to link a parent flow to a child flow and how to set the branching logic to call that child flow. You also learned how to navigate the flow by changing the transition properties.

Tip:

If you run into problem check out Reference\_intent.reg.orderPizza\_2. This flow does not function because it is not mapped to an intent event.

By completing this tutorial, you have learned the basics of creating and mapping flows in the Visual Flow Designer.