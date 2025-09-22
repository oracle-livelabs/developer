# Title of the Workshop/Lab

## Introduction

*Describe the workshop/lab in one or two sentences, for example:* This workshop/lab walks you through the steps to [describe what it does].

Estimated Workshop/Lab Time: -- minutes

### About <Product/Technology> (Optional)

Enter background information here about the technology/feature or product used in this workshop/lab - no need to repeat what you covered in the introduction. Keep this section fairly concise. If you find yourself needing more than two sections/paragraphs, please utilize the "Learn More" section.

### Objectives

*List objectives for this workshop/lab using the format below*

In this workshop/lab, you will:
* Objective 1
* Objective 2
* Objective 3

### Prerequisites (Optional)

*List the prerequisites for this workshop/lab using the format below. Fill in whatever knowledge, accounts, etc. is necessary to complete the workshop/lab. Do NOT list each previous workshop/lab as a prerequisite.*

This workshop/lab assumes you have:
* An Oracle Cloud account
* All previous workshops/labs successfully completed

*This is the "fold" - below items are collapsed by default*

## Task 1: Basic Formatting Examples

This task demonstrates basic markdown formatting options.

1. **Bold text**: Use **double asterisks** or __double underscores__ for bold.

2. *Italic text*: Use *single asterisks* or _single underscores_ for italic.

3. ***Bold and italic***: Combine both with ***three asterisks***.

4. `Inline code`: Use backticks for `inline code`.

   ```
   Code block example
   Indent with four spaces or use backticks
   ```

5. [Link example](https://www.oracle.com) - Use square brackets for text and parentheses for URL.

6. ![Image alt text](./images/sample.png) - Use exclamation mark, square brackets for alt text, and parentheses for path.

7. Image with size: ![Image alt text](./images/sample.png =50%x*) // auto height
   ![Image alt text](./images/sample.png =500x200) // specific size

## Task 2: Lists and Tables

This task shows ordered and unordered lists, plus tables.
Remark: Every task must use ordered list items to guide the user through the different steps. Each order list items is referred to a step inside of a Task.

1. Ordered list item 1
2. Ordered list item 2
   - Nested unordered list
   - Another nested item
3. Ordered list item 3

Unordered list:
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2

Table example:

| Column 1 | Column 2 | Column 3 |
| -------- |:--------:| --------:|
| Left align | Center align | Right align |
| Row 2 | Data | $100 |
| Row 3 | More data | $200 |

Table with links:

| Tables | Are | Cool |
| --------|:-------:| -----:|
| col 3 is | right-aligned | [Link example](https://www.oracle.com) |
| col 2 is | centered| $12 |
| zebra stripes | are neat | $1 |

## Task 3: Code and Copy Tags

This task demonstrates code blocks with copy functionality.

1. Basic code block:

   ```
   <copy>This is code that can be copied</copy>
   ```

2. Code with variables:

   ```
   <copy>ssh -i <ssh-key-file></copy>
   ```

3. Multiline code:

   ```
   <copy>
   Line 1 of code
   Line 2 of code
   </copy>
   ```

## Task 4: Videos and Special Links

This task shows video embedding and special link types.

1. Video embedding: [](youtube:YouTube_video_id)

2. Download link: [Click here to download file.](./files/data.csv?download=1)

3. Quick navigation links:
   - [Go to next lab.](#next)
   - [Go to previous lab.](#prev)
   - [Go to first lab.](#first)
   - [Go to last lab.](#last)
   - [Go to particular lab.](?lab=lab-2-select-manipulate-data-using)

## Task 5: Conditional Content and Includes

This task demonstrates advanced LiveLabs features.

1. Conditional content:
   <if type="python">This content only shows for Python workshops</if>
   <if type="r">This content only shows for R workshops</if>

2. Include another markdown file: [](include:shortname)
   - Note: Define "include": {"shortname": "file_path_from_manifest"} in manifest.json

## Task 6: Escaping Characters

This task shows how to escape markdown characters.

1. Use backslash to escape: \*not italic\*, \`not code\`

2. Line breaks: Add two spaces at end of line  
   Or use <br> for forced break.


## Task 7: using the manifest.json

1. workshops are built using a manifest.file.
2. the file is always located in a folder called 'workshops' located in the root folder of a particular workshop.
3. An example is provided at ../workshops/sandbox/manifest.json'
4. Different labs are specified in the manifest.json
5. each lab file is located in its own folder. the name of the lab file should be short, all lowercase, and refer to the content. For example, json.md. the folder name is the name of the file without the file extension, for example json/
6. the folder that contains the manifest.json file always contains an index.html ./workshops/sandbox/index.html which must be available. It must not be changed.
    

## Learn More

*(optional - include links to docs, white papers, blogs, etc)*

* [Oracle Documentation](http://docs.oracle.com)
* [Blog Post Example](http://blogs.oracle.com)
* [White Paper](http://whitepapers.oracle.com)

## Acknowledgements
* **Author** - <Name, Title, Group>
* **Contributors** -  <Name, Group> -- optional
* **Last Updated By/Date** - <Name, Month Year>
