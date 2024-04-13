import Address from "../../@shared/domain/entity/value-object/address.value-object";
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {

    async generate(invoice: Invoice): Promise<void> {

        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            number: invoice.address.number,
            complement: invoice.address.complement,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            }))
        }, {
            include: [{ model: InvoiceItemModel }]
        });

    }

    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({ where: { id: id }, include: ["items"]});

        if (!invoice) {
            throw new Error(`Invoice with id ${id} not found`);
        }

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address(invoice.street, invoice.city, invoice.state, invoice.zipCode, invoice.number, invoice.complement),
            items: invoice.items.map(invoiceItem => {
                return {
                    id: new Id(invoiceItem.id),
                    name: invoiceItem.name,
                    price: invoiceItem.price
                }
            }),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        });
    }

}