import mongoose from 'mongoose';

export async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connection to DB successful');
    }catch(err){
        console.error('Error connection to DB: ',err);
        process.exit(1)
    }
}