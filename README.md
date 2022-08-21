# jQuery Server Calculators

## Description

I created two server-side calculators. The base calculator takes in a first number and second number from input fields and an operator from a button click. The stretch calculator takes in input solely from button clicks. The value of the inputs for both calculators are stored in objects and sent to the server via a POST request from the client. Mathematical operations occur on the server, and the objects that now include a total property are stored there in an array. The client makes a GET request to the server, and the calculations with totals are appended back to the page as list items.

In the stretch calculator, there is an option to re-run a previously listed calculation. The client sends the number and operator inputs from the calculation that was clicked on to the server. The server checks the array of stored calculation objects for a match based on these inputs. When a match is found, the server sends that calculation object with total back to the client. This calculator also has a delete capability. The client makes a DELETE request by clicking on the eraser button. The server receives the request and empties the array of stored calculations. The client loops through the emptied array, and no items are appended back to the page. 

## Screen Shot

![calculators](images/jQueryServerCalculators.png)

## Demo

Try it out [here] on Heroku!

## Built With

Node.js | Express | jQuery | Bootstrap 

## Checklist

### Part 1: Set It Up
- [X] Set up file structure for application
- [X] Install Express and pg
- [X] Create initial layout including input field for index.html 
- [X] Source in jQuery, Bootstrap, Google Font, FontAwesome, SweetAlert
- [X] Spin up server
- [X] Make new database and create table query with needed data types in Postico. Test with sample data

### Part 2: Read-GET-SELECT
- [X] Make and test server GET route using router and SQL query SELECT
- [X] Make and test client AJAX request to GET records from database
- [X] Display tasks on page by looping over objects in array from server

### Part 3: Create-POST-INSERT INTO
- [X] Store values from input on click in task object
- [X] Make and test client AJAX request to POST object to database
- [X] Make and test server POST route using SQL query INSERT INTO
- [X] Call getTask to display revised database tasks on page

### Part 4: Delete-DELETE-DELETE!
- [X] Create delete button with data property to store id of task clicked on
- [X] Make and test client AJAX request to DELETE task from database using route parameter id
- [X] Make and test server DELETE route using SQL query DELETE and task id 
- [X] Call getTask to display revised database tasks on page

### Part 5: Update-PUT-UPDATE
- [X] Create complete button with data property to store id of task clicked on
- [X] Make and test client AJAX request to PUT task from database using route parameter id
- [X] Make and test server PUT route using SQL query UPDATE, completed column, id
- [X] Call getTask to display revised database tasks on page

### Part 6: Add Features
- [X] Bootstrap styling
    - Source in bootstrap to update buttons using button classes and input using form-control and input-group classes
    - Use media queries to create breakpoints based on viewport widths
- [X] Delete confirmation
    - Source in SweetAlert to change standard alert format and ask for confirmation before a user deletes a task
- [X] Time completed
    - Create timestamp data columns in `todo` table for time task added and time task completed
    - Store date object when complete button clicked on. Send object with time completed property as part of AJAX PUT request
    - Update PUT route using SQL query UPDATE, completed column, time_completed column, id
    - Call getTask to display revised database tasks on page, now with completed time
- [X] Task ordering
    - Update server GET route and SQL query SELECT to include ORDER BY
    - Stable sort tasks by completed status, then time completed, then time added
    - Call getTask to display revised order of database tasks on page