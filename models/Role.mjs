import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {type:String, required:true, unique:true},
    description: {type:String, required:true},
    permissions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Permisos'}]
}, {timestamps: true});

const Role = mongoose.model('Role', roleSchema, 'Role');
export default Role;