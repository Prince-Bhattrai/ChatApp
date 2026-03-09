import mongoose from "mongoose";
import server from "../app.js";

const port = process.env.PORT;

mongoose.connect(process.env.DB).then(()=>{
    console.log("DB connected!")
    server.listen(port, ()=>{
        console.log(`App is running on ${port}`)
    })
})

.catch((err)=>{
    console.log(err)
})