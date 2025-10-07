# Lab 2: JSON Duality Views

## Introduction

Building on our bookstore example, imagine your e-commerce platform has grown. You now have existing relational tables for customer orders, inventory management, and reporting systems. However, your product catalog is stored as JSON documents for flexibility. JSON Duality views bridge this gap, allowing you to access and manipulate the same data through both JSON and relational interfaces. This ensures data consistency and lets different parts of your application use the most appropriate data model.

Estimated Lab Time: 25 minutes

### Objectives

* Understand the concept of JSON Duality views
* Create a duality view over JSON collection data
* Query data through relational and JSON interfaces
* Perform updates that maintain consistency
* Learn when duality views are beneficial

### Prerequisites

* Completed Lab 1: JSON Collection Tables
* Access to Oracle Database 23ai with the book_catalog table from Lab 1

## Task 1: Set Up Relational Tables

To demonstrate duality, let's create some relational tables that will be linked to our JSON data.

1. Create a table for book genres:

   ```
   <copy>
   CREATE TABLE genres (
     genre_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     genre_name VARCHAR2(50) UNIQUE NOT NULL
   );
   </copy>
   ```

2. Create a table for authors:

   ```
   <copy>
   CREATE TABLE authors (
     author_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     author_name VARCHAR2(100) NOT NULL
   );
   </copy>
   ```

3. Insert some sample data:

   ```
   <copy>
   INSERT INTO genres (genre_name) VALUES ('Romance'), ('Thriller'), ('Children');
   INSERT INTO authors (author_name) VALUES ('Jane Austen'), ('Eric Carle');
   </copy>
   ```

## Task 2: Create a JSON Duality View

Now we'll create a duality view that presents our JSON book catalog data through a relational interface, while maintaining the flexibility of JSON storage.

1. Create the duality view:

   ```
   <copy>
   CREATE JSON DUALITY VIEW book_catalog_dual AS
   SELECT
     JSON_VALUE(data, '$.title') AS title,
     JSON_VALUE(data, '$.published_year') AS published_year,
     JSON_VALUE(data, '$.pages') AS pages,
     JSON_VALUE(data, '$.price') AS price,
     JSON_VALUE(data, '$.genre') AS genre,
     JSON_QUERY(data, '$.author') AS authors,
     JSON_VALUE(data, '$.isbn') AS isbn
   FROM book_catalog;
   </copy>
   ```

   This view allows us to query the JSON data as if it were a relational table.

## Task 3: Query Through the Duality View

Let's explore our data using the relational interface.

1. View all books in relational format:

   ```
   <copy>
   SELECT title, genre, price, published_year
   FROM book_catalog_dual;
   </copy>
   ```

2. Find books by price range:

   ```
   <copy>
   SELECT title, price
   FROM book_catalog_dual
   WHERE price > 10;
   </copy>
   ```

3. Join with our genres table:

   ```
   <copy>
   SELECT b.title, g.genre_name
   FROM book_catalog_dual b
   JOIN genres g ON b.genre = g.genre_name;
   </copy>
   ```

4. Access JSON-specific data through the view:

   ```
   <copy>
   SELECT title, authors
   FROM book_catalog_dual
   WHERE JSON_EXISTS(authors, '$[0]');
   </copy>
   ```

## Task 4: Update Data Through Duality View

The true power of duality views is that changes made through the relational interface are automatically reflected in the underlying JSON data, and vice versa.

1. Update a book's price through the duality view:

   ```
   <copy>
   UPDATE book_catalog_dual
   SET price = 12.99
   WHERE title = 'Pride and Prejudice';
   </copy>
   ```

2. Verify the change in the original JSON table:

   ```
   <copy>
   SELECT JSON_VALUE(data, '$.title') AS title,
          JSON_VALUE(data, '$.price') AS price
   FROM book_catalog
   WHERE JSON_VALUE(data, '$.title') = 'Pride and Prejudice';
   </copy>
   ```

3. Add a new field through JSON operations (this would be reflected in duality view queries that access it):

   ```
   <copy>
   UPDATE book_catalog
   SET data = JSON_TRANSFORM(data, SET '$.rating' = 4.8)
   WHERE JSON_VALUE(data, '$.title') = 'The Very Hungry Caterpillar';
   </copy>
   ```

4. Query the new field through duality view (we'd need to modify the view to include it, but for demonstration):

   ```
   <copy>
   SELECT JSON_VALUE(data, '$.rating') AS rating
   FROM book_catalog
   WHERE JSON_VALUE(data, '$.title') = 'The Very Hungry Caterpillar';
   </copy>
   ```

## Task 5: Insert Through Duality View

You can also insert data through the duality view.

1. Insert a new book:

   ```
   <copy>
   INSERT INTO book_catalog_dual (title, published_year, pages, price, genre, authors, isbn)
   VALUES ('1984', 1949, 328, 11.99, 'Dystopian', '["George Orwell"]', '978-0451524935');
   </copy>
   ```

2. Verify the insertion in both views:

   ```
   <copy>
   SELECT title, genre FROM book_catalog_dual WHERE title = '1984';

   SELECT JSON_VALUE(data, '$.title'), JSON_VALUE(data, '$.genre')
   FROM book_catalog WHERE JSON_VALUE(data, '$.title') = '1984';
   </copy>
   ```

## Task 6: Explore Advanced Duality Features

Duality views support complex relationships and constraints.

1. Create a duality view with joins:

   ```
   <copy>
   CREATE JSON DUALITY VIEW book_details AS
   SELECT
     b.title,
     b.genre,
     b.price,
     g.genre_id,
     JSON_QUERY(b.data, '$.awards') AS awards
   FROM book_catalog b
   LEFT JOIN genres g ON JSON_VALUE(b.data, '$.genre') = g.genre_name;
   </copy>
   ```

2. Query the joined view:

   ```
   <copy>
   SELECT title, genre, genre_id, awards
   FROM book_details;
   </copy>
   ```

## Summary

JSON Duality views provide the best of both worlds: the flexibility of JSON document storage with the power of relational querying and constraints. They're ideal for:

* Migrating applications gradually from document to relational models
* Supporting polyglot persistence within a single database
* Enabling different teams to work with the same data using their preferred paradigm
* Maintaining data consistency across JSON and relational interfaces

You've now experienced both JSON Collection tables and Duality views, giving you powerful tools for modern application development with Oracle Database 23ai.

## Learn More

* [JSON Duality Views Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/adjsn/json-duality-views.html)
* [Creating Duality Views](https://docs.oracle.com/en/database/oracle/oracle-database/23/adjsn/creating-json-duality-views.html)
