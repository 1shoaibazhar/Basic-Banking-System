const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define Mongoose Schema
const transferTableSchema = new mongoose.Schema({
      Sender: String,
      Reciever: String,
      Amount: Number
});

// Model
const transferTable = mongoose.model("transferTable", transferTableSchema);
module.exports = transferTable

