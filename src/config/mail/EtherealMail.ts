import nodemailer from 'nodemailer';

interface ISendEmail{
    to: string;
    body: string;
}

export default class EtherealMail{
    static async sendMail({to, body}: ISendEmail): Promise<void>{
        const accont = await nodemailer.createTestAccount();
        const transporter = await nodemailer.createTransport({
            host: accont.smtp.host,
            port: accont.smtp.port,
            auth: {
                user: accont.user,
                pass: accont.pass
            }
        });
        const message = await transporter.sendMail({
            from: 'equipe_Migiwara@gmail.com',
            to,
            subject: 'Recuperação de senha',
            text: body
        });
        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}