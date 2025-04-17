const routes = require('express').Router();
const areaController = require('../controllers/AreaControllers');

routes.post('/add', areaController.addArea);
routes.get('/', areaController.getAreas);
module.exports = routes;