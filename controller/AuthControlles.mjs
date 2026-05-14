import User from "../models/User.mjs";
import AuthService from "../services/AuthService.mjs";
import EmailService from "../services/EmailService.mjs";
import crypto from "crypto"

export async function registerController(req,res){
    try {
        const result = await AuthService.register(req.body);
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message: "Usuario ya existente"})
    }
}

export async function loginController(req,res){
    try {
        const {email, password} = req.body;
        const result = await AuthService.login(email,password);

        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({message: "Email o contraseña incorrectas"})
    }
}


export async function forgotPasswordController(req,res){
    try{
        const {email} = req.body;

        const result = await AuthService.forgotPassword(email);


        if(!result){
            return res.status(200).json({message: 'Si existe el correo, se encviará un mail de recuperación'})
        }

        const {email_user,token} = result;

        await EmailService.sendRecuperation(email_user, token);

        
        return res.status(200).json({message : 'Correo enviado'})
    }catch(error){
        return res.status(500).json({message: 'Error, no se pudo enviar el correo', err: error.message})
    }
}

export async function resetPasswordController(req,res){
    try {
        const {token} = req.params;
        const {password} = req.body;


        await AuthService.resetPassword(token,password);

        res.status(200).json({message: 'Contraseña Actualizada'})
    } catch (error) {
        res.status(500).json({message: "Error al actualizar la contraseña", err: error.message})
    }
}
