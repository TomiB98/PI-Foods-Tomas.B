const { Router } = require('express')
const recipesRouter = Router()
const { getRecipesDetail } = require('../controllers/getRecipesById')
const { getRecipesByName } = require('../controllers/getRecipeByName')
const { PostRecipes } = require('../controllers/postRecipe')


recipesRouter.get('/:id', getRecipesDetail)

recipesRouter.get('/', getRecipesByName)

recipesRouter.post('/', PostRecipes)

module.exports = { recipesRouter }