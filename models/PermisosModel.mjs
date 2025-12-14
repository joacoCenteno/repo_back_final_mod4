import mongoose from "mongoose";

const permisosSchema = new mongoose.Schema({
    nombre: {type:String, required:true, unique:true},
    descripcion: {type:String, required:true}
})

const Permisos = mongoose.model('Permisos', permisosSchema, 'Permisos');
export default Permisos;