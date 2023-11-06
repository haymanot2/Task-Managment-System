import { Router } from "express";
import { projectController } from "../controllers/projectController";
import { isAdmin, isOwner } from "../middleware/authMiddleware"; 
import {authenticateToken} from "../middleware/authenticateToken "

const projectRoutes = Router();
projectRoutes.use(authenticateToken)
projectRoutes.get("/", projectController.index);
projectRoutes.get("/:id", projectController.findUniqeProject);
projectRoutes.post("/create", projectController.createProject);
projectRoutes.put("/:id", projectController.updateProject);
projectRoutes.delete("/:id", isAdmin, isOwner, projectController.deleteProject);

export default projectRoutes;