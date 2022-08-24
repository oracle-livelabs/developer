# Review the Application and routes

## Introduction

In the previous Lab you explored Oracle REST APIs in a Swagger Editor session. By now you should have a better understanding of what these Oracle REST APIs are capable of. 

Next, we'll add Oracle REST APIs to our Flask application's Python file. We'll also briefly discuss the Flask application's routes and their functions.

Estimated Time: 20 minutes

### Objectives

In this lab, you will:
* Add Oracle REST APIs to our Flask application
* Review the provided Python application 

### Prerequisites
This lab assumes you have:
* All previous labs successfully completed

## Task 1: Locate and open the Python file for Flask application

1. Locate your local copy of the `flask-ords-lab` folder and open it in your text editor. The examples in this Lab will use Visual Studio Code.

    ![Open the flask folder in VS Code.](images/opening-flask-folder-in-vscode.png " ")

2. Navigate to, and open the `app.py` file in your editor. 

     ![Open the flask folder in VS Code.](images/opening-app-py-file-in-editor.png " ")

## Task 2: Review the Python application and functions

1. Notice the libraries included in this application. 

    ![Imported libraries for Python application](images/imported-libraries-for-application.png " ")

    You may have used these before. Notable inclusions are: 
    - `Folium`
    - `Flask`
      - `jsonify`
    - `requests`
    - `json`

2. Python application overview

    Beginning with the first line in our code you'll see we have created an instance of the `Flask` class: 

      ```app = Flask(__name__)```

    You may have seen this before, here the argument `(__name__)` is sufficient for such a small scale application. You may review the selected documentation on this subject in the "Learn More" section of this lab. 

    ![Reviewing the flask app name](images/first-line-flask-app-name.png)

## Task 3: Review the Folium map 

1. Review the Folium contents of the application

    Here you'll see the Folium section of the application. 

    ![Reviewing Folium content in the application](images/reviewing-folium-content-in-app.png)

    1. We set the initial, base Folium map = `m`
        - We've also included starting coordinates (approximately the downtown Las Vegas, NV area), set minimum and maximum zoom properties, and set the visual presentation option (i.e. "Stamen Terrain")
    2. We include a tooltip; which you'll see later when we load the application 
    3. Next we rely on the "Requests" library to `GET` json from our Autonomous Database, via ORDS APIs
       
       :question: <i>But do you notice anything missing?</i> 

          ![Missing ORDS endpoint for Folium map](images/missing-ords-uri-for-folium.png " ")

       If you guessed an Oracle REST endpoint, you'd be correct. Replace the `ORDS URL` with the following one: 
      
        <copy>https://yfuxkbz2ls7taze-ordshandsonlabs.adb.us-phoenix-1.oraclecloudapps.com/ords/python/flask/museums/</copy>
        
       - <i>Now</i> that we've restored the endpoint, we can iterate on our table data to gather the necessary information for populating our Folium map.

         ![Iterating over the map data.](images/iterating-over-the-museum-data.png " ")
    4. We'll then create individual markers for the museum locations we retrieved from our database:
        - Here we'll pass the latitude and longitude coordinates
        - We'll then include information pop-ups for all the museums
          - Notice how we include the `museum_name` as HTML, the icon color and type, along with a `tooltip`:

            ![Creating markers for Folium.](images/creating-markers-for-folium-map.png " ")

      :bulb: <i>**Note:** The tooltip generates a helpful bubble when hovered over that reads "Click me!"; you'll see it soon enough.</i>

    5. Finally you'll see the line: 
    `lvmap = m._repr_html_()`:

       ![Temporarily saving the Folium map.](images/saving-folium-map-as-lvmap.png " ")
    
       We include this to temporarily save our map as a HTML iframe (this includes all necessary HTML and JavaScript properties), which we'll later use as an argument in our application's index page (in Flask)

## Task 4: Review the Flask application routes

   :brain: <i>A Routes Primer</i>: Application routes (aka `app.route()`) are triggered when actions are performed in the application. The results of a function may be passed back to the user, a new HTML page may load, or may redirect the user to a new page. 
  
1. `@app.route('/')`
        
    ![The Index route](images/app-route-index.png " ")

    This route contains the `index()` function. When a user navigates to the home page they'll be presented with the `index.html` page. We are also including our newly constructed Folium map, `lvmap` as an argument. 
    
    In the next Lab we'll review the HTML pages so you can view all functions and their output in context.

