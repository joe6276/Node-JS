import express,{json} from 'express'
import authRouter from './Routes/AuthorRoutes'
import genreRouter from './Routes/genreRoutes'
import booksRouter from './Routes/bookRoutes'

const app = express()

//middlewares
app.use(json())
app.use("/authors", authRouter)
app.use("/genres", genreRouter)
app.use("/books", booksRouter)
//start

app.listen(4000, ()=>{ console.log("Server Running..")})