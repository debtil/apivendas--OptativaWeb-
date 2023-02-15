import AppError from "src/shared/errors/appError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest{
    user_id: string;
}

export default class ShowProfileService{
    public async execute({user_id}: IRequest): Promise<User>{
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findById(user_id);
        if(!user){
            throw new AppError('user not found!');
        }
        return user;
    }
}