import AppError from "src/shared/errors/appError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest{
    id: string;
    name: string;
    email: string;
}

export default class ShowCustomerService{
    public async execute({id, name, email}: IRequest): Promise<Customer>{
        const customerRepository = getCustomRepository(CustomersRepository);
        const customer = await customerRepository.findById(id);
        if(!customer){
            throw new AppError('Customer not found');
        }

        const customerExists = await customerRepository.findByEmail(email);
        if(customerExists && email !== customer.email){
            throw new AppError('Customer already existss');
        }
        customer.name = name;
        customer.email = email;

        await customerRepository.save(customer);
        return customer;
    }
}