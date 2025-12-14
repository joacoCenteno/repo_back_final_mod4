import PlaylistRepository from '../repositories/PlaylistRepository.mjs';

export async function obtenerPlaylistPorId(id){
    return await PlaylistRepository.obtenerPlaylistPorId(id)
}


export function crearPlaylist(body, user_id){
    return PlaylistRepository.crearPlaylist(body, user_id)
}

export async function eliminarPlaylist(id) {
    return await PlaylistRepository.eliminar(id)
}

export async function quitarPlaylistUsuario(id_u, id_pl){
    return PlaylistRepository.quitarPlaylistUsuario(id_u, id_pl)
}

export async function agregarCancion(id_p, id_c){
    const playlist = await PlaylistRepository.obtenerPlaylistPorId(id_p);

    if(!playlist) throw new Error("Playlist no encontrada");

    playlist.canciones.forEach(cancion => {
        const idExistente = cancion._id ? cancion._id.toString() : cancion.toString();

        if(idExistente === id_c){
            throw new Error("Cancion ya en playlist");
        }
    });


    playlist.canciones.push(id_c);
    await playlist.save()

    const playlist_actualizada = await PlaylistRepository.obtenerPlaylistPorId(id_p)
    return playlist_actualizada
}

export async function PlaylistFiltrado(filtro,skip,limite){
    return await PlaylistRepository.PlaylistFiltrado(filtro, skip, limite)
}

export async function CantidadCoincidencias(filtro){
    return await PlaylistRepository.CantidadCoincidencias(filtro);
}

export async function eliminarCancion(id_p,id_c){
    const playlist = await PlaylistRepository.obtenerPlaylistPorId(id_p);

    if (!playlist) throw new Error("Playlist no encontrada");

    playlist.canciones = playlist.canciones.filter(c => c._id.toString() !== id_c)

    await playlist.save()
    return playlist
}

export async function AgregarPlaylistUsuario(id_usuario, playlist) {
    return await PlaylistRepository.AgregarPlaylistUsuario(id_usuario,playlist)
}

export async function editarPlaylist(id_pl, body) {
    return await PlaylistRepository.editar(id_pl,body)
}