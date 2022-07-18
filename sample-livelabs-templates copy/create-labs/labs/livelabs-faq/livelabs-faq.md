# LiveLabs FAQ

## Introduction

For questions related to LiveLabs please review this FAQ. If you don't see an answer listed here, please visit the LiveLabs slack channel - #workshop-authors-help or email your respective admins, you can view the email in [WMS](https://apex.oraclecorp.com/pls/apex/f?p=24885:51) under the support link section of your workshop. For example, database - [livelabs-help-db_us@oracle.com](livelabs-help-db_us@oracle.com).

## **LiveLabs Production FAQ**

1.	Do I need to be on VPN to access LiveLabs URL?
    -	No, LiveLabs passed CSSAP review and is available outside the firewall. It is accessible globally. Search for Oracle LiveLabs on the search engine of their choice, click on the apex link to go to LiveLabs homepage.
2.	Who can run the workshop?
    -	LiveLabs passed CSSAP review and is available outside the firewall. Anyone can run the workshops.
3.	What do you need to run the workshop?
    -	Brown Button / Customer's own tenancy – Customers do need anything to run the workshop.
    -	Green Button / LiveLabs sandbox tenancy - An account of any type registered with Oracle (Eg: Gmail).
4.	How to register for a workshop?
    -	Navigate to [LiveLabs](https://apexapps.oracle.com/pls/apex/f?p=133:1).
    -	Click on View All Workshops to search for the workshop you want to run or type the keyword in Search Bar on top of the LiveLabs homepage.
    -	Filter the workshops based on the Role, Focus Area, and Product, etc filter option on the right side of the page.
    -	Once you finalize the workshop you want to run, Click on Launch Workshop.
    -	Brown button / Customer's own tenancy:
        - If customers want to run the workshop on their own tenancies, click the brown button - **Run On Your Tenancy**.
        - Then click on **Open these workshop instructions in a new tab** to run through the instructions.. in a new tab
    -	Green button / LiveLabs sandbox tenancy:
        - If you want to run the workshop on LiveLabs tenancy, click the Green button – **Run On LiveLabs Sandbox**.
        - Provide credentials of the account registered with Oracle (SSO) and sign in.
        - On the Reserve page, choose the **Start Timezone**, turn on the Start Workshop Now button, provide your public SSH keys if requested, check the **I consent to receive the reservation emails** checkbox, and click **Submit reservation**.
        - On My Reservations Page, once the provisioning is done, click **Launch Console** to view the Workshop details and Instructions to run the workshop.
        - Then click **Open these workshop instructions in a new tab** available at the bottom of the page to run through the instructions.
5.	How do I extend the LiveLabs tenancy workshop execution time?
    -	If you have an active reservation, you can extend the reservation of a workshop:
        - Navigate to My reservations on [LiveLabs](https://apexapps.oracle.com/pls/apex/f?p=133:1) homepage.
        - Click on Launch Workshop of the active reservation workshop that you want to extend.
        - Click on Extend Workshop Reservation button available on the last row of the Workshop Details section.
6.	What do I do if I have a feedback for a workshop? Whom to reach if I face errors running through the workshop? What to do if I have similar content in WMS and want to add more content to the existing workshop?
    -	We recommend go to [WMS](https://apex.oraclecorp.com/pls/apex/f?p=24885:51), find the workshop, and click **Message the Team** to contact the workshop team.
    -   Or, you can find the workshop authors listed in the Acknowledgments section of the workshop, and slack or email them.

## **General FAQ**

1.	Is this cloud only?
    -	No, we have workshops On-Premises too.
2.	Is LiveLabs available to customers? Can I share it with them?
    -	Yes, it is accessible globally. LiveLabs passed CSSAP review and is available outside the firewall. Search for Oracle LiveLabs on the search engine of their choice, click on the apex link, go to LiveLabs homepage.
3.	Is this just for certain regions? Certain groups?
    -	No, It is available globally. Search for Oracle LiveLabs on the search engine of their choice, click on the apex link, go to LiveLabs homepage.
4.	What to do if I am looking for a Certification/Training?
    -	We have content that supports certification. You can shortlist the workshops based on Focus Area, Product, and other filters on the right side of the LiveLabs workshops catalog. Please check with Oracle University for certification assistance.
5.	How to view/Do we get the report of who is running the workshops?
    -	Tenancy / Brown button
        - We track only the view count of the workshop, i.e., The number of hits for the apex link of a workshop. We do not track usage, it violates privacy rules set up by security and legal.
        - The views report is only available to Oracle employees, you must login with your SSO to view it.
        - To get the view count, go to [LiveLabs](https://apexapps.oracle.com/pls/apex/f?p=133:1) homepage, click the Question mark icon on the top right corner of the page, then select Dashboard.
        - Scroll down the Dashboard to the Workshop Views, select your workshop from the drop-down list.
    -	Sandbox / Green button
        - We track who took a workshop on the LiveLabs tenancy. We are allowed via CSSAP to track the workshop id and email for those who click the green button.
6.	Which link should I share?
    -	Share only the Apex URLs for the workshops in production. This helps in tracking the views for the workshop by counting the number of hits on the Apex URL of the workshop.
    -	Don’t share the github.io links, we do not track this URL and that may change.
7.	How to look for a specific workshop to run?
    -	Search in [LiveLabs](https://apexapps.oracle.com/pls/apex/f?p=133:1). It is self-service.
    -	Or click [here](https://apex.oraclecorp.com/pls/apex/f?p=24885:51) to navigate to WMS.
    -	Look through the catalog or search the workshop using the Search bar on the top.
    -	If the status of the workshop is in production on the tile, click on the tile.
    -	Look for the production link field to navigate to the workshop and run.
8.	Do you support SAAS/PAAS for SAAS workshops?
    -	We do not support Saas/Paas for Saas workshops.
9.	Do you create a green button for the workshops that require a Federated user?
    -  We do not configure the workshops that need federated users on livelabs tenancy as of now.
10.	Is there a way to view the workshop instructions without reserving a workshop and securing an environment?
    -	Workshops and environments do not have to be reserved. All workshops can be executed on-demand on any kind of environment, freetier, or paid.  Only certain workshops run and are pre-provisioned on an oracle tenancy.  A customer would not reserve an environment to execute a workshop on the freetier, it’s on-demand. Click on any of the brown buttons to view the workshop instructions.
11.	What to do if I am unable to launch green button?
    -	If you are already logged into your own tenancy when clicking on a Livelabs link, the livelabs reservation login link will skip the login (because according to the system you have already authenticated to your own tenancy) and tries to navigate to the assigned Livelabs tenancy. Please make sure you are logged off completely from your own tenancy or use another (private) browser window to connect.
12.	What is the difference is between LiveLabs vs Luna?
    -	The main difference between LiveLabs and Luna is use case. LiveLabs is a deal and consumption focused while Luna is learn focused. The goal of LiveLabs is not to learn but to drive customer consumption and support events. The combination of the two give a full solution for Oracle.

## **Development FAQ**

1.  Who is responsible for approving pull requests in the GitHub repositories of Oracle LiveLabs GitHub project?
    - LiveLabs Admin team is responsible for the Oracle LiveLabs GitHub project's pull request approvals.
2.  What is the ETA to approve and merge the open pull request by LiveLabs admins?
    - ETA to respond on the pull request is 1-2 business days.
3.	Any questions related to Oracle LiveLabs GitHub project and repositories?
    -	Join the Slack channel: #workshop-authors-help to ask the questions in the channel or mail to [livelabs-help-db_us@oracle.com](livelabs-help-db_us@oracle.com).
4.	What should I do if I am making major updates to the workshop in production?
    -	If the workshop is in production, and the updates are major (i.e. not fixes, spelling updates, revised screenshots, etc) place the workshop back In Development.
    -	Create a new version of the workshop folder with the updated version
    -	Create new manifest copies of the changed files (i.e. setup.md is copied and called setup-v2.md)
    -	Proceed through the status’ like normal, submit Self QA
    -	Once QA Verification is complete, we will point to the new workshop (this allows us to roll back to the earlier version if there is an issue)
5. What should I do if I am making minor updates to the workshop in production?
    - Make changes to your workshop and create a pull request.
    - Check in WMS that your workshop URLs are correct.
    - After your pull request is approved, and your changes are reflected in the github.io page, the workshop in production will be automatically updated.
6.	What binary files are not allowed in Github?
    -	The OGHO wants to avoid executable files that can contain malicious code (PDFs, PSDs, ZIPs, JARs, WARs, EARs, BINs, EXEs).
7.	Where do I put my workshop files/objects?
    -	Zip your files and mail to [livelabs-help-db_us@oracle.com](livelabs-help-db_us@oracle.com).
    -	LiveLabs team will upload the file in LiveLabs owned tenancy object storage and share the pre-authenticated link with an expiry date to you in 1-2 days.
8.	How to submit videos for the workshops to one of the Oracle’s official Youtube channels?
    -	Workshop videos can only be sourced from one of the official Oracle Youtube channels.  We have a LiveLabs YouTube channel.  Submit the video to [livelabs-help-db_us@oracle.com](livelabs-help-db_us@oracle.com) and we will review and upload it.
9.	How to create a custom image from the Marketplace?
    -	Refer to [this](https://rpastijn.github.io/stuff/?lab=custom-image-mp-image) documentation on Github.
10. Where can I locate the Self QA Checklist?
    -   When you're ready to Self-QA, change your workshop status to "Self QA". This will trigger an e-mail containing the Self QA Checklist. It can also be found [here](https://objectstorage.us-ashburn-1.oraclecloud.com/p/MKKRgodQ0WIIgL_R3QCgCRWCg30g22bXgxCdMk3YeKClB1238ZJXdau_Jsri0nzP/n/c4u04/b/qa-form/o/QA.docx).
11. What to do if my github local and staging environment are corrupted and need to delete it and then rebuilt it?
    - Instructions to delete a forked repo on Github:
        - Go to Settings of Repo you want to unfork
        - Scroll down till danger zone section and click Delete this Repository
        - Enter your name / Repo name
        - Click “I understand the consequences, delete this repository” button.
    - Delete the same repo you just deleted on Github on your local machine as well.
    - After the successful deletion of repo on Github and local machine, follow the instructions from step 7 in lab 1 - Get Started with Git and Set up the GitHub Environment to rebuilt the repo.
12. After my pull request is merged, how long does it take for the changes to be reflected in production?
    Workshops in production use object storage links. The synchronization between the GitHub repositories and object storage happens every night (PST), so your changes will be reflected after the synchronization happens. If you want to update the workshop for upcoming events, please plan ahead.

## **Workshops FAQ**

1.	Do I need to be on a VPN to access the Workshop Management System (WMS)?
    - Yes, you need to be on VPN to access WMS.
2.	Who can submit a workshop?
    -	Anyone within Oracle can submit a workshop.
    -	If a partner is interested in submitting a workshop, an employee within Oracle needs to submit the workshop on their behalf.
3.	How to submit a workshop?
    -	Click [here](https://apex.oraclecorp.com/pls/apex/f?p=24885:51) to navigate to the WMS.
    -	First, search if there is already existing content in the catalog using the Search Bar on the top. If yes, contact the authors of that workshop - Click on the workshop tile and then click on Ask Workshop Contacts a Question. Write a message in the description box, click Send Mail.
    -	If no, proceed to submit a workshop.
    -	On the left menu, click on Submit a New Workshop.
    -	Fill in the required fields on the Workshop Details Page.
    -	Navigate to the Tag Management page and select the required tags. ( If we missed a tag please write the name of the Tag in Have a Question description box and click Send, we will add it.)
    -	If you want to run your workshop on LiveLabs tenancy, fill in the necessary details in the Green Button Requirements and Paid Policies page.
    -	Click the Create button on the right corner of the page.
4.	How to edit my workshop?
    -	Click [here](https://apex.oraclecorp.com/pls/apex/f?p=24885:51) to navigate to the WMS.
    -	On the left menu, click on **Edit My Workshops**.
    -	Click on the **WMS ID** of the workshop you want to edit.
    -	Make the necessary changes to the workshop and ensure to fill in the required fields.
    -	Click the **Save** button on the top right corner of the page.
5.	How to update the status of my workshop?
    -	Click [here](https://apex.oraclecorp.com/pls/apex/f?p=24885:51) to navigate to the WMS.
    -	On the left menu, click on **Edit My Workshops**.
    -	Click on the **WMS ID** of the workshop you want to edit.
    -	On the top of the page, select the status you want to update and click **Save**.
    >**Note:** As a workshop author, you cannot change your workshop to any statuses. Only council can change your workshop to **Approved** status. Only stakeholders can change your workshop to **Completed** status.
6.	How to contact the author of a workshop?
    -	You can contact the workshop author if you have a question about a workshop, or have some feedback for the workshop.
    -   Click [here](https://apex.oraclecorp.com/pls/apex/f?p=24885:51) to navigate to the WMS.
    -	Look through the catalog or search the workshop using the Search bar on the top.
    -	Click the workshop tile of the workshop author you want to contact.
    -	Then click **Message the Team**.
    -	Write a message in the description box, click **Send**.
7.	How to request for a green button?
    -	Click [here](https://apex.oraclecorp.com/pls/apex/f?p=24885:51) to navigate to the WMS.
    -	If your workshop is already in the system - On the left menu, click on **Edit My Workshops**.
    -	Click the **WMS ID** of the workshop you want to edit.
    -	Click the **Publishing** tab. Click **Edit** on your workshop's LiveLabs publishing tile. Toggle on the **Green Button Enabled?**. Fill in the necessary details on the Green Button questionnaire. Our team will work with you to create and test the green button.
8.	Which environments the workshops run?
    -	Brown Button / User's own tenancy: users can run on their own tenancies
    -	Green Button / LiveLabs Sandbox tenancy: we have a tenancy dedicated to run the workshops. An environment is pre-configured for the workshops to run. You just supply the public key if asked.
9.	How do I see the status of other workshops?
    -	Click [here](https://apex.oraclecorp.com/pls/apex/f?p=24885:51) to navigate to the WMS.
    -	Look through the catalog or search the workshop using the Search bar on the top.
    -	You can see the status of the workshop on the tile.
10.	What is the process and ETA to hear from LiveLabs team about the status change from *Submitted* to *Approved*?
    -	Once the workshop is submitted, your workshop council group may update the workshop status to **More Info Needed** if they require more information from the workshop team via WMS; otherwise, they will approve the workshop and move the workshop to **Approved** status.
    -	Council is a person chosen from an Org to represent review and approve workshops.
    -	ETA to approve the workshop is 2-3 days. If you have not heard back from the council after 3 business days, please follow up with them.
11.	Can we restrict the pool of regions where our lab runs to a subset of the supported regions – Green Button workshop?
    -	Yes, we can limit a workshop to specific regions for the workshops that run on LiveLabs tenancy.
12.	How to download the list of all the workshops in production?
    -	Click [here](https://apex.oraclecorp.com/pls/apex/f?p=24885:51) to navigate to the WMS.
    -	Click on Report: View All Workshops on the left menu Report.
    -	Click on Production flg column and select 1 from the dropdown list to filter the workshops in production.
    -	Click Actions -> Download -> Excel Download.

## **Event Codes FAQ**

1.	What is an event code?
    -	An Event code is a fully customizable way to run a customized set of focused labs for your target audience. We now fully support hidden workshops for Oracle sales/PM and marketing purposes. They won’t be accessible to the general audience, cannot be indexed by search engines, the user must login with Oracle SSO and have the code to proceed.
2.	Can anyone create an event code?
    -	Only those with an oracle.com account
3.	How to request an event code in WMS?
    -	Click [here](https://apex.oraclecorp.com/pls/apex/f?p=24885:51) to navigate to the WMS.
    -	Click **Request an Event Code** and fill the required fields.
    - We recommend you set the **Start Date** one day before the actual event, and the **End Date** one day after the actual event, to make sure the event code accommodates for people in all time zones.
    - You can click **Populate Workshop Fields** to use the workshop information in LiveLabs. You can also **overwrite workshop information** to customize the workshop specifically for this event.
    - Finally, click **Request Event**.
4.	Can I edit my event code once requested in the WMS?
    -	No, write a message in the **Remarks to the LiveLabs Team** box and click **Save Changes**.
5.	Once I submit my request, what’s next?
    -	Our LiveLabs team will review your request within 2 business days. We will let you if we request any information or changes from you. If everything looks good, we will approve it, and your event code will be created automatically within 1 business day. You will receive a notification email containing your event code.
    - Once the event code is created, we recommend you try and verify the event code in LiveLabs before showing to customers.
6. Can I extend my event code?
    - Yes, please contact our LiveLabs team [livelabs-help-db\_us@oracle.com](livelabs-help-db_us@oracle.com) to extend your event code.
7.	When will the event code be active?
    -	The event code will be active on the day of the event or the specific time period you requested the event code.
8.	Can anyone access the event code or event code link?
    -	Only those with an oracle.com account
9.	How many event codes can I request?
    -	You can create as many event codes you want based on your requirement.
10.	Can I create a custom workshop and select just the labs I want to do for my event?
    -	Yes, build a separate manifest.json (with your event name), push that to GitHub and give us the new link.
11.	How long can a custom page be available?
    -	For the time period you requested it for, up to a maximum of 365 days.
12.	Can I link the event to sales cloud or similar systems?
    -	Yes.
13.	Once the event code is ready, What and when should I share details with the customer?
    -	You can share your event code link, event code, and QR image to your customers at any time.
    -	The event code will be active on the day of the event or the specific time period you requested the event code.
14.	What are customer actions?
    -	Only those with an oracle.com account can access the event code page using the event code or event code link.
    -	To navigate to the event page, the customer will use the event code link or search for Oracle LiveLabs on the search engine of their choice, click on the apex link, go to LiveLabs homepage, click **Have an Event Code?**, provide the event code and click **Submit Event Code**, provide the account details and view the event page.
    -	To run the workshop on the customer's own tenancy, hit the brown button:
        -  Launch workshop.
        -  Then click **Open these workshop instructions in a new tab** to run through the instructions.
    -	To run the workshop on the LiveLabs sandbox tenancy, hit the Green button:
        - On the Reserve page, Choose the **Start Timezone**, turn on the **Start Workshop Now** button, provide your public SSH keys if requested, check **I consent to receive the reservation emails** checkbox, and click **Submit reservation**.
        - On My Reservations Page, once the provisioning is done, click **Launch Console** to view the Workshop details and Instructions to run the workshop.
        - Provisioning would depend on the workshop, 5-10 minutes for traditional cloud, and 15-25 or so for those with images (on-premises).
        - Then click **Open these workshop instructions in a new tab** available at the bottom of the page to run through the instructions.
15.	How many users can at the same time?
    -	Brown button / customer's own tenancy – A customer would not reserve an environment to execute a workshop on their tenancy, it’s on-demand.
    -	To run on LiveLabs sandbox tenancy through a green button - There is a quota on how many can be run.  It’s limited by our collection of tenancies and what else is running on the system. We allow 30 concurrent users as the customer would reserve an environment to run the workshop at the same time. If event organizer provides their own tenancy, it is just limited by the resources available.
16.	Do we get the report of who is running the workshops?
    -	Yes, the voucher owner gets access to view the report of the email Id and date registered.
17.	Are the event codes internal only? Or if an external prospect wants to use these will they need to request one?
    -	The vouchers are so that internal people (sales, marketing, consulting, etc) can create their own customizable workshop page for their participants.
18.	If I request the code for a workshop, does it mean that the workshop will be able to run on oracle's tenancy?
    -	Not all of the workshops have the "green button" to reserve a workshop enabled.
    -	It goes by what that particular workshop is configured to run on. e.g. If the workshop is configured to run on both freetier & paid, the event code will have both of the options
19.	Do you track the resource details of what the customers used while running the event?
    -	No, we do not track the resource details of what the customers used while running the event.
20.	When I create an event code, the link requires an oracle login to access the event. Is there a way to create an event code without authentication?
    -	No, all the users need to pass the authentication to login to the event.
21. Can I customize a workshop for events?
    -   Yes. Refer to Lab 2 -> Task 3 to create a workshop folder for your event. Then, **overwrite workshop information** when you request the event code.

## Acknowledgements

* **Author:** Anoosha Pilli, Product Manager, Database Product Management
* **Contributors:** Madhusudhan Rao, Arabella Yao, Product Manager, Database Product Management
* **Last Updated By/Date:** Arabella Yao, April 2022
