import express, {Request, Response} from "express";
import User from "../models/user";
import jwt from "jsonwebtoken"
import {check, validationResult } from "express-validator"


const router = express.Router()

router.post("/register", [
    check('firstName',"El Nombre es Requerido").isString(),
    check('lastName',"El Apellido es Requerido").isString(),
    check('email', "El Correo Electronico es Requerido").isEmail(),
    check('password',"La Contraseña debe tener 6 o mas Caracteres").isLength({min:6})
    
],
  async(req: Request, res:Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }
    try{
        let user = await User.findOne({
            email:req.body.email,
        })

        if (user){
            return res.status(400).json({message:"El Usuario ya Existe"})
        }

        user = new User(req.body);
        await user.save()

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, {
            expiresIn:"1d",
        })
        
        res.cookie("auth_token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge:86400000
        })
        res.send({message: "Usuario Registrado Exitosamente"})    } catch(error){
        console.log(error)
        res.status(500).send({message: "Upss Algo Salio Mal"})
    }
})

export default router