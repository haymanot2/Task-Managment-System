import  prisma from "../services/prisma"
import { Request, Response } from 'express';
const { validateProjectCreation,validateTaskCreation } = require('../utils/validation');
export const projectController ={
    async listProjects(req:Request,res:Response){
      const { search, filter } = req.query;

      try {
        let projects;
    
        if (search) {
          projects = await prisma.project.findMany({
            where: {
              OR: [
                { name: { contains: search as string, mode: 'insensitive' } },

                { description: { contains: search as string, mode: 'insensitive' } },

              ],
            },
          });
        } else if (filter) {
          const filterOptions: string[] = (filter as string).split(',');

    
          projects = await prisma.project.findMany({
            where: {
              role : { in: filterOptions },
            },
          });
        } else {
          projects = await prisma.project.findMany();
        }
    
        res.json(projects);
      } catch (error) {
        console.error('Error retrieving projects:', error);
        res.status(500).json({ error: 'An error occurred while retrieving projects' });
      }
    },
    async createProject(req: Request, res: Response) {
      const projectData = req.body;
      try {
          const { userId } = req.user;
    
          const validationErrors = validateProjectCreation(projectData.name);
          if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
          }
    
          const project = await prisma.project.create({
            data: {
              name: projectData.name,
              description: projectData.description,
              user: {
                connect: { id: userId }
              }
              
            },
          });
    
          return res.json({ project });
      
      } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'error' });
      }
    },
    async findUniqeProject(req:Request,res:Response){
        const projectId  =req.params.projectId;
        const uniqueProject =await prisma.project.findUnique({
            where:{
                id :projectId, 
                
            }
        })
        return res.json({uniqueProject:uniqueProject})
    },

    async updateProject(req:Request,res:Response){
        const projectId =req.params.projectId;
        const name=req.body.name
        const description=req.body.description
        
        const updateProject =await prisma.project.update({
            data:{
                name:name,
                description:description
               },
                
            where:{
                id :projectId, 
                
            },
        })
        return res.json({updateProject:updateProject})
    },
    async deleteProject(req:Request,res:Response) {
      const projectId = req.params.projectId;
      const {userId,userRole}=req.user;
      try {
        if (req.user.userRole === 'ADMIN') {
          const deletedProject = await prisma.project.delete({
            where: {
              id: projectId,
            },
          });
    
          return res.json({ deletedProject });
        }
        const project = await prisma.project.findUnique({
          where: {
            id: projectId,
          },
          select: {
            userId: true,
          },
        });
    
        if (!project) {
          return res.status(404).json({ error: 'Project not found' });
        }
    
        if (req.user.userRole === 'USER' && req.user.userId === project.userId) {
         
          const deletedProject = await prisma.project.delete({
            where: {
              id: projectId,
            },
          });
    
          return res.json({ deletedProject });
        }
        return res.status(403).json({ error: `Access denied ${userRole}` });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    },

    async listTask(req:Request,res:Response){
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

}