# Title of the Lab

## Introduction

In this lab we will explore the technologies and frameworks that comprise our sample web application.

Estimated Time: 20 minutes

### About Oracle REST Data Services (ORDS) and developer tools 
This lab will discuss a variety of Enterpruise and open source technologies, including: 
- Oracle REST Data Services (ORDS)
- Oracle Clould Infrastructure (OCI) <i>Always Free</i> Tier Tenancy
- Datbase Actions
<!-- I'm actually not sure about cURL, but I don't want to forget it -->
<!-- Make sure any changes here are also included in the Learn More section - we'll want to include those resources as well  -->
- cURL
- Python 3.10.x and later 
- Python packages (libraries) such as: 
  - Flask 
  - Folium 
  - Json
 - Requests 
- <i>select</i> JavaScript functions 
- Bootstrap HTML and CSS frameworks
- Microsoft Visual Studio Code 

We will discuss and explore these technologies and solutions in a practical sense. However, should you wish explore above what this workshop covers, we encourage you to refer to the "Learn More" section of this page. 

### Objectives

In this lab, you will:
* Inspect the provided ORDS API
* Review the available Paths and HTTPS Operations
<!-- Should we inspect in DB Actions as well? What is more realistic? -->
<!-- Or should we import the module and go from there?  -->
### Prerequisites
<!-- At least for this lab, do we even need prerequisites? -->
This lab assumes you have:
* An Oracle Cloud Infrastructure account
* All previous labs successfully completed


<!-- *This is the "fold" - below items are collapsed by default* -->

## Task 1: Navigate to Swagger Editor 

For this lab we'll rely on Swagger's Open Source Editor to review our ORDS Base URI, as well as the available API Paths and Operations. 

1. Navigate to the Swagger home page and select the Swagger editor link:

    ![Navigating to the Swagger editor](images/select-swagger-editor.png)

2. Next, select "Live Demo"; a blank Swagger Editor session should load. 

    ![Select live demo for Swagger editor](images/select-live-demo-option.png)

3. If a new Editor session page does not appear, navigate to the `File` menu option, and select `Clear Editor`. A new blank session should then appear.

    ![Clear previous Swagger editor session](images/clear-swagger-editor-optional.png)

4. Next, navigate to `File` then `Import URL`. Take the URL (the ORDS Base URI) you copied to your clipboard (or refer above, to copy) and enter it into the input field, click `OK`. 

    ![Select Import URL in Swagger](images/import-url-into-editor.png)

    ![Inputting the ORDS Base URI](images/enter-url-to-import.png)

5. Locate Swagger documentation, available Paths and their Operations.

    Once loaded, Swagger documentation will appear on the left, along with a list of the available ORDS Paths and their Operations on the right of your screen. These few Paths and Operations are all you will need for our Flask application to work properly.

      ![Newly imported ORDS Base URI](images/newly-imported-ords-url.png)

## Task 2: Review the OpenAPI 3.0 definitions

1. First, collapse the Swagger documentation tree: 
 
    ![Collapsed Swagger tree](images/collapse-swagger-tree.png)

2. We'll briefly review the tree, before reviewing the ORDS Paths and their Operations.

    - `openapi` - this particular ORDS API adheres to the OpenAPI 3.0 specification for API documentation. To learn more about OpenAPI specifications, you may refer to the resources provided in the "Learn More" section of this lab.

      ![The OpenAPI specification version](images/open-api-specification-version.png)

    - `info` - here you can see the `title` and `version` of the ORDS API <i>Base URI</i>.

      ![The Base URI for our ORDS API](images/open-api-title-version.png)

    - `servers` - this is the actual Base URI for this ORDS API. All Paths and parameters will be added to this existing <b>U</b>niversal <b>R</b>esource <b>I</b>dentifier (URI), referred to as a **URL** here. 
    
      ![The OpenAPI info](images/open-api-base-uri.png)

    - `paths` - here you'll see an example of one of our Paths. Of the two, you can see all properties of the first `/products/info/{product_id}`. You'll also see the HTTPS Operations for both - `GET` methods.

      ![The OpenAPI info](images/open-api-paths.png)

    - `components` - here you can review the components, or those <i>globally-defined</i> parameters that may be shared across the various Paths and their HTTPS Operations. 

      ![The OpenAPI info](images/open-api-components.png)

## Task 3: Explore ORDS Templates and Handlers 

