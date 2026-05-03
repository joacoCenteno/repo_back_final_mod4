import express from 'express';
import {connectDB} from './config/dbConfig.mjs';
import indexRoute from './routes/indexRoute.mjs';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import cors from 'cors'

import './models/PermisosModel.mjs'
import './models/Role.mjs'
import './models/User.mjs'
import { generalLimiter } from './middleware/rateLimit.mjs';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "https://daleplaymusic.netlify.app",
    credentials: true
}));
app.use(helmet());
app.use(cookieParser());
app.use(generalLimiter);

connectDB()

app.use('',indexRoute);



app.use((req,res)=>{
    res.status(404).send({message: 'Endpoint Not Found'});
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);   
})