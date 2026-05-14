import User from "../models/User.mjs";
import IUserRepository from "./IUserRepository.mjs"
import Playlist from "../models/PlaylistModel.mjs";

class UserRepository extends IUserRepository{
    async obtenerUsuarioPorId(id_i){
        return await User.findById(id_i).select('-password').populate({
        path: "playlists",
        populate: { path: "canciones" }
      }).populate({path:'role', populate: {path:'permissions'}})
    }

    crearInstancia(body){
        return new User(body)
    }
    
    async actualizar(id,body){
        return await User.findByIdAndUpdate(id,body,{new:true});
    }
    
    async eliminar(id){
        return await User.findByIdAndDelete(id);
    }

    async getUserByEmail(email){
        return await User.findOne({email});
    }

}

export default new UserRepository();