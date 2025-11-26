import express from 'express';
import {connectDB} from './config/dbConfig.mjs';
import SongRoutes from './routes/SongRoutes.mjs';
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000;  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB()

app.use('/',SongRoutes);

app.use((req,res)=>{
    res.status(404).send({message: 'Endpoint Not Found'});
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);   
})