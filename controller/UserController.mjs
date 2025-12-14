import {getUserData, crearInstanciaUsuario, eliminarUsuario, actualizarUsuario} from '../services/UserService.mjs'
import {renderizarPlaylist,renderizarListaPlaylists} from '../views/respondeViewPlaylist.mjs';

export async function obtenerInformacionUsuarioController(req,res){
    try{
        const usuario_id = req.user.id;
        const usuario = await getUserData(usuario_id)

        if(!usuario){ return res.status(404).json({message: 'Usuario no encontrado'})}


        return res.status(200).json(usuario)

    }catch(err){
        res.status(500).send({mensaje:'Error al obtener data de usuario', error: err.message})
    }
}

export async function crearUsuarioController(req,res){
    try{
        const nuevo_usuario = crearInstanciaUsuario(req.body);
        const usuario_guardado = await nuevo_usuario.save();


        res.status(200).json(usuario_guardado)
    }catch(err){
        res.status(500).send({mensaje: 'Error al crear nueva cancion', err: err.message})
    }
}

export async function actualizarUsuarioController(req,res) {
    try{
        const {id} = req.params;
        const nuevo_usuario = req.body;

        const usuario_actualizado = await actualizarUsuario(id,nuevo_usuario);

        if(!usuario_actualizado){
            return res.status(404).send({mensaje: 'Usuario no actualizado'})
        }

        res.status(200).json({mensaje: 'Usuario actualizado', usuario: usuario_actualizado})

    }catch(err){
        res.status(500).send({mensaje:'Error al actualizar el usuario',error:err.message})
    }
}


export async function eliminarUsuarioController(req,res){
    try{
        const {id} = req.params;
        const usuario_eliminado = await eliminarUsuario(id);

        if(!usuario_eliminado){
            return res.status(404).send({mensaje: 'Usuario no eliminado'});
        }

        res.status(200).json({mensaje: 'Usuario eliminado', usuario: usuario_eliminado})

    }catch(err){
        res.status(500).send({mensaje:'Error al eliminar usuario'})
    }
}


