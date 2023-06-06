const getApiInfo = require('./getApiInfo');
const{Recipe, Diet}= require ('../../db');
const findOrCreateDiets =async()=> {
    try {
        const ApiInfo=await getApiInfo();
        const diets=["vegetarian","vegan","glutenFree"];
        ApiInfo.forEach((recipe)=>{
            recipe.diets.forEach((diet)=>{
                if(!diets.includes(diet)){
                    diets.push(diet);
                }
            })
        })
        console.log(diets);
        diets.forEach(async(diet)=>{
            await Diet.findOrCreate({
                where: {
                    name: diet
                }
            });    
        });
        const dbDiets=await Diet.findAll()
        return dbDiets;
    } catch (error) {
        throw Error(error);
    }
}
module.exports = {findOrCreateDiets}