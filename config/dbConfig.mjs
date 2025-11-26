import mongoose from 'mongoose';

export async function connectDB(){
    try{
        await mongoose.connect('mongodb+srv://centenoJoaco:joaco130604@cluster00.b7llesy.mongodb.net/musicDB');
        console.log('Connection to DB successful');
    }catch(err){
        console.error('Error connection to DB: ',err);
        process.exit(1)
    }
}