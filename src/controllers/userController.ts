import  prisma from "../services/prisma"

export const userController ={
    async index(req:Request,res:Response){
        const users =await prisma.user.findMany()
        return res.json(users)
    },
    async createUser(req:Request,res:Response){
        const userData =req.body;
        const user =await prisma.user.create({
            data:{
                username :userData.username, 
                email   :userData.email,  
                password  :userData.password
            }
        })
        return res.json({user:user})
    },
    async findUniqeUser(req: Request, res: Response) {
        const userId = req.params.id;
        const uniqueUser = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
        return res.json({ uniqueUser: uniqueUser });
      },

    async updateUser(req:Request,res:Response){
        const userId = req.params.id;
        const password=req.body.password
        
        const updateUser =await prisma.user.update({
            data:{
                password:password
               },
                
            where:{
                id :userId, 
                
            },
        })
        return res.json({updateUser:updateUser})
    },
    async deletUser(req:Request,res:Response){
        const userId = req.params.id;
        const deletUser =await prisma.user.delete({      
            where:{
                id :userId, 
            },
        })
        return res.json({deletUser:deletUser})
    }

}