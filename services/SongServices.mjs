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

export async function obtenerPorGenero(genero){
    return await SongRepository.obtenerPorGenero(genero)
}