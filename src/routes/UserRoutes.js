const routes = require("express").Router()
const usercontroller = require("../controllers/UserControllers")

routes.post("/users", usercontroller.addUser)
routes.get("/user", usercontroller.getUsers)
routes.delete("/users/:id", usercontroller.deleteUser)
routes.get("/users/:id", usercontroller.getUserById)
routes.post("/signup", usercontroller.signUp)
routes.post("/user/login", usercontroller.loginUser)
routes.post("/user/forgotpassword", usercontroller.forgotPassword)
routes.post("/user/resetpassword", usercontroller.resetpassword)

module.exports = routes