# Configure Requisition bot on PeopleSoft

## **Introduction**

This tutorial describes the process to deploy a Requisition Chatbot on PeopleSoft Financials and Supply Chain Management from Oracle Cloud Infrastructure Marketplace instance and Oracle Digital Assistant. 

The Oracle Digital Assistant is an OCI solution provided by Oracle and connectivity must be ensured through the firewall to enable Integration with on premise PeopleSoft Instances. ***The following has already been set up for you***:

![architecture](images/arch.png " ")

**Chat Client**: The Chatbot Integration Framework supports the Web Channel as a part of integration with ODA. Chat clients rendered within PeopleSoft PIA page establish a connection with ODA Skills through the Web channel. ODA provides a set of Javascript files named as WebSDK, which takes care of construction of Chat Client within PeopleSoft PIA. The communication between PeopleSoft chat client and ODA instance is established using the WebSDK files provided by ODA. 

**Skills**: This refers to the actual bot deployed on the ODA instance. This contains the different Intents, Utterances and Dialogflows for the bot. The conversation between the user and bot is designed and defined in the skill. Please refer the ODA documentation for more details.

**PSFT Custom Components**: This is Node JS code that gets deployed in the embedded Node JS container in ODA. The custom components are local to a skill within ODA. The PeopleSoft delivered Skills and Skill Template come with a packaged custom components code. (The instructions on how to add/generate custom components for a newly added service is beyond the scope of this lab but can be done on your own.)

**Application Services**: The Application Services framework is delivered as part of the Integration Broker in PeopleTools. The Chatbot Integration Framework requires configuration to be deployed using this framework.

Estimated Time: 1.5 hours



## **We created an environment where:**

1. ODA is running (you'll see that in a later lab.)

1. PeopleSofts Application Service is accessible on the open internet for the ODA Cloud instance to consume. The Integration Broker is configured, up and running

Note: You will need a browser that allows HTTP connections since our lab environment is not using HTTPS


## **On your laptop:**

The moderators during the course will assign each of you a StudentNumber (#).

Use your number in the table below to modify your /etc/hosts file so URL resolution will work

| IP      | URL |  Student # |
| ----------- | ----------- | -------- |
| 150.136.145.221 | ocw-psft-oda-blank.sub09280255350.ocwpsftoda.oraclevcn.com | #1 |
! 132.145.181.58 | ocw-psft-oda-blank-557945.sub09280255350.ocwpsftoda.oraclevcn.com | #2 |
| 158.101.127.11 | ocw-psft-oda-blank-212946.sub09280255350.ocwpsftoda.oraclevcn.com | #3
| 132.145.182.100 | ocw-psft-oda-blank-846019.sub09280255350.ocwpsftoda.oraclevcn.com | #4
| 129.213.202.144 | ocw-psft-oda-blank-768308.sub09280255350.ocwpsftoda.oraclevcn.com | #5 
| 129.213.26.90 | ocw-psft-oda-blank-752568.sub09280255350.ocwpsftoda.oraclevcn.com | #6
| 129.213.31.140 | ocw-psft-oda-blank-893139.sub09280255350.ocwpsftoda.oraclevcn.com | #7
| 129.213.30.101 | ocw-psft-oda-blank-254959.sub09280255350.ocwpsftoda.oraclevcn.com | #8
| 150.136.92.217 | ocw-psft-oda-blank-941682.sub09280255350.ocwpsftoda.oraclevcn.com | #9
| 150.136.208.155 | ocw-psft-oda-blank-124176.sub09280255350.ocwpsftoda.oraclevcn.com | #10
| 150.136.38.16 | ocw-psft-oda-blank-711742.sub09280255350.ocwpsftoda.oraclevcn.com | #11
| 129.213.83.35 | ocw-psft-oda-blank-127032.sub09280255350.ocwpsftoda.oraclevcn.com | #12
| 150.136.218.111 |  ocw-psft-oda-blank-484162.sub09280255350.ocwpsftoda.oraclevcn.com | #13
| 132.145.130.100 | ocw-psft-oda-blank-13142.sub09280255350.ocwpsftoda.oraclevcn.com | #14


Also, copy to NotePad the middle value (URL) and add port 8000 to it; this will be your PSFT instance:

ie: http://ocw-psft-oda-blank-13142.sub09280255350.ocwpsftoda.oraclevcn.com:8000

You may now *proceed to the next lab*.

