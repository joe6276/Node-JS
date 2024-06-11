
import { Request } from "express"

export interface GenreRequest extends Request{
body:{
    Name:string
}
}



export interface Genre {
    Id:string
    Name:string
}
