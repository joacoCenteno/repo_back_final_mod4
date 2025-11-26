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

    async obtenerPorGenero(genero){
        return await Song.find({generos:genero})
    }
}

export default new SongRepository();