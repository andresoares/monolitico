import { Sequelize } from "sequelize-typescript"
import StoreProductModel from "./product.model";
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

        await sequelize.addModels([StoreProductModel]);
        await sequelize.sync();
    });


    afterEach(async () => {
        await sequelize.close();
    });

    it("should find all products", async () => {
        
        await StoreProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Description 1",
            salesPrice: 100,
        })

        await StoreProductModel.create({
            id: "2",
            name: "Product 2",
            description: "Description 2",
            salesPrice: 110,
        })

        const productRepository = new ProductRepository();
        const products = await productRepository.findAll();

        
        expect(products.length).toBe(2);
        expect(products[0].id.id).toBe("1");
        expect(products[0].name).toBe("Product 1");
        expect(products[0].description).toBe("Description 1");
        expect(products[0].salesPrice).toBe(100);
        expect(products[1].id.id).toBe("2");
        expect(products[1].name).toBe("Product 2");
        expect(products[1].description).toBe("Description 2");
        expect(products[1].salesPrice).toBe(110);

    });

    it("should find a product", async () => {
        
        const productRepository = new ProductRepository();
        const productProps = {
            id: new Id("1"),
            name: "Product 1",
            description: "Description 1",
            salesPrice: 100,
        }

        await StoreProductModel.create({
            id: productProps.id.id,
            name: productProps.name,
            description: productProps.description,
            salesPrice: productProps.salesPrice,
        })

        const productDb = await productRepository.find("1");

        expect(productProps.id.id).toBe(productDb.id.id);
        expect(productProps.name).toBe(productDb.name);
        expect(productProps.description).toBe(productDb.description);
        expect(productProps.salesPrice).toBe(productDb.salesPrice);
        
    });
})