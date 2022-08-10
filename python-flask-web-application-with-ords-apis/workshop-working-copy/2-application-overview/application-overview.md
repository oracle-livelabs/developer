# Title of the Lab

## Introduction

In this Lab we will obtain code needed for our Flask application. We'll run our application and observe the application flow in order to better understand how they interact with Oracle REST APIs. 
Estimated Time: 20 minutes

### About Oracle REST Data Services (ORDS)

This lab will cover topics including: 
- Oracle REST Data Services (ORDS) APIs
- GitHub and repositories 
- The Flask framework 
- Database Actions

### Objectives

In this lab, you will:
* Obtain all code necessary to complete this Workshop
* Review the Flask application's core functions/operations
* Review the application's reliance on Oracle REST APIs 

### Prerequisites
* A text editor (such as Visual Studio Code or Sublime Text)
* Flask Installation 
* Virtual Environment Installation

This lab assumes you have:
* All previous labs successfully completed

## Task 1: Obtain code for this Workshop

1. Navigate to [this repository]().
2. If you have an existing GitHub account you may choose to fork the repository for this Workshop. 
    - Alternatively, you may choose to download the contents of this Workshop as as `.ZIP` file. 

  ![Retrieve the Workshop code from GitHub](images/retrieve-code-from-git-hub.png)

3. Once you have forked the repository (or installed locally through the ZIP option), the contents should look similar to this: 

    ![Reviewing the folders in VS Code](images/review-folders-for-flask-app.png)

    At a <i>minimum</i> you'll want to ensure you have a `static` folder, `templates` folder, and the Python application `app.py`.

