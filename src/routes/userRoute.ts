const {Router} =require("express")
const userRoutes =Router()
import { userController } from "../controllers/userController"
userRoutes.post("/register",userController.createUser)
userRoutes.post("/login",userController.loginUser)
userRoutes.get("/profile/:id",userController.getUserProfile)
export default userRoutes