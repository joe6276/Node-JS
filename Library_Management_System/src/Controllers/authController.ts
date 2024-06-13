import {Request,Response,RequestHandler} from 'express'
import {v4 as uid} from 'uuid'
import { RegisterSchema } from '../Helpers'
import Bcrypt from 'bcrypt'
import { Payload, User } from '../Models/authModels'
import jwt  from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv'
import { ExtendedRequest1 } from '../middlewares'
import { DbHelper } from '../DatabaseHelpers'
dotenv.config({path:path.resolve(__dirname,"../../.env")})


const dbInstance = new DbHelper()

export const registerUser=async(req:Request, res:Response)=>{
   try {
    const id =uid()
    const {Name, Email,Password}=req.body
    const {error}= RegisterSchema.validate(req.body)
    if(error){
      return   res.status(400).json(error.details[0].message)
    }
    const HashPassword = await Bcrypt.hash(Password,10)
     await dbInstance.exec('addUser', {Id:id, Name,Email, Password:HashPassword})

    return res.status(201).json({Message:"User Was Added SuccessfullY!!"})
   } catch (error) {
    return res.status(500).json(error)
   }

}


export const loginUser=async (req:Request, res:Response)=>{
    try {
        const { Email,Password}=req.body
        let user=(await dbInstance.exec('getUSer', {Email})).recordset as User[]
      

        /// validate is user is not undefined
        // password is correct

        if(user.length!==0){
        const isValid= await Bcrypt.compare(Password, user[0].Password)

        if(isValid){
            const payload:Payload={
                Sub: user[0].Id,
                Name:user[0].Name
            }
            const token = jwt.sign(payload,process.env.SECRET as string, {expiresIn:'2h'} )
            return res.status(200).json({message:"Login success!!", token})  
        }
        }
        

        return res.status(400).json({message:"Invalid Credentials"})  
        
    } catch (error) {
        return res.status(500).json(error)
    }


}


export const welcomePage=(req:ExtendedRequest1, res:Response)=>{
        try {
          res.status(200).send(`<h1> Welcome ${req.info?.Name} </h1>`)  
        } catch (error) {
            
        }
}