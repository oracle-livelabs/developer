# 🧠 Hackathon Challenge

## Introduction

Put your skills to the test! In this final challenge, you’ll apply everything you’ve learned throughout the workshop to solve a **real-world data problem**.

In this lab, you’ll step into the role of a **data engineer and analyst**, building and managing **data products** that empower different departments to make **informed decisions**.

You’ll learn how to:

- **Create**, **share**, and **subscribe** to curated data products, enabling **seamless collaboration** across teams.
- Build **data pipelines** to streamline data processing.
- Publish **data products** to a **Marketplace** for easy access by relevant teams.
- Leverage **insights using AI-powered applications** to drive smarter decision-making.

By the end of this lab, you’ll have hands-on experience with:
- Building and managing data pipelines
- Publishing and accessing curated data products
- Using AI tools to gain actionable insights


## Task 1: Create Data Product view for Marketing Dept:  

* Create a view of the closed loan data for the Marketing Department avoiding any PII data. 

* This view focuses on the kind of loan or customer information that helps Marketing tailor offers and campaigns to the right audience. 

## Task 2: Share Data Product to Marketplace for Marketing Officer Consumption 

* Publish your Client\_Loans\_Marketing\_Dept\_View data to the Marketplace, so that the Marketing team can quickly grab data whenever they need insights. 

* This helps Marketing Officers run campaigns, target the right customers, and customize offers in a snap—no extra steps required. 

## Task 3: Subscribe to Data Product for Marketing Officer 

* Subscribe to published  Client\_Loans\_Marketing\_Dept\_View data to ensure the Marketing team’s custom loan data is at your fingertips. 

* Subscribing gives you an instant connection to that data, so you can analyze it or integrate it into other reports without any extra hassle. 

## Task 4: Explore using Curated and Shared Data Products with GenAI Powered Apps  

* Validate access to subscribed data and new insights enabled by using property graph against it, by running the marketing officer Application Demo 

* Show use of shared data accessed from marketplace via Graph display  

     * **Show Loans by Type --> Affordable Housing Z, Standard**

     * **Show loans by Profit Margin --> Origination fee + Interest Markup + 10% for Affordable Housing zone loans**

## Task 5: Build your Data Pipeline (Optional Lab) 

* Load new Affordable Housing Data into Object Storage 
* Discover New Data into Catalog 
* Validate you can query from your database 

## Create Loan Offerings Data Product 

Funding Providers 

Funding Provider sends weekly commitment of new loan funds to bank in JSON format to the designated staging area on object Storage 

The JSON file will Include the committed funding amount, funding cost, estimated time to process requests & deliver funds, and time frame funding offer is good for 

Lender  

* ingests new funding and creates Loan Offerings 

   * **Automated notification will be introduced to inform Lender of new funding files and invoke the lenders load, transform, and enrich process to convert funding into loan offerings**

* Establish Loan Origination fees 
* Establish Interest rate markups for profit margin 
* Establish loan closing time for customer 
* Establish LTV_PCT (Loan to Value %) for Loan Offering 

Load Affordable Housing Zone Data (From Approved Marketing List) 

1. Load data stored in Iceberg format visible to data catalog 
1. Yearly task to load the updated list of Opportunity Zones 
1. Used by Loan approval systems to deliver lower cost funding due to government incentives to funding providers 

Leverage CRM data shared via Data Catalog connection 

1. Provide access to application to Lenders Customer List  
1. Provide feedback loop into full scale CRM systems for actions like adding new customers, tracking return customer engagements, Multi-product loyalty, Loan servicing support, and more – Ties Loan App into CRM eco system 

Create Loan Portfolio Data Product for the Risk Department 

Curate view of active loans w/o PII and share on a weekly schedule to Risk department via Marketplace 

Used to determine if shift in loan approvals is required to avoid selling too may loans in a single location, avoid selling too many high risk loans.

 
## Acknowledgements
* **Author** - <Name, Title, Group>
* **Contributors** -  <Name, Group> -- optional
* **Last Updated By/Date** - <Name, Month Year>
