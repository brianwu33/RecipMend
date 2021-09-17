const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456"
});

const app = express();

app.post("/login", function(req, res){
  var username = res.username;
  var password = res.password;

  
  
});



app.listen(3000, function(){
  console.log("Server running on port 3000");
});