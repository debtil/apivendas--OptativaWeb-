import { getCustomRepository } from "typeorm"
import User from "../typeorm/entities/User"
import UserstRepository from "../typeorm/repositories/UsersRepository"

export default class ListUserService {

    public async execute(): Promise<User[]> {

        const usersRepository = getCustomRepository(UserstRepository)

        const users = await usersRepository.find()

        return users
    }
}