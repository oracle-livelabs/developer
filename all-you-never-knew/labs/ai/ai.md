# AI Capabilities

## Introduction

In this lab, we will add AI capabilities to our customer support application.

When support ticket events are received, the application will use AI Vector Search to find any similar tickets.

If a similar ticket exists, it is automatically linked to the new ticket, using the `related_ticket` join table.

Estimated Lab Time: 15 minutes

### Objectives

In this lab, you will:

* Enable the `ai` profile in Spring Boot
* Explore the enabled AI capabilities

### Prerequisites

This lab assumes you have:

* All previous labs successfully completed

## Task 1: Enable the `ai` profile

To enable AI capabilities in the customer support app, add the `ai` profile to the list of active Spring Boot profiles:

```yaml
spring:
  profiles:
    active: events, ai
```

The `ai` profile enables Spring Beans for vector storage and embedding. When support ticket events are consumed, they are embedded using the OCIEmbeddingService bean. The embedding is used to find similar tickets (if any) based on the ticket's semantic representation.

Using transactional messaging from the event streaming lab, the support ticket and any related tickets are saved to the database.

The following main AI-related beans are enabled with the `ai` profile:

- GenAIEventProcessor: processes vector embeddings for support tickets
- OCIEmbeddingService: embeds support tickets as vectors using OCI
- TicketVectorStore: enables AI vector search and storing vector data

## Task 2: Process support tickets using AI capabilities

Restart the applciation and create the following two support tickets:

cURL request for first ticket:

```bash
<copy>
curl -X POST -H 'Content-Type: application/json' \
  "http://localhost:8080/tickets" \
  -d '{
  "title": "Cannot create new users via API",
  "description": "The API endpoint for user creation sometimes returns a 500 Internal Sever Error despite valid credentials and permissions. This is blocking automation scripts."
}
'
</copy>
```

cURL request for second ticket:

```bash
<copy>
curl -X POST -H 'Content-Type: application/json' \
  "http://localhost:8080/tickets" \
  -d '{
  "title": "Login fails with 500 error",
  "description": "Users occasionally receive a 500 Internal Server Error when trying to log in through the main portal. Started happening after the latest update."
}'
</copy>
```

As the tickets are semantically similar (both involving 500 server errors with user/logins) we would expect them to be related to each other.

## Task 3: Verify and view vector representation

Now that AI capabilities are enabled, the `embedding` column of the `support_ticket` table is now populated by the GenAIEventProcessor bean. To view the embedding vectors, query the contents of the `support_ticket` table:

```sql
<copy>
select * from support_ticket;
</copy>
```

You should see the `embedding` column populated for the two tickets created in the prior step. Any tickets created before enabling the `ai` profile will have their embedding column empty.

## Task 4: Verify ticket relationship was created

After the tickets have been processed, verify the relation was created by querying the `related_ticket` table:

```sql
<copy>
select * from related_ticket;
</copy>
```

You should see a relationship between the IDs of both tickets created in Task 2.

You may now proceed to the next lab.

## Acknowledgements

* **Author** - Mark Nelson, Developer Evangelist, August 2025
* **Contributors** - Mark Nelson, Anders Swanson
* **Last Updated By** - Mark Nelson, August 2025
