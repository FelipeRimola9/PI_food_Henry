const {Router}= require('express');
const router=Router();
const getApiInfo=require('./getApiInfo');
const axios=require('axios');
const API_KEY = '9f9b9dbd1a804ddabea15e6db712a786';
const {Recipe, Diet}=require('../../db');
const validator=require('validator');

router.get('/name', async(req, res)=>{
    try {
        const {name}=req.query;
        if (!name){
        return res.status(404).send({
                message:'Missing info'
            })
        }
        const ApiInfo=await getApiInfo()
        console.log('TERMINE DE EJECUTAR GET API INFO')
        const filteredRecipes=ApiInfo.filter((recipe)=>{
        if (recipe.name.toLowerCase().includes(name.toLowerCase())){
            return true;
        }
        else {
            return false;
        }
        });
        const dbRecipes=await Recipe.findAll();
        const filteredRecipesDb=dbRecipes.filter((recipe)=>{
            if (recipe.name.toLowerCase().includes(name.toLowerCase())){
                return true;
            }
            else {
                return false;
            }
            });
        const filteredRecipesFinal=filteredRecipes.concat(filteredRecipesDb);
        res.status(200).send(filteredRecipesFinal);
    } catch (error) {
        console.log(error)
        res.status(404).send(error);
    }
})
router.get('/:id',async(req,res)=>{
    try {
        const { id } = req.params;
        console.log(id, 'ID');
        if (validator.isUUID(id)){
            const dbRecipes=await Recipe.findByPk(id, {
                include:Diet
            })
            console.log('ruta id: CASO true')
            return res.status(200).send(dbRecipes);
        } else {
            console.log('ruta id: CASO FALSE')
            const recipeById = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
            // console.log('RECIPE ID ', recipeById.data); // Accede a la propiedad 'data' para obtener los datos de la respuesta
            let newSteps;
            if (recipeById.data.analyzedInstructions.length) {
                newSteps = recipeById.data.analyzedInstructions[0]?.steps?.map((step) => step.step);
            }
            const newRecipe = {
                id: recipeById.data.id,
                name: recipeById.data.title,
                summary: recipeById.data.summary,
                image: recipeById.data.image,
                diets: recipeById.data.diets,
                healthScore: recipeById.data.healthScore,
                steps: newSteps,
            };
            return res.status(200).send(newRecipe); // Envía la variable 'newRecipe' en lugar de 'recipeById.data'
        }
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
})
router.get('/', async(req,res)=>{
    try {
        const allRecipes=await getApiInfo();
        // console.log(getApiInfo);
        // console.log('ALLRECIPES' ,allRecipes);
        // if(allRecipes.length!==0){
            return res.status(200).send(allRecipes);
        // } else{
        //     return res.status(404).send('Recipes not found');}
    } catch (error) {
    console.log(error);
    res.status(404).send(error);
    }
})
router.post('/', async(req, res)=>{
try {
    const{
        name, summary, image, diets, healthScore, steps
    }=req.body;
    if(!name||!summary||!image||!healthScore||!steps||!diets){
    return res.status(400).send('Missing info');
    }
    let newRecipe=await Recipe.create({
        name, summary, image, healthScore, steps
    })
    const dietsToAdd=await Diet.findAll({
        where:{
        name:diets
}
});
newRecipe.addDiet(dietsToAdd);
    // diets.forEach(async(diet)=>{
    //    await newRecipe.addDiet(diet);
    // });
    res.status(200).send(newRecipe);
} catch (error) {
    console.log(error)
    res.status(404).send(error);
}
});
module.exports=router;