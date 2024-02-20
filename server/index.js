const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./Routes/userRoutes')


const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/auth",userRoutes)

app.get('/',(req,res)=>{
    res.send("this is backend");
})

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    }).then(()=>{
    console.log("MONGO DB CONNECTED");
    }).catch((err)=>{
        console.log("MONGO DB CONNECTION FAILED ",err.message);  
    })

app.listen(process.env.PORT,()=>console.log(`PORT Started on : ${process.env.PORT}`));
