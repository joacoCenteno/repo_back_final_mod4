import {obtenerSongPorId, obtenerTodosSong, crearInstanciaSong, actualizarSong, eliminarSong, obtenerPorGenero} from '../services/SongServices.mjs';
import {renderizarSong,renderizarListaSong} from '../views/responseView.mjs';

export async function obtenerCancionController(req,res){
    try{
        const {id} = req.params;
        const song = await obtenerSongPorId(id)


        if(!song){
            return res.status(404).send({mensaje:'Song no encontrada'})
        }

        const songFormatted = renderizarSong(song);
        res.status(200).json(songFormatted)

    }catch(err){
        res.status(500).send({mensaje:'Error al obtener song', error: err.message})
    }
}

export async function obtenerTodasCancionesController(req,res){
    try{
        const canciones = await obtenerTodosSong();

        const cancionesFormateadas = renderizarListaSong(canciones);
        res.status(200).json(cancionesFormateadas)
    }catch(err){
        res.status(500).send({mensaje:'Error al obtener canciones', error: err.message})
    }
}

export async function crearCancionController(req,res){
    try{
        const nueva_cancion = crearInstanciaSong(req.body);
        const cancion_guardada = await nueva_cancion.save();


        res.status(200).json(cancion_guardada)
    }catch(err){
        res.status(500).send({mensaje: 'Error al crear nueva cancion', err: err.message})
    }
}

export async function actualizarCancionController(req,res) {
    try{
        const {id} = req.params;
        const nueva_cancion = req.body;

        const cancion_actualizada = await actualizarSong(id,nueva_cancion);

        if(!cancion_actualizada){
            return res.status(404).send({mensaje: 'Cancion no actualizada'})
        }

        res.status(200).json({mensaje: 'Cacnion actualizada', cancion: cancion_actualizada})

    }catch(err){
        res.status(500).send({mensaje:'Error al actualizar la cancion',error:err.message})
    }
}


export async function eliminarCancionController(req,res){
    try{
        const {id} = req.params;
        const cancion_eliminada = await eliminarSong(id);

        if(!cancion_eliminada){
            return res.status(404).send({mensaje: 'Cancion no eliminada'});
        }

        res.status(200).json({mensaje: 'Cancion eliminada', cancion: cancion_eliminada})

    }catch(err){
        res.status(500).send({mensaje:'Error al eliminar la cancion'})
    }
}


export async function obtenerPorGeneroController(req,res){
    try{
        const {genero} = req.query;
        const canciones_filtradas = await obtenerPorGenero(genero);

        if(!canciones_filtradas){
            return res.status(404).send({mensaje: 'Error al obtener canciones'});
        }

        const cancionesFormateadas = renderizarListaSong(canciones_filtradas);

        res.status(200).json(cancionesFormateadas)

    }catch(err){
        res.status(500).send({mensaje:'Error al eliminar la cancion', err: err.message})
    }
}