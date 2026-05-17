import nodemailer from 'nodemailer';

class EmailService {
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async sendRecuperation(email,token){
        const link = `https://daleplaymusic.netlify.app/autenticacion/reset-password/${token}`;

        await this.transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'RECUPERAR CONTRASEÑA',
            html: `
                <h2>Recuperación de contraseña</h2>
                <p>Presione el siguiente enlace:</p>

                <a href="${link}">
                    Restablecer contraseña
                </a>

                <p>Expira en 15 minutos.</p>
            `
        });
    }
}

export default new EmailService();