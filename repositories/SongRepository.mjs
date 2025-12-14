import Song from '../models/SongModel.mjs';
import ISongRepository from './ISongRepository.mjs';

class SongRepository extends ISongRepository{
    async obtenerPorId(id_i){
        return await Song.findById(id_i)
    }

    async obtenerTodos(){
        return await Song.find({})
    }

    crearInstancia(body){
        return new Song(body)
    }

    async actualizar(id,body){
        return await Song.findByIdAndUpdate(id,body,{new:true});
    }

    async eliminar(id){
        return await Song.findByIdAndDelete(id);
    }

    async obtenerPorGenero(filtro,page,limit){
        const skip = (page-1) * limit
        const canciones = await Song.find(filtro).skip(skip).limit(limit)
        const total = await Song.countDocuments(filtro)

        return {canciones,total}
    }

    async obtenerRecientes(page,limit){
        const skip = (page - 1) * limit
        const canciones = await Song.find().sort({ fechaIngreso: -1 }).skip(skip).limit(limit)
        const total = await Song.countDocuments()

        return {canciones, total}
    }

    async cancionFiltrado(filtros,skip,limite){
        return Song.find(filtros).skip(skip).limit(limite)
    }

    async cantidadCoincidencias(filtros){
        return Song.countDocuments(filtros)
    }
}

export default new SongRepository();