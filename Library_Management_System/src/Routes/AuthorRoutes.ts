import { Router } from "express";
import { addAuthor, deleteAuthor, getAuthor, getAuthors, updateAuthor } from "../Controllers/authorController";

const authorRouter = Router()

authorRouter.post("",addAuthor)
authorRouter.get("", getAuthors)
authorRouter.get("/:id", getAuthor)
authorRouter.patch("/:id", updateAuthor)
authorRouter.delete("/:id", deleteAuthor)
export default authorRouter