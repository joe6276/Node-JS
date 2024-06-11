import {Request,Response,RequestHandler, response} from 'express'
import {v4 as uid} from 'uuid'
import { sqlConfig } from '../config'
import mssql from 'mssql'
import { Genre, GenreRequest } from '../Models/genreModels'


export const addGenre=async (req:GenreRequest,res:Response)=>{
try {
    const id= uid()
    const { Name}=req.body

    let pool= await mssql.connect(sqlConfig)
    await pool.request()
    .input('Id',id)
    .input('Name',Name)
    .execute('addGenre')

    res.status(201).json({message:"Genre Added!1"})
} catch (error:any) {
    return res.status(500).json(error.message)
}
}


export const getGenres=async(req:Request,res:Response)=>{
    try {
        let pool= await mssql.connect(sqlConfig)
        let genres=(await pool.request().execute('getGenres')).recordset as Genre[]

        if(genres.length===0){
            return res.status(200).json({message:"No Genres found , Kindly add one!!"})
        }
    
        return res.status(200).json(genres)

    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}