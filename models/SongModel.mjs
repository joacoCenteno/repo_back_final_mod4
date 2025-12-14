import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
    {
        titulo: {type: String, required: true},
        artista: {type:String, required:true},
        album: {type: String},
        duracion: {type: Number},
        generos: {type: [String], required:true},
        imagen: {type:String},
        url: {type:String, required:true},
        fechaIngreso: {type: Date, default: Date.now()}
    }
);

const Song = mongoose.model('Song', songSchema, 'Song');
export default Song;