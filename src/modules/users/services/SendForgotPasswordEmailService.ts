import AppError from "src/shared/errors/appError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

interface IRequest{
    email: string;
}

export default class SendForgotEmailPasswordService{
    public async execute({email}: IRequest): Promise<void>{
        const userRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await userRepository.findByEmail(email);
        if(!user){
            throw new AppError('User do not exist');
        }
        const {token} = await userTokensRepository.generate(user.id);
        console.log(token);
    }
}