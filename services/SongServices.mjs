import SongRepository from '../repositories/SongRepository.mjs';

export async function obtenerSongPorId(id){
    return await SongRepository.obtenerPorId(id)
}

export async function obtenerTodosSong(){
    return await SongRepository.obtenerTodos()
}

export function crearInstanciaSong(body){
    return SongRepository.crearInstancia(body)
}

export async function eliminarSong(id) {
    return await SongRepository.eliminar(id)
}

export async function actualizarSong(id, body){
    return await SongRepository.actualizar(id,body)
}

export async function obtenerPorGenero(filtro,page,limit){
    const {canciones,total} = await SongRepository.obtenerPorGenero(filtro,page,limit)
    return {canciones,total}
}

export async function obtenerRecientes(page,limit){
    const {canciones,total} = await SongRepository.obtenerRecientes(page,limit);
    return {canciones,total}

}

export async function CancionFiltrado(filtros, skip, limite){
    return await SongRepository.cancionFiltrado(filtros, skip, limite)
}

export async function CantidadCoincidencias(filtros){
    return await SongRepository.cantidadCoincidencias(filtros)
}