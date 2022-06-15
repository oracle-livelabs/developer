# B2B Concepts

## Introduction

This lab walks you through B2B concepts.

Estimated Time: 15 minutes

### Objectives

In this lab, you will learn several B2B concepts which will be implemented in the next labs.

* Host Company.
* Trading Partners.
* VAN Providers.
* Integrations used for Message processing.
* Transports for Communication.
* Agreements.
* B2B Documents and Schemas.

### Prerequisites

This lab assumes you have:

* An Oracle account and Oracle Integration Instance provisioned.
* All Pre-requisite setup is done.

##	Task	1: Learn Concepts and Understand Navigation

### *Host Company*

There are two parties involved in any exchange - your company and an external trading partner.

**Host Profile** is where you configure information about your company.

The Host Profile has only B2B Identifiers for you to enter. This is where you will enter your company's identity information such as EDI Interchange ID and AS2 Identifier. Certain other types of configuration, such as Signing Certificates for your company, etc. are entered in Connections, explained later.

When you send electronic documents to an external trading partner, some B2B Identifiers you enter in the Host Profile are inserted into the message so that the recipient party can identify the sender of the message as being your company.

### *Trading Partners*

A Trading Partner is an external business entity that your company interacts with, and sends or receives business transactions, such as orders and invoices, in electronic form.

**Trading Partners** is the where you register your external trading partners and enter information on their behalf. Note that your trading partners cannot access these pages in your Oracle Integration instance. Therefore, as the B2B system administrator, you gather information from your external trading partners, and enter that information in Trading Partner configurations.

Similar to Oracle Integration B2B, your external trading partner will have a B2B application of their own, and they will collect some information about your company, and enter that information into their B2B application.

Once the setup is completed on both the ends (and tested), then the two parties - your company and the external trading partner, are ready to send and receive documents.

![Trading Partners](./images/gettingStarted-TradingPartners.png)

### *VAN Providers*

In some cases, you don't directly communicate with your external trading partners; instead, you go through an intermediary service, called a VAN provider, who routes your business transactions to the final trading partner recipient. VAN, an abbreviation for Value Added Network, are third party service providers that facilitate communication with multiple trading partners. When you use such a service, you only send business documents to the VAN provider's network endpoint, and they will route it for you to the actual trading partner, eliminating the need to set up one-to-one communication with each trading partner separately.

### *Integrations Used For B2B Processing*

The processing of B2B messages happens through Integrations. Oracle Integration B2B uses a two-integration design pattern for better modularity, described below.

#### Inbound

Let us walk through a typical B2B message received from an external trading partner, called an Inbound Message.

The picture below shows how an Inbound message is processed through two integrations.

![B2B Inbound message Integration pattern](./images/gettingStarted-InboundProcessing.png)

In the two-integration flow patterns, the **B2B Integration for Receiving Messages** performs these steps:

1. Receive the message from the trading partner and perform various validity checks, for example:
    * Is the message received from a known (that is registered) trading partner? Verify this based on authentication credentials, SSL certificates, HTTP headers, etc.
    * Is the message signed or encrypted? If so, verify the signature and decrypt the message. This step is called Un-packaging akin to taking an object out of its packaging.
2. Send a transport level acknowledgment back to the trading partner, if asked by the trading partner.
3. Detect the type of payload. If it is a payload that requires translation (for example, such as an EDI message), parse and translate the message.
4. Send a translator level acknowledgment, if configured.

The **Backend Integration** performs these steps:

1. Convert the message into a format that a backend application, such as ERP, can directly consume (for example, such as XML, JSON, CSV, etc.) and forward the message to a backend system for further processing.

#### Outbound

Let us walk through a typical B2B message being sent to an external trading partner, called an Outbound Message.

The picture below shows how an Outbound message is processed through two integrations.
![B2B Outbound message Integration pattern](./images/gettingStarted-OutboundProcessing.png)

In the two-integration flow patterns, the **Backend Integration** performs these steps:

