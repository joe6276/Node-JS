import { Router } from "express";
import { addGenre, getGenres } from "../Controllers/genreController";

const genreRouter= Router()
genreRouter.get("", getGenres)
genreRouter.post("", addGenre)

export default genreRouter