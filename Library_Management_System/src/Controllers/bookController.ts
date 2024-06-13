import {Request,Response,RequestHandler} from 'express'
import {v4 as uid} from 'uuid'
import { Book, BookRequest } from '../Models/BookModel'
import { DbHelper } from '../DatabaseHelpers'


let dbInstance= new DbHelper()
export const addBook=async (req:BookRequest,res:Response)=>{
    try {
        

        const {AuthorId,GenreId,PublicationYear,Title}=req.body
        const id=uid()
        await dbInstance.exec('addBook', {Id:id, Title,PublicationYear:+PublicationYear, AuthorId,GenreId})
        return res.status(201).send('<h1> Book Added</h1>')
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getBooks=async (req:Request,res:Response)=>{
    try {
        const books =(await dbInstance.exec('getBooks', {})).recordset as Book[]
        return res.status(200).json(books)
       
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const getBook=async (req:Request<{id:string}>,res:Response)=>{
    try {
         const book=(await dbInstance.exec('getBook', {Id:req.params.id})).recordset[0] as Book 
        if(book && book.Id){
            return res.status(200).json(book)
        }
        return res.status(404).json({Message:'Book not Found!'})
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const updateBook=async (req:Request<{id:string}>,res:Response)=>{
    try {
        
        const book=(await dbInstance.exec('getBook', {Id:req.params.id})).recordset[0] as Book 
         if(book && book.Id){
            const {AuthorId,GenreId,PublicationYear,Title}=req.body
            await dbInstance.exec('updateBook', {Id:req.params.id, Title,PublicationYear:+PublicationYear, AuthorId,GenreId})
             return res.status(200).json({message:"Book Updated!"})
         }
         return res.status(404).json({Message:'Book not Found!'})
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const deleteBook=async (req:Request<{id:string}>,res:Response)=>{
    try {
        const book=(await dbInstance.exec('getBook', {Id:req.params.id})).recordset[0] as Book 
 
         if(book && book.Id){
            await dbInstance.exec('deleteBook', {Id:req.params.id})
             return res.status(200).json({Message:"Book deleted Sucessfully!!"})
         }
         return res.status(404).json({Message:'Book not Found!'})
    } catch (error) {
        return res.status(500).json(error)
    }
}

