const {Router} =require("express")
const routes =Router()
import { userController } from "../controllers/userController"
routes.get("/",userController.index)
routes.get("/:id",userController.findUniqeUser)
routes.post("/add",userController.createUser)
routes.put("/:id",userController.updateUser)
routes.delete("/:id",userController.deletUser)
export default routes