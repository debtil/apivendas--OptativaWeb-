import AppError from "src/shared/errors/appError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";
import path from "path";

interface IRequest{
    email: string;
}

export default class SendForgotEmailPasswordService{
    public async execute({email}: IRequest): Promise<void>{
        const userRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);
        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')
        const user = await userRepository.findByEmail(email);
        if(!user){
            throw new AppError('User do not exist');
        }
        const {token} = await userTokensRepository.generate(user.id);
        console.log(token);

        await EtherealMail.sendMail({
            to: {name: user.name, email: user.email},
            subject: '[Mugiwara Store] - Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3333/reset_password?token=${token}`
                }
            }
        })
    }
}