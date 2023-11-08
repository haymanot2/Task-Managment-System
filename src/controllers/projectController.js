const  prisma =require ("../services/prisma");
const { validateProjectCreation,validateTaskCreation } = require('../utils/validation');
 const projectController ={
    async listProjects(req,res){
      const { search, filter } = req.query;
      try {
        let projects;
        if (search) {
          projects = await prisma.project.findMany({
            where: {
              OR: [
                { name: { contains: search , mode: 'insensitive' } },
                { description: { contains: search , mode: 'insensitive' } },
              ],
            },
          });
        } else if (filter) {
          const filterOptions = (filter ).split(',');
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
    async createProject(req, res) {
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
    async findUniqeProject(req,res){
        const projectId  =req.params.projectId;
        const uniqueProject =await prisma.project.findUnique({
            where:{
                id :projectId, 
                
            }
        })
        return res.json({uniqueProject:uniqueProject})
    },

    async updateProject(req,res){
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
    async deleteProject(req,res) {
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

    async listTask(req, res) {
      const { search, filter } = req.query;
      const projectId = req.params.projectId;
    
      try {
        let tasks;
    
        if (search) {
          tasks = await prisma.task.findMany({
            where: {
              project: { id: projectId },
              OR: [
                { title: { contains: search , mode: 'insensitive' } },
                { description: { contains: search , mode: 'insensitive' } },
              ],
            },
          });
        } else if (filter) {
          const filterOptions = (filte).split(',');
    
          tasks = await prisma.task.findMany({
            where: {
              project: { id: projectId }, 
              completed: { in: filterOptions },
            },
          });
        } else {
          tasks = await prisma.task.findMany({
            where: {
              project: { id: projectId },
            },
          });
        }
    
        res.json(tasks);
      } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ error: 'An error occurred while retrieving tasks' });
      }
    },
    async createTask(req, res) {
      const taskData = req.body;
      const {userId}=req.user;
      const validationErrors = validateTaskCreation(taskData.title);
      
      if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }
      
      try {
        const projectId = req.params.projectId;
        const task = await prisma.task.create({
          data: {
            title: taskData.title,
            description: taskData.description,
            dueDate: taskData.dueDate,
            project: { connect: { id: projectId } } ,
            user: { connect: { id: userId } }

          },
        });
    
        return res.json({ task });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    },
      async assignTask(req, res){
        const { projectId, taskId } = req.params;
         const { assignedUserId } = req.body;
         try {
          const authenticatedUserId = req.user.id; 
          const project = await prisma.projects.findFirst({
            where: {
              id: projectId,
              users: {
                some: {
                  id: authenticatedUserId,
                },
              },
            },
          });
      
          if (!project) {
            return res.status(403).json({ error: 'You are not a member of this project.' });
          }
          const task = await prisma.tasks.findFirst({
            where: {
              id: taskId,
              projectId: projectId,
            },
          });
      
          if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
          }
          const assignedUser = await prisma.users.findFirst({
            where: {
              id: assignedUserId,
              projects: {
                some: {
                  id: projectId,
                },
              },
            },
          });
      
          if (!assignedUser) {
            return res.status(404).json({ error: 'Assigned user not found or is not a member of the project.' });
          }
          
          const updatedTask = await prisma.tasks.update({
            where: {
              id: taskId,
            },
            data: {
              assigned_to: assignedUserId,
            },
          });
      
          res.json({ message: 'Task assigned successfully.', task: updatedTask });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while assigning the task.' });
        }
      },


      async deleteAssignTask(req,res) {
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








}

module.exports = projectController;
