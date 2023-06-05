const {Router}= require('express');
const router=Router();
const getApiInfo=require('./getApiInfo');
const axios=require('axios');
const API_KEY = '9f9b9dbd1a804ddabea15e6db712a786';

router.get('/:id',async(req,res)=>{
    try {
        const {id}=req.body;
        console.log(id, 'ID');
        const recipeById=await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        return res.status(200).send(recipeById.data);
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
module.exports=router;