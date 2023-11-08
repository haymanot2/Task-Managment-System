import { Router } from "express";
import { projectController } from "../controllers/projectController";
const  authenticateToken =require( "../middleware/authenticateToken ")
const projectRoutes = Router();
projectRoutes.use(authenticateToken)
projectRoutes.get("/", projectController.listProjects);
projectRoutes.post( "/",projectController.createProject);
projectRoutes.get("/:projectId", projectController.findUniqeProject);
projectRoutes.put("/:projectId", projectController.updateProject);
projectRoutes.delete("/:projectId",  projectController.deleteProject);
projectRoutes.get("/:projectId/tasks", projectController.listTask);
projectRoutes.post("/:projectId/tasks", projectController.createTask);
projectRoutes.post("/:projectId/tasks/:userId", projectController.assignTask);
projectRoutes.delete("/:projectId/tasks/:userId", projectController.deleteAssignTask);
export default projectRoutes;