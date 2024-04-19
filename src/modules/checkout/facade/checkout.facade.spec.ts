import { ClientAdmModel } from '../../client-adm/repository/client.model';

import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import InvoiceFacadeFactory from "../factory/checkout.factory";
import Address from "../../@shared/domain/entity/value-object/address.value-object";
import OrderModel from "../repository/order.model";
import ProductModel from "../repository/product.model";
import CheckoutFacadeFactory from "../factory/checkout.factory";
import Client from "../domain/client.entity";
import Product from "../domain/product.entity";
import Order from "../domain/order.entity";
import ClientModel from "../repository/client.model";
import OrderItem from '../domain/order-item.entity';
import StoreProductModel from '../../store-catalog/repository/product.model';
import OrderItemModel from '../repository/order-item.model';
import ProductAdmModel from '../../product-adm/repository/product.model';
import { Umzug } from 'umzug';
import { migrator } from '../../@infrastructure/migrations/config-migrations/migrator';


describe("CheckoutFacade test", () => {
    let sequelize: Sequelize;
    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        });

        sequelize.addModels([OrderModel, ClientModel, ClientAdmModel, StoreProductModel, ProductModel, ProductAdmModel, OrderItemModel]);
        migration = migrator(sequelize);
        await migration.up();
    });


    afterEach(async () => {
        if (!migration || !sequelize) {
            return
        }
        migration = migrator(sequelize);
        await migration.down();
        await sequelize.close();
    });

    const client = new Client({
        id: new Id("C1"),
        name: "John",
        email: "john@example.com",
        address: new Address("Address 1", "City 1", "State", "88888-888", "1234", "Complement")
    });

    const product1 = new Product({
        id: new Id("PP1"),
        name: "Product 1",
        description: "Description Product 1",
        salesPrice: 100
    });

    const ordemItem1 = new OrderItem({
        id: new Id("OI1"),
        salesPrice: 100,
        product: product1,
        name: "Product 1"
    })

    const product2 = new Product({
        id: new Id("PP2"),
        name: "Product 2",
        description: "Description Product 2",
        salesPrice: 50
    });

    const ordemItem2 = new OrderItem({
        id: new Id("OI2"),
        salesPrice: 100,
        product: product2,
        name: "Product 2"
    })

    const order = new Order({
        id: new Id("O1"),
        client: client,
        items: [ordemItem1, ordemItem2]
    });

    it("should create a order", async () => {

        await ClientAdmModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: "1234",
            street: client.address.street,
            number: client.address.number,
            complement: client.address.complement,
            city: client.address.city,
            state: client.address.state,
            zipcode: client.address.zipCode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        });

        await ProductAdmModel.create({
            id: product1.id.id,
            name: product1.name,
            description: product1.description,
            salesPrice: product1.salesPrice,
            purchasePrice: product1.salesPrice,
            stock: 100,
            createdAt: product1.createdAt,
            updatedAt: product1.updatedAt
        });

        await ProductAdmModel.create({
            id: product2.id.id,
            name: product2.name,
            description: product2.description,
            salesPrice: product2.salesPrice,
            purchasePrice: product1.salesPrice,
            stock: 100,
            createdAt: product2.createdAt,
            updatedAt: product2.updatedAt
        });

        // const  clients1 = await ClientAdmModel.findAll();
        // console.log(clients1);

        // const clients2 = await ClientModel.findAll();
        // console.log(clients2);

        // const products = await ProductAdmModel.findAll();
        // console.log(products);

        const facade = CheckoutFacadeFactory.create();

        const order = {
            clientId: "C1",
            products: [{ productId: product1.id.id }, { productId: product2.id.id }]
        };

        //console.log(order);

        const result = await facade.addOrder(order);

        // const invoiceDb = await OrderModel.findOne({
        //     where: { id: result.id },
        //     include: ["items"]
        // });

        //expect(invoiceDb.id).toBeDefined();
        // expect(invoiceDb.name).toEqual(input.name);
        // expect(invoiceDb.document).toEqual(input.document);
        // expect(invoiceDb.street).toEqual(input.street);
        // expect(invoiceDb.number).toEqual(input.number);
        // expect(invoiceDb.complement).toEqual(input.complement);
        // expect(invoiceDb.city).toEqual(input.city);
        // expect(invoiceDb.state).toEqual(input.state);
        // expect(invoiceDb.zipCode).toEqual(input.zipCode);
        // expect(result.items.length).toBe(input.items.length);
        // expect(result.items[0].id).toEqual(input.items[0].id);
        // expect(result.items[0].name).toEqual(input.items[0].name);
        // expect(result.items[0].price).toEqual(input.items[0].price);
        // expect(result.items[1].id).toEqual(input.items[1].id);
        // expect(result.items[1].name).toEqual(input.items[1].name);
        // expect(result.items[1].price).toEqual(input.items[1].price);
        // expect(result.total).toEqual(150);

    });
})