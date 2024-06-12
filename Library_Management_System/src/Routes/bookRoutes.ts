
import { Router } from "express";
import { addBook, deleteBook, getBook, getBooks, updateBook } from "../Controllers/bookController";
import { verifyToken } from "../middlewares";


const booksRouter = Router()

booksRouter.post("", addBook)
booksRouter.get("",verifyToken, getBooks)
booksRouter.get("/:id", getBook)
booksRouter.put("/:id", updateBook)
booksRouter.delete("/:id", deleteBook)



export default booksRouter