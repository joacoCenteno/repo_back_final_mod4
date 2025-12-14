export default class IPlaylistRepository{
    obtenerPlaylistPorId(id){
        throw new Error('Metodo obtenerPlaylistPorId() no implementado')
    }

    crearPlaylist(body){
        throw new Error('Metodo crearPlaylist() no implementado')
    }

    eliminar(id){
        throw new Error('Metodo eliminar() no implementado')
    }

    agregarCancion(id_p,id_c){
        throw new Error('Metodo agregarCancion() no implementado')
    }

    eliminarCancion(id_p,id_c){
        throw new Error('Metodo elimianarCancion() no implementado')
    }

    AgregarPlaylistUsuario(id_u,pl){
        throw new Error('Metodo agregarPlaylistUsuario() no implementado')
    }

    actualizar(id,body){
        throw new Error('Metodo editar() no implementado')
    }

    quitarPlaylistUsuario(id_u, pl){
        throw new Error('Metodo quitarPlaylistUsuario() no implementado')
    }

    PlaylistFiltrado(filtros, skip, limite){
        throw new Error('Metodo playlistFiltrado() no implementado')
    }

    CantidadCoincidencias(filtro){
        throw new Error('Metodo cantidadCoincidencias() no implementado')
    }
}