const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

// Linking the mongoose schema with the app.js file
const customer = require("./models/customers");
const transferTable = require("./models/transfers")

const port = 3000;
// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});

mongoose.connect("mongodb://localhost:27017/BasicBankingSystem");

// Setting view engine as ejs
app.set("view engine", "ejs");

// EXPRESS SPECIFIC STUFF
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// ENDPOINTS
app.get("/", (req, res) => {
    res.render("index");

    // Dropping any previously stored customers
    mongoose.connection.db.dropCollection("customers", (err, result) => {
        (result) => {
          console.log("Collection dropped");
        };
      });
     
    // Loading customer data
      let allcustomers = [{
        Name: "Shoaib",
        Email: "shoaib@gmail.com",
        Balance:  999999
      }, {
        Name: "Anna",
        Email: "anna@outlook.com",
        Balance:  999999
      }, {
        Name: "Amir",
        Email: "amir@gmail.com",
        Balance:  999999
      }, {Name: "Usman",
      Email: "usman@yahoo.com",
      Balance:  999999
    },{Name: "Jack",
        Email: "jack@yahoo.com",
        Balance:  999999
        }]
    allcustomers.forEach(customer_data =>{
        let myData = new customer(customer_data);
        myData.save(function(err,customer){
        if (err) return console.error(err);
        console.log("Customer added succesfully");
      })
    })
})

app.get("/transfer", (req, res) => {
    // Finding all the customers in the database
    customer.find()
    .then(result =>{
        res.render("transfer", {customers: result});
    })
})

app.post("/transfer", (req, res) => {
    let myData = new transferTable(req.body);
    myData.save(function(err,tranferTable){
        if (err) return console.error(err);
        console.log("Transaction added succesfully");
      })
    res.redirect("/transfer");
})

app.get("/transactions", (req, res) => {
    transferTable.find()
      .then(result => {
         res.render("transactions", {transactionValues: result});
      })  
})