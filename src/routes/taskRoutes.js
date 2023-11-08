const { Router } =require("express");
const   taskController  =require ("../controllers/taskController");
const  authenticateToken =require( "../middleware/authenticateToken ")
const taskRoutes = Router();
taskRoutes.get("/:taskId", taskController.findUniqeTask);
taskRoutes.put("/:taskId", taskController.updateTask);
taskRoutes.delete("/:taskId",authenticateToken, taskController.deleteTask);
taskRoutes.post("/:taskId/attachments",authenticateToken, taskController.createAttachments );
taskRoutes.get("/:taskId/attachments/:attachmentId",authenticateToken, taskController.findAttachments );
taskRoutes.delete("/:taskId/attachments/:attachmentId",authenticateToken, taskController.deleteAttachments);

module.exports = taskRoutes;