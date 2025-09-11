# Creating mock Schema data, and relevant views

## Connecting and creating database objects

1. Connect as the SQL_FREESQL_01 user 
2. Create four tables named car, truck, motorcycle, and manufacturer in the SQL_FREESQL_01 schema with the following characteristics (please review the three "NOTE" notes in this section before creating the tables):

    The car, truck, motorcycle tables should include colums such as: 
      - make
      - model
      - year of manufacture
      - engine displacement
      - wheelbase

    The manufacturer table should include details such as: 
      - Doing business as (dba) name
      - Headquarters location city
      - Headquarters location country 
      - Year manufacturer was established/incorporated
      - Privately held or publiclly held company 

    Create, where applicable for the tables:
      - indexes
      - comments
      - tags
      - references
      - primary and foreign keys  
    
> NOTE: For all tables, recommend any other additional columns you think may be relevant.
    
> NOTE: Ensure that no integrity constraints will be violated. Parent keys, in referred tables, should be verified of their existence before being used in any fictitous data. As an example, make sure the manufacturer_id exists across the various tables.

> NOTE: For simplicity, include Internal Combustion Engine (ICE) vehicles only.

## Inserting data

1. Create 50 unique entries each (in each table) of fictitious, but plausible data for the following tables(please review the two "NOTE" notes in this section before inserting the table data):
    - car
    - truck
    - motorcycle

    > NOTE: When performing the inserts, bulk insert the data with syntax such as this:
    > 
    > ```sql
    > INSERT INTO t(col1, col2, col3) VALUES
    > ('val1_1', 'val1_2', 'val1_3'),
    > ('val2_1', 'val2_2', 'val2_3'),
    > ('val3_1', 'val3_2', 'val3_3');
    > ```

    > NOTE: Take care to not create duplicate data in any of the tables.

2. Create 25 unique entries of fictitious, but plausible data for the following table (please review the two "NOTE" notes in this section before inserting the table data):
    - manufacturer

    > NOTE: When performing the inserts, bulk insert the data with syntax such as this:
    > 
    > ```sql
    > INSERT INTO t(col1, col2, col3) VALUES
    > ('val1_1', 'val1_2', 'val1_3'),
    > ('val2_1', 'val2_2', 'val2_3'),
    > ('val3_1', 'val3_2', 'val3_3');
    > ```

    > NOTE: Take care to not create duplicate data in this table.

2. After inserting the data show me the first 5 rows of each table individually. If no data exists, then: 
    - reattempt the inserting of the data in the empty tables, then:
        - show the first 5 rows of the table, and:
            - continue this until we are certain that table data exists in all the tables

## Create four unique views

1. Create the following views for me, according to these specifications: 

| View Name | Descriptions | 
| --- | --- | 
| Vehicle Count by Manufacturer | The view shows the count of vehicles (cars, trucks, motorcycles) for each manufacturer. For example, Toyota, Ford, Honda, and Rivian have entries in all three vehicle categories, while Yamaha, Ram, Kawasaki, Harley-Davidson, GMC, and Ducati have entries in one or two categories.| 
| Average Engine Displacement by Vehicle Type | The average engine displacement for cars is approximately 1.87 liters, for trucks it's about 4.07 liters, and for motorcycles, it's significantly higher at 43.74 liters. |
|Vehicles by Year of Manufacture| The view shows the count of vehicles manufactured each year. The years 2020, 2021, and 2022 have 7, 9, and 10 vehicles respectively.|
|Manufacturer Details with Vehicle Counts| This view provides detailed information about each manufacturer along with the count of vehicles they manufacture. For instance, Toyota, Ford, Honda, and Rivian are listed with their respective vehicle counts |

2. Recommend to me, two additional unique views. These views should:
    - provide me with unique and/or intersting insights
    - be useful enough to include in a dashboard, should I want to do this in the future
    - Feature in-line commenting, so future users can understand what the view is doing
2. After reviewing the views you propose I will either approve or ask you to reiterate. 
3. Once I am satisfied, I will approve, and you will create these views.

## Disconnect

1. Once we are complete, you will disconnect from the Oracle database.