import React, { useState } from "react";

function Bmi() {
  let [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [result, setResult] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [exercise, setExercise] = useState("");
  const [calorie, setCalorie] = useState("");

  function handleChangeHeight(event) {
    console.log(event.target.value);
    setHeight(event.target.value);
  }

  function handleChangeWeight(event) {
    console.log(event.target.value);
    setWeight(event.target.value);
  }

  //BMI Calculator Handle Click
  function handleClickI(event) {
    var bmi = "";
    height = height / 100;
    bmi = weight / (height * height);
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
    setResult(interpretation);
    event.preventDefault();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //BMR
  function handleChangeAge(event) {
    console.log(event.target.value);
    setAge(event.target.value);
  }
  function handleChangeGender(event) {
    console.log(event.target.value);
    setGender(event.target.value);
  }
  function handleChangeExercise(event) {
    console.log(event.target.value);
    setExercise(event.target.value);
  }

  function handleClickR(event) {
    var exercise_constant = "";
    var daily_calories = "";

    if (exercise === "A") {
      exercise_constant = 1.2;
    } else if (exercise === "B") {
      exercise_constant = 1.375;
    } else if (exercise === "C") {
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
      console.log("pls input the correct gender");
    }

    console.log(daily_calories);
    setCalorie("Your daily Calories should be" + daily_calories.toString());
    event.preventDefault();
  }

  //BMR Calculator Handle CLick
  return (
    <div className="doubleB">
      <div className="bmi">
        <h1>BMI Calculator</h1>
        <form onSubmit={handleClickI}>
          <h7>What is your height: </h7>
          <input
            type="text"
            name="height"
            onChange={handleChangeHeight}
            placeholder="Height (in cm)"
            value={height}
          />
          <br />
          <h7>What is your weight: </h7>
          <input
            type="text"
            name="weight"
            onChange={handleChangeWeight}
            placeholder="Weight (in kg)"
            value={weight}
          />
          <br />
          <button type="submit" name="submit">
            Calculate BMI
          </button>
          <h1>{result}</h1>
        </form>
      </div>

      <div className="bmr">
        <h1>BMR Calcultor</h1>
        <form onSubmit={handleClickR}>
          <h7>What's your age: </h7>
          <input
            type="text"
            name="age"
            onChange={handleChangeAge}
            placeholder="ages"
            value={age}
          />
          <br />
          <h7>What's your gender: </h7>
          <input
            type="text"
            name="gender"
            onChange={handleChangeGender}
            placeholder="gender"
            value={gender}
          />
          <br />
          <h7>How many times do you exercise per week : </h7>
          <input
            type="text"
            name="exercise"
            onChange={handleChangeExercise}
            placeholder="Level: A, B, C, D, E"
            value={exercise}
            //className="input"
          />
          <br />
          <button type="submit" name="submit">
            Calculate BMR
          </button>
          <h1>{calorie}</h1>
        </form>
        <h1>
          To Lose weight, set your target calories 500-1000 smaller than your
          daily calories
        </h1>
        <h1>
          To gain weight, set your target calories 500-1000 larger than your
          daily calories
        </h1>
        <h1>
          To maintain your weight, set your target calories the same as your
          daily calories
        </h1>
      </div>
    </div>
  );
}

export default Bmi;