2. `@app.route('/get_price')`

    ![The Get Price route](images/app-route-get-price.png " ")

    - The function of the `getPrice()` route appends `a` to an ORDS endpoint. To see this in action take this ORDS URL: <copy>https://yfuxkbz2ls7taze-ordshandsonlabs.adb.us-phoenix-1.oraclecloudapps.com/ords/python/flask/products/pricing/</cpoy> and place it into your browser's address bar. Click enter, what do you see? 

    - You should see this: 
        
      ![404 pricing not found error.](images/pricing-not-found-404-error.png " ")

    - And that's because our function expects to see a specific `product_id`. Remember from the last Lab, this Path is: `/products/pricing{product_id}`. For things to work, we'll need to include a `product_id`. 
    
    - Include either a 1, 2, or 3 after that final trailing backslash, and hit enter. 
    
      <i>Like this</i>: 
 
      ![404 pricing not found error.](images/pricing-info-with-product-id-included.png " ")

    - Now you should have a better idea of how this, and other functions will work under the covers.  At this point you will have retrieved product prices from a product table. This will be one of the fields we'll use in a drop-down menu (found on the `orderform.html` page). Make sure your `get_price` function has the correct ORDS URL: 

      ![The Get Price function with updated ORDS URL](images/get-price-function-with-updated-ords-url.png " ")
    
3. `@app.route('/get_description')`

    ![The Get Description route](images/app-route-get-description.png " ")

    - Much like the `get_price` app route, this function requests product description information from our database. It uses a similar syntax as before. We then `return jsonify(product_description)` which takes the response and converts it like you may have noticed in the previous function.

    - Plug in this ORDS URL so the function works properly: 

      ![Get Description route with updated ORDS endpoint](images/get-description-with-updated-ords-endpoint.png " ")

4. `@app.route('/orderform')`

    - You should see something like this:

    ![The Order Form route](images/app-route-order-form.png " ")

    - We'll include another ORDS URL so our `GET` request functions properly. Copy this <copy>https://yfuxkbz2ls7taze-ordshandsonlabs.adb.us-phoenix-1.oraclecloudapps.com/ords/python/flask/products/</copy> and paste into the correct spot. 

      ![The newly added get products ORDS endpoint.](images/get-products-ords-endpoint.png)
    
    - Using a separate ORDS endpoint, our application performs a more typical `GET` request. Here we return a list of products, and redirect the user to an `orderform.html` page. 

5. `@app.route('/orderhistory')`

    ![The order history route](images/app-route-order-history.png " ")

    - Performing a `GET` request to this endpoint will return all <i>previously</i> purchased items; displayed in a table for the user. 

    - Use the following ORDS URL <copy>https://yfuxkbz2ls7taze-ordshandsonlabs.adb.us-phoenix-1.oraclecloudapps.com/ords/python/flask/orders/</copy> to complete this function. 

      ![The order history route](images/completed-get-orders-ords-endpoint.png " ")

    :brain: <i>You've actually seen this app route in action in Lab 1 of this Workshop! Remember the `orderform.html` page?</i>

6. `@app.route(/result', methods = ['POST', 'GET'])`

    ![The order history post request result route.](images/app-route-result.png " ")

    - Here we have the same ORDS endpoint as in the `orderhistory` app route. But instead of a `GET` we are working with a `POST` request. If you remember back to Lab 1, a user will click:

      ![Completing the purchase focused view.](images/complete-my-purchase-focus-view.png " ")

    - And this route expects a `POST` request originating from the Flask application. Once this request posts successfully the user is redirected to the `orderhistory.html` page (as you saw in the previous step). 
    
    :brain: <i>This function also performs actions such as establishing the key:value pairs of the incoming data, and the JSON payload headers well.</i>

    - Update the function with the following ORDS URL: <copy>https://yfuxkbz2ls7taze-ordshandsonlabs.adb.us-phoenix-1.oraclecloudapps.com/ords/python/flask/orders/</copy>. Your final route should look like this: 

      ![Completed orders post ORDS endpoint.](images/completed-orders-post-ords-endpoint.png " ")

7. At this stage you should have all ORDS endpoints in the proper places. All application routes and their underlying functions should work correctly. Next, we'll briefly review the included HTML and CSS in this Flask application. Congratulations!
    
### You may now proceed to the [next Lab](#next).

## Learn More
* [A minimal application in Flask](https://flask.palletsprojects.com/en/2.1.x/quickstart/#a-minimal-application)
* [About the Flask "Application Object"](https://flask.palletsprojects.com/en/2.1.x/api/#application-object)

## Acknowledgements
* **Author** - Chris Hoina, Senior Product Manager, Database Tools
* **Contributors**
  - Jeff Smith, Distuinguished Product Manager, Database Tools
  - Justin Biard, Senior Member of Technical Staff, Database Tools 
  - Zachary Talke, Product Manager, Database Tools
  - Brian Spendolini, Principal Product Manager
* **Last Updated By/Date** - Chris Hoina, August 2022
