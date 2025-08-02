import dotenv from "dotenv";
dotenv.config({path: './config/config.env'})
import app from './app.js';
import { connectMongoDatabase } from './config/db.js';
connectMongoDatabase()
import Razorpay from "razorpay";
import cors from 'cors';

const Port = process.env.PORT || 3000;

app.use(cors({
  origin: ['https://mern-sandy-alpha.vercel.app/'], // 👈 replace with your actual Vercel domain
  credentials: true,
}));


export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret:process.env.RAZORPAY_SECRET_API,
  headers: {
    "X-Razorpay-Account": "<merchant_account_id>"
  }
});

process.on('uncaughtException',(err) => {
    console.log(`Error:${err.message}`);
    console.log(`Server is shutting down, due to uncaught exception errors`);
    process.exit(1)
})

const server=app.listen(Port,() => {
    console.log(`server is running on PORT ${Port}`)
})



//unhandle promise rejection error
process.on('unhandledRejection',(err) => {
    console.log(`Error:${err.message}`);
    console.log(`Server is shutting down, due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1)
    })
})