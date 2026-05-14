import User from '../models/User.mjs'
import Role from '../models/Role.mjs'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Playlist from '../models/PlaylistModel.mjs'
import crypto from "crypto";
import {getUserByEmail} from '../services/UserService.mjs'

class AuthService{
    async forgotPassword(email){
        const user = await getUserByEmail(email);



        if(!user){
            return null
        }

        const token = crypto.randomBytes(32).toString("hex");


        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 15*60*1000


        await user.save();

        return {email_user: user.email, token}
    }


    async resetPassword(token, password){
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires : {$gt: Date.now()}
        })

        console.log(user);

        if(!user){
            return null
        }

        user.password = await bcrypt.hash(password,10);

        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();
    }



    async register(userData){
        const existingUser = await User.findOne({
            $or: [{email: userData.email},{username: userData.username}]
        });

        if(existingUser){
            throw new Error('Usuario existente')
        }

        const hashedPassword = await bcrypt.hash(userData.password,10)

        const defaultRole = await Role.findOne({name:'user'})

        if(!defaultRole){
            throw new Error('Rol por defecto no encontrado')
        }

        const user = new User({
            ...userData,
            password: hashedPassword,
            role: defaultRole._id
        })

        await user.save();

        const favoritos = await Playlist.create({
            nombre: "Mis Favoritos",
            imagen: "https://wallpaperbat.com/img/17272976-chill-wallpaper-for-desktop-pc.jpg",
            canciones: [],
            favorito: true,
            usuario: user._id
        });

        user.playlists.push(favoritos._id);
        await user.save();

        const userResponse = user.toObject();

        delete userResponse.password;

        const token = this.generateToken(user);
        return {user: userResponse, token}
    }

    async login(email,password){
        const user = await User.findOne({email})

        if(!user){
            throw new Error('Usuario no encontrado')
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword){
            throw new Error('Correo o contraseña incorrectos')
        }

        const userResponse = user.toObject();
        delete userResponse.password;

        const token = this.generateToken(user);
        return {user: userResponse, token}
    }

    generateToken(user){
        return jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.KEY_JWT,
            {expiresIn: '5h'}
        )
    }
}

export default new AuthService();