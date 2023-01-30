# Register Validate Payment on the Service Bus

## Introduction
In the previous section, the validatePayment process composite have been completed. You will now register this process composite on Service Bus.

Service Bus will protect consumers of the validatePayment composite from routine changes such as deployment location and implementation updates. Service Bus will help scale the service to handle higher volume of requests and provide resiliency for the service if it needs to be taken down for routine maintenance.

![](./images/servc-bus-0.png " ")

*Estimated Lab Time*: 60 minutes

### Objectives
- Utilize Oracle JDeveloper 12c to construct Proxy and Business services on Oracle Service Bus.
- In this lab, you will start by first creating a Business Service to register the composite URI (the composite end-point). You will then add a simple Pipeline and Proxy. Pipelines contain actions performed on the Service Bus, typically reporting, data transformation and validation, before invoking the backend service. Consumers of validatePayment service will call the end-point API via the Proxy rather than connecting directly to the composite end-point, allowing more agility and flexibility in managing change.

### Prerequisites
This lab assumes you have:
- A Free Tier, Paid or LiveLabs Oracle Cloud account
- SSH Private Key to access the host via SSH
- You have completed:
    - Lab: Generate SSH Keys
    - Lab: Prepare Setup
    - Lab: Environment Setup
    - Lab: Initialize Environment
    - Lab: Develop SOA Composite App Validate Payment

## Task 1:  Create a Service Bus Application and New Project **Validate Payment**.

1. Create a new Service Bus application. There are various ways and shortcuts to do this, and in this case choose **File** > **New** > **Application**... from the menu.
2. From the Categories tree, click on **General** > **Applications**
3. Select **Service Bus Application with Service Bus Project** from the Items field.

    ![](./images/ServiceBus-JDeveloper.png " ")

4. Click **OK**.
5. In the subsequent Create Service Bus Application With Service Bus Project dialog, set the following fields, leaving the others with their default values:

    - Application Name: e2e-1201-servicebus
    - Directory of your choice

    ![](./images/servc-bus-1.png " ")

6. Click **Next**.
7. When you create a new application, you are prompted to create a new project. Set the following fields on Step 2 of 2:
    - Project Name: *ValidatePayment*
    - Directory of your choice

    ![](./images/servc-bus-2.png " ")

8. Click **Finish**.
9. Double-click the ValidatePayment icon in the Application Navigator on the left-hand side, the Services Bus Overview editor will open on the right.

    ![](./images/servc-bus-3.png " ")

The Overview Editor below is a new view for Service Bus in SOA Suite 12c, and modeled from the SOA Composite Editor.

  ![](./images/servc-bus-4.png " ")

10. This view allows you to construct Service Bus projects using a top-down, drag and drop approach. You can create Proxy, Pipeline, and Business Services by dragging icons from the Component Palette on the right, to the lanes of the canvas.

  - On the Component Palette, notice the Resources category contains Pipeline and Split-Join icons. These are the components for a Service Bus application.
  - Other Palette categories, Technology, Adapters and Advanced, contain adapters and transports for building Business Services (External References) and Proxy (Exposed Services).

11. If your Properties window is on the bottom right of the JDeveloper screen, please drag and position it to the bottom center as shown in the above diagram. This will make editing properties of Pipeline actions easier.

12. Click **Create Application**

![](./images/continue-to-create-application-wizard.png " ")

## Task 2: Create Folders and Import Artifacts, WSDL and XSD Resource Click **Create App**.

In Service Bus applications, Folders are leveraged to organize artifacts within a Project. For brand new applications, we encourage you to create folders that align with the default folders in your Composite application.

Folders will not be automatically created in Service Bus applications so that backward compatibility of Service Bus projects imported from previous releases is maintained.

For this project, we will keep the structure simple since there are only a few artifacts to manage. As your projects grow in subsequent chapters, you will add folders for categorizing artifacts into Business Service, Proxy and Templates.

1. From the ValidatePayment project icon, select **New**> **From Gallery**.

    ![](./images/sb1.png " ")

2. Select **Folder**

    ![](./images/sb2.png " ")

3. Click **Ok**.
4. When prompted fill in the following properties:
    - Folder Name: Schemas
    - Directory: Leave as default

    ![](./images/sb3.png " ")

5. Click **Ok**.
6. Create WSDLs folder in the same way. When complete your Application Navigator should resemble the following:

    ![](./images/sb4.png " ")

