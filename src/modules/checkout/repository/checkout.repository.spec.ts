import { Sequelize } from 'sequelize-typescript';
import OrderModel from './order.model';
import OrderRepository from './checkout.repository';
import CLient from '../domain/client.entity';
import Client from '../domain/client.entity';
import Id from '../../@shared/domain/entity/value-object/id.value-object';
import Address from '../../@shared/domain/entity/value-object/address.value-object';
import Product from '../domain/product.entity';
import Order from '../domain/order.entity';
import ClientModel from './client.model';
import ProductModel from './product.model';
import OrderItem from '../domain/order-item.entity';
import OrderItemModel from './order-item.model';

describe("Order repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([OrderModel, OrderItemModel, ClientModel, ProductModel])
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });

    const client = new Client({
        id: new Id("C1"),
        name: "John",
        email: "john@example.com",
        address: new Address("Address 1", "City 1", "State", "88888-888", "1234", "Complement")
    });

    const product1 = new Product({
        id: new Id("P1"),
        name: "Product 1",
        description: "Description Product 1",
        salesPrice: 100
    });

    const orderItem1 = new OrderItem({
        id: new Id("OI1"),
        name: "Product 1",
        product: product1,
        salesPrice: 100
    });

    const product2 = new Product({
        id: new Id("P2"),
        name: "Product 2",
        description: "Description Product 2",
        salesPrice: 50
    });

    const orderItem2 = new OrderItem({
        id: new Id("OI2"),
        name: "Product 2",
        product: product2,
        salesPrice: 50
    });

    const order = new Order({
        id: new Id("O1"),
        client: client,
        items: [orderItem1, orderItem2]
    });

    it("should create a new order", async () => {

        await ProductModel.create({
            id: product1.id.id,
            name: product1.name,
            description: product1.description,
            salesPrice: product1.salesPrice
        });

        await ProductModel.create({
            id: product2.id.id,
            name: product2.name,
            description: product2.description,
            salesPrice: product2.salesPrice
        });

        const orderRepository = new OrderRepository();
        await orderRepository.addOrder(order);

        const orderModel = await OrderModel
            .findOne({
                where: { id: "O1" },
                include: { all: true, nested: true } // [ClientModel, OrderItemModel],
            });

        expect(orderModel.id).toBe("O1");
        expect(orderModel.client.id).toBe("C1");
        expect(orderModel.items[0].id).toBe("OI1");
        expect(orderModel.items[1].id).toBe("OI2");
        expect(orderModel.items[0].name).toBe("Product 1");
        expect(orderModel.items[1].name).toBe("Product 2");
        expect(orderModel.items[0].product.description).toBe("Description Product 1");
        expect(orderModel.items[1].product.description).toBe("Description Product 2");
        expect(orderModel.items[0].salesPrice).toBe(100);
        expect(orderModel.items[1].salesPrice).toBe(50);

    });

    it("should find a order", async () => {

        await ProductModel.create({
            id: product1.id.id,
            name: product1.name,
            description: product1.description,
            salesPrice: product1.salesPrice
        });

        await ProductModel.create({
            id: product2.id.id,
            name: product2.name,
            description: product2.description,
            salesPrice: product2.salesPrice
        });

        await OrderModel.create({
            id: order.id.id,
            client: new ClientModel({
                id: order.client.id.id,
                name: order.client.name,
                email: order.client.email,
                street: order.client.address.street, 
                city: order.client.address.city,
                state: order.client.address.state,
                zipCode: order.client.address.zipCode,
                number: order.client.address.number,
                complement: order.client.address.complement,
                createdAt: order.client.createdAt,
                updatedAt: order.client.updatedAt,
                orderId: order.id.id,
            }),
            items: order.items.map((item) => {
                return new OrderItemModel({
                    id: item.id.id,
                    name: item.name,
                    salesPrice: item.salesPrice,
                    orderId: order.id.id,
                    productId: item.product.id.id
                })
            }),
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        },
            { include: [ClientModel, OrderItemModel] });


        const orderRepository = new OrderRepository();
        const orderDb = await orderRepository.findOrder("O1");

        expect(orderDb.id.id).toBe("O1");
        expect(orderDb.client.id.id).toBe("C1");
        expect(orderDb.items[0].product.id.id).toBe("P1");
        expect(orderDb.items[1].product.id.id).toBe("P2");
        expect(orderDb.items[0].name).toBe("Product 1");
        expect(orderDb.items[1].name).toBe("Product 2");
        expect(orderDb.items[0].product.description).toBe("Description Product 1");
        expect(orderDb.items[1].product.description).toBe("Description Product 2");
        expect(orderDb.items[0].salesPrice).toBe(100);
        expect(orderDb.items[1].salesPrice).toBe(50);


        await expect(orderRepository.findOrder("1O")).rejects.toThrow(
            new Error("Order with id 1O not found")
        );

    });

});