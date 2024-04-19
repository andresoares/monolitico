import { Sequelize } from "sequelize-typescript"
import ProductAdmModel from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import ProductRepository from "./product.repository";

describe("ProductRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([ProductAdmModel]);
        await sequelize.sync();
    });


    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        
        const productRepository = new ProductRepository();

        const productProps = {
            id: new Id("1"),
            name: "Product 1",
            description: "Description 1",
            purchasePrice: 100,
            stock: 10
        }
        const product = new Product(productProps);

        await productRepository.add(product);

        const productDb = await ProductAdmModel.findOne({
            where: {
                id: productProps.id.id
            }
        });

        expect(productProps.id.id).toBe(productDb.id);
        expect(productProps.name).toBe(productDb.name);
        expect(productProps.description).toBe(productDb.description);
        expect(productProps.purchasePrice).toBe(productDb.purchasePrice);
        expect(productProps.stock).toBe(productDb.stock);
        
    });

    it("should find a product", async () => {
        
        const productRepository = new ProductRepository();

        const productProps = {
            id: new Id("1"),
            name: "Product 1",
            description: "Description 1",
            purchasePrice: 100,
            stock: 10
        }

        await ProductAdmModel.create({
            id: productProps.id.id,
            name: productProps.name,
            description: productProps.description,
            purchasePrice: productProps.purchasePrice,
            stock: productProps.stock,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const productDb = await productRepository.find("1");

        expect(productProps.id.id).toBe(productDb.id.id);
        expect(productProps.name).toBe(productDb.name);
        expect(productProps.description).toBe(productDb.description);
        expect(productProps.purchasePrice).toBe(productDb.purchasePrice);
        expect(productProps.stock).toBe(productDb.stock);
        
    });
})