1. Receive an event from a backend application such as ERP for a business document that must be sent out to an external trading partner.
2. Translate the message to an industry-standard B2B format, for example EDI (Electronic Data Interchange) format.

The **B2B Integration for Sending Messages** performs these steps:

1. Add headers, encrypt, sign, and compress the payload, per your desired configuration. This step is called Packaging akin to wrapping an object into an envelope, putting it in a box, and making it ready for delivery.
2. Transmits the message to the external trading partner's endpoint.
3. If the trading partner responds with a transport level acknowledgment, update the status of the transmitted message accordingly.

### *Transports for Communication*

Transports are configuration objects that represent a concrete communication channel to a trading partner, using a specific protocol such as AS2 or FTP. You add one or more transports to a trading partner in order to send or receive business documents from them.

Currently, AS2 and FTP (includes SFTP) are supported protocols for B2B Trading Partner mode. If you wish to use another protocol adapter in Oracle Integration with B2B, you can do so only using the Standalone mode.

You define a Transport for a B2B trading partner from the **Trading Partner** **Transports and Agreements** configuration. Here's a sample screenshot for a trading partner with one AS2 and one FTP transport.

![Trading Partner Transport configuration](./images/gettingStarted-TransportsOfComm.png)

#### FTP

File Transfer Protocol and Secure File Transfer Protocol (SFTP) are very commonly used for B2B communications. An FTP transport also works in conjunction with an FTP Connection.

In an FTP Connection you specify the hostname, port, credentials and other security configuration. In the FTP transport, you enter the Input and Output Directory, File name pattern and other details.

One important aspect of an FTP transport is that the receiving side polls the Input Directory on a time-based schedule. You can set up the schedule by clicking on the Receive Schedule action for an FTP transport.

#### AS2