7. Select the WSDLs folder that you just created in the left-hand navigation pane. We will now import artifacts to build our services.

    ![](./images/sb5.png " ")

There are many ways to share artifacts between Service Bus and Composite applications, e.g. source control, MDS backed by source control, etc. For today’s work, you will import the artifacts from the file system.

8. Select **File** `-->` **Import** ...
    ![](./images/sb6.png " ")

9. From the Import dialog, choose **Service Bus Resources**.

    ![](./images/sb7.png " ")

10. Click **Ok**

A wizard takes you through the steps of importing resources into your project. The title bar of the wizard dialog shows the step number.

11. Import Service Bus Resources - Step 1 of 3, select **Resources** from URL.

    ![](./images/sb8.png " ")

12. Click **Next**
13. Import Service Bus Resources - Step 2 of 3, next to Source URL, click the browse button

    ![](./images/sb9.png " ")

14. Be sure you selected the WSDLs folder in your project, then from the WSDL chooser, navigate to `~/e2e-1201-orderprocessing/resources/wsdl` folder on your disk and select V`alidatePayment- concrete.wsdl`

    ![](./images/ImportWSDL.png " ")

*NOTE*: This WSDL assumes that you have unzipped the resources as instructed in prior module (ValidatePayment SOA composite), and the Schemas folder is at the same level as the wsdl folder containing the `CanonicalOrder.xsd`. You will need this directory structure to successfully import the WSDL.

15. Click **Ok**.

    ![](./images/sb10.png " ")

16. Click **Next**
17. Import Service Bus resources - Step 3 of 3, accept the defaults

    ![](./images/sb11.png " ")

18. Click **Finish**. Your left-hand navigation tree should resemble the following:

    ![](./images/sb12.png " ")

## Task 3: Configure a Business Service for the ValidatePayment Composite and Review Properties.

In this section, you will configure a Business Service to represent your validatePayment composite. There are different ways to create artifacts in Service Bus in JDeveloper:
- Right-click menu from the left-hand Application Navigator (traditional approach)
- Drag and drop icons from the Component Palette on to the overview canvas (new)
- Right click directly on the overview canvas to insert artifacts (new)

We will use the drag and drop Component Palette to build our first Service Bus project; however, feel free to experiment with other mechanisms.

1. Drag and drop the http icon from the right Component Palette on to the External References Lane.

    ![](./images/CreateBizSvc1.png " ")

A wizard will walk you through the steps of configuring the Business Service. The title bar of the wizard dialog shows the step number.

2. Create Business Service 1 of 3
    - Service Name: ValidateBS
    - Location : Leave as default

    ![](./images/createbizsvc2.png " ")

3. Click **Next**.

4. Create Business Service 2 of 3
    - Select Service Type: WSDL

    ![](./images/createbizsvc3.png " ")

5. Select the Plus icon on the right of the WSDL choice.
6. When the WSDL chooser appears, first, confirm that Application icon on the top is selected and expand Application node `Application -> ValidatePayment -> WSDLs`.
7. Select ValidatePayment-concrete.wsdl

    ![](./images/createbizsvc4.png " ")

8. Click **Ok**.

    ![](./images/WSDLs.png " ")

9. Confirm that ValidationPaymentPort is selected in the Port field when you return back to the wizard.
10. Click **Next**
11. Create Business Service 3 of 3

    ![](./images/createbizsvc5.png " ")

12. Confirm http is selected in the transport field
13. Confirm Endpoint URI* is pointed to the ValidatePayment composite app. It should look similar to:

`http://localhost:7102/soa-infra/services/default/ValidatePayment/validatepaymentprocess_client_ep`

14. Click **Finish**. The canvas would now resemble like:

    ![](./images/createbizsvc6.png " ")

