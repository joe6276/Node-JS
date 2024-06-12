import express,{json} from 'express'
import genreRouter from './Routes/genreRoutes'
import booksRouter from './Routes/bookRoutes'
import authorRouter from './Routes/AuthorRoutes'
import authRoutes from './Routes/authRoutes'

const app = express()

//middlewares
app.use(json())
app.use("/authors", authorRouter)
app.use("/genres", genreRouter)
app.use("/books", booksRouter)
app.use("/auth", authRoutes)
//start

app.listen(4000, ()=>{ console.log("Server Running..")})