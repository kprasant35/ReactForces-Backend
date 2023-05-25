require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {updateStartTime} = require('./controllers/startTime');

const app = express();

var corsOptions = {
    origin: ['https://codeforces.com', 'chrome-extension://effdiamnkcpclcnfkfdaldbbdaellnpm'],
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

        // Due to div1 and div 2 contests, same question can have different problem id, for this we will map contestId with start time of that contest because both div1 and div2 have same start time, but different contest id.
        updateStartTime();

    }catch(err){
        console.log(err);
    }
}

start();