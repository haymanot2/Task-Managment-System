const {Router} =require("express")
const projectRoutes =Router()
import { projectController } from "../controllers/projectController"
projectRoutes.get("/",projectController.index)
projectRoutes.get("/:id",projectController.findUniqeProject)
projectRoutes.post("/create",projectController.createProject)
projectRoutes.put("/:id",projectController.updateProject)
projectRoutes.delete("/:id",projectController.deleteProject)
export default projectRoutes