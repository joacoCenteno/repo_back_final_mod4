import User from '../models/User.mjs'
import Playlist from '../models/PlaylistModel.mjs';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';


export function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({message: 'Token no proporicionado'})
    }

    try{
        const decoded = jwt.verify(token, process.env.KEY_JWT)

        req.user = decoded;

        next();
    }catch(error){
        return res.status(403).json({message: 'Token Invalido'})
    }
}


export function hasPermission(requiredPermission){
    return async (req,res,next) =>{
        try {
            if(!req.user){
                return res.status(401).json({message: 'No autenticado'})
            }

            const user = await User.findById(req.user.id).populate({
                path: 'role',
                populate: {
                    path: 'permissions',
                    model: 'Permisos'
                }
            })

            const hasPermission = user.role.permissions.some(
                permission => permission.nombre === requiredPermission
            )

            if(!hasPermission){
                return res.status(403).json({message: 'No tienes permisos para realizar esta accion'})
            }

            next();
        } catch (error) {
            next(error)
        }
    }
}

export async function esPropietario(req,res,next){
    try {
        const {id} = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({mensaje: "ID de playlist inválido"})
        }
        const playlist = await Playlist.findById(req.params.id);

        if(!playlist) return res.status(404).json({mensaje: "Playlist no encontrada"})

        if(playlist.usuario._id.toString() !== req.user.id){
            return res.status(403).json({mensaje: "No podes modificar esa playlist"})
        }

        next()
    } catch (error) {
        res.status(500).json({mensaje: "Ocurrio un error al verificar los permisos"})
    }
}