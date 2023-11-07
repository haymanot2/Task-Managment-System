import  prisma from "../services/prisma"
import { Request, Response } from 'express';
const { validateUserRegistration } = require('../utils/validation');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
export const userController ={
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
 
async loginUser(req:Request,res:Response) {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, userRole: user.role }, 
      jwtSecret
    );

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
},

    async getUserProfile(req:Request,res:Response) {
      try {
        const userId = req.params.id;
        const user = await prisma.user.findique({
          where: { id: userId },
          include: {
            projects: {
              include: { tasks: true },
            },
          },
        });
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        return res.json({ user });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    },

    


}