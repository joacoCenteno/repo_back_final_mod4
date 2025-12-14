import {obtenerSongPorId, obtenerTodosSong, crearInstanciaSong, actualizarSong, eliminarSong, obtenerPorGenero, obtenerRecientes, CancionFiltrado, CantidadCoincidencias} from '../services/SongServices.mjs';
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
        const {genero, page=1} = req.query;
        const limit = 10

        let filtro = {};

        if (genero !== "") {
        const regex = new RegExp(genero, "i");

        filtro = {
            $or: [
            { generos: regex }
            ]
        };
        }

        const {canciones, total} = await obtenerPorGenero(filtro,Number(page), limit);

        if(!canciones){
            return res.status(404).send({mensaje: 'Error al obtener canciones'});
        }

        const canciones_formateadas = renderizarListaSong(canciones);

        res.status(200).json({
            canciones: canciones_formateadas,
            paginacion: {
                page: Number(page),
                total,
                pages: Math.ceil(total / limit)
            }
        })

    }catch(err){
        res.status(500).send({mensaje:'Error al eliminar la cancion', err: err.message})
    }
}


export async function obtenerRecientesController(req,res){
    try{
        const { page = 1 } = req.query
        const limit = 10

        const  {canciones, total} = await obtenerRecientes(Number(page), limit)

       
        const canciones_formateadas = renderizarListaSong(canciones);

        res.status(200).json({
            canciones: canciones_formateadas,
            paginacion: {
                page: Number(page),
                total,
                pages: Math.ceil(total / limit)
            }
        })
    }catch(err){
        res.status(500).send({mensaje:'Error al obtener recientes', error: err.message})
    }
}

export async function buscarCanciones(req,res){
    try {
        const {q, page = 1} = req.query;
        const limite = 8;
        const skip = (page - 1) * limite;

        let filtro = {};

        if (q !== "") {
        const regex = new RegExp(q, "i");

        filtro = {
            $or: [
            { titulo: regex },
            { artista: regex },
            { album: regex }
            ]
        };
        }


        const canciones = await CancionFiltrado(filtro,skip,limite)
        
        const total = await CantidadCoincidencias(filtro)

        res.status(200).json({canciones, paginacion: {
            page: Number(page),
            total,
            pages: Math.ceil(total/limite)
        }})
    } catch (error) {
        res.status(500).json({mensaje: "Error buscando canciones", error: error.message})
    }
}