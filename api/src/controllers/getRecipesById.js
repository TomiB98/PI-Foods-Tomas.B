const axios = require('axios')
const { API_KEY } = process.env
const { Recipe, Diet } = require('../db')

//Returns information for the detail of a specific recipe if the id isn't a number searches in the DB, else in the api
const getRecipesDetail = async (req, res) => {

    const { id } = req.params;

    if (isNaN(id) === true) {
        //console.log(id)
        try {
            const dataDB = await Recipe.findByPk(id,{
                include: {
                model: Diet,
                atributes: ["name"],
                through: {
                    attributes: [],
                    },
                },
            });
            if(dataDB){
            const obj = {
                id: dataDB.id,
                name: dataDB.name,
                summary: dataDB.summary,
                score: dataDB.score,
                healthScore: dataDB.healthScore,
                image: dataDB.image,
                steps: dataDB.steps,
                diets: dataDB.diets?.map(diet => diet.name)
            }
                res.json(obj)
            }
            
        } catch (error) {
            return { error: error.message };
        };

    }

    else {
        try {
            //const { id } = req.params;
            //const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
            const { data } = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=b37c7785d7b2442581cfe4544c7b9611`)
            //const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
            let recipe = {
                id: data.id,
                name: data.title,
                image: data.image,
                summary: data.summary.replace(/(&nbsp;|<([^>]+)>)/ig, ""),
                healthScore: data.healthScore,
                vegetarian: data.vegetarian,
                vegan: data.vegan,
                glutenFree: data.glutenFree,
                dairyFree: data.dairyFree,
                steps: (data.analyzedInstructions[0] && data.analyzedInstructions[0].steps ? data.analyzedInstructions[0].steps.map(item => item.step).join(" \n") : '')
            }

            return recipe.name ? res.status(200).json(recipe) : res.status(404).send('Not found!')


        } catch (error) {
            res.status(500).send(error.message)
        }
    }
};

module.exports = { getRecipesDetail }