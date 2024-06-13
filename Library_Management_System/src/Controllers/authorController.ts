import {Request,Response,RequestHandler} from 'express'
import {v4 as uid} from 'uuid'
import { Author, AuthorRequest } from '../Models/AuthorModels'
import { DbHelper } from '../DatabaseHelpers'

const dbInstance= new DbHelper()
export const addAuthor=async(req:AuthorRequest, res:Response)=>{
    try {
        
        const id =uid()
        const {Name}= req.body
        await dbInstance.exec("addAuthor",{Id:id, Name})
        res.status(201).json({message:"Author Created"})

    } catch (error) {
        
        res.status(500).json(error)
    }
}

export const getAuthors:RequestHandler= async(req,res)=>{
try {
    const authors=(await dbInstance.exec('getAuthors',{})).recordset as Author[]
    res.status(200).json(authors)
} catch (error) {
    res.status(500).json(error)
}
}


export const getAuthor= async(req:Request<{id:string}>,res:Response)=>{
    try {
        const author=( await dbInstance.exec('getAuthor',{Id:req.params.id})). recordset[0] as Author
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
        const author=( await dbInstance.exec('getAuthor',{Id:req.params.id})). recordset[0] as Author
        if(author && author.Id){

        if(author && author.Id){
            //update 
            const {Name} =req.body
            console.log(Name);
            
            
        if(author && author.Id){
            await dbInstance.exec('updateAuthor',{Id:req.params.id, Name})
            return res.status(200).json({message:"Author updated "})

        }

        return res.status(404).json({message:"Author Not Found"})

    } }
}catch (error) {
        res.status(500).json(error)
    }
    }


    export const deleteAuthor= async(req:Request<{id:string}>,res:Response)=>{
        try {
            const author=( await dbInstance.exec('getAuthor',{Id:req.params.id})). recordset[0] as Author
    
            if(author && author.Id){
                await dbInstance.exec('deleteAuthor',{Id:req.params.id})
                return res.status(200).json({message:"Author Deleted "})
            }
    
            return res.status(404).json({message:"Author Not Found"})
    
        } catch (error) {
            res.status(500).json(error)
        }
        }
    