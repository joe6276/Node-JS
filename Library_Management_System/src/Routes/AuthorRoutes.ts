import { Router } from "express";
import { addAuthor, deleteAuthor, getAuthor, getAuthors, updateAuthor } from "../Controllers/authorController";

const authRouter = Router()

authRouter.post("",addAuthor)
authRouter.get("", getAuthors)
authRouter.get("/:id", getAuthor)
authRouter.patch("/:id", updateAuthor)
authRouter.delete("/:id", deleteAuthor)
export default authRouter