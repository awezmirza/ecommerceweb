import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import cors from 'cors'
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config();

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/categorymodifier', categoryRoutes)
app.use('/api/v1/productmodifier', productRoutes)

app.get("/", (req, res) => {
    res.send("<h1>Welcome braaaao</h1>")
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})