import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";
import { Request, Response } from "express";

export default class UsersController {
    public async index(resquest: Request, response: Response): Promise<Response> {

       const listUsers = new ListUserService() 
       const users = await listUsers.execute()

       return response.json(users)
    }

    public async create(resquest: Request, response: Response): Promise<Response> {

        const { name, email, password } = resquest.body
        const createUser = new CreateUserService() 
        const user = await createUser.execute({ name, email, password })
 
        return response.json(user)
    }
}