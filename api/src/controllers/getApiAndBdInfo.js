const axios = require('axios')
const { API_KEY } = process.env;
const { Recipe, Diet } = require('../db');

// Brings the info from the api
const getApiInfo = async () => {
    try {
        const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`);
        //const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const { results } = resAxios.data;

        if (results.length > 0) {
            let response = await results?.map((result) => {
                return {
                    name: result.title,
                    vegetarian: result.vegetarian,
                    vegan: result.vegan,
                    glutenFree: result.glutenFree,
                    dairyFree: result.dairyFree,
                    image: result.image,
                    idApi: result.id,
                    healthScore: result.healthScore,
                    summary: result.summary.replace(/(&nbsp;|<([^>]+)>)/ig, ""),
                    steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps ? result.analyzedInstructions[0].steps.map(item => item.step).join(" \n") : '')
                }
            })

            return response;
        }

    } catch (error) {
        console.error(error);
        return ([])
    }
}

//Brings the info from the DB
const getDBInfo = async () => {
    try {
        const dataDB = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        let response = await dataDB?.map(recipe => {
            return {
                idApi: recipe.idApi,
                name: recipe.name,
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                image: recipe.image,
                vegetarian: recipe.vegetarian,
                vegan: recipe.vegan,
                glutenFree: recipe.glutenFree,
                dairyFree: recipe.dairyFree,
                steps: recipe.steps.toString(),
            }
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

//Gathers the info of the api and DB
const getAllInfo = async () => {
    try {
        const apiInfo = await getApiInfo();
        const bdInfo = await getDBInfo();
        const infoTotal = apiInfo.concat(bdInfo);
        return infoTotal;
    } catch (error) {
        console.error(error);
    }
}

//Search the in api by name
const getApiByName = async (name) => {

    try {
        const responseAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=10&apiKey=${API_KEY}`);
        const { results } = responseAxios.data;
        if (results.length > 0) {
            let response = results?.map((result) => {
                return {
                    name: result.title,
                    vegetarian: result.vegetarian,
                    vegan: result.vegan,
                    glutenFree: result.glutenFree,
                    dairyFree: result.dairyFree,
                    image: result.image,
                    idApi: result.id,
                    healthScore: result.healthScore,
                    summary: result.summary.replace(/(&nbsp;|<([^>]+)>)/ig, ""), //(/<\/?[^>]+(>|$)/g, "")
                    steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps ? result.analyzedInstructions[0].steps.map(item => item.step).join(" # ") : '') //(" \n")
                }
            })
            return response
        }

        else {
            console.log("NO hay coincidencia en la API");
            return ('error');
        }

    } catch (error) {
        console.error(error);
        return ('error')
    }
}

//Search in the DB by name
const getDbByName = async (name) => {
    try {
        const DBInfo = await getDBInfo();
        const filtByName = DBInfo.filter(recipe => recipe.name.includes(name));

        return filtByName;
    } catch (error) {
        return ('error')
    }
}

//Gathers the info searched by name of the api and DB
const getInfoByName = async (name) => {
    try {
        const apiByName = await getApiByName(name)
        const DBByName = await getDbByName(name)
        const infoTotal = apiByName.concat(DBByName)
        return infoTotal
    } catch (error) {
        return ('error')
    }
}

module.exports = { getApiInfo, getDBInfo, getAllInfo, getApiByName, getDbByName, getInfoByName }