import  prisma from "../services/prisma"
import upload  from "../middleware/attach"
import { Request, Response } from 'express';
const { validateTaskCreation } = require('../utils/validation');
export const taskController ={
    async findUniqeTask(req:Request,res:Response){
        const taskId =req.params.taskId;
        const uniqueTask =await prisma.task.findUnique({
            where:{
                id :taskId,   
            }
        })
        return res.json({uniqueTask:uniqueTask})
    },

    async updateTask(req:Request,res:Response){
        const taskId =req.params.taskId;
        const title=req.body.title
        const description=req.body.description
        const dueDate=req.body.dueDate
        const completed=req.body.completed
        const updateTask =await prisma.task.update({
            data:{
                title:title,
                description:description,
                dueDate:dueDate,
                completed:completed
               },
            where:{
                id :taskId,   
            },
        })
        return res.json({updateTask:updateTask})
    },
    async deleteTask(req: Request, res: Response) {
      const taskId = req.params.taskId;
      const { userId, userRole } = req.user;
    
      try {
        const task = await prisma.task.findUnique({
          where: {
            id: taskId,
          },
        });
    
        if (!task) {
          return res.status(404).json({ error: 'Task not found' });
        }
    
        if (userRole === 'ADMIN' || (userRole === 'USER' && userId === task.userId)) {
          const deletedTask = await prisma.task.delete({
            where: {
              id: taskId,
            },
          });
    
          return res.json({ deletedTask });
        }
    
        return res.status(403).json({ error: `Access denied for role: ${userRole}` });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    },
    async createAttachments(req:Request,res:Response) {
      try {
        const task = await prisma.task.findUnique({
          where: { id: req.params.taskId },
        });
        if (!task) {
          return res.status(404).json({ message: 'Task not found' });
        }
        upload(req, res, async (error) => {
          if (error) {
            console.error(error);
            return res.status(400).json({ message: 'File upload failed' });
          }
          if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
          }
          const attachment = await prisma.attachment.create({
            data: {
              fileName: req.file.originalname,
              filePath: req.file.path,
              taskId: task.id,
            },
          });
    
          return res.status(201).json({ attachment });
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    },


    async findAttachments(req:Request,res:Response){
      try {
        const attachment = await prisma.attachment.findUnique({
          where: {
            id: req.params.attachmentId,
          },
        });
        if (!attachment) {
          return res.status(404).json({ message: 'Attachment not found' });
        }
        return res.status(200).json({ attachment });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      } },


    async deleteAttachments(req:Request,res:Response){
      try {
        const attachment = await prisma.attachment.findUnique({
          where: {
            id: req.params.attachmentId,
            taskId: req.params.taskId,
          },
        });
        if (!attachment) {
          return res.status(404).json({ message: 'Attachment not found' });
        }
        await prisma.attachment.delete({
          where: {
            id: attachment.id,
          },
        });
        return res.status(204).json({message: 'methe Uploaded file deleted'});
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }

  }


  
}




