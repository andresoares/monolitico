import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceRepository from "./invoice.repository";
import Address from "../../@shared/domain/entity/value-object/address.value-object";
import Invoice from "../domain/invoice";


describe("ClientRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });


    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a invoice", async () => {
        
        const invoiceRepository = new InvoiceRepository();

        const invoiceProps = {
            id: new Id("1"),
            name: "Invoice 1",
            document: "1234",
            address: new Address("Street", "City", "State", "1234", "1", "Complement"),
            items: [
                {
                    id: new Id("1"),
                    name: "Item 1",
                    price: 100
                },
                {
                    id: new Id("2"),
                    name: "Item 2",
                    price: 100
                }
            ]
        }

        const invoice = new Invoice(invoiceProps);
        await invoiceRepository.generate(invoice);

        const invoiceDb = await InvoiceModel.findOne({
            where: { id: invoiceProps.id.id },
            include: ["items"]
        });

        expect(invoiceProps.id.id).toBe(invoiceDb.id);
        expect(invoiceProps.name).toBe(invoiceDb.name);
        expect(invoiceProps.document).toBe(invoiceDb.document);
        expect(invoiceProps.address.street).toBe(invoiceDb.street);
        expect(invoiceProps.address.city).toBe(invoiceDb.city);
        expect(invoiceProps.address.state).toBe(invoiceDb.state);
        expect(invoiceProps.address.zipCode).toBe(invoiceDb.zipCode);
        expect(invoiceProps.address.number).toBe(invoiceDb.number);
        expect(invoiceProps.address.complement).toBe(invoiceDb.complement);
        expect(invoiceProps.items.length).toBe(invoiceDb.items.length);
        expect(invoiceProps.items[0].id.id).toBe(invoiceDb.items[0].id);
        expect(invoiceProps.items[0].name).toBe(invoiceDb.items[0].name);
        expect(invoiceProps.items[0].price).toBe(invoiceDb.items[0].price);
        expect(invoiceProps.items[1].id.id).toBe(invoiceDb.items[1].id);
        expect(invoiceProps.items[1].name).toBe(invoiceDb.items[1].name);
        expect(invoiceProps.items[1].price).toBe(invoiceDb.items[1].price);
        expect(invoice.createdAt).toStrictEqual(invoiceDb.createdAt);
        expect(invoice.updatedAt).toStrictEqual(invoiceDb.updatedAt);
    });

    it("should find a invoice", async () => {
        
        const invoiceRepository = new InvoiceRepository();

        const invoiceProps = {
            id: new Id("1"),
            name: "Invoice 1",
            document: "1234",
            address: new Address("Street", "City", "State", "1234", "1", "Complement"),
            items: [
                {
                    id: new Id("1"),
                    name: "Item 1",
                    price: 100
                },
                {
                    id: new Id("2"),
                    name: "Item 2",
                    price: 100
                }
            ]
        }

        await InvoiceModel.create({
            id: invoiceProps.id.id,
            name: invoiceProps.name,
            document: invoiceProps.document,
            street: invoiceProps.address.street,
            city: invoiceProps.address.city,
            state: invoiceProps.address.state,
            zipCode: invoiceProps.address.zipCode,
            number: invoiceProps.address.number,
            complement: invoiceProps.address.complement,
            items: invoiceProps.items.map((item) => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                }
            }),
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            include: [{ model: InvoiceItemModel }]
        })


        const invoice = await invoiceRepository.find("1");

        expect(invoiceProps.id.id).toBe(invoice.id.id);
        expect(invoiceProps.name).toBe(invoice.name);
        expect(invoiceProps.document).toBe(invoice.document);
        expect(invoiceProps.address.street).toBe(invoice.address.street);
        expect(invoiceProps.address.city).toBe(invoice.address.city);
        expect(invoiceProps.address.state).toBe(invoice.address.state);
        expect(invoiceProps.address.zipCode).toBe(invoice.address.zipCode);
        expect(invoiceProps.address.number).toBe(invoice.address.number);
        expect(invoiceProps.address.complement).toBe(invoice.address.complement);
        expect(invoiceProps.items.length).toBe(invoice.items.length);
        expect(invoiceProps.items[0].id.id).toBe(invoice.items[0].id.id);
        expect(invoiceProps.items[0].name).toBe(invoice.items[0].name);
        expect(invoiceProps.items[0].price).toBe(invoice.items[0].price);
        expect(invoiceProps.items[1].id.id).toBe(invoice.items[1].id.id);
        expect(invoiceProps.items[1].name).toBe(invoice.items[1].name);
        expect(invoiceProps.items[1].price).toBe(invoice.items[1].price);
        expect(invoice.createdAt).toStrictEqual(invoice.createdAt);
        expect(invoice.updatedAt).toStrictEqual(invoice.updatedAt);
        
        
    });
})