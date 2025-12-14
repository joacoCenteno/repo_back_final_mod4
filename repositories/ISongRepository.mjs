export default class ISongRepository{
    obtenerTodos(){
        throw new Error('Metodo obtenerTodos() no implementado')
    }

    obtenerPorId(id){
        throw new Error('Metodo obtenerPorId() no implementado')
    }

    crearInstancia(body){
        throw new Error('Metodo crearInstancia() no implementado')
    }

    actualizar(id,body){
        throw new Error('Metodo actualizar() no implementado')
    }

    eliminar(id){
        throw new Error('Metodo eliminar() no implementado')
    }

    obtenerPorGenero(filtro,page,limit){
        throw new Error('Metodo obtenerPorGenero() no implementado')
    }

    obtenerRecientes(page,limit){
        throw new Error('Metodo obtenerRecientes() no implementado')
    }

    cantidadCoincidencias(filtros){
        throw new Error('Metodo cantidadCoincidenias() no implementado')
    }

    cancionFiltrado(filtros,skip,limite){
        throw new Error('Metodo cancionFiltrado() no implementado')
    }
}