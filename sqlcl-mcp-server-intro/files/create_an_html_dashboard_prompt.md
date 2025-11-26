# Build a dashboard

## Overview

1. You will be creating a dynamic and visually stunning html-based dashboard for me. I want to be able to view this dashboard quickly and close it when I'm finished. It doesn't need to "run" all the time.

2. This dashboard should not be amended to or included in an existing projects or project folders. Endeavor to rely on as few web frameworks as possible. HTML and standard JavaScript is preferred. 

## Task 1: Connect, familiarize

1. Provide me a list of available database connections, connect as the chosen connection (user) and describe the HR schema tables and views. If I do not explicitly tell you which connection to use, prompt me with the available connections and have me choose one before proceeding. 

2. You should be able to find HR schema under the schema directory named "Other Users". Do not use the schema-information tool for this task. Rather, you should query ALL_TABLES/DBA_TABLES to verify the existence of the HR tables, views, etc.

3. Familiarize yourself with the HR schema's tables and views and their relationships.

## Task 2: Build the dashboard, my requests

> NOTE: The data for all these charts should be varied and not focus on any particular department, country, or location. 

1. I want you to add tool tips to my charts: https://www.chartjs.org/docs/latest/samples/tooltip/content.html
2. I want you to use table data from the HR schema to create a radar chart https://www.chartjs.org/docs/latest/samples/other-charts/radar.html. I want to be able to select two different employees from two drop down lists, so that I can compare their attributes.

3. I want a bubble chart to display the count of countries employees reside in. The bubble size should be relative to the number of employees in that country. I want you to create something like in this example: https://www.chartjs.org/docs/latest/samples/other-charts/bubble.html
4. I want you to show me a breakdown of the employees by their Job ID, on a doughnut chart like this: https://www.chartjs.org/docs/latest/samples/other-charts/doughnut.html
5. Everything should fit in a single viewport (nothing "below the fold").
