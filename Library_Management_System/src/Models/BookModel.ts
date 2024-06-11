import { Request } from "express"

export interface Book {
    Id:string
    Title:string,
    PublicationYear:string
    AuthorId:string
    GenreId:string
}

interface AddBook {
    Title:string,
    PublicationYear:string
    AuthorId:string
    GenreId:string
}

export interface BookRequest extends Request{
    body:AddBook
}