import { Router } from "express";
import {updateTodo,addTodo,getTodo,getTodos,deleteTodo} from '../Controllers'

const router=Router()
router.get('',getTodos)
router.get('/:id',getTodo)
router.post('',addTodo)
router.put('/:id',updateTodo)
router.delete('/:id',deleteTodo)

export default router