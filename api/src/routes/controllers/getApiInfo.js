const axios = require ('axios');
// const {API_KEY}= process.env;
const API_KEY = '7e6610e2efc146e9ad2bd66e512f97fe';
const getApiInfo = async()=>{
    console.log('APIKEY ', API_KEY)
    try {
        let array=[];    
        for(let i=0; i<100; i++){
            const recipe= await axios.get(`https://api.spoonacular.com/recipes/${i}/information?apiKey=${API_KEY}`);
            array.push(recipe.data); 
            console.log(recipe);
        }
        return array;

    } catch (error) {
        console.log(error);
    }
//     const recipe=await axios.get(`https://api.spoonacular.com/recipes/9/information?apiKey=${API_KEY}`)
//     return recipe.data;
}
module.exports=getApiInfo
