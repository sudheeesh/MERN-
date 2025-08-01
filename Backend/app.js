import express, { json } from 'express';
import product from './routes/productRoutes.js'
import errorHandleMiddleware from './middleware/error.js'
import user from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import payment from './routes/paymentRoutes.js'
import order from './routes/orderRoutes.js'
import dotenv from 'dotenv'
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//Route
app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payment)
app.use(errorHandleMiddleware)
dotenv.config({path:'Backend/config/config.env'})

export default app;