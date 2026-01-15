# OKafka Producer and Consumer

## Introduction

This lab walks through producer and consumer code, and demonstrates how to run simple producers and consumers.

Estimated Time: 15 minutes

### Objectives

* Review OKafka Consumer and Producer code
* Run an OKafka Consumer
* Run an OKafka Producer

### Prerequisites

This lab assumes you have:

* This lab assumes you have completed all previous Labs.

## Task 1: Review The OKafka Consumer code

The [OKafkaConsumer class](https://github.com/oracle/microservices-datadriven/blob/main/code-teq/okafka-lab/src/main/java/com/example/okafka/OKafkaConsumer.java) implements a simple consumer for a single topic using the kafka-clients Java API.

The consumer receives messages from a topic named "TEST_TOPIC" and prints them to the console:

```java
<copy>
public class OKafkaConsumer {
    public static void main(String[] args) {
        Properties props = getAuthenticationProperties();

        // Note the use of standard Kafka properties for OKafka configuration.
        props.put("group.id" , "TEST_CONSUMER");
        props.put("enable.auto.commit","false");
        props.put("max.poll.records", 50);
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("auto.offset.reset", "earliest");

        Consumer<String, String> consumer = new KafkaConsumer<>(props);

        consumer.subscribe(List.of(TOPIC_NAME));
        System.out.println("Subscribed to topic " + TOPIC_NAME);
        while (true) {
            ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(3));
            for (ConsumerRecord<String, String> record : records) {
                System.out.println("Consumed record: " + record.value());
            }

            consumer.commitSync();
        }
    }
}
</copy>
```

If you've written kafka-clients Java code before, this class may look very familiar. Because the `org.oracle.okafka.clients.consumer.KafkaConsumer` class implements the `org.apache.kafka.clients.consumer.Consumer` interface, you may use OKafka consumers exactly how you'd use kafka-clients consumers!

## Task 2: Start The OKafka Consumer

From the lab root directory, run the following Maven command to start the OKafka consumer:

```bash
<copy>
mvn exec:java -Dexec.mainClass=com.example.okafka.OKafkaConsumer
</copy>
```

You should see the following message printed to the console, indicating the consumer subscribed to the test topic:

```bash
Subscribed to topic test_topic
```

Leave the consumer running.

## Task 3: Review the OKafka Producer Code

The [OKafkaProducer class](https://github.com/oracle/microservices-datadriven/blob/main/code-teq/okafka-lab/src/main/java/com/example/okafka/OKafkaProducer.java) implements a simple producer that writes messages to a topic every second.

The producer writes messages to a topic named "TEST_TOPIC":

```java
<copy>
public static void main(String[] args) throws InterruptedException {
    Properties props = getAuthenticationProperties();
    props.put("enable.idempotence", "true");
    props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
    props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
    Producer<String, String> producer = new KafkaProducer<>(props);

    int pauseMillis = 1000;
    String pm = System.getenv("PAUSE_MILLIS");
    if (pm != null && !pm.isEmpty()) {
        pauseMillis = Integer.parseInt(pm);
    }

    while (true) {
        Instant now  = Instant.now();
        ProducerRecord<String, String> record = new ProducerRecord<>(TOPIC_NAME, "Message: " + now);
        producer.send(record);
        System.out.println("Producer sent message: " + record.value());

        Thread.sleep(pauseMillis);
    }
}
</copy>
```

Again, if you've written kafka-clients Java code before, this class will also look familiar. Because the `org.oracle.okafka.clients.producer.KafkaProducer` class implements the `org.apache.kafka.clients.producer.Producer` interface, you may use OKafka producers exactly how you'd use kafka-clients producers!

## Task 4: Start The OKafka Producer And Observe Message Processing

Open a new terminal and run the following Maven command. If you're using Autonomous AI Database, ensure you set the relevant environment variables to connect. If you're using the container image, you may ignore this:

```bash
<copy>
mvn exec:java -Dexec.mainClass=com.example.okafka.OKafkaProducer
</copy>
```

The producer will automatically begin sending messages to the topic:

```bash
Producer sent message: Message: 2025-11-06T20:10:19.525918Z
Producer sent message: Message: 2025-11-06T20:10:21.495538Z
Producer sent message: Message: 2025-11-06T20:10:22.498800Z
Producer sent message: Message: 2025-11-06T20:10:23.502251Z
...
```

Switch to the consumer's terminal. You will see the consumer receiving the published messages:

```bash
Consumed record: Message: 2025-11-06T20:10:19.525918Z
Consumed record: Message: 2025-11-06T20:10:21.495538Z
Consumed record: Message: 2025-11-06T20:10:22.498800Z
Consumed record: Message: 2025-11-06T20:10:23.502251Z
...
```

After verifying the producer and consumer are working correctly, you may stop them both with a sigterm (Ctrl+C) signal.

You may now **proceed to the next lab**.

## Acknowledgements

* **Author** - Anders Swanson, Developer Evangelist, November 2025
* **Contributors** - Anders Swanson
* **Last Updated By** - Anders Swanson, November 2025
