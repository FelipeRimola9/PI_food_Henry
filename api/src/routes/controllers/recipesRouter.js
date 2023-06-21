require('dotenv').config();
const { API_KEY }= process.env;
const { Router }= require('express');
const router = Router();
const getApiInfo = require('./getApiInfo');
const axios = require('axios');
const { Recipe, Diet } =  require('../../db');
const validator = require('validator');

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("IDDDDDDDDD: ", id);
        if(id) {
            let deletedRecipe = Recipe.destroy({
                where: { id: id }
            });
            if(deletedRecipe) {
                res.status(200).send(`The recipe with the ID: ${id} was deleted`)
            } else {
                res.status(404).send(`The recipe with the ID: ${id} was not found`)
            }
        } else {
            res.status(404).send("Error on DELETE /recipe; ID was not provided");
        }
    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
})

router.get('/name', async(req, res)=>{
    try {
        const { name } = req.query;
        if (!name){
        return res.status(404).send({
                message:'Error - Cannot search recipes without a name value'
            })
        }
        const ApiInfo=await getApiInfo()
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

        if(filteredRecipesFinal.length === 0) {
            console.log('Route Get /recipes/name?name="..." - ERROR no recipes found with the specified name');
            res.status(200).send([ { error: 'Route Get /recipes/name?name"..." - ERROR no recipes found with the specified name'} ])
        } else {
            res.status(200).send(filteredRecipesFinal);
        }
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
            // Accede a la propiedad 'data' para obtener los datos de la respuesta
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
            return res.status(200).send(newRecipe); 
        }
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
})
router.get('/', async(req,res)=>{
    try {
        console.log("RUTA GET RECIPES ");
        const allRecipes=await getApiInfo();
        console.log("RUTA GET RECIPES ANTES DEL RES", allRecipes.length);
        console.log("CANTIDAD DE RECETAS - ", allRecipes.length);
        return res.status(200).send(allRecipes);
    } catch (error) {
    console.log(error);
    res.status(404).send(error);
    }
})
router.post('/', async(req, res)=>{
try {
    const { name, summary, image, diets, healthScore, steps } = req.body

        
    if (!name||
        !summary ||
        !image ||
        healthScore < 0 ||
        healthScore > 100 ||
        !steps ||
        !diets ) {
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