require('dotenv').config();
const fs = require('fs');
const axios = require ('axios');
const { API_KEY }= process.env;
const { Recipe, Diet } = require("../../db")

const getApiInfo = async()=>{
    try {
        let arrayPromises=[];    
        for(let i=1; i<115; i++){
            const recipe= axios.get(`https://api.spoonacular.com/recipes/${i}/information?apiKey=${API_KEY}`).then(res => res.data, err => err.mensage);
            arrayPromises.push(recipe); 
        }
        const arrayResult = await Promise.all(arrayPromises).then(res => res);

        const newArray = arrayResult.map((recipe) => {
            let newSteps = recipe?.analyzedInstructions[0]?.steps?.map((step)=>step.step);
            return recipe?{
                id: recipe.id,
                name: recipe.title,
                summary: recipe.summary,
                image: recipe.image,
                diets: recipe.diets,
                healthScore: recipe.healthScore,
                steps: newSteps,
            }:null;
        })
        let arrayFinal = newArray.filter((recipe)=>recipe?true:false);
        const recipesDb = await Recipe.findAll({include: Diet});
        const finalResponse = arrayFinal.concat(recipesDb);
        
        return finalResponse;
    } catch (error) {
        console.log('Error Function GetApiInfo');
        console.log(error);
    }
}

module.exports=getApiInfo
