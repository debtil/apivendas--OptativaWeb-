import { hash } from "bcryptjs"
import AppError from "src/shared/errors/appError"
import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User"
import UserstRepository from "../typeorm/repositories/UsersRepository"

interface IRequest {
    name: string
    email: string
    password: string
}

export default class CreateUserService {

    public async execute({name, email, password}: IRequest): Promise<User> {

        const usersRepository = getCustomRepository(UserstRepository)

        const emailExists = await usersRepository.findByEmail(email)

        if (emailExists) {
            console.log('teste')
            throw new AppError('Email address already exists')
        }

        const hashedPasword = await hash(password, 8)

        const user = usersRepository.create({name, email, password: hashedPasword})

        await usersRepository.save(user)

        return user
    }
}