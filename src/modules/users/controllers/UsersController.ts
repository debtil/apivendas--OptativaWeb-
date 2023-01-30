import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";
import { Request, Response } from "express";

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {

       const listUsers = new ListUserService() 
       console.log(request.user.id)
       const users = await listUsers.execute()

       return response.json(users)
    }

    public async create(request: Request, response: Response): Promise<Response> {

        const { name, email, password } = request.body
        const createUser = new CreateUserService() 
        const user = await createUser.execute({ name, email, password })
 
        return response.json(user)
    }
}