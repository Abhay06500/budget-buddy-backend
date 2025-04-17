const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
//express object..

const app = express()
app.use(cors())
app.use(express.json()) //to acceot data as json

//import role routes

const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)

const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state", stateRoutes)
//http://localhost:3000/addState
//http://localhost:3000/state/addState

const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city", cityRoutes)
//http://localhost:3000/city/addCity

const areaRoutes = require("./src/routes/AreaRoutes")
app.use("/area", areaRoutes) 
//http://localhost:3000/area/add

const budgetRoutes = require("./src/routes/BudgetRoutes")
app.use("/budget",budgetRoutes)

const categoryRoutes = require("./src/routes/CategoryRoutes")
app.use("/category",categoryRoutes)//http://localhost:3000/category/addcategory

const expenseRoutes = require("./src/routes/ExpeneRoutes")
app.use("/expense",expenseRoutes)

const incomeRoutes = require("./src/routes/IncomeRoutes")
app.use("/income", incomeRoutes)

const TransactionRoutes = require("./src/routes/TransactionRoutes")
app.use("/transaction", TransactionRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(() => {
    console.log("database connected...");
}).catch(() => {
    console.log("Error in database connected..");

})

//server creation...

const PORT = 3000
app.listen(PORT, () => {
    console.log("server started on port number", PORT);
})