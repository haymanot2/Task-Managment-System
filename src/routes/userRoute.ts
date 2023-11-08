const {Router} =require("express")
const userRoutes =Router()
const  authenticateToken =require( "../middleware/authenticateToken ")
import { userController } from "../controllers/userController"
userRoutes.post("/register",userController.createUser)
userRoutes.post("/login",userController.loginUser)
userRoutes.get("/profile/:id",authenticateToken,userController.getUserProfile)
export default userRoutes