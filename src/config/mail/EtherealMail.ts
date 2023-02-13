import nodemailer from 'nodemailer';
import HandleBarMailTemplate from './HandlebarMailTemplate';

interface ITemplateVariable{
    [key: string]: string | number;
}

interface IMailContact{
    name: string;
    email: string;
}

interface IParseMailtemplate{
    file: string;
    variables: ITemplateVariable
}

interface ISendEmail{
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailtemplate;
}

export default class EtherealMail{
    static async sendMail({to, from, subject, templateData}: ISendEmail): Promise<void>{
        const accont = await nodemailer.createTestAccount();
        const mailTemplate = new HandleBarMailTemplate();
        const transporter = await nodemailer.createTransport({
            host: accont.smtp.host,
            port: accont.smtp.port,
            auth: {
                user: accont.user,
                pass: accont.pass
            }
        });
        const message = await transporter.sendMail({
            from:{
                name: from?.name || 'Equipe Mugiwara',
                address: from?.email || 'equipe_Migiwara@gmail.com'
            },
            to:{
                name: to.name,
                address: to.email
            },
            subject,
            html: await mailTemplate.parse(templateData)
        });
        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}