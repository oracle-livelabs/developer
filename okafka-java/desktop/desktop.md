# Get started - Oracle AI Database Free container image

## Introduction

This lab sets up the OKafka environment on your desktop or laptop, using an Oracle AI Database Free container image

Estimated Time: 15 minutes

### Objectives

* Clone the lab code from [GitHub](https://github.com/oracle/microservices-datadriven/tree/main/code-teq/okafka-lab)
* Start the Oracle AI Database Free container

### Prerequisites

This lab assumes you have:

* A docker-compatible environment capable of running `docker-compose`.
* `git` installed and on your PATH.

## Task 1: Clone The Lab Code

run the following command to checkout the lab code from GitHub:

```bash
<copy>
git clone --filter=blob:none --no-checkout https://github.com/oracle/microservices-datadriven.git
cd microservices-datadriven
git sparse-checkout init --cone
git sparse-checkout set code-teq/okafka-lab
git checkout main
</copy>
```

You may also view the lab code here: [OKafka Lab](https://github.com/oracle/microservices-datadriven/tree/main/code-teq/okafka-lab)

## Task 2: Start An Oracle AI Database Container Image

First, change directory into the lab directory:

```bash
<copy>
cd code-teq/okafka-lab
</copy>
```

Then, start the Oracle AI Database Free container using `docker-compose`:

```bash
<copy>
docker-compose up -d
</copy>
```

This starts an Oracle AI Database Free container named "okafkadb" on port `9092`:

```bash
CONTAINER ID   IMAGE                                       COMMAND                  CREATED         STATUS                            PORTS                                         NAMES
48b23a2fc7f8   gvenzl/oracle-free:23.26.0-slim-faststart   "container-entrypoin…"   4 seconds ago   Up 2 seconds (health: starting)   0.0.0.0:9092->1521/tcp, [::]:9092->1521/tcp   okafkadb
```

The Oracle AI Database Free container is automatically configured with a user `testuser:testpwd` and appropriate grants to use OKafka. You can see the SQL script run in the [`oraclefree/grant_permissions.sql` file](https://github.com/oracle/microservices-datadriven/blob/main/code-teq/okafka-lab/oraclefree/grant_permissions.sql)

## Task 3: Optional - Connect To The Database Container Image

Use `sql` to connect to the container image running on port `9092`:

```sql
<copy>
sql testuser/testpwd@localhost:9092/freepdb1
</copy>
```

You should see the following output, indicating a successful connection:

```
Copyright (c) 1982, 2026, Oracle.  All rights reserved.

Connected to:
Oracle AI Database 26ai Free Release 23.26.0.0.0 - Develop, Learn, and Run for Free
Version 23.26.0.0.0
```


You may now **proceed to the next lab**.

## Acknowledgements

* **Author** - Anders Swanson, Developer Evangelist, November 2025
* **Contributors** - Anders Swanson
* **Last Updated By** - Anders Swanson, November 2025

