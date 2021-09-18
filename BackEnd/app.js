const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

// Initialize middlewares
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: "123456",
  resave: false,
  saveUninitialized: false
}));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "hackthenorth"
});

// Authentication
function auth(req, res) {
  if(!req.session.isAuth) {
    res.send("Request declined");
  }
}

// Login Page
app.get("/", function(req, res){
  if (req.session.isAuth) {
    res.redirect(`/homepage/${req.session.username}`);
  }
  res.sendFile(__dirname + "/login.html");
});

// Signup Page
app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
})

// Homepage
app.get("/homepage/:username", function(req, res){
  if ((!req.session.isAuth) || (req.session.username != req.params.username)) {
    res.redirect("/");
  }
  let username = req.params.username;
  res.sendFile(__dirname + "/index.html");
});


// Api: Login
app.post("/login", function(req, res){
  let username = req.body.username;
  let password = req.body.password;
  
  // Query database and verify login info
  let dbScript = `SELECT username, pwd FROM users WHERE username = '${username}' AND pwd = '${password}'`; 
  con.query(dbScript, function(err, result){
    if (err) {
      throw err;
    }
    if (result.length) {
      req.session.isAuth = true;
      req.session.username = username;
      res.redirect(`/homepage/${username}`);
    } else {
      res.send("<h1>Fuck off</h1>");
    }
  });
});

// Api: Signup
app.post("/api/signup", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  // Check if any field is empty
  if (username == "" || password == "") {
    res.send("Invalid username or password");
  }

  // Check if the same username have already existed in database
  con.query(`SELECT username FROM users WHERE username = '${username}'`, function (err, result) {
    if (err) {
      throw err;
    } else if (result.length) {
      res.send("Username is already taken");
    }
  })

  // Add username and password to database
  let dbScript = `INSERT INTO users (username, pwd) VALUES ("${username}", "${password}")`;
  con.query(dbScript, function (err, result) {
    if (err) {
      throw err;
    } else {
      req.session.isAuth = true;
      req.session.username = username;
      res.redirect(`/homepage/${username}`);
    }
  })
})

// Api: BMI Calculator
app.post("/BMI", function(req, res){
  auth(req, res);
  
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

// Api: BMR Calculator
app.post("/BMI", function(req, res){
  auth(req, res);
  
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


// Api: Submit(Edit) Personal Info
/*
  Accept form data from front-end server.
  username, password, email, height, weight, age
*/
app.post("/api/personalinfo", function (req, res) {
  auth(req, res);

  let dbScript = `UPDATE users SET `;

  if (req.body.username != "") {
    // Check if the same username have already existed in database
    con.query(`SELECT username FROM users WHERE username = '${req.body.username}'`, function (err, result) {
      if (err) {
        throw err;
      } else if (result.length) {
        res.send("Username is already taken");
      }
    })
    dbScript += `username = '${req.body.username}',`
  }
  if (req.body.password != "") {
    dbScript += `pwd = '${req.body.password}',`
  }
  if (req.body.email != "") {
    dbScript += `email = '${req.body.email}',`
  }
  if (req.body.height != "") {
    dbScript += `height = '${req.body.height}',`
  }
  if (req.body.weight != "") {
    dbScript += `weight = '${req.body.weight}',`
  }
  if (req.body.age != "") {
    dbScript += `age = '${req.body.age}',`
  }
  
  // Check if all of the 6 fields are empty
  if (dbScript.length == 17) {
    res.send("Received an empty form");
  }

  // Remove the comma at the end of dbScript
  if (dbScript[-1] == `,`) {
    dbScript = dbScript.slice(0, -1);
  }
  dbScript += `WHERE username = '${req.session.username}'`;

  con.query(dbScript, function (err, result) {
    if (err) {
      throw err;
    }
    res.send("Success")
  })
})

// Api: Add mealplan for a specific date (breakfast, lunch, dinner)
/*
  Accept form data from front-end server.
  date, breakfast, lunch, dinner
*/
app.post("/api/mealplan", function (req, res) {
  auth(req, res);
  
  let date      = req.body.date;
  let breakfast = req.body.breakfast;
  let lunch     = req.body.lunch;
  let dinner    = req.body.dinner;

  if (date == "") {
    res.send("Date should not be empty");
  }

  let dbScript = `INSERT INTO mealplan (username, date, breakfast, lunch, dinner)
                  VALUES( '${req.session.username}',
                          '${date}',
                          '${breakfast}',
                          '${lunch}',
                          '${dinner}')`
  con.query(dbScript, function (err, result) {
    if (err) {
      throw err;
    } else {
      res.send("Success");
    }
  })
})


// Api: return previous mealplans of the user
/*
  /api/mealplan?username=
  return: [{id:..., username:..., date:..., ...}, ...]
*/
app.get("/api/mealplan", function (req, res) {
  auth(req, res);
  
  let username = req.query.username;
  let dbScript = `SELECT * FROM mealplan WHERE username = '${username}'`;

  con.query(dbScript, function (err, result) {
    if (err) throw err;
    res.status(200);
    res.send(result);
  });
})

// Api: Calorie / 步数 record


app.listen(3000, function(){
  console.log("Server running on port 3000");
});