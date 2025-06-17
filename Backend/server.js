import app from './app.js';
import dotenv from "dotenv";
import { connectMongoDatabase } from './config/db.js';
dotenv.config({path: "Backend/config/config.env"})
connectMongoDatabase()
const Port = process.env.PORT;


app.listen(Port,() => {
    console.log("server is running on PORT 8000")
})