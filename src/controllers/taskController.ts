import  prisma from "../services/prisma"
import { Request, Response } from 'express';
const { validateTaskCreation } = require('../utils/validation');
export const taskController ={
    async index(req:Request,res:Response){
        const tasks =await prisma.task.findMany()
        return res.json(tasks)
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
        const taskId =req.params.id;
        const uniqueTask =await prisma.task.findUnique({
            where:{
                id :taskId, 
                
            }
        })
        return res.json({uniqueTask:uniqueTask})
    },

    async updateTask(req:Request,res:Response){
        const taskId =req.params.id;
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
        const taskId =req.params.id;
        const deletTask =await prisma.task.delete({      
            where:{
                id :taskId, 
            },
        })
        return res.json({deletTask:deletTask})
    }

}