export function renderizarSong(song){
    return{
        _id: song._id,
        titulo: song.titulo,
        artista: song.artista,
        album: song.album,
        duracion: song.duracion,
        generos: song.generos,
        imagen: song.imagen,
        url: song.url
    }
}

export function renderizarListaSong(songs){
    return songs.map(song => renderizarSong(song))
}
