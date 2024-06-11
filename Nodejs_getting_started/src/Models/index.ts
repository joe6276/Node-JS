import {Request} from 'express'

export interface Todo{
    id:number
    title:string
    description:string
    completed:boolean
}


export interface AddTodo{

    title:string
    description:string
   
}
export interface TypedBody extends Request{

    body:AddTodo
}