AS2, an abbreviation for Applicability Statement 2, is an HTTP based protocol designed for B2B by adding a comprehensive set of data security features around data confidentiality, data integrity/authenticity, and non-repudiation. The AS2 specification is covered by [RFC 4130](https://datatracker.ietf.org/doc/html/rfc4130). Oracle Integration B2B supports AS2 1.0 and 1.1 versions.

An AS2 transport offers configuration options specific to AS2 that work in conjunction with the AS2 Connection and the Certificate management.

For example, if you wish to sign and encrypt the outbound messages:

1. You use Oracle Integration Certificate management, accessed from the **Home** page and clicking ***Settings***, then ***Certificates***, to upload your certificates.
2. You enter the signing and encryption certificate alias in the AS2 Connection selected in the AS2 Transport.
3. You select an encryption and signing algorithms in the AS2 Transport configuration.

The simplest AS2 communication uses no encryption, no signing, and no compression. If you are learning about AS2, you can start simple and add the security layers later.

In AS2 there is a concept of an electronic read receipt, officially termed as MDN (Message Disposition Notification). It is a transport level acknowledgment used as a confirmation that the other party has received your message intact. Oracle Integration B2B generates and consumes MDN messages (when enabled), and correlates them to the original transmissions. A B2B Message Tracking page, described later, allows you to view the AS2 messages and the MDN acknowledgments.

### *Agreements*

You define one or more Agreements for a B2B trading partner with an intent to send or receive only certain types of business documents to or from that trading partner. An Agreement literally means that your company and the external trading partner have formally agreed upon the terms for the exchange of specific business documents.

An Agreement has the following purposes:

1. Armed with the knowledge of which documents to expect for a given trading partner, B2B will only accept any of the agreed-upon documents. Any unexpected document type is rejected, both, while receiving or sending to that trading partner.
2. Defines the data format for the documents exchanged. For example, for an EDI document, syntax validations and parsing is done based on the B2B Document selected in an Agreement. Both parties, your company and the external trading partner, must decide in advance, the data format to be used for interoperability to work. Typically, one of the parties shares an Implementation Guide containing the data format definition, and the other party complies with it and creates an equivalent data format definition on their side.
3. Specifies behavior for message processing. For example, syntax validations on the data format can be turned on or off in an Agreement, among other settings.
4. Define rules for routing of documents - for example, when receiving documents, an Inbound Agreement defines which Backend Integration to route a document to, based on its type. While sending documents, an Outbound Agreement defines which B2B Sending Integration to hand-over a specific document to for delivery to a trading partner.

Below are example screenshots of two Inbound and two Outbound Agreements defined for a trading partner:
![Example B2B Inbound Agreement](./images/gettingStarted-InboundAgreement.png)

![Example B2B Outbound Agreement](./images/gettingStarted-OutboundAgreement.png)

### *B2B Documents and Schemas*

A B2B Document is a mandatory object required by an Agreement, and specifies a data format and some additional configuration about the data format.

A data format is specified using these properties:

* Document Standard - presently the EDI standards X12 and EDIFACT are supported.
* Document Version - a version as defined by the standards body.
* Document Type - a type as defined by the standards body.
* Document Schema - Standard or a customized variant defined in a B2B Schema object. Standard means the pristine schema defined in the data dictionary published by the Standards body.

Additional configuration means one or more Business Identifiers that the B2B runtime should extract and display in B2B Message Tracking.

A B2B Schema is an optional object that represents a customized variant of one of the Standard schemas.

### *Message Persistence and Tracking*

As messages flow through the B2B Integrations for Receiving and Sending, each Inbound and Outbound message is persisted separately, in addition to the usual integration instance tracking.

The persisted B2B messages can be accessed from the **Home** page and clicking ***Monitoring***, then ***B2B Tracking***.

The sample screenshot below shows the B2B Tracking page.
![B2B Tracking](./images/gettingStarted-TrackMessages.png)

#### Business Messages

In this view, you see B2B messages as individual business transactions. Rows marked **FA** denote functional acknowledgments.

Let's say you receive an inbound message containing batched transactions. Then in this view you will see individual rows for each of the single transactions within that batch.

#### Wire Messages

An alternate low-level technical view of B2B messages is the Wire Messages. In this view, you will see messages in the form they are actually transmitted to, or received from a trading partner. This view is useful for troubleshooting, in case the message failed to be delivered to a trading partner, or if a message that was received failed the signature verification step. Rows marked **MDN** denote AS2 MDNs (electronic return receipts).

In the case where you receive an inbound message containing batched transaction, in this view, you will only see one row corresponding to the actual batch message that was received.

![B2B Messages](./images/gettingStarted-WireMessages.png)

### *Demystify the Concepts*

#### Use Case

ACME Corp sends an X12 850 Purchase Order EDI document to Trading Partner Dell Inc through, by using FTP. ACME Corp had configured Oracle Integration B2B message exchange agreement to send Purchase Order EDI document to External Trading Partner.

![B2B Outbound Purchase Order Use Case](./images/demystifying-concepts.png)

* Acme Corp (Manufacturer of goods) an Oracle Integration Customer is the Host company.
* Dell Inc (Supplier of goods) is the Trading Partner.
* Host Company ERP Cloud Application Creates a purchase order. A Backend Integration in OIC translates the Purchase order to EDI X12 Structure.
*	Oracle Integration B2B transports the Purchase Order to Trading Partner through, by using agreed upon Communication Protocol which is FTP.
* Acme Corp Sends the Purchase Order and Receives an 997 Acknowledgement from Trading Partner which is the Agreement configured for Outbound processing.

**Relationship between Trading Partner and Agreements**
![Trade Partner Agreements FLow](./images/relationshipTP-Agreements.png)

You may now **proceed to the next lab**.

## Learn More

* [Oracle Integration B2B](https://docs.oracle.com/en/cloud/paas/integration-cloud/btob.html)
* [Oracle Integration Blogs](https://blogs.oracle.com/integration/)

## Acknowledgements
* **Author** - Kishore Katta, Technical Director, Oracle Integration Product Management
* **Contributors** -  Subhani Italapuram, Oracle Integration Product Management
* **Last Updated By/Date** - Oracle Integration team, December 2021
