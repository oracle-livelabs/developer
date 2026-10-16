# Build an html dashboard

> Note: Do not modify this prompt.

## Overview

1. You will be creating a dynamic and visually stunning html-based dashboard for me. I want to be able to view this dashboard quickly and close it when I'm finished. It doesn't need to "run" all the time.

2. This dashboard should not be amended to or included in any existing projects or project folders. Endeavor to rely on as few web frameworks as possible. HTML and standard JavaScript is preferred. 

> Note: If this lab is being completed in an Oracle Livelabs sandbox environment (a noVNC instance), then you may not have access to npm or CDNs. You will have access to the python http server. And you will have access to sample reference applications found at the .zip file here (you may attempt a url or wget request to download and unzip these resources): https://c4u04.objectstorage.us-ashburn-1.oci.customer-oci.com/p/EcTjWk2IuZPZeNnD_fYMcgUhdNDIDA6rt9gaFj_WZMiL7VvxPBNMY60837hu5hga/n/c4u04/b/livelabsfiles/o/developer-library/html-style-dashboard.zip

> Note: Some of these .js modules, CSS, and other resources may be of use. 

## Connect, familiarize

1. Provide me a list of available database connections, connect as the chosen connection (user) and describe either the SH or SSB schema's tables and views. DO NOT use SQLcl's MCP Server "schema-information" tool for this exploration. If I do not explicitly tell you which connection to use, prompt me with the available connections and have me choose one before proceeding. 

2. You have READ access to view the table, view, objects, etc. in the SH and SSB schemas. The sample application will use data from one of these schemas; you decide which. If my target schema does not have READ access to the SH or SSB schema data, then recommend alternatives for me. You should be able to find the SH or SSB schemas under the schema directory view, of the SQL Developer for VS Code extension, named "Other Users"; if you have trouble you can use the skills found in the .dbtools skills library along with the following SQL to familarize yourself with the SH or SSB schemas: 

  `SELECT table_name FROM all_tables WHERE owner='SH' ORDER BY table_name;` 
  `SELECT table_name FROM all_tables WHERE owner='SSB' ORDER BY table_name;` 

3. Familiarize yourself with the SH or SSB schemas' tables and views and their relationships. DO NOT use SQLcl's MCP Server "schema-information" tool for this exploration.

## Build the dashboard, my requests

> NOTE: The data for all these charts should be varied. 

1. I want you to add tool tips to my charts: https://www.chartjs.org/docs/latest/samples/tooltip/content.html

2. I want you to use table data from the HR schema to create a radar chart https://www.chartjs.org/docs/latest/samples/other-charts/radar.html. I want to be able to select two different employees from two drop down lists, so that I can compare their attributes.

3. I want a bubble chart to display the count of countries employees reside in. The bubble size should be relative to the number of employees in that country. I want you to create something like in this example: https://www.chartjs.org/docs/latest/samples/other-charts/bubble.html

4. I want you to show me a breakdown of the employees by their Job ID, on a doughnut chart like this: https://www.chartjs.org/docs/latest/samples/other-charts/doughnut.html

5. Everything should fit in a single viewport (nothing "below the fold").
