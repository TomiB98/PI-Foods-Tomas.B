const { Recipe } = require('../db')

const PostRecipes = async (req, res) => {

    try {
        const {  name, image, summary, healthScore, steps } = req.body
        const recipe = {
            name,
            image,
            summary,
            healthScore,
            steps: [steps]
        }
        const createRecipe = await Recipe.create(recipe);
        
        if(createRecipe) return res.status(200).json(createRecipe)
    } catch (error) {
        return res.status(404).json(error.message)
    }
}

module.exports = { PostRecipes }