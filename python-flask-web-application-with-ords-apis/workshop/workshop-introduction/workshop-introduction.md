# Introduction

## About this Workshop

In this workshop you'll explore a Python application built atop the Flask micro-framework. This application uses Oracle Database REST <b>A</b>pplication <b>P</b>rogramming <b>I</b>nterfaces (APIs) to serve, display, and store product information as well as customer orders in a fictitious online ticket ordering service. This online storefront, is based in Las Vegas, Nevada (to coincide with Oracle's Cloud World 2022 event). 

In later Labs you will learn how a user can access this site and order tickets to local attractions. The attractions range from museums to art installations; all are family-friendly. You'll learn how this Flask application, developed primarily in Python can omit the tedious steps of creating, mapping, and modeling a database. Additionally, since all necessary information is provided through Oracle REST APIs, Object-Relational Mapping (ORM) tools are completely unnecessary.

By the end of this lab, you will have a thorough understanding of how Oracle REST APIs can accelerate the development of Flask/Python web applications. You will also be provided with Python code (you may choose to install locally or fork our repository from GitHub) and Database scripts required to:
- establish your own schema in an Autonomous Database
- run this Flask application locally

Throughout this Workshop we'll explore key concepts related: 
- Oracle REST Data Services (ORDS) APIs and characteristics:
  - Templates
  - Handlers 
  - Methods 

- Python libraries: 
  - [Flask](https://flask.palletsprojects.com/en/2.2.x/) 
  - [Folium](https://python-visualization.github.io/folium/) 
  - [Json](https://docs.python.org/3/library/json.html) 
  - [Requests](https://requests.readthedocs.io/en/latest/)

- Bootstrap - A popular html and CSS framework Bootstrap
- Select JavaScript functions
- OpenAPI Specifications and the Swagger Editor

Estimated Workshop Time: 90 minutes

### Objectives

In this workshop, you will:
* Explore an Oracle REST API-backed Flask application
* Explore and interact with Oracle REST APIs
* Explore Oracle REST APIs in a Swagger Editor session
* Review a Flask application's routes and interactions with Oracle REST APIs
* Review elements of a Flask application's presentation layer 

### Prerequisites

This Workshop assumes you have experience with Python development. This Workshop also assumes you have some experience with the Flask framework. This includes knowledge of the proper commands to execute a Flask application. 

While familiarity with HTML, CSS, and JavaScript is helpful. Knowledge in these areas is not required as we will be reviewing them in limited scope. 

Finally, this lab assumes you have the following developer environment: 
- Python 3.10 or later 
- A text editor (such as Visual Studio Code or Sublime Text)
- A Package Manager (i.e., Homebrew for Mac, or pip)
- Select Python packages: 
  - Requests 
  - Folium
  - Json
  - Flask 
  - Virtual Environment (venv) <i>or</i>the Live Server extension for VS Code 

:bulb: <i>If your development environment is not properly set-up, you may refer to the <b>Learn More</b> section for resources on how to help you set up your environment.</i>

#### You may now proceed to the next Lab.

## Learn More

* [About ORDS](https://www.oracle.com/database/technologies/appdev/rest.html)
* [ORDS Best Practices](https://www.oracle.com/database/technologies/appdev/rest/best-practices/)
* [ORDS, SODA & JSON Developer Forum](https://community.oracle.com/tech/developers/categories/oracle_rest_data_services) 
* [Installing Flask and Virtual Environment](https://flask.palletsprojects.com/en/2.1.x/installation/)
* [Download VS Code](https://code.visualstudio.com/download)
* [Installing Home Brew - Package Manager for Linux and MacOS](https://docs.brew.sh/Installation)
* Package Managers for Windows:
  * [Windows Package Manager](https://docs.microsoft.com/en-us/windows/package-manager/)
  * [Chocolatey](https://chocolatey.org/)
  * [Ninite](https://ninite.com/)

## Acknowledgements

* **Author** - Chris Hoina, Senior Product Manager, Database Tools
* **Contributors**
  - Jeff Smith, Distinguished Product Manager, Database Tools
  - Justin Biard, Senior Member of Technical Staff, Database Tools 
  - Zachary Talke, Product Manager, Database Tools
  - Brian Spendolini, Principal Product Manager
* **Last Updated By/Date** - Chris Hoina, August 2022
