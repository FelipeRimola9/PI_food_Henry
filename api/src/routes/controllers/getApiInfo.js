const axios = require ('axios');
// const {API_KEY}= process.env;
const API_KEY = '9f9b9dbd1a804ddabea15e6db712a786';
const getApiInfo = async()=>{
    // console.log('APIKEY ', API_KEY)
    try {
        let arrayPromises=[];    
        for(let i=1; i<10; i++){
            const recipe= axios.get(`https://api.spoonacular.com/recipes/${i}/information?apiKey=${API_KEY}`).then(res => res.data, err => err.mensage);
            arrayPromises.push(recipe); 
            // console.log(recipe);
        }
        const arrayResult = await Promise.all(arrayPromises).then(res => res);
        // console.log(arrayResult);
        // console.log('Cantidad de recetas: ', arrayResult.length);
        const arrayFinal = arrayResult.map((recipe) => {
            let newSteps = recipe?.analyzedInstructions[0]?.steps?.map((step)=>step.step);
            // console.log(recipe);
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
        let arrayFilter=arrayFinal.filter((recipe)=>recipe?true:false);
        return arrayFilter;
    } catch (error) {
        console.log('Error Funcion GetApiInfo');
        console.log(error);
    }
}
module.exports=getApiInfo
