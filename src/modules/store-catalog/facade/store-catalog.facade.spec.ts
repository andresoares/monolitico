import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import StoreProductModel from "../repository/product.model";
import StoreCatalogFacadeFactory from "../factory/facade.factory";

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

        const facade = StoreCatalogFacadeFactory.create();
        const products = await facade.findAll();
        
        expect(products.products.length).toBe(2);
        expect(products.products[0].id).toBe("1");
        expect(products.products[0].name).toBe("Product 1");
        expect(products.products[0].description).toBe("Description 1");
        expect(products.products[0].salesPrice).toBe(100);
        expect(products.products[1].id).toBe("2");
        expect(products.products[1].name).toBe("Product 2");
        expect(products.products[1].description).toBe("Description 2");
        expect(products.products[1].salesPrice).toBe(110);

    });

    it("should find a product", async () => {
        
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

        const facade = StoreCatalogFacadeFactory.create();

        const product = await facade.find({ id: "1"});
        
        expect(productProps.id.id).toBe(product.id);
        expect(productProps.name).toBe(product.name);
        expect(productProps.description).toBe(product.description);
        expect(productProps.salesPrice).toBe(product.salesPrice);
        
    });
})