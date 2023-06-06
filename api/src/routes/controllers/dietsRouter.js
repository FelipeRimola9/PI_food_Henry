const {Router}= require('express');
const router=Router();
const {Diet}=require('../../db');
router.get('/', async(req, res)=>{
    try {
        const allDiets=await Diet.findAll();
        if (allDiets.length===0){
            res.status(404).send({msg:'Diets not found'});
        } else{
            res.status(200).send(allDiets);
        }
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
})
module.exports=router