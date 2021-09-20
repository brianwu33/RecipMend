import React, { useRef, useState } from "react";
import axios from "axios";

function Recipe() {
    const caloriesRef = useRef();
    const dietRef = useRef();
    const exclusionsRef = useRef();

    const [breakfast, updateBreakfast] = useState({name: "breakfast", url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.eatthis.com%2Feasy-breakfast-ideas%2F&psig=AOvVaw2LjY3MfZqLeKqa83ic5p89&ust=1632119975772000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPjOkfO2ivMCFQAAAAAdAAAAABAE"});
    const [lunch, updateLunch] = useState({name: "lunch", url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.taste.com.au%2Fhealthy%2Fgalleries%2F30-quick-easy-healthy-working-home-lunch-ideas%2Fqvd66jhj&psig=AOvVaw1wX9AnlI749Qz1yLfSMdXA&ust=1632120061385000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJi4sZi3ivMCFQAAAAAdAAAAABAD"});
    const [dinner, updateDinner] = useState({name: "dinner", url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bbcgoodfood.com%2Frecipes%2Fcollection%2Fhigh-protein-dinner-recipes&psig=AOvVaw1cyAzNk8LQpPdiXj4T_wGL&ust=1632120105444000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPigkLC3ivMCFQAAAAAdAAAAABAD"});

    function handleSubmit(event) {
        const calories = caloriesRef.current.value;
        const diet = dietRef.current.value;
        const exclusions = exclusionsRef.current.value;
        
        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate',
            params: {
                timeFrame: 'day',
                targetCalories: calories,
                diet: diet,
                exclude: exclusions
            },
            headers: {
                'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                'x-rapidapi-key': '3c93d51752mshc30c76c0628ecf3p119e33jsn2214bf98bc1d'
            }
        };
          
        axios.request(options).then(function (response) {
            const data = response.data;
            updateBreakfast({
                name: data.meals[2].title,
                url: `https://spoonacular.com/recipeImages/${data.meals[2].id}-556x370.${data.meals[2].imageType}`
            });
            updateLunch({
                name: data.meals[1].title,
                url: `https://spoonacular.com/recipeImages/${data.meals[1].id}-556x370.${data.meals[1].imageType}`
            });
            updateDinner({
                name: data.meals[0].title,
                url: `https://spoonacular.com/recipeImages/${data.meals[0].id}-556x370.${data.meals[0].imageType}`
            });
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <div className="recipe">
            <h1>Input your Dietary Information</h1>
            <form>
                <input ref={caloriesRef}    type="text" placeholder="Calories"></input>
                <input ref={dietRef}        type="text" placeholder="Diet"></input>
                <input ref={exclusionsRef}  type="text" placeholder="Exclusions"></input>
            </form>
            <button onClick={handleSubmit}>Get Meal Plan</button>
            <div className="breakfast">
                <h6>{breakfast.name}</h6>
                <img className="breakfastFig" src={breakfast.url}></img>
            </div>
            <div className="lunch">
                <h6>{lunch.name}</h6>
                <img className="lunchFig" src={lunch.url}></img>
            </div>
            <div className="dinner">
                <h6>{dinner.name}</h6>
                <img className="dinnerFig" src={dinner.url}></img>
            </div>
        </div>
  );
}

export default Recipe;
