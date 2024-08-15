# Pagination with Oracle REST Data Services

## Introduction

In this lab you will explore how to page results when working with ORDS APIs. You'll explore how this sample application takes advantage of ORDS pagination as well.

Estimated Time: 20 minutes

### Objectives

In this lab, you will:

* Discover how pagination works in ORDS
* Learn you can automate pagination
* Learn how you can dynamically page results

### Prerequisites

This lab assumes you have:

* An Oracle account
* All previous labs successfully completed

  > **Note:** If you have a **Free Trial** account, when your Free Trial expires your account will be converted to an **Always Free** account. You will not be able to conduct Free Tier workshops unless the Always Free environment is available. **[Click here for the Free Tier FAQ page.](https://www.oracle.com/cloud/free/faq.html)**

## Task 1: Locate `Previous` and `Next` buttons

1. Scroll to the bottom of any `movieresults.html` page, and locate the <button style="pointer-events: none;">Previous</button> and <button style="pointer-events: none;">Next</button> buttons.

    ![Home page, showing pagination.](images/workshop-presentation-one.png " ")

2. These buttons are enabled or disabled based on the existence or absence of ORDS properties in a `GET` request's JSON response payload. To explore an example of payload, use your web browser to navigate to the following URI:

   ```sh
   <copy>
   [Your Workshop's URL]/ords/movie/mymovies/movie-all?genre=Comedy&runtime=210
   </copy>
   ```  

   ![Retrieving the correct URI.](images/workshop-presentation-one-two.png)

   > Your URI may appear different. Regardless, ensure you use valid query parameters.

3. You should see the results of the `GET` request on your page. They will look similar to the following:

    ![JSON payload in browser.](images/workshop-presentation-two.png " ")

    > **NOTE:** The `items` the image's `items` properties have been collapsed to better show the entire contents of this JSON payload.

4. The typical ORDS payload consists of the following properties:

   * `items`

     ![The items property.](images/workshop-presentation-three.png " ")

   * `hasMore`

     ![The hasMore property](images/workshop-presentation-four.png " ")
  
   * `limit`

     ![The limit property](images/workshop-presentation-five.png " ")

   * `offset`

     ![The offset property](images/workshop-presentation-six.png " ")

   * `count`

     ![The count property](images/workshop-presentation-seven.png " ")

   * `links`

     ![The links property](images/workshop-presentation-eight.png " ")

5. The `limit`, `offset`, and `count` properties are interrelated. For instance, if you were to select `25` as the page size, ORDS would only return results in increments of `25`. How does ORDS know to do this? It was set for you automatically, when you created your Resource Module.

   ![Reviewing the p_items_per_page parameter.](images/workshop-presentation-nine.png " ")

   Although, you can modify this parameter. Here is one option, modifying in the REST Workshop.

    ![Pagination in the REST Workshop.](images/workshop-presentation-ten.png " ")

6. Returning to the JSON payload, you'll notice on the first page of results the `hasMore: true` condition.

   ![The hasmore condition.](images/workshop-presentation-eleven.png " ")  

      This informs the user, client, or application that more data is available. When this condition is true, a `next` link will be made available. You'll notice this `next` link already includes the appropriate `offset`. These details make pagination simple with ORDS APIs.

    ![The next link with offset.](images/workshop-presentation-twelve.png " ")

7. Click the `next` link. The next page of results will be displayed. After reviewing, scroll to the `links` property. Notice anything new or different?  

    ![Now with previous link](images/workshop-presentation-thirteen.png " ")  

      You should see the `hasMore: true` condition, but you'll also notice a `previous` link, in addition to the `first` and `next` links. These links make adding pagination to your application much simpler.

8. If you were to continue clicking the `next` link, eventually you would observe the last page available. It would look like this:

   ![Image alt text](images/workshop-presentation-fourteen.png  " ")  

      You'd notice the `hasMore: false` property. This signifies to the user, client, or application, that no more results exist. You'd also notice the absence of a `next` link.

9. Next we'll take a look at how this application uses the information from an ORDS endpoint.

## Task 2: Reviewing the application

1. Navigate to the `ordsflask.py` file. Locate the `@app.route('/next_page', methods=['GET', 'POST'])` line of code.

    ![Navigate to the py file.](images/workshop-presentation-fifteen.png " ")

2. This code is nearly identical to that found in the `@app.route('/handle_data')`. However, instead of expecting an initial selection (where a user selects a genre and movie runtime), this route expects a `next` URI. There is an identical route for the `previous` link too.

   ![Reviewing python code function.](images/workshop-presentation-sixteen.png " ")  
      ![Reviewing the previous jinja in html.](images/workshop-presentation-seventeen.png " ")

3. After this `next_page` function assembles the necessary information, a new `movieresults.html` page is rendered and delivered to  the UI. All `next` and `previous` links are updated with the `links` found in the ORDS response. This allows the user to navigate forward or backward.

    ![Reviewing the href portion of the code.](images/workshop-presentation-eighteen.png " ")
        ![Reviewing the href portion of the code.](images/workshop-presentation-nineteen.png " ")

4. When viewing from the application, should a user reach the end or beginning of a results set (the results of the PLSQL or SQL query), the html has been coded for two conditions.

   When a `previous` link is unavailable, then the <button style="pointer-events: none;">Previous</button> button is disabled by default.

   ![Previous disabled in app.](images/workshop-presentation-twenty.png " ")

   And when a `next` link is not detected, then the <button style="pointer-events: none;">Next</button> button will be disabled too.

   ![Next disabled in app.](images/workshop-presentation-twenty-one.png " ")

5. Congratulations. You've made it to the end of this LiveLab. By now you should have a basic understanding of the following ORDS concepts:

   * REST-enabled users and their REST-enabled schemas
   * Resource Modules, Templates, and Handlers
   * Route Templates
   * Ease of turning your existing PL/SQL procedures and other database objects into HTTP-accessible resources (i.e. ORDS APIs)
   * How bind parameters can be used to elevate your existing procedures
   * URL Query parameters and how ORDS expects them

6. You may now log out of your lab. If you enjoyed working with ORDS in your own development environment such as this, download the latest version or ORDS *or* try out one of our Docker/Podman containers:

   * [Download latest ORDS version](https://www.oracle.com/database/sqldeveloper/technologies/db-actions/download/)
   * [ORDS standard container](https://container-registry.oracle.com/ords/ocr/ba/database/ords)
   * [ORDS Developer container](https://container-registry.oracle.com/ords/ocr/ba/database/ords-developer)

## Learn More

* [**Chapter 3.1.7.7** ORDS pagination](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/orddg/implicit-parameters.html#GUID-A7CE99EF-38E7-4FAB-A7C0-F8901B36B813)
* [**Blog** REST API: Paging results of a PL/SQL REFCURSOR](https://www.thatjeffsmith.com/archive/2023/11/rest-api-paging-results-of-a-pl-sql-refcursor/)
* [**Blog** How Paging Works in ORDS](https://www.thatjeffsmith.com/archive/2019/12/how-paging-works-in-ords/)
* [**Blog** ORDS + JS Fetch API](https://followthecoffee.com/ords-api-sql-from-json-view/)

## Acknowledgements

* **Author** - Chris Hoina, Senior Product Manager, Database Tools
* **Contributors** - Jeff Smith, Distinguished Product Manager, Database Tools
* **Last Updated By/Date** - Chris Hoina, Database Tools, July 2024
