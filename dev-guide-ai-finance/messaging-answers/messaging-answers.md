# Code with Transactional Event Queues step-by-step

## Introduction

This step-by-step guide will walk you through the necessary updates, providing solutions and insights to help you fully understand how to utilize Transactional Event Queues in a practical scenario. 

At SeerEquities, the loan department has flagged an issue with earnest payment overdraft logging, affecting auditing and analytics. Currently, loan officers must manually file overdrafts for failed earnest payments in a time-consuming process. To resolve this, the system must be updated to log overdrafts during earnest payment process. Once this is implemented, the processing of earnest payment will automatically include overdraft logging in a single, atomic database transaction.

Let’s dive in and unlock the full potential of Transactional Event Queues in your application!

Estimated Time: 15 minutes

### Objectives

In this lab, you will:

* Enhance your understanding of [Transactional Event Queues](https://docs.oracle.com/en/database/oracle/oracle-database/23/adque/aq-introduction.html) and [Oracle REST Data Services (ORDS)](https://www.oracle.com/database/technologies/appdev/rest.html).
* Gain hands-on experience with transactional messaging and refining application features to meet specific development requirements.

### Prerequisites

This lab assumes you have:
* An Oracle Cloud account
* Successfully completed Lab 1: Run the Demo
* Successfully completed Lab 3: Connect to Development Environment


## Task 1: Challenge Requirements

**About Transactional Event Queues (TxEventQ) **:

TxEventQ is a messaging system built into Oracle Database — that is, TxEventQ runs within the database, providing an interface for applications to asynchronously produce and consume messages using database transactions. TxEventQ was introduced in Oracle Database 19c as the evolution of classic queuing to address the needs of modern event streaming microservices. TxEventQ is included as a free-of-charge Oracle Database feature.

In this challenge, you'll leverage the transactional capabilities of TxEventQ's Kafka Java Clients API to work with database records from an event-streaming context.

**Coding Requirements**:

This challenge consists of **three steps**:

* First, browse the transactional messaging code to get an understanding of Oracle Database's Kafka Java Client APIs.
* Second, update the earnest payments service to support overdraft logging.
* Third, publish an earnest payment event that should trigger an overdraft and validate it using ORDS.

## Task 2: Understand the Kafka Java Client APIs

1. In the EarnestPaymentsConsumer.java file (financial-services/earnest-payment-service/src/main/java/com/oracle/finance/payments/consumer/EarnestPaymentsConsumer.java), find the # 🔍 `run` method at line 42.
   2. The `run` method starts a Oracle Database consumer on a given collection of topics, processing each batch of records it receives. If you have written Java code using Apache Kafka, this method may look very familiar.
3. In the EarnestPaymentsConsumer.java file (financial-services/earnest-payment-service/src/main/java/com/oracle/finance/payments/consumer/EarnestPaymentsConsumer.java), find the # 🔍 `processRecords` method at line 57.
   4. The `processRecords` method iterates through each record received by the consumer, and processes the earnest payment.
   5. If the payment is successful, the destination account is debited a given amount from the source account (lines 61-63).
   6. If the payment fails due to an overdraft, the transaction is dropped (lines 64-64).

Database operations done in the `processRecords` method use the database connection provided by the Oracle Database consumer: this means all database operations done in this method occur the _same transaction_ as the consumer. Transactional messaging capabilities allow us to easily roll back or commit records in the context of event streaming.

## Task 3: Update earnest payments service

The company has requested an enhancement to earnest payment processing, and would now like to overdrafts to be automatically logged.

1. In the EarnestPaymentsService.java file (financial-services/earnest-payment-service/src/main/java/com/oracle/finance/payments/service/EarnestPaymentsService.java), find the # 🔍 processOverdraft method Details Section at line 70
2. Update the processOverdraft method to save the overdraft information.

> Note that the `Connection` object provided to the `processOverdraft` method is the same database connection used by the earnest payments consumer. Any database operations on this connection will occur in the same transaction as overall consumer processing.

```java
public void processOverdraft(Connection conn, OverdraftException oe) throws SQLException {
    try (PreparedStatement ps = conn.prepareStatement(insertOverdraft)) {
        ps.setString(1, oe.getCustomerId());
        ps.setDouble(2, oe.getAmount());
        ps.executeUpdate();
    }
}
```

## Task 4: Start the updated earnest payments service

Now that you've updated the service, we'll restart it to test the new functionality. From the financial-services/earnest-payment-service directory, start the earnest payments service using Maven:

```bash
mvn spring-boot:run
```

You should see output similar to the following:

```bash
2025-04-11T10:45:06.060-07:00  INFO 20900 --- [earnest_payment_service] [           main] o.o.o.clients.consumer.ConsumerConfig    : These configurations '[max.poll.records]' were supplied but are not used yet.
2025-04-11T10:45:06.060-07:00  INFO 20900 --- [earnest_payment_service] [           main] o.a.kafka.common.utils.AppInfoParser     : Kafka version: 3.7.1
2025-04-11T10:45:06.060-07:00  INFO 20900 --- [earnest_payment_service] [           main] o.a.kafka.common.utils.AppInfoParser     : Kafka commitId: e2494e6ffb89f828
2025-04-11T10:45:06.060-07:00  INFO 20900 --- [earnest_payment_service] [           main] o.a.kafka.common.utils.AppInfoParser     : Kafka startTimeMs: 1744393506060
2025-04-11T10:45:06.062-07:00  INFO 20900 --- [earnest_payment_service] [         task-1] o.oracle.okafka.clients.NetworkClient    : [Consumer clientId=consumer-earnest_payments-1, groupId=earnest_payments] Available Nodes 1
2025-04-11T10:45:06.062-07:00  INFO 20900 --- [earnest_payment_service] [         task-1] o.oracle.okafka.clients.NetworkClient    : [Consumer clientId=consumer-earnest_payments-1, groupId=earnest_payments] All Known nodes are disconnected. Try one time to connect.
2025-04-11T10:45:06.062-07:00  INFO 20900 --- [earnest_payment_service] [         task-1] o.oracle.okafka.clients.NetworkClient    : [Consumer clientId=consumer-earnest_payments-1, groupId=earnest_payments] Initiating connection to node 0:<ORACLE DATABASE URL>::
2025-04-11T10:45:06.063-07:00  INFO 20900 --- [earnest_payment_service] [         task-1] o.o.o.c.c.internals.AQKafkaConsumer      : [Consumer clientId=consumer-earnest_payments-1, groupId=earnest_payments] Connecting to Oracle Database : jdbc:oracle:thin:@mydb_tp
2025-04-11T10:45:06.319-07:00  INFO 20900 --- [earnest_payment_service] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8081 (http) with context path '/'
2025-04-11T10:45:06.325-07:00  INFO 20900 --- [earnest_payment_service] [           main] c.oracle.finance.payments.Application    : Started Application in 4.764 seconds (process running for 5.09)
2025-04-11T10:45:07.295-07:00  INFO 20900 --- [earnest_payment_service] [         task-1] o.o.o.c.c.internals.AQKafkaConsumer      : [Consumer clientId=consumer-earnest_payments-1, groupId=earnest_payments] Database Consumer Session Info: 15301,42442. Process Id 307858 Instance Name e2o1pod7
2025-04-11T10:45:07.366-07:00  INFO 20900 --- [earnest_payment_service] [         task-1] o.oracle.okafka.clients.NetworkClient    : [Consumer clientId=consumer-earnest_payments-1, groupId=earnest_payments] Reconnect successful to node 7:<ORACLE DATABASE URL>:ADMIN
2025-04-11T10:45:08.178-07:00  INFO 20900 --- [earnest_payment_service] [         task-1] org.oracle.okafka.clients.Metadata       : Cluster ID: e2o1pod
2025-04-11T10:45:08.178-07:00  INFO 20900 --- [earnest_payment_service] [         task-1] o.oracle.okafka.clients.NetworkClient    : [Consumer clientId=consumer-earnest_payments-1, groupId=earnest_payments] Available Nodes 1
2025-04-11T10:45:09.645-07:00  INFO 20900 --- [earnest_payment_service] [         task-1] o.oracle.okafka.clients.NetworkClient    : [Consumer clientId=consumer-earnest_payments-1, groupId=earnest_payments] Available Nodes 1
```

## Task 5: Verify overdraft logging using ORDS

1. Open a new terminal

2. Run the following cURL command to initiate an earnest payment from CUST0001 to CUST0002 for $10,000 using the ORDS TxEventQ API.
```bash
curl -X POST -u "$USERNAME:$DBPASSWORD" \
    -H 'Content-Type: application/json' \
    "${ORDS_URL}admin/_/db-api/stable/database/txeventq/topics/earnest_payment" -d '{
    "records": [
      { "key": "xyz", "value": "{\"sourceCustomer\": \"CUST0001\", \"destinationCustomer\": \"CUST0002\", \"amount\": 10000 }" }
    ]
}'
```

3. Switch to the terminal, and run the following cURL command to verify the overdraft was logged:

```bash
curl -s -X GET "http://localhost:8086/overdraft" | jq
```

You should see the following output:

```bash
[
  {
    "customerId": "CUST0001",
    "amount": 10000
  }
]
```

**Congratulations, you have successfully completed the Transactional Event Queues Coding Exercise!**

## Learn More

* [Oracle Database 23ai Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/)

## Acknowledgements
* **Authors** - Anders Swanson
* **Contributors** -
* **Last Updated By/Date** - Anders Swanson, April 2025

