# Retail rewards program

A retailer offers a rewards program to its customers, which is based on points earned for every purchase.

A customer would receive,
  - Two points for every dollar spent over $100 in each transaction
  - One point for every dollar spent over $50 in each transaction 

For example: In $120 purchase, points earned would be calculated as:
 2 x $20 + 1 x $50 = 90 points

Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.

Transaction List component - Gets all the transaction and displays them. This is shown in Transaction List table.

CustomerByMonth component  - Gets the cutomer data and transaction data, then calculates the points earned per customer. CustomerByMonth table shows this view. 
If the user inputs the full month in the input box, for eg: December or december, and hit Enter key, it would display, points earned in December for the customers. Similarly we can try for November and October.

This app was created using create-react-app. 

Before you start the application with 'npm start', please start the backend server using 'json-server ./src/database/db.json'
 
# How to install?

    Fork and clone the repo.
    Run npm install.
    Run npx json-server --watch ./src/database/db.json to start backend
    Run npm start to run the application
    Run npm run test to run test cases.

