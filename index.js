require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

app.use(express.json());
app.use(express.urlencoded({extended: true}));




const port = process.env.PORT || 3000;

const start = async()=>{
    try{
        //connect DB
        connectDB(process.env.MONGO_URL);
        app.listen(port,()=>{
            console.log(`Server is listening to ${port}...`);
        });
    }catch(err){
        console.log(err);
    }
}

start();