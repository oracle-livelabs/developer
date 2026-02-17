# OKafka Transactional Messaging

## Introduction


This lab walks through code a transactional producer and consumer, and demonstrates how to run transactional producers and consumers.

Transactional producers and consumers combine DML operations (inserts, updates, or deletes) with message publish or receipt in a single, atomic database transaction.

Transactional messaging is useful for exactly once messaging semantics, where database operations must be atomic when message publish or receipt. 

Estimated Time: 15 minutes

### Objectives

* Review OKafka Transactional Consumer and Producer code
* Run an OKafka Transactional Consumer
* Run an OKafka Transactional Producer

### Prerequisites

This lab assumes you have:

* This lab assumes you have completed all previous Labs.

## Task 1: Review OKafka Transactional Consumer Code

The [TransactionalConsumer class](https://github.com/oracle/microservices-datadriven/blob/main/code-teq/okafka-lab/src/main/java/com/example/okafka/TransactionalConsumer.java) is similar to the regular consumer, except we combine the `consume` transaction with an update statement.

When the transactional consumer receives a message, it updates the `testuser.log` table with the time it received that message:

```java
<copy>
public static void main(String[] args) throws SQLException {
    Properties props = getAuthenticationProperties();

    // Note the use of standard Kafka properties for OKafka configuration.
    props.put("group.id" , "TRANSACTIONAL_CONSUMER");
    props.put("enable.auto.commit","false");
    props.put("max.poll.records", 50);
    props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
    props.put("value.deserializer", "org.apache.kafka.common.serialization.LongDeserializer");
    props.put("auto.offset.reset", "earliest");

    KafkaConsumer<String, Long> consumer = new KafkaConsumer<>(props);

    consumer.subscribe(List.of(TRANSACTIONAL_TOPIC_NAME));
    System.out.println("Subscribed to topic " + TRANSACTIONAL_TOPIC_NAME);
    while (true) {
        Connection conn = consumer.getDBConnection();
        String sql = "update log set consumed = ? where id = ?";
        ConsumerRecords<String, Long> records = consumer.poll(Duration.ofSeconds(3));
        for (ConsumerRecord<String, Long> record : records) {
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setDate(1, new Date(Instant.now().toEpochMilli()));
                ps.setLong(2, record.value());
                ps.executeUpdate();
            }
            System.out.println("Consumed record: " + record.value());
        }

        consumer.commitSync();
    }
}
</copy>
```

The transactional capability is facilitated by the `consumer.getDBConnection` method. This method retrieves the current, active database connection used by the consumer.

## Task 2: Start The OKafka Transactional Consumer

From the lab root directory, run the following Maven command to start the OKafka transactional consumer:

```bash
<copy>
mvn exec:java -Dexec.mainClass=com.example.okafka.TransactionalConsumer
</copy>
```

You should see the following message printed to the console, indicating the consumer subscribed to the test transactional topic:

```bash
Subscribed to topic test_transactional_topic
```

Leave the consumer running.

## Task 3: Review The OKafka Transactional Producer Code

The [TransactionalProducer class](https://github.com/oracle/microservices-datadriven/blob/main/code-teq/okafka-lab/src/main/java/com/example/okafka/TransactionalProducer.java) has a few key differences from the regular producer.

First, the `oracle.transactional.producer` must be set to `true`. This enables the producer for transactions.

After creating the producer, we must call `producer.initTransactions()` once. This initializes the producer for transactional workflows.

To start a new transaction, we call `producer.beginTransaction()`. Then, the `producer.getDBConnection()` method is invoked to get a database connection. We use the database connection to insert a record into the `testuesr.log` table that indicates when the producer published the message.

Once we're done with the transaction, we call `producer.commitTransaction` to commit all pending operations to the database, including message produce:

```java
<copy>
public static void main(String[] args) throws InterruptedException, SQLException {
    Properties props = getAuthenticationProperties();
    props.put("enable.idempotence", "true");
    props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
    props.put("value.serializer", "org.apache.kafka.common.serialization.LongSerializer");
    // This property is required for transactional producers
    props.put("oracle.transactional.producer", "true");
    KafkaProducer<String, Long> producer = new KafkaProducer<>(props);
    producer.initTransactions();

    int pauseMillis = 1000;
    String pm = System.getenv("PAUSE_MILLIS");
    if (pm != null && !pm.isEmpty()) {
        pauseMillis = Integer.parseInt(pm);
    }

    while (true) {
        Instant now = Instant.now();
        long id;
        producer.beginTransaction();
        Connection conn = producer.getDBConnection();

        final String sql = "insert into log (produced) values (?)";
        try (PreparedStatement ps = conn.prepareStatement(sql, new String[]{"id",})) {
            ps.setDate(1, new Date(now.toEpochMilli()));
            ps.executeUpdate();

            ResultSet generatedKeys = ps.getGeneratedKeys();
            if (generatedKeys.next()) {
                id = generatedKeys.getLong(1);
            } else {
                throw new SQLException("Create log message failed, no ID obtained");
            }
        }

        ProducerRecord<String, Long> record = new ProducerRecord<>(TRANSACTIONAL_TOPIC_NAME, id);
        producer.send(record);

        producer.commitTransaction();
        System.out.println("Producer sent message: " + record.value());

        Thread.sleep(pauseMillis);
    }
}
</copy>
```

## Task 4: Start The OKafka Transactional Producer And Observe Message Processing

Open a new terminal (if you're using Autonomous AI Database, ensure you set the relevant environment variables), and run the following Maven command:

```bash
<copy>
 mvn exec:java -Dexec.mainClass=com.example.okafka.TransactionalProducer
</copy>
```

The producer will automatically begin sending messages to the topic, where the message ID is the index of the record inserted into the `log` table:

```bash
Producer sent message: 1
Producer sent message: 2
Producer sent message: 3
Producer sent message: 4
...
```

Switch to the consumer's terminal. You will see the consumer receiving the published messages:

```bash
Consumed record: 1
Consumed record: 2
Consumed record: 3
Consumed record: 4
...
```

When you're done, use Ctrl+C to stop the programs.

## Task 5: Verify Transactions In The TESTUSER.LOG Table

The `testuserlog` table is initialized as part of the lab in the TESTUSER schema. The transactional producer and consumer code use this table to demonstrate inserts and updates as they process messages.

From a database console connected as `TESTUSER`, run the following query to verify the transactional producers and consumers were successfully setting values in this table:

```sql
<code>
select * from log fetch first 5 rows only;
</code>
```

You should see rows similar to the following. The transactional producer set the PRODUCED column when it write the message to the topic, and the transactional producer set the CONSUMED column when it received the message from the topic:

| ID | PRODUCED | CONSUMED |
| :--- | :--- | :--- |
| 1 | 2025-11-06 12:40:56.000000 | 2025-11-06 12:40:59.000000 |
| 2 | 2025-11-06 12:40:58.000000 | 2025-11-06 12:40:59.000000 |
| 3 | 2025-11-06 12:40:59.000000 | 2025-11-06 12:40:59.000000 |
| 4 | 2025-11-06 12:41:00.000000 | 2025-11-06 12:41:00.000000 |
| 5 | 2025-11-06 12:41:01.000000 | 2025-11-06 12:41:01.000000 |


You may now **proceed to the next lab**.

## Acknowledgements

* **Author** - Anders Swanson, Developer Evangelist, November 2025
* **Contributors** - Anders Swanson
* **Last Updated By** - Anders Swanson, November 2025
