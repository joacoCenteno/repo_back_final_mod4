import Playlist from '../models/PlaylistModel.mjs';
import User from '../models/User.mjs';

import IPlaylistRepository from './IPlaylistRepository.mjs';

class PlaylistRepostory extends IPlaylistRepository{
    async obtenerPlaylistPorId(id_r){
        return await Playlist.findById(id_r).populate('canciones').populate('usuario')
    }

    crearPlaylist(body, user_id){
        return new Playlist({...body, usuario: user_id})
    }

    async eliminar(id){
        return await Playlist.findByIdAndDelete(id);
    }

    async AgregarPlaylistUsuario(id_u, pl){
        return await User.findByIdAndUpdate(id_u, {$push: {playlists: pl._id}})
    }

    async quitarPlaylistUsuario(id_u, pl){
        return await User.findByIdAndUpdate(
            id_u,
            { $pull: { playlists: pl } }
        );
    }

    async editar(id,body){
        return await Playlist.findByIdAndUpdate(id,body,{new:true});
    }

    async PlaylistFiltrado(filtros, skip, limite){
        return Playlist.find(filtros).skip(skip).limit(limite).populate("usuario", "username email")
    }

    async CantidadCoincidencias(filtro){
        return Playlist.countDocuments(filtro)
    }
}

export default new PlaylistRepostory();