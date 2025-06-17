import mongoose from "mongoose"

export const connectMongoDatabase = () =>{
    mongoose.connect(process.env.DB_URI).
then((data) => {
    console.log(`MongogDB connected with server ${data.connection.host}`);
    
}).catch((err) => {
     console.log(err.message);
     
})
}