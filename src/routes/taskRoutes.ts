import { Router } from "express";
import { taskController } from "../controllers/taskController";
import { isAdmin, isOwner } from "../middleware/authMiddleware"; 
import {authenticateToken} from "../middleware/authenticateToken "
const taskRoutes = Router();
taskRoutes.use(authenticateToken)
taskRoutes.get("/", taskController.index);
taskRoutes.get("/:id", taskController.findUniqeTask);
taskRoutes.post("/create", taskController.createTask);
taskRoutes.put("/:id", taskController.updateTask);
taskRoutes.delete("/:id", isAdmin, isOwner, taskController.deleteTask);

export default taskRoutes;