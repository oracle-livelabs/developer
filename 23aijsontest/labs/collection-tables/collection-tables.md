# Lab 1: JSON Collection Tables

## Introduction

In this lab, you'll explore JSON Collection tables in Oracle Database 23ai. Imagine you're building an e-commerce platform for a bookstore. Books come in all shapes and sizes—some have ISBN numbers, multiple authors, series information, while others are simple paperbacks. Traditional relational tables with fixed columns would struggle with this variability. JSON Collection tables provide the perfect solution, allowing you to store book information as JSON documents with flexible schemas.

Estimated Lab Time: 20 minutes

### Objectives

* Create a JSON Collection table
* Insert JSON documents representing books
* Query the collection using SQL/JSON functions
* Update and delete documents
* Understand when to use collection tables vs. traditional tables

### Prerequisites

* Completed the Introduction lab
* Access to Oracle Database 23ai with SQL Developer

## Task 1: Create a JSON Collection Table

Our bookstore needs a way to store book information. We'll create a JSON collection table called `book_catalog`.

1. Connect to your Oracle Database 23ai instance using SQL Developer.

2. Run the following SQL to create the collection table:

   ```
   <copy>
   CREATE JSON COLLECTION TABLE book_catalog;
   </copy>
   ```

   This creates a table optimized for storing JSON documents. Unlike traditional tables, collection tables automatically handle JSON validation and provide optimized storage and indexing for JSON data.

## Task 2: Insert Book Documents

Now let's add some books to our catalog. Each book will be stored as a JSON document.

1. Insert a classic novel:

   ```
   <copy>
   INSERT INTO book_catalog VALUES (
     JSON('{
       "title": "Pride and Prejudice",
       "author": ["Jane Austen"],
       "genre": "Romance",
       "published_year": 1813,
       "isbn": "978-0141439518",
       "pages": 432,
       "price": 9.99
     }')
   );
   </copy>
   ```

2. Add a modern thriller with multiple authors:

   ```
   <copy>
   INSERT INTO book_catalog VALUES (
     JSON('{
       "title": "The Silent Patient",
       "author": ["Alex Michaelides"],
       "genre": "Thriller",
       "published_year": 2019,
       "isbn": "978-1250301697",
       "pages": 336,
       "price": 14.99,
       "awards": ["Goodreads Choice Awards Best Mystery & Thriller"]
     }')
   );
   </copy>
   ```

3. Insert a children's book with series information:

   ```
   <copy>
   INSERT INTO book_catalog VALUES (
     JSON('{
       "title": "The Very Hungry Caterpillar",
       "author": ["Eric Carle"],
       "genre": "Children",
       "published_year": 1969,
       "pages": 26,
       "price": 8.99,
       "series": "Classic Board Books",
       "age_range": "2-5 years"
     }')
   );
   </copy>
   ```

   Notice how each document has different fields. The JSON collection table accommodates this flexibility perfectly.

## Task 3: Query the Book Catalog

Let's explore our collection with some queries.

1. View all books:

   ```
   <copy>
   SELECT * FROM book_catalog;
   </copy>
   ```

2. Find books by genre:

   ```
   <copy>
   SELECT JSON_VALUE(data, '$.title') AS title,
          JSON_VALUE(data, '$.genre') AS genre
   FROM book_catalog
   WHERE JSON_VALUE(data, '$.genre') = 'Romance';
   </copy>
   ```

3. Get books published after 2000:

   ```
   <copy>
   SELECT JSON_VALUE(data, '$.title') AS title,
          JSON_VALUE(data, '$.published_year') AS year
   FROM book_catalog
   WHERE JSON_VALUE(data, '$.published_year') > 2000;
   </copy>
   ```

4. Find books with awards:

   ```
   <copy>
   SELECT JSON_VALUE(data, '$.title') AS title,
          JSON_QUERY(data, '$.awards') AS awards
   FROM book_catalog
   WHERE JSON_EXISTS(data, '$.awards');
   </copy>
   ```

## Task 4: Update Book Information

Our bookstore got a price increase. Let's update the prices.

1. Increase prices by 10% for all books:

   ```
   <copy>
   UPDATE book_catalog
   SET data = JSON_TRANSFORM(data, SET '$.price' = JSON_VALUE(data, '$.price') * 1.1);
   </copy>
   ```

2. Add a discount field to children's books:

   ```
   <copy>
   UPDATE book_catalog
   SET data = JSON_TRANSFORM(data, SET '$.discount' = 0.2)
   WHERE JSON_VALUE(data, '$.genre') = 'Children';
   </copy>
   ```

## Task 5: Remove Books from Catalog

Sometimes books go out of print. Let's remove one.

1. Delete a book:

   ```
   <copy>
   DELETE FROM book_catalog
   WHERE JSON_VALUE(data, '$.title') = 'The Silent Patient';
   </copy>
   ```

2. Verify the deletion:

   ```
   <copy>
   SELECT COUNT(*) FROM book_catalog;
   </copy>
   ```

## Summary

You've successfully created and managed a JSON collection table for a bookstore catalog. JSON collection tables are ideal for scenarios where:

* Data structures vary significantly between records
* You need to store complex, nested information
* Schema evolution is frequent
* You're migrating from document databases to Oracle

In the next lab, we'll explore JSON Duality views, which provide relational access to JSON data.

## Learn More

* [JSON Collection Tables Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/adjsn/json-collection-tables.html)
* [SQL/JSON Functions](https://docs.oracle.com/en/database/oracle/oracle-database/23/adjsn/sql-json-functions.html)
