
import { Router } from "express";
import { addBook, deleteBook, getBook, getBooks, updateBook } from "../Controllers/bookController";


const booksRouter = Router()

booksRouter.post("", addBook)
booksRouter.get("", getBooks)
booksRouter.get("/:id", getBook)
booksRouter.put("/:id", updateBook)
booksRouter.delete("/:id", deleteBook)



export default booksRouter