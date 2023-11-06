import  prisma from "../services/prisma"
import { Request, Response } from 'express';
const { validateUserRegistration } = require('../utils/validation');

export const userController ={
    async index(req:Request,res:Response){
        const users =await prisma.user.findMany()
        return res.json(users)
    },
    async createUser(req:Request,res:Response) {
  const userData = req.body;

  
  const validationErrors = validateUserRegistration(userData.username, userData.email);


  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }


  try {
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
    });
    return res.json({ user });
  } catch (error) {

    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
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