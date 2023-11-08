const {Router} =require("express")
const userRoutes =Router()
const  authenticateToken =require( "../middleware/authenticateToken ")
const  userController  =require ("../controllers/userController")
userRoutes.post("/register",userController.createUser)
userRoutes.post("/login",userController.loginUser)
userRoutes.get("/profile/:id",authenticateToken,userController.getUserProfile)
module.exports = userRoutes;