:bulb: <i>For details on how to run a Flask application in a Virtual Environment (venv), refer to the [Installation](https://flask.palletsprojects.com/en/2.2.x/installation/) and [Quick Start](https://flask.palletsprojects.com/en/2.2.x/quickstart/) steps in the Flask documentation.</i>

## Task 2: Activate the Flask application

While the main focus of this Workshop is not Flask, we will periodically review certain helpful actions for the developer. If you have limited experience with the Flask framework, this may be beneficial. If you do get stuck, we encourage you to review the [Flask](https://flask.palletsprojects.com/en/2.2.x/installation/#) documentation first, <i>then</i> return to this Lab once you are more comfortable with Flask operations. 

1. Activate your virtual environment from your terminal. 

    ![Open New Terminal in VS Code](images/open-terminal-in-vs-code.png)

    Commands are different for MacOS/Linux and Windows. Alternatively, VS Code (if using) may automatically recognize the Flask application and activate the Virtual environment for you. Refer to the "Learn More" section of this Lab for more details on Virtual Environments in VS Code. Use the following to activate your Virtual Environment 

    - MacOS/Linux: ```$<copy>. venv/bin/activate</copy>```
    - Windows: ```><copy>venv\Scripts\activate</copy>```
    
    ![Activating the Virtual Environment](images/activating-virtual-environment.png )

    You should now see a the prefix (or similar to) `(.venv)` in your terminal:
    
    ![Opening the Python application](images/verify-venv-is-active.png)

2. Next we'll start the Flask Application 

    There are various ways you can start your Flask application, this is the more manual method. If you'd like to review or learn about automated options for setting environment variables, you may refer to the "Learn More" section of this Lab. 
    
    Enter the following commands: 
    1. ```<copy>export FLASK_ENV=development</copy>```
    
        ![Opening the Python application](images/export-flask-dev-env.png)
    
    2. ```<copy>export FLASK_APP=app.py</copy>```

        ![Opening the Python application](images/export-flask-app.png)
    
    3. ```<copy>flask run</copy>```
    
        ![Opening the Python application](images/flask-run-command.png)

    4. Finally, you'll right-click the development server IP address to open the Flask application. It will open automatically in your default browser. 

        ![Right-click development server address](images/right-click-ip-for-flask-app.png)

### Task 3: Review the basic operations of the Flask application

1. Review the `index.html` page.

    When the Flask application first loads, you'll see this screen. You may explore the navigation tab (hamburger icon on upper right-hand corner). 

    But we'll first explore the Folium map at the bottom of the `index` page. 
    
    :bulb:  <i>We'll conduct a more in-depth review in a later Lab. But you should know that Folium "makes it easy to visualize data that’s been manipulated in Python on an interactive Leaflet.js map. To expand your knowledge of Folium and Leaflet.js, visit the "Learn More" section for more details.</i>

    ![The index page in portrait view](images/index-page-portrait-view.png)

2. While focused on the Folium map, we can interact with location markers - these represent various attractions in the downtown Las Vegas area. In this application we are focused on venues such as museums and art installations.  

    Each marker will have a "Tool-tip"; when hovered over, suggesting the user clicks to reveal additional information:

    ![Folium tool-tip focus](images/folium-tool-tip-focus.png)

    When clicked, they reveal additional details about the location. In case you are curious, here is where first encounter Oracle REST APIs. You'll see the code in a later Lab, but for now, you can very easily retrieve the request information in your browser.

    Copy the following URI: <copy>https.[].com</copy> and place it into your browser's address bar. You should see the `items` from the `GET` request.

    ![ORDS API results in browser](images/ords-results-in-browser.png)

    <i>This</i> is where the Folium map gets its input from.

3. Manipulating the `GET` request

    1. But let's say you are a developer, and you've been provided with a set of Oracle REST APIs like this one. On the surface, they are simple enough. But you actually wield much more power than you may realize - with query parameters.

        Try this. Take the URI we just used, add this to the end ```<copy>?q={"$orderby":{"museum_lat" : "ASC"}}</copy>```, and then enter it into your browser's address bar. You'll see something like this: 

        ![ORDS API results in ascending order by latitude](images/ords-api-results-ascending-latitude.png)

        What do you notice? If you caught that the venues are all ordered in ascending order, according to their latitudes, you'd be correct!

    2. Let's try one a little trickier one. Take that original URI, and then add this to the end: 
    ```<copy>?q={"museum_lat":{"$between": [36.05,36.15]}}</copy>```

        Now enter it into your browser's address bar. What do you see?

        ![Selected ORDS results by latitude](images/ords-api-results-select-latitudes.png)
            
        You can probably tell by now, but we restricted our results to a very narrow window of latitudes. We have only scratched the surface with filtering in queries. But once you understand how your data is structured, and what is available, the possibilities are endless.

    3. 

        ![Reviewing the flask app name](images/folium-tool-tip-focus.png)

3. Review the `orderhistory.html` page.

    ![Reviewing the flask app name](images/first-line-flask-app-name.png)

### Task 4: Explore Oracle REST API capability 

    Beginning with the first li ne in our code you'll see we have created an instance of the `Flask` class: 

      ```app = Flask(__name__)```

    You may have seen this before, here the argument `(__name__)` is sufficient for such a small scale application. You may review the selected documentation on this subject in the "Learn More" section of this lab. 

    ![Reviewing the flask app name](images/first-line-flask-app-name.png)

4. Review the Folium contents of the application

    Here you'll see several parts to the Folium section of the application. 

    ![Reviewing Folium content in the application](images/reviewing-folium-content-in-app.png)

    1. We set the initial, base Folium map = `m`
        - You'll also notice we've included starting coordinates, set minimum and maximum zoom properties, as well as a visual presentation option (i.e. "Stamen Toner")
    2. We include a tooltip; which you'll see later when we load the application 
    3. Next we rely on the "Requests" library to `GET` json from our Autonomous Database, via ORDS APIs
        - We perform an iteration to gather the necessary information for populating our map
    4. We'll then create individual markers for the museum locations we retrieved from our database 
        - Here we'll pass the latitude and longitude coordinates
        - We'll then include information pop-ups for all the museums
          - Notice how we include the `museum_name` as HTML, the icon color and type, along with `tooltip`

      :bulb: <i>**Note:** The tooltip generates a helpful bubble when hovered over that reads "Click me!"; you'll see it soon enough.</i>

    5. Finally you'll see the line: 
    `lvmap = m._repr_html_()`
    We include this to temporarily save our map as a HTML iframe (this includes all necessary HTML and JavaScript properties), which we'll later use as an argument in our application's index page (in Flask)

5. Review our application routes

    If you are familiar with Flask, then you'll know all about routes. You may skim this section to become acquainted with the behavior of the application. If not, here is the primer: application routes (aka `app.route()`) are triggered when actions are performed in the application. 
    
    In some cases the results of a function may be passed back to the user, in other cases a new HTML page may load, in other cases the user may be redirected to a new page.
    
    In all cases, you'll notice that an ORDS endpoint is used for either a `GET` or `POST` method.

## Task 3: Review the Routes 
    
1. `@app.route('/')`
        
    ![The Index route](images/app-route-index.png)

    This route contains the `index()` function. When a user navigates to the home page they'll be presented with the `index.html` page. We are also including our newly constructed Folium map, `lvnmap` as an argument. 
    
    We'll review the HTML pages shortly so you can view all functions and their output in context.

2. `@app.route('/get_price')`

    ![The Get Price route](images/app-route-get-price.png)

    The function of this route `getPrice()` appends `a` to an ORDS endpoint. From there we retrieve product prices from a product table. This will be one of the fields we'll use in a drop-down menu (found on the `orderform.html` page).
    
    You'll notice the final line in this function `return jsonify(product_price)` which takes the response and converts it to the JSON format while also assigning it a mimetype of "application/json". Later, we'll review this route along with a JavaScript function, to learn how they work in tandem with our ORDS endpoint. 

3. `@app.route('/get_description')`

    ![The Get Description route](images/app-route-get-description.png)

    Much like the `get_price` app route, this function requests product description information from our database. It uses a similar syntax as before. We then `return jsonify(product_description)` which takes the response and converts it like before. 

4. `@app.route('/orderform')`

    ![The Order Form route](images/app-route-order-form.png)

    Using a separate ORDS endpoint, our application performs a more typical `GET` request. Here we return a list of products, along with the `orderform.html` page. Notice how we create new variables, which we'll use for with our JavaScript functions. We'll review our three JavaScript functions in the next lab. 

5. `@app.route('/orderhistory')`

    ![The order history route](images/app-route-order-history.png)

    Performing a `GET` request to this endpoint will return the items in a table that stores customer order history. While this particular application doesn't cover credentialing of individual customers, the aim is to showcase the ease of retrieving <i>specific</i> customer data with relative ease.

    You'll see how this app route is triggering in the `orderform.html` page. 

6. `@app.route(/result', methods = ['POST', 'GET'])`

    ![The result route](images/app-route-result.png)

    Using the same ORDS endpoint as the `orderhistory` app route, we can infer that this route expects a `POST` request originating from the Flask application. This function also performs actions such as establishing the key:value pairs of the incoming data, and the JSON payload headers well. 

    In short, this function is triggered by the submit action on the `orderform.html` page. But rather than staying on that page, the user is redirected to the `orderhistory.html` page. 
    
7. You may now proceed to the next Lab.

## Learn More
* [A minimal application in Flask](https://flask.palletsprojects.com/en/2.1.x/quickstart/#a-minimal-application)
* [About the Flask "Application Object"](https://flask.palletsprojects.com/en/2.1.x/api/#application-object)
* [Python Virtual Environments in VS Code](https://code.visualstudio.com/docs/python/environments)
* About environment variables in Flask:
    * [The `python-dotenv` library](https://github.com/theskumar/python-dotenv#readme)
    * [Flask documentation - Environment variables](https://flask.palletsprojects.com/en/2.2.x/cli/#environment-variables-from-dotenv)
* [About Folium](https://python-visualization.github.io/folium/)
* [About Leaflet.js](https://leafletjs.com/)

## Acknowledgements
* **Author** - Chris Hoina, Senior Product Manager, Database Tools
* **Contributors**
  - Jeff Smith, Distuinguished Product Manager, Database Tools
  - Justin Biard, Senior Member of Technical Staff, Database Tools 
  - Zachary Talke, Product Manager, Database Tools
  - Brian Spendolini, Principal Product Manager
* **Last Updated By/Date** - Chris Hoina, August 2022
