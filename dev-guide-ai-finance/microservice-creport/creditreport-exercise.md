# Create a Creditreport Microservice

## Introduction

**Welcome to the Microservice creditreport Challenge!**

In this lab, you will tackle an exciting coding challenge focused on **microservice, spring boot and Oracle cloud Spring Boot starter for database**. Your goal is to enhance the existing application by implementing an update that will create a GET REST endpoint that produces a creditreport that the frontend UI than will consume and the loan officer can see the information.

Spring Boot is a Java framework that makes it easier to create and run Java applications. It simplifies the configuration and setup process, allowing developers to focus more on writing code for their applications.

Spring Boot Starter is a set of convenient dependency descriptors you can include in your application to simplify the setup of Spring applications. It provides a way to bundle common dependencies and configurations, allowing developers to get started quickly with minimal setup.

At SeerEquites, the loan officer will see the creditreport in his dashboard and make decisions based on the report.

This is your opportunity to sharpen your skills and explore the power of microservices, Spring Boot and Spring Oracle Cloud Database starter.

**Are you up for the challenge?**

If you're ready to dive in, proceed with this lab and start coding.

Good luck, and happy coding!

Estimated Time: 20 minutes

### Objectives

In this lab, you will:

* Download and unpack the stub code.
* Configure the application to use Spring Cloud Oracle Database Starter for Universal Connection Pooling (UCP).
* Use Jupyter to finish the application code (JPA, DTO, REST endpoint and more).
* Test the application at various stages

### Prerequisites

This lab assumes you have:

* An Oracle Cloud account.
* Successfully completed Lab 1: Run the Demo.
* Successfully completed Lab 3: Connect to Development Environment.
* A good understanding of Java.
* Google Chrome or Firefox is the preferred browser.

## Task 1: Familiarize yourself with the stub code

In the Jupyter environment expand the root level `creditreport` folder and to look around in the stub code.

* The `controller` package contains the Spring REST controller. You will be modifying this file by creating a REST endpoint.
* The `dto` package contains the DTOs (Data Transfer Objects). You will use the DTOs when creating the creditreport service.
* The `model` package contains the JPA entities (Clients and ClientDebt). They reflect the Oracle Autonomous Database 23ai tables that the service is using.
* The `repository` package contains the JPA Repositories. The API is for CRUD operations and also API for pagination and sorting. You will be modifying the ClientsRepository. You will enhance the Clients JPA repository.
* The `service` package contains the logic that creates the creditreport DTO. You will create this logic.

![familiarize](./images/familiarize.png " ")

## Task 2: Run the application and add Spring Cloud Oracle Database starter for UCP

Open a terminal window and execute the following command. If you look at the output you will see that fails to start.

```bash
cd $HOME/creditreport; mvn -o spring-boot:run -DskipTests -Dmaven.repo.local=/financial-services/repo
```

The output will looks like this:

```log
***************************
APPLICATION FAILED TO START
***************************

Description:

Failed to bind properties under 'spring.datasource.type' to java.lang.Class<javax.sql.DataSource>:

    Property: spring.datasource.type
    Value: "oracle.ucp.jdbc.PoolDataSource"
    Origin: class path resource [application.yaml] - 18:11
    Reason: failed to convert java.lang.String to java.lang.Class<javax.sql.DataSource> (caused by java.lang.ClassNotFoundException: oracle.ucp.jdbc.PoolDataSource)

Action:

Update your application's configuration
```

The reason is that the application want to use Oracle Universal Connection Pooling (UCP) and the right dependency hasn't been added to the application `pom.xml`. To resolve the problem we need to add Spring Cloud Oracle Database starter for UCP dependency to the application. Open the `pom.xml` file and add the following dependency. The pom file is in the `root` directory of the `creditscore` application:

```xml
  <dependency>
      <groupId>com.oracle.database.spring</groupId>
      <artifactId>oracle-spring-boot-starter-ucp</artifactId>
      <version>25.1.0</version>
  </dependency>
```

