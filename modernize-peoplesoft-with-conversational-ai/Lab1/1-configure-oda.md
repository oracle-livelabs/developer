# Configure the Requisition Skill on Oracle Digital Assistant

## **Introduction**

- This lab will guide you through the steps to configure the Requisition Skill on Oracle Digital Assistant.

Estimated Time: 10 minutes

### **Objectives**

- Install and configure the Requisition Skill in Oracle Digital Assistant

## **Step 1:** Install and Configure the Skill

1. Sign in to your ODA instance. Click on the hamburger icon on the left and navigate to Development > Store. 

2. (**Do not do this step**, since prior to the class, the moderators searched for "PeopleSoft Epro Requester Inquiry Bot" and clicked on the 3 dots icon in the lower left corner and selected Pull.)

    ![get skill](images/pullskill.png " ")

3. Navigate to Development > Skills and search from Epro (this is what was 'pulled' in Step 2). Click on the 3 dots icons and select **Clone**.

	 ![store](images/a.png " ")

 In the ensuing dialog name the skill **'ocw\_psft\_oda_YOURSTUDENTNUMBER'** and then click Extend to save the changes.





## **Step 2:** Create the web channel for this Skill


4. Navigate to Development > Channels. Click on + Channel to add one and set the values as seen in this picture. 

    ![channels](images/1.png " ")

Ie, Enter the Channel name, Description, Channel type - Oracle Web, Allowed Domain *, Client authentication enabled - uncheck and select Create

5. Route the channel to the Skill **you have created above** via this dropdown.  Slide the Channel Enabled widget above it so that it is On.

    ![route](images/2.png " ")
    
6.  Slide the Channel Enabled widget above it so that it is On

![enable](images/3.png " ")
    

## **Step 3:** Copy config values

Copy a.the generated Channel ID and b. ODA URI - Ex: "oda-XXXX-da2.data.digitalassistant.oci.oraclecloud.com" and save them locally on your machine as they'll be used in a later lab.


7. In upper right corner click Train and accept the defaults

![train](images/train.png " ")
