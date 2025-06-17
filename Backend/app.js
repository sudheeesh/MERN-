import express, { json } from 'express';
import product from './routes/productRoutes.js'
const app = express()

//middleware
app.use(express.json())

//Route
app.use("/api/v1", product)

export default app;