Make sure you put the dependency in the right location (e.g. inside the `<dependencies>` tag). Save the file.

![UCP Dependency](./images/ucp-dep.png " ")

In a terminal window run the application again.

```bash
source $HOME/.env; cd $HOME/creditreport; mvn -o spring-boot:run -DskipTests -Dmaven.repo.local=/financial-services/repo
```

The console log will look something like this:

```log
2025-04-10T21:07:41.900Z  INFO 13325 --- [creditreport] [           main] c.e.c.CreditreportApplication            : Started CreditreportApplication in 9.992 seconds (process running for 10.318)
```

In a different terminal window (keep the application running) execute the following command:

```bash
curl -v  http://localhost:8080/creport/CUST_1000
```

The output will look like this:

```log
opc@livelabs ~]$ curl -v  http://localhost:8080/creport/CUST_1000
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8080 (#0)
> GET /creport/CUST_1000 HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.61.1
> Accept: */*
> 
< HTTP/1.1 200 
< Content-Length: 0
< Date: Thu, 10 Apr 2025 21:09:47 GMT
< 
* Connection #0 to host localhost left intact
```

The command will not return any data but a HTTP 200 code that means that a request has succeeded, indicating that the server has successfully processed the request and returned the requested resource.

This is the GET REST endpoint you will build going forward in the exercise.

Stop the application by typing `Ctrl-C` in the terminal window where the application is running.

## Task 5: Add JPA Repository findByCustomerID method

Open the JPA repository class `ClientsRepository.java` (lives in the `creditreport/src/main/java/com/example/creditreport/repository`) and add the following method and save the file.

```java
Clients findByCustomerId(String customerId);
```

![Add JPA Method](./images/add-jpa-method.png " ")

This method returns a Client object for a specific `customerId` from the `CLIENTS` table in the Autonomous Database 23ai that the application is using.

## Task 6: Create the service that creates the creditreport

Open the Service class `CreditReportService.java` and add the following code to the `CreditReportDTO` method. Make sure that you delete the already existing `return null` statement. Don't forget to save the file.

```java
    // Find the client using the JPA repository method
    Clients client = clientsRepository.findByCustomerId(customerId);
    if (client == null) {
      return null;
    }

    // Set total dept to 0
    debtByCustomer = 0;

    // Create a List with client_depts
    List<ClientDeptDTO> clientDeptDTOs = client.getClientDepts().stream().map(clientDebt -> {

        // Add up total debt for customer
        debtByCustomer = debtByCustomer + clientDebt.getDebtAmount();

        ClientDeptDTO clientDeptDTO = new ClientDeptDTO();
        clientDeptDTO.setId(clientDebt.getId());
        clientDeptDTO.setDebtType(clientDebt.getDebtType());
        clientDeptDTO.setDebtAmount(clientDebt.getDebtAmount());
        return clientDeptDTO;
    }).toList();

    // Create the Creditreport aka ClientDTO
    CreditreportDTO creditreportDTO = new CreditreportDTO();
    creditreportDTO.setCreditReportId(reportId());
    creditreportDTO.setCustomerId(client.getCustomerId());
    creditreportDTO.setGenerationDate(new Date());
    creditreportDTO.setCreditScore(calculateCreditScore());
    creditreportDTO.setTotalDebtAmount(debtByCustomer);
    creditreportDTO.setClientDepts(clientDeptDTOs);

    return creditreportDTO;
```

![Add JPA Method](./images/credit-report-dto-method.png " ")

Click *File -> Save All*. In a terminal window run the following command to make sure that the application compiles and runs properly:

```bash
source $HOME/.env; cd $HOME/creditreport; mvn -o spring-boot:run -DskipTests -Dmaven.repo.local=/financial-services/repo
```

The application should start and you will get a log message that looks like this:

