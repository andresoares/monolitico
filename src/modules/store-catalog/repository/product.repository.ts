import Id from "../../@shared/domain/entity/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import StoreProductModel from "./product.model";

export default class ProductRepository implements ProductGateway{
    async findAll(): Promise<Product[]> {
        const products = await StoreProductModel.findAll();

        return products.map(product =>{
            return new Product({
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            });
        });
    }
    async find(id: string): Promise<Product> {
        const product = await StoreProductModel.findOne({
            where: {
                id: id
            }
        });

        if( !product) {
            throw new Error(`Product with id ${id} not found`);
        }

        return new Product({
            id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
        });
    }

}