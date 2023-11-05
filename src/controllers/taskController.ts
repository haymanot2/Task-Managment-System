import  prisma from "../services/prisma"

export const taskController ={
    async index(req:Request,res:Response){
        const tasks =await prisma.task.findMany()
        return res.json(tasks)
    },
    async createTask(req:Request,res:Response){
        const taskData =req.body;
        const task =await prisma.task.create({
            data:{
                title      :taskData.title , 
                description:taskData.description,
                dueDate    :taskData.dueDate
            }
        })
        return res.json({task:task})
    },
    async findUniqeTask(req:Request,res:Response){
        const taskId =req.params.id;
        const uniqueTask =await prisma.user.findUnique({
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
       
        
        const updateUser =await prisma.user.update({
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
        const deletTask =await prisma.user.delete({      
            where:{
                id :taskId, 
            },
        })
        return res.json({deletTask:deletTask})
    }

}