const { Router } = require('express')
const dietsRouter = Router()
const { filterDiets, getDiet } = require('../controllers/getDiet')

//Rute to filter the diets
dietsRouter.get('/', filterDiets)

module.exports = { dietsRouter }