
export function renderizarPlaylist(playlist){
    return{
        _id: playlist._id,
        nombre: playlist.nombre,
        imagen: playlist.imagen,
        canciones: playlist.canciones,
        usuario: playlist.usuario,
        favorito: playlist.favorito
    }
}

export function renderizarListaPlaylists(playlists){
    return playlists.map(playlist => renderizarPlaylist(playlist))
}
