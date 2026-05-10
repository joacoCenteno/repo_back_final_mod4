import AuthService from "../services/AuthService.mjs";

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

