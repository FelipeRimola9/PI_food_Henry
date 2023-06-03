const {Router}= require('express');
const router=Router();
const getApiInfo=require('./getApiInfo');

router.get('/', async(req,res)=>{
    try {
        const allRecipes=await getApiInfo();
        console.log('ALLRECIPES' ,allRecipes);
        if(allRecipes.length!==0){
            return res.status(200).send(allRecipes);
        } else{
            return res.status(404).send('Recipes not found');}
    } catch (error) {
    console.log(error);
    res.status(404).send(error);
    }
})

module.exports=router;