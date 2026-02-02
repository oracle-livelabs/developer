# (Optional) Understand OKafka Authentication

## Introduction

This lab walks through the necessary database grants to use OKafka/TxEventQ, and the Java code to authenticate OKafka clients to Oracle AI Database.

Estimated Time: 5 minutes

### Objectives

* Review database user grants for OKafka
* Understand Java authenticaiton code for OKafka

### Prerequisites

This lab assumes you have:

* This lab assumes you have completed all previous Labs.

## Task 1: Review Database User Grants For OKafka

The following user and grants are applied for OKafka:

```sql
<copy>
-- user for okafka.  You may modify tablespace grants as appropriate.
create user TESTUSER identified by testpwd;
grant create session to TESTUSER;
grant resource, connect, unlimited tablespace to TESTUSER;

-- okafka permissions
-- AQ User role to be able to use AQ
grant aq_user_role to TESTUSER;
-- To be able to invoke operations from AQ-JMS
grant execute on dbms_aq to  TESTUSER;
-- To be able to create transactional event queue and subscriber
grant execute on dbms_aqadm to TESTUSER;
-- To be able to discover other RAC nodes of the database
grant select on gv_$session to TESTUSER;
grant select on v_$session to TESTUSER;
grant select on gv_$instance to TESTUSER;
grant select on gv_$listener_network to TESTUSER;
grant select on SYS.DBA_RSRC_PLAN_DIRECTIVES to TESTUSER;
grant select on gv_$pdbs to TESTUSER;
grant select on user_queue_partition_assignment_table to TESTUSER;
exec dbms_aqadm.GRANT_PRIV_FOR_RM_PLAN('TESTUSER');
commit;
</copy>
```

Additionally, you may grant the user access to `SYS.DBA_RSRC_PLAN_DIRECTIVES` if using the `max.poll.interval.ms` property:

```sql
<copy>
-- Property max.poll.interval.ms property is implemented using DBMS_RESOURCE_MANAGER. This grant allows a user to check if a DBMS RESOURE MANAGER plan exists or not aid if it does not, create a new plan  based on max.poll.interval.ms.
GRANT SELECT on SYS.DBA_RSRC_PLAN_DIRECTIVES to TESTUSER;
</copy>
```

You can find a SQL script to configure an OKafka database user in the [`oraclefree/grant_permissions.sql` file](https://github.com/oracle/microservices-datadriven/blob/main/code-teq/okafka-lab/oraclefree/grant_permissions.sql).

> Note: If you're using Oracle Autonomous AI Database Serverless (ADB-S), specific `gv$` and other views may be unavailable when assigning grants.

## Task 2: Understand Java Authentication Code For OKafka

You may authenticate to OKafka using an existing database connection, or a Java properties object.

If using a Java properties object, note the following Oracle-specific properties:
- `oracle.service.name`: The name of the PDB/database service the OKafka user is connecting to.
- `oracle.net.tns_admin`: The location of the database wallet, or the directory with `ojdbc.properties` file.
- `tns.alias`: Database TNS alias to be used in the `tnsnames.ora` file. Only applicable when using a wallet.

Standard Kafka properties like `security.protocol` and `bootstrap.servers` (Oracle PLAINTEXT only) may also be used to configure authentication.

The [OKafkaAuthentication class](https://github.com/oracle/microservices-datadriven/blob/main/code-teq/okafka-lab/src/main/java/com/example/okafka/OKafkaAuthentication.java) demonstrates a flexible way to authenticate a database user to OKafka using environment variables:

```java
<copy>
public class OKafkaAuthentication {
    // For this example, we'll configure our authentication parameters with environment variables.
    // The security.protocol property supports PLAINTEXT (insecure) and SSL (secure) authentication.
    private static final String securityProtocol = getEnv("SECURITY_PROTOCOL", "PLAINTEXT");

    // For PLAINTEXT authentication, provide the HOSTNAME:PORT as the bootstrap.servers property.
    private static final String bootstrapServers = getEnv("BOOTSTRAP_SERVERS", "localhost:9092");

    // The TNS Admin alias / Oracle Database Service name.
    private static final String tnsAdmin = getEnv("TNS_ADMIN", "freepdb1");

    // The directory containing the database wallet. For PLAINTEXT, this directory need only
    // contain an ojdbc.properties file with the "user" and "password" properties configured.
    private static final String walletDir = getEnv("WALLET_DIR", "./wallet");

    /**
     * Create a Java Properties object for Oracle AI Database OKafka connection.
     * Configure using the SECURITY_PROTOCOL, BOOTSTRAP_SERVERS, TNS_ADMIN, and WALLET_DIR environment variables.
     * @return configured Properties object.
     */
    public static Properties getAuthenticationProperties() {
        // Just like kafka-clients, we can use a Java Properties object to configure connection parameters.
        Properties props = new Properties();

        // oracle.service.name is a custom property to configure the Database service name.
        props.put("oracle.service.name", tnsAdmin);
        // oracle.net.tns_admin is a custom property to configure the directory containing Oracle Database connection files.
        // If you are using mTLS authentication, client certificates must be present in this directory.
        props.put("oracle.net.tns_admin", walletDir);
        // security.protocol is a standard Kafka property, set to PLAINTEXT or SSL for Oracle Database.
        // (SASL is not supported with Oracle Database).
        props.put("security.protocol", securityProtocol);
        if (securityProtocol.equals("SSL")) {
            // For SSL authentication, pass the TNS alias (such as "mydb_tp") to be used from the tnsnames.ora file
            // found in the WALLET_DIR directory.
            props.put("tns.alias", tnsAdmin);
        } else {
            // For PLAINTEXT authentication, we provide the database URL in the format
            // HOSTNAME:PORT as the bootstrap.servers property.
            props.put("bootstrap.servers", bootstrapServers);
        }

        return props;
    }
}

</copy>
```

The properties can then be used in a OKafka client like so:

```java
<copy>
// Authentication properties to connect to Kafka
Properties props = getAuthenticationProperties();
Admin admin = AdminClient.create(props)
</copy>
```

## Acknowledgements

* **Author** - Anders Swanson, Developer Evangelist, November 2025
* **Contributors** - Anders Swanson
* **Last Updated By** - Anders Swanson, November 2025

