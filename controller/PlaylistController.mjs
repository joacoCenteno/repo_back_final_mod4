import {obtenerPlaylistPorId, agregarCancion, eliminarCancion, crearPlaylist, eliminarPlaylist, AgregarPlaylistUsuario, editarPlaylist, quitarPlaylistUsuario, CantidadCoincidencias, PlaylistFiltrado} from '../services/PlaylistServices.mjs';
import {renderizarPlaylist,renderizarListaPlaylists} from '../views/respondeViewPlaylist.mjs';

export async function obtenerPlaylistController(req,res){
    try{
        const {id} = req.params;
        const playlist = await obtenerPlaylistPorId(id)


        if(!playlist){
            return res.status(404).send({mensaje:'Playlist no encontrada'})
        }

        const playlistFormateada = renderizarPlaylist(playlist)
        res.status(200).json(playlistFormateada)

    }catch(err){
        res.status(500).send({mensaje:'Error al obtener playlist', error: err.message})
    }
}

export async function editarPlaylistController(req,res) {
    try{
        const {id} = req.params;
        const nueva_playlist = req.body;

        const playlist_actualizada = await editarPlaylist(id,nueva_playlist);

        if(!playlist_actualizada){
            return res.status(404).send({mensaje: 'Playlist no actualizada'})
        }

        res.status(200).json({mensaje: 'Playlist actualizada', playlist: playlist_actualizada})

    }catch(err){
        res.status(500).send({mensaje:'Error al actualizar la playlist',error:err.message})
    }
}


export async function crearPlaylistController(req,res){
    try{
        const nueva_playlist = crearPlaylist(req.body, req.user.id);
        const playlist_guardada = await nueva_playlist.save();

        await AgregarPlaylistUsuario(req.user.id, playlist_guardada);


        res.status(200).json(playlist_guardada)
    }catch(err){
        res.status(500).send({mensaje:'Error al crear playlist ', error: err.message})
    }
}

export async function eliminarPlaylistController(req,res){
    try{
        const {id} = req.params;
        const usuario_id = req.user.id

        const playlist = await obtenerPlaylistPorId(id);

        if (!playlist) {
            return res.status(404).json({ mensaje: "Playlist no encontrada" });
        }

        if (playlist.usuario._id.toString() !== usuario_id) {
            return res.status(403).json({ mensaje: "No podés eliminar esta playlist" });
        }

         const playlist_eliminada = await eliminarPlaylist(id);

        if(!playlist_eliminada){
            return res.status(404).send({mensaje: 'Playlist no eliminada'});
        }

        await quitarPlaylistUsuario(usuario_id,id)

        res.status(200).json({mensaje: 'Playlist eliminada', cancion: playlist_eliminada})

    }catch(err){
        res.status(500).send({mensaje:'Error al eliminar la cancion', error: err.message})
    }
}

export async function agregarCancionController(req,res){
    try {
        const {id, idCancion} = req.params;

        const agregado_cancion = await agregarCancion(id,idCancion)
        res.status(200).json({mensaje: 'Cancion agregada', playlist: agregado_cancion})
    } catch (error) {
        res.status(500).send({mensaje:'Error al agregar la cancion', error: error.message})
    }
}


export async function eliminarCancionController(req,res){
    try {
        const {id, idCancion} = req.params;

        const eliminado_cancion = await eliminarCancion(id,idCancion)
        res.status(200).json({mensaje: 'Cancion eliminada', playlist: eliminado_cancion})
    } catch (error) {
        res.status(500).send({mensaje:'Error al eliminar la cancion', error: error.message})
    }
}

export async function buscarPlaylists(req,res){
    try {
        const {q, page = 1} = req.query;
        const limite = 6;
        const skip = (page - 1) * limite;


let filtro = { 
            favorito: { $ne: true },
            usuario: { $ne: process.env.ADMIN_ID}

        };

        if (q && q.trim() !== "") { 
            const regexBusqueda = new RegExp(q, "i");
            
            filtro = {
                $and: [
                    { 
                        $or: [
                            { nombre: regexBusqueda }
                        ]
                    }, 
                    filtro 
                ]
            };
        }


        const playlists = await PlaylistFiltrado(filtro,skip,limite)
        
        const total = await CantidadCoincidencias(filtro)

        res.status(200).json({playlists, paginacion: {
            page: Number(page),
            total,
            pages: Math.ceil(total/limite)
        }})
    } catch (error) {
        res.status(500).json({mensaje: "Error buscando canciones", error: error.message})
    }
}
