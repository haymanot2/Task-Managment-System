const {Router} =require("express")
const taskRoutes =Router()
import { taskController } from "../controllers/taskController"
taskRoutes.get("/",taskController.index)
taskRoutes.get("/:id",taskController.findUniqeTask)
taskRoutes.post("/create",taskController.createTask)
taskRoutes.put("/:id",taskController.updateTask)
taskRoutes.delete("/:id",taskController.deleteTask)
export default taskRoutes