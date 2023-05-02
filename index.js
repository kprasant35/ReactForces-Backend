require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'https://codeforces.com',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: ['GET','PATCH']
}


app.use(cors(corsOptions));

const connectDB = require('./db/connect');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const problemRouter = require('./routes/problems');
const userRouter = require('./routes/users');

app.get('/',(req,res)=>{
    res.send('<h1>ReactForces</h1>');
});

app.use('/api/v1/problems',problemRouter);
app.use('/api/v1/users', userRouter);

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