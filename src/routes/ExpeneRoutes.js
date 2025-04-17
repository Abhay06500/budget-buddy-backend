const routes = require('express').Router()
const expenseController = require('../controllers/ExpenseControllers')

routes.post('/addexpense',expenseController.addExpense)
routes.get('/getexpense',expenseController.getExpense)
routes.post('/addwithfile',expenseController.addHordingWithFile)
routes.get('/getexpenseUserId/:userId',expenseController.getAllExpenseByUserId)

module.exports = routes;