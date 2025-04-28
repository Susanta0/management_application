const {Router}=require("express");
const { userController } = require("../controllers/user_controller");
const routes=Router()

routes.post("/register", userController.userRegister)
routes.post("/login", userController.userLogin)

module.exports= routes