```log
2025-04-16T12:29:17.446-05:00  INFO 23912 --- [creditreport] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path '/'
2025-04-16T12:29:17.451-05:00  INFO 23912 --- [creditreport] [           main] c.e.c.CreditreportApplication            : Started CreditreportApplication in 15.625 seconds (process running for 15.872)
```

Stop the application by pressing `Ctrl-C`.

## Task 7: Create the GET REST Endpoint

Open the `RestController` class called `CreditReportController.java` and add the following code to the `getReport` method. Make sure that you delete the already existing `return null` statement.

```java
log.info("*** Getting creditreport for customer ID: " + customerId);

CreditreportDTO creditreportDTO = creditReportService.getClientWithDepts(customerId);
return creditreportDTO != null ? ResponseEntity.ok(creditreportDTO) : ResponseEntity.notFound().build();
```

![getReport method](./images/get-report-method.png " ")

Click *File -> Save All*. In a terminal window run the following command to make sure that the application compiles and runs properly:

```bash
source $HOME/.env; cd $HOME/creditreport; mvn -o spring-boot:run -DskipTests -Dmaven.repo.local=/financial-services/repo
```

The application should start and the log output will look similar to this:

```log
2025-04-16T12:38:57.809-05:00  INFO 25978 --- [creditreport] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path '/'
2025-04-16T12:38:57.814-05:00  INFO 25978 --- [creditreport] [           main] c.e.c.CreditreportApplication            : Started CreditreportApplication in 14.617 seconds (process running for 14.844)
```

Keep the application running, you will test the endpoint in the next task.

## Task 8: Test the REST endpoint

Open a new terminal window (or use an existing one) and execute the following command:

```bash
curl -s  http://localhost:8080/creport/CUST_3000 | jq
```

The endpoint response will look like this

```json
{
  "creditReportId": "2bdbeca2-d2b7-4e4f-916b-508435f1c66b",
  "customerId": "CUST_3000",
  "creditScore": 596,
  "generationDate": "2025-04-16T17:44:56.318+00:00",
  "clientDepts": [
    {
      "id": 5,
      "debtType": "Personal",
      "debtAmount": 5000
    },
    {
      "id": 6,
      "debtType": "Business",
      "debtAmount": 22000
    }
  ],
  "totalDebtAmount": 27000
}
```

The JSON document above, is what the `CreditreportDTO` object contains. The document is created with data from the `CLIENTS` and `CLIENT_DEPT` tables. The `creditScore` is a random number between 500 and 900, so is the `creditReportId`.

If you look at the output window where the application is running you can see that the application is using JPA to query the Oracle Autonomous Database 23ai and construct the creditreport.

```log
2025-04-16T12:54:31.399-05:00  INFO 29083 --- [creditreport] [nio-8080-exec-5] c.e.c.controller.CreditreportController  : *** Getting creditreport for customer ID: CUST_3000
Hibernate: select c1_0.customer_id,c1_0.age,c1_0.city,c1_0.first_name,c1_0.income,c1_0.last_name,c1_0.state,c1_0.veteran,c1_0.zip_code from clients c1_0 where c1_0.customer_id=?
Hibernate: select cd1_0.customer_id,cd1_0.id,cd1_0.application_id,cd1_0.debt_amount,cd1_0.debt_type from client_debt cd1_0 where cd1_0.customer_id=?
```

**Congratulations, you have successfully completed Create a Creditreport Microservice Coding Exercise!** You can close all the opened terminal windows and files.

## Learn More

* [Spring Cloud Oracle Starters](https://oracle.github.io/spring-cloud-oracle/latest/reference/html/index.html)
* [Oracle Database 23ai Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/)
* [OCI Code Editor](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/code_editor_intro.htm)

## Acknowledgements

* **Authors** - Andy Tael
* **Contributors** - Mark Nelson
* **Last Updated By/Date** - Andy Tael, April 2025
