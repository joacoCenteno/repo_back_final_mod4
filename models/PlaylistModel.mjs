import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
    {
        nombre: {type: String, required: true},
        imagen: {type:String, default:'https://i.redd.it/onqlf75axn031.png'},
        canciones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
        fechaCreacion: {type: Date, default: Date.now()},
        favorito: {type: Boolean, default:false},
        usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
    }
);

const Playlist = mongoose.model('Playlist', playlistSchema, 'Playlist');
export default Playlist;