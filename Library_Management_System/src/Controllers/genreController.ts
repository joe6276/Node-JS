import {Request,Response,RequestHandler, response} from 'express'
import {v4 as uid} from 'uuid'
import { sqlConfig } from '../config'
import mssql from 'mssql'
import { Genre, GenreRequest } from '../Models/genreModels'
import { DbHelper } from '../DatabaseHelpers'
 const dbInstance =new DbHelper()

export const addGenre=async (req:GenreRequest,res:Response)=>{
try {
    const id= uid()
    const { Name}=req.body

    await dbInstance.exec('addGenre', {Id:id, Name})

    res.status(201).json({message:"Genre Added!1"})
} catch (error:any) {
    return res.status(500).json(error.message)
}
}


export const getGenres=async(req:Request,res:Response)=>{
    try {
         let genres= (await dbInstance.exec('getGenres',{})).recordset as Genre[]
        if(genres.length===0){
            return res.status(200).json({message:"No Genres found , Kindly add one!!"})
        }
    
        return res.status(200).json(genres)

    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}