const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter=require('./controllers/recipesRouter');
const dietsRouter=require('./controllers/dietsRouter');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipesRouter);
router.use('/diets', dietsRouter);
module.exports = router;