To find the composite deployment URI from the instance graphical desktop session, launch the Chrome browser, then go to the [EM console](http://localhost:7101/em) with **Username : weblogic** ,**Password : welcome1** and navigate to your composite. 

16. Click the **Test** icon on the top right of screen. This will bring up a Web Service test page that lists your deployed endpoint.

    ![](./images/createbizsvc7.png " ")

17. Should you need to update your endpoint URI, you can do this as you review the Business Service properties below in the Transport tab.

18. Double-click on your new Business Service in the overview and review the settings for your new business service. There are settings for General Properties, Performance (Result Caching), Transport details, Policies for Security.

    ![](./images/createbizsvc8.png " ")

## Task 4: Configure Proxy and Pipeline and Wire to the Business Service.

For references on this step, please review starting page 71 on the tutorial document.

Let's create the Proxy and Pipeline to invoke the ValidateBS Business Service. The Proxy will be the interface to the service from external consumers. The Pipeline contains actions that must be performed before invoking the composite. Typical actions are data transform and validation, reporting with error handling; however, for your first Pipeline we will keep it simple.

1. Locate the Pipeline icon under Resources on the Component palette. Drag and drop the Pipeline icon from the right onto the middle of the canvas, labeled the “Pipelines/Split Joins” lane.

   ![](./images/ConfigureProxy-and-Pipeline.png " ")

The Pipeline wizard will walk you through the next steps. The title will show you what step you are on.

2. Create Pipeline Service - 1 of 2
    - Service Name: ValidatePP

    ![](./images/configproxy1.png " ")

3. Click **Next**
4. Create Pipeline Service 2 of 2
    - Service Type: Choose WSDL

    ![](./images/configproxy2.png " ")

5. Click on the WSDL chooser icon plus sign on the right. `NavigatetoApplication->ValidatePayment-> WSDLs` directory and then select ValidatePayment-concrete.wsdl.

    ![](./images/configproxy3.png " ")

6. Click **Ok**.
7. Once back on Create Pipeline Service in 2 of 2:
    - Ensure the Expose as Proxy Service checkbox is selected. This is the default.
    - Proxy Name: ValidatePS

    ![](./images/configproxy4.png " ")

8. Click **Finish**
9. The canvas should now look like the following:

    ![](./images/configproxy5.png " ")

10. Next, simply wire the Pipeline to invoke the Business Service.
11. Select **ValidatePP** and drag arrow to ValidateBS.

    ![](./images/configproxy6.png " ")

The Routing action is automatically configured for you in the Pipeline.

You could add some actions to the Pipeline to validate, transform the payload or report for auditing. This can be demonstrated in another section of the workshop.

12. Click the **Save All** icon on top left of your screen.

## Task 5: Run Diagnostic of the Composite Application.

**IMPORTANT:** The server was started in *Lab: Initialize Environment* and should be RUNNING for this deployment and end-to-end test to be successful. If your server is down for some reasons, please bring it back up before attempting deployment.

1. Bring Overview Editor back into focus. You can do this by double-click your project icon, in the Application Navigator or by selecting the ValidatePayment tab on top center.

    ![](./images/configproxy7.png " ")

This will bring up your overview and refresh the canvas.

2. Right-click on the ValidatePS in the Exposed Services Lane. Select **Run**.

    ![](./images/Deploy-and-Test.png " ")

## Task 6:   Test Console

1. The Test Console will activate as one of your windows in JDeveloper on Windows. On Linux, this may start a new browser window outside of JDeveloper. Make this window active by clicking on the title bar.

    ![](./images/deploytest1.png " ")

By default, a sample payload will be generated for you; however, we will test with a specific file.

2. Click the **Choose File** button. This may show up as a Browse button on Linux.
3. Navigate to `~/e2e-orderprocessing/sample_input/` and select `PaymentInfoSample_Authorized.xml`
4. Click **Open**.
5. On the Test console, Click on **Execute** button

    ![](./images/testing1.png " ")

6. You could also run diagnostic in the Service Application leveraging the Debugger as was done previous module 2.

<!-- ### More Details: ###

Please follow the construction details from <ins>**page 54 to 77**</ins>, in the [SOAsuite 12c tutorial.pdf](https://oradocs-prodapp.cec.ocp.oraclecloud.com/documents/fileview/D62E7C999F2BB9C78C4D8085F6EE42C20DD5FE8D98D7/_SOASuite12c_Tutorial.pdf).

![](./images/soa-tutorialpdf.png) -->


<!--[Click here to navigate to the next Module 3](3-process-order-using-composite.md) -->

Congratulations you've developed and registered the validate payment service to the Oracle Service Bus.

You may now proceed to the next lab.

## Learn More
To find more detail about Service Bus, Enterprise Service Bus - please go to this [Oracle Service Bus link](https://docs.oracle.com/en/middleware/soa-suite/service-bus/12.2.1.4/index.html)

## Acknowledgements
* **Author** - Daniel Tarudji
* **Contributors** - Meghana Banka, Rene Fontcha, Kamryn Vinson, Sahaana Manavalan
* **Last Updated By/Date** - Sahaana Manavalan, LiveLabs Developer, NA Technology, February 2022 
