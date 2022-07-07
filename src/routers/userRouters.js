import userController from '../controllers/userController.js';
import { Router } from "express";
import authMiddleware from '../middlewares/auth.js';

const userRouters = Router();

  
userRouters.post("/", (req, res) => {
    userController.createUser(req, res);
});


userRouters.put("/:id",authMiddleware.verifyToken, (req, res)=>{
    userController.updateUser(req, res);
});

userRouters.delete("/:id",authMiddleware.verifyToken, (req, res)=>{
    userController.deleteUser(req, res);
});

export default userRouters;