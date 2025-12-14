import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type:String, required: true, unique:true},
    password: {type: String, required: true},
    profileImage: {type:String, default: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Y5MzctYWV3LTExMV8xLWtsaGhqdDhxLmpwZw.jpg'},
    playlists: [{type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'}],
    role:{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}
})

const User = mongoose.model('User', userSchema, 'User');
export default User;