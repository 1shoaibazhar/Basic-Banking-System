const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define Mongoose Schema
const customerSchema = new mongoose.Schema({
      Name: String,
      Email: String,
      Balance: Number,
});

// Model
const customer = mongoose.model("Customer", customerSchema);
module.exports = customer

