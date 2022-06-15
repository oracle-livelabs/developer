# Performance Monitoring Use Case

## Introduction

This lab will show you how to set up alerts for metrics conditions and trigger them so that Slack notifications are sent as appropriate.

Estimated Time:  10 minutes

### Objectives

-   Configure alert for when `PlaceOrder` average response time exceeds a given value.
-   Load test the application to induce the alert
-   Notice the health state of the metric in Grafana and the messages sent to Slack channel.
  
  
### Prerequisites

- This lab presumes you have already completed the earlier labs.

## Task 1: Notice perf metrics and create alert for response time threshold

1. Notice `PlaceOrder average time` metric panel in `Order Service` section of the Grabdish dashboard, select the drop down menu of the panel and click `edit`.

    ![Place Order Panel](images/placeorderpanel.png " ")
   
2. Select the `alert` tab and click the `create Alert` button

    ![Create Alert](images/createalertbutton.png " ")
       
3. Set the rule to evaluate every 1m for 5m, add a condition for avg() time above `.01`, and provide a message to be sent for the Slack notification (Slack channel should be the default for `Send to`)

    ![Add Alert Rule](images/addalertruleforplaceorder.png " ")
       
3. You can click `Test rule` to verify the rule and then click `Apply` in the upper right corner.

    ![Test Rule](images/testrule.png " ")


## Task 2:  Install a load testing tool and start an external load balancer for the Order service

1. Start an external load balancer for the order service.

    ```
    <copy>cd $GRABDISH_HOME/order-helidon; kubectl create -f ext-order-ingress.yaml -n msdataworkshop</copy>
    ```

    Check the ext-order LoadBalancer service and make note of the external IP address. This may take a few minutes to start.

    ```
    <copy>services</copy>
    ```

    ![Load Balancer](images/ingress-nginx-loadbalancer-externalip.png " ")

    Set the LB environment variable to the external IP address of the ext-order service. Replace 123.123.123.123 in the following command with the external IP address.

    ```
    <copy>export LB='123.123.123.123'</copy>
    ```


2. Install a load testing tool.  

    You can use any web load testing tool to drive load. Here is an example of how to install the k6 tool ((licensed under AGPL v3). Or, you can use artillery and the script for that is also provided below. To see the scaling impacts we prefer doing this lab with k6.

	```
	<copy>cd $GRABDISH_HOME/k6; wget https://github.com/loadimpact/k6/releases/download/v0.27.0/k6-v0.27.0-linux64.tar.gz; tar -xzf k6-v0.27.0-linux64.tar.gz; ln k6-v0.27.0-linux64/k6 k6</copy>
	```

	![Install k6](images/install-k6.png " ")

 
## Task 3: Load test 

1.  Execute a load test using the load testing tool you have installed.  

    ```
    <copy>cd $GRABDISH_HOME/k6; test40usersFor5Minutes.sh</copy>
    ```
    
    *Note that you can adjust the alert rule condition(s) (as defined in task 1) as well as the number of users and duration of the load test conducted here as desired.
    The values provided here are generally sufficient to reproduce the performance degradation and trigger the alert as desired.

## Task 4: Notice metrics and Slack message from alert due to rule condition being exceeded.

1. Notice the health/heart of the PlaceOrder panel in Grafana console turn to yellow and then eventually to red.

   ![Health Yellow](images/yellowheart.png " ")
     
   ![Health Red](images/redheart.png " ")
     
 2. Also notice a Slack message being sent with information about the alert.
     
   ![Slack Failure](images/slackfailure.png " ")

## Task 5: Notice return to healthy state and Slack message sent indicating response time is acceptable.

1. Notice the health/heart of the PlaceOrder panel in Grafana console turn back to green.

   ![Health Normal](images/placeorderhealthbacktonormal.png " ")
   
2. Also notice a Slack message being sent confirming the condtion is `OK` again.
   
   ![Slack OK](images/slackmessagehealthbacktonormal.png " ")

You may now **proceed to the next lab.**.

## Acknowledgements
* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Last Updated By/Date** - Paul Parkinson, August 2021
