import UserRepository from "../repositories/UserRepository.mjs"

export async function getUserData(id) {
    return await UserRepository.obtenerUsuarioPorId(id);
}

export async function actualizarUsuario(id, body){
    return await UserRepository.actualizar(id,body)
}

export function crearInstanciaUsuario(body){
    return UserRepository.crearInstancia(body)
}

export async function eliminarUsuario(id){
    return await UserRepository.eliminar(id)
}