1. Locate the Paths

    Under the "default" section of the browser (on the right side of your window), you'll see the <i>Paths</i> available to us: 
    - `GET` `/locations/map/data` 
    - `GET` `/products/info/{product_id}`
    - `GET` `/products/value/{product_id}`
    - `POST` <i>and</i> `GET` `/purchases/history`

    While these are all considered Paths, ORDS would also consider that there are **four** different Resource Templates. All are unique, with the exception of the `/purchases/history` Resource Template. This Resource Template has a Resource <i>Handler</i> for `GET` <i>and</i> `POST` Operations. Please refer to the "Learn More" section of this Lab to learn more about Resource Templates and their relationship to Resource Handlers. 

2. Explore the Paths

    Here we'll briefly review each Paths (recall there are <i>four</i> Resource Templates) and discuss their importance to the Flask application. 

      1. `GET` `/locations/map/data`

          1. Hover over this Path and a dropdown arrow will appear. Click this to expand the window. 
          
              :bulb: <i>You'll follow similar actions for subsequent Paths.</i>

              ![The OpenAPI info](images/path-main-screen-image.png)

          2. Click "Try it out".

              ![The OpenAPI info](images/get-path-for-folium-map.png)
          
          3. The "Execute" button will appear, click it to issue a `GET` request.

              ![The OpenAPI info](images/get-path-for-folium-execute-request.png)

          4. Scroll down slightly, to see the <b>Response Body</b> of the `GET` request. What does this payload look like it could be used for? If you guessed a map rendering, then you're correct. We'll use this information to populate a Folium map for our Flask application's main page (aka `index.html`)

              :bulb: <i>Folium is a Python library, based on the Lealflet.js, used for visualizing data on interactive Leaflet maps. Refer to the "Learn More" section for details.</i>
              
      2. `GET` `/products/info/{product_id}`
      3. `GET` `/products/value/{product_id}`
      4. `POST` `/purchases/history`
      5. `GET` `/purchases/history`



      1. Expand the 'GET' '/locations/map/data` Template 

  :bulb: Note: Since there is only one path (`GET`), the Resource Template and Path are one in the same. <i>However</i> if an additional 


  Use tables sparingly:

  | Column 1 | Column 2 | Column 3 |
  | --- | --- | --- |
  | 1 | Some text or a link | More text  |
  | 2 |Some text or a link | More text |
  | 3 | Some text or a link | More text |

2. You can also include bulleted lists - make sure to indent 4 spaces:

    - List item 1
    - List item 2

3. Code examples

    ```
    Adding code examples
  	Indentation is important for the code example to appear inside the step
    Multiple lines of code
  	<copy>Enclose the text you want to copy in <copy></copy>.</copy>
    ```

4. Code examples that include variables

	```
  <copy>ssh -i <ssh-key-file></copy>
  ```

## Learn More

* [About ORDS](https://www.oracle.com/database/technologies/appdev/rest.html)
* [About OpenAPI Specifications](https://swagger.io/docs/specification/basic-structure/)
* [About ORDS Resource Templates and Handlers](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/22.2/orddg/developing-REST-applications.html#GUID-50E24524-32BB-470D-8015-6C25C9B47A44)
* [About Folium](http://python-visualization.github.io/folium/)
* [About Leaflet.js](https://leafletjs.com/)


* [About cURL](https://curl.se/)
* [About Python](https://www.python.org/)
* [About Flask for Python](https://flask.palletsprojects.com/en/2.1.x/)
* [About Folium for Python](https://github.com/python-visualization/folium)
* [About Json for Python ](https://docs.python.org/3/library/json.html)
* [About Requests for Python](https://requests.readthedocs.io/en/latest/)
* [About Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
* [Mozilla Developer Network (MDN) Web Docs](https://developer.mozilla.org/en-US/)

Oracle REST Data Services (ORDS)
Oracle Clould Infrastructure (OCI) <i>Always Free</i> Tier Tenancy
Datbase Actions
<!-- I'm actually not sure about cURL, but I don't want to forget it -->
<!-- Make sure any changes here are also included in the Learn More section - we'll want to include those resources as well  -->
- cURL
- Python 3.10.x and later 
- Python packages (libraries) such as: 
  - Flask 
  - Folium 
  - Json
 - Requests 
- <i>select</i>JavaScript functions 
- Bootstrap HTML and CSS frameworks

## Acknowledgements
* **Author** - <Name, Title, Group>
* **Contributors** -  <Name, Group> -- optional
* **Last Updated By/Date** - <Name, Month Year>
