const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

//to get data from the html
app.use(bodyParser.urlencoded({extended: true}));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "hackthenorth"
});

// Entry point
app.get("/", function(req,res){
  console.log("DIRNAME: " + __dirname);
  res.sendFile(__dirname + "/index.html");
});

// Authenticate
app.post("/login", function(req, res){
  let username = req.body.username;
  let password = req.body.password;
  let dbScript = "SELECT username, pwd FROM users WHERE username = '" + username + "' AND pwd = '" + password + "'"; 

  /* Debug */
  console.log("dbScript: " + dbScript);

  con.query(dbScript, function(err, result){
    if (err) throw err;
    console.log(result);
  });
});

//BMI Calculator
app.post("/BMI", function(req, res){
  //parseFloat converts a floating point number
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  var bmi = weight/(height * height);
  var interpretation;
  if(bmi < 18.5){
        interpretation = "Your BMI is " + bmi + ", so you are underweight.";
    }
    if((bmi >= 18.5) && (bmi <= 24.9)){
        interpretation = "Your BMI is " + bmi + ", so you have a normal weight.";
    }
    if(bmi > 24.9){
        interpretation = "Your BMI is " + bmi + ", so you are overweight.";
    }
    res.send(interpretation);
});

//BMR Calculator
app.post("/BMI", function(req, res){
  //parseFloat converts a floating point number
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  var bmi = weight/(height * height);
  var interpretation;
  if(bmi < 18.5){
        interpretation = "Your BMI is " + bmi + ", so you are underweight.";
    }
    if((bmi >= 18.5) && (bmi <= 24.9)){
        interpretation = "Your BMI is " + bmi + ", so you have a normal weight.";
    }
    if(bmi > 24.9){
        interpretation = "Your BMI is " + bmi + ", so you are overweight.";
    }
    res.send(interpretation);
});




app.listen(3000, function(){
  console.log("Server running on port 3000");
});