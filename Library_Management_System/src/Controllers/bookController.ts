import {Request,Response,RequestHandler} from 'express'
import {v4 as uid} from 'uuid'
import { sqlConfig } from '../config'
import mssql from 'mssql'
import { Book, BookRequest } from '../Models/BookModel'

export const addBook=async (req:BookRequest,res:Response)=>{
    try {
        

        const {AuthorId,GenreId,PublicationYear,Title}=req.body
        const id=uid()
        let pool= await mssql.connect(sqlConfig)
        await pool.request()
        .input('Id',id)
        .input('Title',Title)
        .input('PublicationYear',+PublicationYear)
        .input('AuthorId',AuthorId)
        .input('GenreId',GenreId)
        .execute('addBook')
        return res.status(201).send('<h1> Book Added</h1>')
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getBooks=async (req:Request,res:Response)=>{
    try {
        let pool= await mssql.connect(sqlConfig)
        const books= (await pool.request().execute('getBooks')).recordset as Book[]
        return res.status(200).json(books)
       
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const getBook=async (req:Request<{id:string}>,res:Response)=>{
    try {
        let pool= await mssql.connect(sqlConfig)
       const book= (await pool.request()
        .input('Id',req.params.id)
        .execute('getBook')).recordset[0] as Book

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
        
        let pool= await mssql.connect(sqlConfig)
        const book= (await pool.request()
         .input('Id',req.params.id)
         .execute('getBook')).recordset[0] as Book
 
         if(book && book.Id){
            const {AuthorId,GenreId,PublicationYear,Title}=req.body
            await pool.request()
            .input('Id',req.params.id)
            .input('Title',Title)
            .input('PublicationYear',+PublicationYear)
            .input('AuthorId',AuthorId)
            .input('GenreId',GenreId)
            .execute('updateBook')
             return res.status(200).json({message:"Book Updated!"})
         }
         return res.status(404).json({Message:'Book not Found!'})
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const deleteBook=async (req:Request<{id:string}>,res:Response)=>{
    try {
        let pool= await mssql.connect(sqlConfig)
        const book= (await pool.request()
         .input('Id',req.params.id)
         .execute('getBook')).recordset[0] as Book
 
         if(book && book.Id){
            await pool.request()
            // .query(`DELETE FROM Book WHERE Id='${req.params.id}'`)
            .input('Id', req.params.id)
            .execute('deleteBook')
             return res.status(200).json({Message:"Book deleted Sucessfully!!"})
         }
         return res.status(404).json({Message:'Book not Found!'})
    } catch (error) {
        return res.status(500).json(error)
    }
}

