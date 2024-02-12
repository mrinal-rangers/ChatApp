const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();
require('dotenv').config();

app.use(cors());
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    }).then(()=>{
    console.log("MONGO DB CONNECTED");
    }).catch((err)=>{
        console.log("MONGO DB CONNECTION FAILED ",err.message);  
    })

app.listen(process.env.PORT,()=>console.log(`PORT Started on : ${process.env.PORT}`));
