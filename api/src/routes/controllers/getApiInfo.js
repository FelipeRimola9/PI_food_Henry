const axios = require ('axios');
// const {API_KEY}= process.env;
const API_KEY = 'ca4d5e6906b74b61aa36be974860107b';
const { Recipe, Diet } = require("../../db")
const getApiInfo = async()=>{

    try {
        let arrayPromises=[];    
        for(let i=1; i<10; i++){
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
        let arrayFinal=newArray.filter((recipe)=>recipe?true:false);
        const recipesDb = await Recipe.findAll({include: Diet});
        const finalResponse = arrayFinal.concat(recipesDb);
        // console.log("FINAL RESPONSE - GET API INFO: ", finalResponse);
        
        return finalResponse;
    } catch (error) {
        console.log('Error Funcion GetApiInfo');
        console.log(error);
    }
}
module.exports=getApiInfo
