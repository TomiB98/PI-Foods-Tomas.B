const { Router } = require('express')
const dietsRouter = Router()
const { filterDiets, getDiet } = require('../controllers/getDiet')

dietsRouter.get('/', filterDiets)

module.exports = { dietsRouter }