import  prisma from "../services/prisma"

export const projectController ={
    async index(req:Request,res:Response){
        const projects =await prisma.project.findMany()
        return res.json(projects)
    },
    async createProject(req:Request,res:Response){
        const projectData =req.body;
        const project =await prisma.project.create({
                  
            data:{
                name        :projectData.name   , 
                description :projectData.description 
               
            }
        })
        return res.json({project:project})
    },
    async findUniqeProject(req:Request,res:Response){
        const projectId  =req.params.id;
        const uniqueProject =await prisma.project.findUnique({
            where:{
                id :projectId, 
                
            }
        })
        return res.json({uniqueProject:uniqueProject})
    },

    async updateProject(req:Request,res:Response){
        const projectId =req.params.id;
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
    async deleteProject(req:Request,res:Response){
        const projectId =req.params.id;
        const deleteProject =await prisma.project.delete({      
            where:{
                id :projectId, 
            },
        })
        return res.json({deleteProject:deleteProject})
    }

}