import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import ProductRepository from "@modules/products/typeorm/repositories/ProductRepository";
import Order from "@modules/orders/typeorm/entities/Order"
import AppError from "src/shared/errors/appError";
import { getCustomRepository } from "typeorm";
import OrderRepository from "../typeorm/repositories/OrderRepository";

interface IProduct{
    id: string;
    quantity: number;
}

interface IRequest{
    customer_id: string;
    products: IProduct[];
}

export default class CreateOrderService{

    public async execute({customer_id, products}: IRequest): Promise<Order>{
        const ordersRepository = getCustomRepository(OrderRepository);
        const customerReository = getCustomRepository(CustomersRepository);
        const productsRepository = getCustomRepository(ProductRepository);
        
        const customerExists = await customerReository.findById(customer_id);
        if(!customerExists){
            throw new AppError('Could not find customer');
        }
        const existsProducts = await productsRepository.findAllByIds(products);
        if(!existsProducts.length){
            throw new AppError('Could not find products');
        }
    
        const existsProductsIds = existsProducts.map((product) => product.id);
        const checkInexistentProduct = products.filter(
            product => !existsProductsIds.includes(product.id)
        )
        if(!existsProductsIds.length){
            throw new AppError(`Could not find products ${checkInexistentProduct[0].id}`);
        }

        const quantityAvaliable = products.filter(
            product => existsProducts.filter(
                prod => prod.id === product.id
            )[0].quantity < product.quantity
        );
        
        if(quantityAvaliable.length){
            
            throw new AppError(`The quantity ${quantityAvaliable[0].quantity} is not available for ${quantityAvaliable[0].id}`);
        }

        const serializerProduct = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: existsProducts.filter(prod => prod.id === product.id)[0].price
        }))
        
        const order = await ordersRepository.createOrder({
            customer: customerExists,
            products: serializerProduct
        });
        console.log(customer_id)
        const {order_products} = order;
        const updateProductQuantity = order_products.map(product => ({
            id: product.product_id, 
            quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
        }))
        
        await productsRepository.save(updateProductQuantity);
        return order;
    }
}