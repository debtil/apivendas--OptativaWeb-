import { Request, Response } from "express";
import CreateCustomerService from "../services/CreateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";
import ListCustomerService from "../services/ListCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";

export default class CustomersController{
    public async index(request: Request, response: Response): Promise<Response>{
        const listCustomers = new ListCustomerService();
        const customers = await listCustomers.execute();
        return response.json(customers);
    }
    
    public async show(request: Request, response: Response): Promise<Response>{
        const {id} = request.params;
        const showCustomers = new ShowCustomerService();
        const customers = await showCustomers.execute({id});
        return response.json(customers);
    }

    public async create(request: Request, response: Response): Promise<Response>{
        const {name, email} = request.body;
        const createCustomers = new CreateCustomerService();
        const customers = await createCustomers.execute({name, email});
        return response.json(customers);
    }

    public async update(request: Request, response: Response): Promise<Response>{
        const {id} = request.params
        const {name, email} = request.body;
        const updateCustomers = new UpdateCustomerService();
        const customers = await updateCustomers.execute({id, name, email});
        return response.json(customers);
    }

    public async delete(request: Request, response: Response): Promise<Response>{
        const {id} = request.params
        const deleteCustomers = new DeleteCustomerService();
        await deleteCustomers.execute({id})
        return response.json([]);
    }
}