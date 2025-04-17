const routes = require('express').Router();
const cityController = require('../controllers/CityControllers');
routes.post("/addcity",cityController.addCity);
routes.get("/getallcities",cityController.getAllCities)

module.exports = routes;