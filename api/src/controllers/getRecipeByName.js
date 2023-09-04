const axios = require('axios')
const { getInfoByName, getAllInfo } = require('./getApiAndBdInfo')

//Manages the info of the recipes, if recives a name search by name, else returns all the recipes
const getRecipesByName = async (req, res) => {

    const { name } = req.query

    if (name) {
        const infoByName = await getInfoByName(name);
        if (infoByName) {
            console.log("Se encontro coincidencia con name")
            infoByName.length > 0 ? res.json(infoByName) : res.status(400).json([{ name: 'not found any recipes' }]);
        } else {
            //console.log("Error")
            res.status(404).json([{ name: 'Error' }])
        }

    } else {
        // para no confundir a home, si no hay un nombre muestra todo
        const allData = await getAllInfo()
        //console.log(allData)
        if (allData !== 'error') {
            res.json(allData);
        } else {
            res.status(404).json({ message: 'Error en la búsqueda de datos' })
        }
    }
}

module.exports = { getRecipesByName }