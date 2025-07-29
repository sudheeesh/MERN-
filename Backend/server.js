import app from './app.js';
import dotenv from "dotenv";
import { connectMongoDatabase } from './config/db.js';


dotenv.config({path: "Backend/config/config.env"})
connectMongoDatabase()

const Port = process.env.PORT || 3000;

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