import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import AppError from "src/shared/errors/appError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user: User;
    token: string;
}

export default class CreateSessionsService{
    public async execute({email, password}: IRequest): Promise<IResponse> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);
        if(!user){
            throw new AppError('Incorrect email/password combination', 401);
        }
        const passwordConfirmed = await compare(password, user.password);
        if(!passwordConfirmed){
            throw new AppError('Incorrect email/password combination', 401);
        }
        const token = sign({}, 'c671f5661b16ba20f55d1a9b2cfd70af', {
            subject: user.id,
            expiresIn: '1d'
        });
        return {user, token};
    }
}