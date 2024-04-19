import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import ProductAdmModel from "../repository/product.model";

describe("ProductAdmFacade test", () => {

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

        // const productRepository = new ProductRepository();
        // const addProductUseCase = new AddProductUseCase(productRepository);

        // const productFacade = new ProductAdmFacade({
        //     addUseCase: addProductUseCase,
        //     checkStockUseCase: undefined
        // });

        const productFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Product 1",
            description: "Description 1",
            purchasePrice: 10,
            stock: 10
        }

        await productFacade.addProduct(input);

        const productDb = await 
        ProductAdmModel.findOne({where: { id: "1"}});

        expect(productDb.id).toBeDefined();
        expect(productDb.name).toBe(input.name);
        expect(productDb.description).toBe(input.description);
        expect(productDb.purchasePrice).toBe(input.purchasePrice);
        expect(productDb.stock).toBe(input.stock);

    });

    it("should checkstock a product", async () => {

        const productFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Product 1",
            description: "Description 1",
            purchasePrice: 10,
            stock: 10
        }
        await productFacade.addProduct(input);

        const result = await productFacade.checkStock({ productId: "1"});

        expect(result.productId).toBeDefined();
        expect(result.stock).toBe(input.stock);
        expect(result.productId).toBe(input.id);

    });
});