const { Router } = require('express')
const recipesRouter = Router()
const { getRecipesDetail } = require('../controllers/getRecipesById')
const { getRecipesByName } = require('../controllers/getRecipeByName')
const { PostRecipes } = require('../controllers/postRecipe')

//Route to get the info of a specific recipe for the detail
recipesRouter.get('/:id', getRecipesDetail)

//Route to get the all the info or filtered by name
recipesRouter.get('/', getRecipesByName)

//Route to create a new recipe
recipesRouter.post('/', PostRecipes)

module.exports = { recipesRouter }