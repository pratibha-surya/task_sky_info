

import express  from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import { connectDB } from './config.js/db.js'
import categoryRoute from './routes/category.route.js'
import subcategoryRoute from './routes/subcategory.route.js'
import productRoute from './routes/product.route.js'


dotenv.config()
connectDB()
const app=express()
app.use(express.json())
app.use(cors())
app.use('/api/v1',categoryRoute)
app.use('/api/v1',subcategoryRoute)
app.use('/api/v1',productRoute)
const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
