import AppError from "src/shared/errors/appError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";

interface IRequest{
    name: string;
    price: number;
    quantity: number;
}

export default class CreateProductService{
    public async execute({name, price, quantity} : IRequest) : Promise<Product>{

        const productRepository = getCustomRepository(ProductRepository);

        const productExists = await productRepository.findByName(name);

        if(productExists){
            throw new AppError('There is already a product with the name ' + name)
        }

        const product = productRepository.create({
            name, price, quantity
        });
        await productRepository.save(product);
        return product;
    }
}