import {Request, Response} from 'express'
import { Todo, TypedBody } from '../Models'
const todos:Todo[]=[]

export function getTodos(req:Request, res:Response){
    res.status(200).json(todos)
}

export const addTodo=(req:TypedBody, res:Response)=>{
   
 const {title,description} = req.body
    let newtodo:Todo={
        id:Math.floor(Math.random() * 10000),
        title,
        description,
        completed:false
    }

    todos.push(newtodo)
    res.status(201).json({message:"Todo Added Successfully"})
}

export function getTodo(req:Request<{id:string}>, res:Response){
    // we need an Id 
    const id = +req.params.id
    //get todo
    const todo= todos.find(x=>x.id===id)

    if(todo!=undefined){
        return res.status(200).json(todo)
    }
    return res.status(404).json({message:"Todo Not Found"})
}

export function updateTodo(req:Request<{id:string}>, res:Response){
    // we need an Id 
    const id = +req.params.id
    //get todo
    const todo= todos.find(x=>x.id===id)
    const {title,description} = req.body
    if(todo!=undefined){
            todo.description=description
            todo.title=title
        return res.status(200).json({message:`Todo ${id} updated`})
    }
    return res.status(404).json({message:"Todo Not Found"})
}


export const deleteTodo=(req:Request<{id:string}>, res:Response)=>{
    // we need an Id 
    const id = +req.params.id
    //get todo
    const index= todos.findIndex(x=>x.id===id)

    if(index>=0){
        todos.splice(index,1)
        return res.status(200).json({message:`Todo ${id} deleted`})
    }
    return res.status(404).json({message:"Todo Not Found"})
}


