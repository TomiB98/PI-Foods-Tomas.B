const axios = require('axios')
const { Diet } = require('../db');
const { API_KEY } = process.env


const getDiet = async (req, res) => {
    
    const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const { results } = resAxios.data;
    if (results.length > 0) {
        let response = await results?.map((result) => {
            return {
                diets: result.diets.flat()
            }
        })
        return response
    }
}

const filterDiets = async (req, res) => {

    const allDiets = await getDiet()

    if (allDiets) {
        return res.status(200).json(allDiets)
    }
    else {
        return res.status(500).json({ error: error.message })
    }

}



module.exports = { getDiet, filterDiets }