import {Request,Response,RequestHandler} from 'express'
import {v4 as uid} from 'uuid'
import { sqlConfig } from '../config'
import { Author, AuthorRequest } from '../Models/AuthorModels'
import mssql from 'mssql'

export const addAuthor=async(req:AuthorRequest, res:Response)=>{
    try {
        
        //id 
        const id =uid()
        const {Name}= req.body
        //make request to DB
        //connection
        const pool= await mssql.connect(sqlConfig)
        //make a request
        await pool.request()
        .input("Id",id)
        .input("Name",Name)
        .execute('addAuthor')

        res.status(201).json({message:"Author Created"})

    } catch (error) {
        
        res.status(500).json(error)
    }
}

export const getAuthors:RequestHandler= async(req,res)=>{
try {
    const pool= await mssql.connect(sqlConfig)
    //make a request
    const authors=(await pool.request().execute('getAuthors')).recordset as Author[]
    res.status(200).json(authors)
} catch (error) {
    res.status(500).json(error)
}
}


export const getAuthor= async(req:Request<{id:string}>,res:Response)=>{
    try {
        const pool= await mssql.connect(sqlConfig)
        //make a request
        const author=(await pool.request()
        .input("Id",req.params.id)
        .execute('getAuthor')).recordset[0] as Author

        if(author && author.Id){
            return res.status(200).json(author)
        }

        return res.status(404).json({message:"Author Not Found"})

    } catch (error) {
        res.status(500).json(error)
    }
    }

    
export const updateAuthor= async(req:Request<{id:string}>,res:Response)=>{
    try {
        const pool= await mssql.connect(sqlConfig)
        //make a request
        const author=(await pool.request()
        .input("Id",req.params.id)
        .execute('getAuthor')).recordset[0] as Author

        if(author && author.Id){
            //update 
            const {Name} =req.body
            await pool.request()
            .input('Id',req.params.id)
            .input('Name',Name)
            .execute('updateAuthor')
            return res.status(200).json({message:"Author updated "})

        }

        return res.status(404).json({message:"Author Not Found"})

    } catch (error) {
        res.status(500).json(error)
    }
    }


    export const deleteAuthor= async(req:Request<{id:string}>,res:Response)=>{
        try {
            const pool= await mssql.connect(sqlConfig)
            //make a request
            const author=(await pool.request()
            .input("Id",req.params.id)
            .execute('getAuthor')).recordset[0] as Author
    
            if(author && author.Id){

                await pool.request()
                .input('Id', req.params.id)
                .execute('deleteAuthor')
                return res.status(200).json({message:"Author Deleted "})
            }
    
            return res.status(404).json({message:"Author Not Found"})
    
        } catch (error) {
            res.status(500).json(error)
        }
        }
    