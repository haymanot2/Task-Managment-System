import { Router } from "express";
import { taskController } from "../controllers/taskController";

const taskRoutes = Router();
taskRoutes.get("/:taskId", taskController.findUniqeTask);
taskRoutes.put("/:taskId", taskController.updateTask);
taskRoutes.delete("/:taskId", taskController.deleteTask);
taskRoutes.post("/:taskId/attachments", taskController.createAttachments );
taskRoutes.get("/:taskId/attachments", taskController.findAttachments );
taskRoutes.get("/:taskId/attachments/:attachmentId", taskController.deleteAttachments);

export default taskRoutes;