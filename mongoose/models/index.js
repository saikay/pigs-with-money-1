const mongoose = require("mongoose")
//Collections
const Users = require("./Users")
const Job = require("./Job")
const Products = require("./Products")
const PiggyBank = require("./piggyBank")
const Child = require("./Child")

//const env = process.env.NODE_ENV || "development";
require("dotenv").config()

const DBconfig = require("./config/keys").mongoURI

mongoose.connect(DBconfig, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() =>{
      console.log("MongoDB connected...")
  })

const db = mongoose.connection;
db.on("error",console.error.bind(console, 'MongoDB connection error: '))





module.exports = db
