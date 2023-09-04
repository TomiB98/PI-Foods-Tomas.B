const { Router } = require('express');

// Importar todos los routers;
const { recipesRouter } = require('./recipesRouter')
const { dietsRouter } = require('./dietsRouter')
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//All rutes related to recipes
router.use('/recipes', recipesRouter)

//All rutes related to Diets
router.use('/diets', dietsRouter)

module.exports = router;
