import  prisma from "../services/prisma"
import {attachment } from "../middleware/attach"

import { Request, Response } from 'express';
const { validateTaskCreation } = require('../utils/validation');
export const taskController ={
    async index(req:Request,res:Response){
      const { search, filter } = req.query;

      try {
        let tasks;
  
        if (search) {
          tasks = await prisma.task.findMany({
            where: {
              OR: [
                { title: { contains: search as string, mode: 'insensitive' } },
                { description: { contains: search as string, mode: 'insensitive' } },
              ],
            },
          });
        } else if (filter) {
          const filterOptions: string[] = (filter as string).split(',');
  
          tasks = await prisma.task.findMany({
            where: {
              completed: { in: filterOptions },
            },
          });
        } else {
          tasks = await prisma.task.findMany();
        }
  
        res.json(tasks);
      } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ error: 'An error occurred while retrieving tasks' });
      }
    },
    async createTask(req: Request, res: Response){
        const taskData = req.body;
      
      
        const validationErrors = validateTaskCreation(taskData.title);
      
       
        if (validationErrors.length > 0) {
          return res.status(400).json({ errors: validationErrors });
        }
      
      
        try {
          const task = await prisma.task.create({
            data: {
              title: taskData.title,
              description: taskData.description,
              dueDate: taskData.dueDate,
              project:taskData.project
            },
          });
          return res.json({ task });
        } catch (error) {
        
          console.error(error);
          return res.status(500).json({ error: 'Internal server error' });
        }
      },
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
    async deleteTask(req:Request,res:Response){
        const taskId =req.params.taskId;
        const deletTask =await prisma.task.delete({      
            where:{
                id :taskId, 
            },
        })
        return res.json({deletTask:deletTask})
    },


    async createAttachments(req: Request, res: Response){
      try {
        const task = await prisma.task.findUnique({
          where: { id: req.params.taskId },
        });
        if (!task) {
          return res.status(404).json({ message: 'Task not found' });
        }
    
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }
    
        const attachment = new Attachment({
          filename: req.file.originalname,
          filePath: req.file.filePath,
          taskId: task.taskId
        });
    
        await attachment.save();
    
        return res.status(201).json({ attachment });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    },

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
    
        return res.status(204).end();
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
    }
},




}