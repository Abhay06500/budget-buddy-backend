
const routes = require('express').Router();
const transactionControllers = require("../controllers/TransactionControllers");

routes.post('/addtransaction', transactionControllers.addtransaction);
routes.get('/gettransaction', transactionControllers.gettransaction)
routes.get('/gettransactionbyuserid/:userId', transactionControllers.getAlltransactionByUserId)
routes.post('/addtransactionwithfile', transactionControllers.addTransactionWithFile)
routes.put("/updatetransaction/:id", transactionControllers.updateTransaction)

module.exports = routes;