# JSON Relational Duality Views

## Introduction

In this lab, we will enable JSON support for the customer service app using [JSON Relational Duality Views](https://docs.oracle.com/en/database/oracle/oracle-database/23/jsnvu/overview-json-relational-duality-views.html).


Estimated Lab Time: 15 minutes

### Objectives

In this lab, you will:

* Create a JSON Relational Duality View for support tickets
* Enable the customer service app's `json` profile

### Prerequisites

This lab assumes you have:

* All previous labs successfully completed

## Task 1: Create a JSON Relational Duality View

First, we'll create a JSON Relational Duality View for support tickets. Note that the duality view uses data from existing tables: `support_ticket` and `related_ticket`. Read/write access to the included tables is facilitated through the `@insert`, `@update`, and `@delete` annotations. 

```sql
create or replace force editionable json relational duality view ticket_dv as support_ticket @insert @update @delete {
    _id : id
    title
    description
    embedding
    relatedTickets : related_ticket @insert @update {
        relatedTicketId : related
    }
};
```

Our duality view enables read/write for our relational data using a single database request.

Relational JSON documents are transmitted to/from the database, and the database server runs the required SQL statements to read or write data. 

The following snippet from the `JSONTicketStore` bean shows how you might implement this in a Java class:

```java
private static final String UPDATE_SQL = """
        update ticket_dv v set data = ?
        where v.data."_id" = ?
        """;

public void saveTicket(Connection conn, SupportTicket ticket) {
    byte[] oson = jsonb.toOSON(ticket); // convert to binary OSON format
    try (PreparedStatement ps = conn.prepareStatement(UPDATE_SQL)) {
        ps.setObject(1, oson, OracleTypes.JSON); // use the JSON type for parameterized OSON data
        ps.setObject(2, ticket.getId(), OracleTypes.VARCHAR);
        ps.executeUpdate(); // write JSON document by ID
    } catch (SQLException e) {
        throw new RuntimeException(e);
    }
}
```

## Task 2: Enabling the `json` profile

Add the `json` profile to the list of active Spring Boot profiles:

```yaml
spring:
  profiles:
    active: events, ai, json
```

The JSON profile enables the `JSONTicketStore` bean,  

Restart the application with JSON features enabled.

## Task 3: Create/view tickets using the JSON profile

Create a new ticket:

```bash
curl -X POST -H 'Content-Type: application/json' \
  "http://localhost:8080/tickets" \
  -d '{
  "title": "Login session times out too quickly",
  "description": "Users are being logged out after just 5 minutes of inactivity, which is too aggressive. We’d like to increase the session timeout to 30 minutes."
}
'
```

On the application side, the `JSONTicketStore` bean uses the ticket store duality view to create and save ticket data in a single round trip, using a relational JSON document!

You may now proceed to the next lab.

## Learn More

* [JSON Relational Duality Views](https://docs.oracle.com/en/database/oracle/oracle-database/23/jsnvu/overview-json-relational-duality-views.html).

## Acknowledgements

* **Author** - Mark Nelson, Developer Evangelist, August 2025
* **Contributors** - Mark Nelson, Anders Swanson
* **Last Updated By** - Mark Nelson, August 2025
