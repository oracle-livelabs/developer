# Configuring ODA on PeopleSoft instance 

## Introduction

- This lab will guide you to connect the PeopleSoft environment with the Requisition Skill.

Estimated Time: 60 minutes

### Objectives

- Connect the Requisition Bot to the FSCM PeopleSoft instance.

## **Step 1:** Proxy user creation

1. Via a browser go to your PSFT instance you copied to NotePad during the PreReqs

    ![psft](images/psft.png " ")


login with the credentials 
usr=VP1 pwd=oracle

2. Go to NavBar (compass icon upper right corner) and then select Menu > P > PeopleTools > Security > User Profiles > User Profiles.

    ![security](images/security.png " ")

3.  Click on Add a new Value tab and use PSFTPROXY. Click on the Add button.

    ![add](images/addpsftproxy.png " ")

4. Select the Symbolic ID as SYSADM1, type your new password and confirm the password. Click Save.

   ![general](images/upgeneral.png " ")

5.  On the next tab (ie, ID)	, Update the ID type pulldown as "None". 

    ![upid](images/upid.png " ")


6.  On the next tab (ie, Roles), click 2 times on the + button in the lower right corner to insert 2 rows; search for the 2 roles in this image and click the Save button after your screen looks like this one.

    ![roles](images/uproles.png " ")
    
7. We are now going to add a role to another user similar to what we have just done. Go to NavBar (compass icon upper right corner) and then select Menu > P > PeopleTools > Security > User Profiles > User Profiles

8. Search for VP1; add roles for EOCB Admin User, EOC Client User, and ePro Requester Inquiry Bot

    ![roles](images/uproles2.png " ")


## **Step 2:** Configure Bot ID and Roles

9.  Navigate to Menu > E > Enterprise Components > Chatbot Configurations > **Global** Chatbot Definitions

    ![config](images/chatconfig.png " ")

10.  Enter the ODA URI which you copied in Lab 1 ODA Server URI field **without** the HTTP prefix (see image). Click Save.

    ![botdef](images/botdef.png " ")
    
11. On that same screen, click the Add button; click edit (pencil) next to Epro Requester Bot

    ![botdef](images/botdef1.png " ")

12. Add the ODA web channel ID which you copied in Lab 1 in the Bot App ID field. Click Save and Next.

    ![botdef](images/botdef2.png " ")

13. On that same screen, click the Global Settings tab and enter these values:

    ![botdef](images/botdef3.png " ")

Click Next.

14. On that same screen, click the Enable slider next to Epro Requestor and then Submit.

    ![botdef](images/botdef4.png " ")


15. Go to NavBar > Menu > P > PeopleTools > Security> User Profiles > User Profiles and then look up for the user "VP1"

16. Switch to the Roles tab and click on the + button next to any user role. Now, under User Roles, click on any + sign (lower right corner of screenshot) to add a row.

    ![role](images/addRole.png " ")
    
17. In the new blank row you just created, type 'ePro' and then the magnifier button. **Select in the ensuing dialog** **Epro Requester Inquiry Bot so it populates your new field and matches this screenshot**. Click Save and OK to any ensuing dialogs.

    ![role](images/addRole2.png " ")

18. Repeat the last two steps but with the "EOCB Client User" role, and click on the Save button.


## **Step 3:** Verify Restricted Services 

19. Go to NavBar > Menu > P > PeopleTools > Integration Broker > Configuration > Service Configuration and click on the Restricted Services tab. Search with the keyword "PTCB_APPL" and *use the magnifier icon*; select the hyperlink in the ensuing result.
	
     ![restricted](images/restricted.png " ")
     
(**If the service didn't populate in the table under Services, click the Search button**.)

20. ***Uncheck the Restricted service*** so that you can edit Service configurations. Now save all the changes and dismiss any warnings.

     ![restricted](images/restricted2.png " ")

21. Now, go to NavBar > Menu > PeopleTools > Integration Broker > Service Configuration and click on the Restricted tab; search for the service "PTCB\_APPL\_SVC". Click on the Search button so the field populates.

22. Now, go to NavBar > Menu > PeopleTools > Integration Broker > Integration Setup > Service Definitions; search for the service "PTCB\_APPL\_SVC". Click on the Search button so the field populates.

Click to enable the ReST Service button.

   ![srv](images/srv.png " ")

23. Now click on the Search button, and note the two ensuing hyperlinked results:

   ![srv](images/srv1.png " ")


24. For both results ("PTCB\_APPL\_SVC\_GET" and "PTCB\_APPL\_SVC\_POST"), click on them one at a time and update the Req. Verification  pull-down to "Basic Authentication". Click Save.

    ![auth](images/reqauth.png " ")

Note: The Basic Authentication uses a username and password to make any request whereas SSL Authentication uses securely encrypted certificate based authentication. You can use any of them based on your Organization's need.

## **Step 4:** Update the Authentication type for the Application Service

25. Navigate to PeopleTools > Integration Broker > Application Services >  Administration > Application Services Security. Click on the Token Required tab. Expand the Chat Bot Token Type field and select PSFT. Your screen now looks like this:

     ![search](images/search.png " ")

***Click Save***

## **Step 5:** Update the Skill Configuration

26. Switch back to the ***ODA console*** and select the skill you used in Lab 1

    ![skill](images/skill1.png " ")

27. Once inside that skill select the Settings (gear icon):

    ![skill](images/skill2.png " ")
    
28. Click on the Configuration tab:

    ![skill](images/skill3.png " ")
    
29. Scroll to the bottom of the page

    ![skill](images/skill4.png " ")


30. Once you select a Custom Parameter, an edit icon (pencil) becomes available so you can set the following values:

***PSFSCMbaseurl***: denotes the base url of the application service. Replace with your **IP Address** you copied in the PreReqs lab the URL and port; for Node use "FSCM_BYCIMHTLNB". **Use HTTP not HTTPS**
            
<!--http://(WebserverName.com):(port)/PSIGW/RESTListeningConnector/FSCM\_BYCIMHTLNB/PTCB\_APPL\_SVC.v1
-->
   ![fscumurl](images/FSCUMRL.png " ")

***PSFSCMuserid***: Set the PeopleSoft proxy user who has access to invoke application services. Leave it, as it is (PSFTPROXY).

***PSFSCMpassword***: It denotes the password for a Proxy user which you set in *Step 1*. 

 
Congratulations! Move on to the final lab