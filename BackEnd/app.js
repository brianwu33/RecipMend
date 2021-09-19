const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const http = require("https");

const app = express();

//to get data from the html
app.use(bodyParser.urlencoded({ extended: true }));

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "123456",
//     database: "hackthenorth"
// });

// Entry point
app.get("/", function (req, res) {
  console.log("DIRNAME: " + __dirname);
  res.sendFile(__dirname + "/index.html");
});

// Authenticate
// app.post("/login", function(req, res){
//   let username = req.body.username;
//   let password = req.body.password;
//   let dbScript = "SELECT username, pwd FROM users WHERE username = '" + username + "' AND pwd = '" + password + "'";

//   /* Debug */
//   console.log("dbScript: " + dbScript);

//   con.query(dbScript, function(err, result){
//     if (err) throw err;
//     console.log(result);
//   });
// });

//BMI Calculator
app.post("/BMI", function (req, res) {
  //parseFloat converts a floating point number
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  var bmi = weight / (height * height);
  var interpretation;
  if (bmi < 18.5) {
    interpretation = "Your BMI is " + bmi + ", so you are underweight.";
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    interpretation = "Your BMI is " + bmi + ", so you have a normal weight.";
  }
  if (bmi > 24.9) {
    interpretation = "Your BMI is " + bmi + ", so you are overweight.";
  }
  // res.send(interpretation);
  res.redirect("/");
});

//BMR Calculator
app.post("/BMR", function (req, res) {
  console.log(req.body);
  //parseFloat converts a floating point number
  var age = parseFloat(req.body.age);
  var exercise = req.body.exercise;
  var gender = req.body.gender;
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  var exercise_constant = "";
  var daily_calories = "";

  if (exercise === "A") {
    exercise_constant = 1.2;
  } else if (exercise === "B") {
    exercise_constant = 1.375;
  } else if (exercise == "C") {
    exercise_constant = 1.55;
  } else if (exercise === "D") {
    exercise_constant = 1.725;
  } else if (exercise === "E") {
    exercise_constant = 1.9;
  } else {
    console.log("DIDNT WORK");
  }

  if (gender === "male") {
    daily_calories =
      exercise_constant * (10 * weight + 6.25 * height - 5 * age + 5);
  } else if (gender === "female") {
    daily_calories =
      exercise_constant * (10 * weight + 6.25 * height - 5 * age + -161);
  } else {
    daily_calories = 0;
  }
  console.log(daily_calories);
  res.send(daily_calories.toString());
});

app.post("/generate", function (request, response) {
  //Generate Meal Plan
  const options = {
    method: "GET",
    hostname: "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    port: null,
    path: "/recipes/mealplans/generate?timeFrame=day&targetCalories=2000&diet=vegetarian&exclude=shellfish%2C%20olives",
    headers: {
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": "3c93d51752mshc30c76c0628ecf3p119e33jsn2214bf98bc1d",
      useQueryString: true,
    },
  };

  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body);
      console.log(body.toString());

      const data = JSON.parse(body);

      const imageType = data.meals[0].imageType;
      const id = data.meals[0].id;
      console.log(imageType);
      const url =
        "https://spoonacular.com/recipeImages/" + id + "-556x370." + imageType;
      console.log(url);
    });
  });

  req.end();
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
