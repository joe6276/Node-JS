import { Request } from "express"

export interface AuthorRequest extends Request{
body:{
    Name:string
}
}

export interface Author {
    Id:string
    Name:string
}