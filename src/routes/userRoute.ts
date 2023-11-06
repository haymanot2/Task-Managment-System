const {Router} =require("express")
const userRoutes =Router()
import { userController } from "../controllers/userController"
userRoutes.get("/",userController.index)
userRoutes.get("/:id",userController.findUniqeUser)
userRoutes.post("/add",userController.createUser)
userRoutes.put("/:id",userController.updateUser)
userRoutes.delete("/:id",userController.deletUser)
export default userRoutes