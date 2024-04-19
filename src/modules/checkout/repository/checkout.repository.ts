import Address from "../../@shared/domain/entity/value-object/address.value-object";
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import Client from "../domain/client.entity";
import OrderItem from "../domain/order-item.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import ClientModel from "./client.model";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import ProductModel from "./product.model";

export default class CheckoutRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
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
                    productId: item.product.id.id,
                    salesPrice: item.salesPrice,
                    orderId: order.id.id,
                })
            }),
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        },
            { include: [ClientModel, OrderItemModel] });
    }

    async findOrder(id: string): Promise<Order> {
        const order = await OrderModel.findOne({
            where: { id },
            include: { all: true, nested: true }//[ClientModel, OrderItemModel, ProductModel],
        });

        if (!order) {
            throw new Error(`Order with id ${id} not found`);
        }

        return new Order({
            id: new Id(order.id),
            client: new Client({
                id: new Id(order.client.id),
                name: order.client.name,
                email: order.client.email,
                address: new Address(order.client.street, order.client.city, order.client.state, order.client.zipCode, order.client.number, order.client.complement)
            }),
            items: order.items.map((item) => {
                return new OrderItem({
                    id: new Id(item.id),
                    name: item.name,
                    product: new Product({
                        id: new Id(item.productId),
                        name: item.product.name,
                        description: item.product.description,
                        salesPrice: item.product.salesPrice,
                    }),
                    salesPrice: item.salesPrice,
                })
            }),
            status: order.status,
        });
    }
}