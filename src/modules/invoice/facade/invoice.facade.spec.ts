import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/invoice.factory";
import Address from "../../@shared/domain/entity/value-object/address.value-object";


describe("InvoiceFacade test", () => {
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
        
        const facade = InvoiceFacadeFactory.create();

        const input = {
            name: "Invoice 1",
            document: "123",
            street: "Street 1",
            number: "1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "12345-123",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 100,
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 50,
                }
            ]
        }

        const result = await facade.generate(input);

        const invoiceDb = await InvoiceModel.findOne({
            where: { id: result.id },
            include: ["items"]
        });

        expect(invoiceDb.id).toBeDefined();
        expect(invoiceDb.name).toEqual(input.name);
        expect(invoiceDb.document).toEqual(input.document);
        expect(invoiceDb.street).toEqual(input.street);
        expect(invoiceDb.number).toEqual(input.number);
        expect(invoiceDb.complement).toEqual(input.complement);
        expect(invoiceDb.city).toEqual(input.city);
        expect(invoiceDb.state).toEqual(input.state);
        expect(invoiceDb.zipCode).toEqual(input.zipCode);
        expect(result.items.length).toBe(input.items.length);
        expect(result.items[0].id).toEqual(input.items[0].id);
        expect(result.items[0].name).toEqual(input.items[0].name);
        expect(result.items[0].price).toEqual(input.items[0].price);
        expect(result.items[1].id).toEqual(input.items[1].id);
        expect(result.items[1].name).toEqual(input.items[1].name);
        expect(result.items[1].price).toEqual(input.items[1].price);
        expect(result.total).toEqual(150);

    });

    it("should find a invoice", async () => {
        
        const facade = InvoiceFacadeFactory.create();

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

        const result = await facade.find({ id: "1" });

        expect(result.id).toBeDefined();
        expect(result.id).toEqual(invoiceProps.id.id);
        expect(result.name).toEqual(invoiceProps.name);
        expect(result.document).toEqual(invoiceProps.document);
        expect(result.address.street).toEqual(invoiceProps.address.street);
        expect(result.address.number).toEqual(invoiceProps.address.number);
        expect(result.address.complement).toEqual(invoiceProps.address.complement);
        expect(result.address.city).toEqual(invoiceProps.address.city);
        expect(result.address.state).toEqual(invoiceProps.address.state);
        expect(result.address.zipCode).toEqual(invoiceProps.address.zipCode);
        expect(result.items.length).toBe(invoiceProps.items.length);
        expect(result.items[0].id).toEqual(invoiceProps.items[0].id.id);
        expect(result.items[0].name).toEqual(invoiceProps.items[0].name);
        expect(result.items[0].price).toEqual(invoiceProps.items[0].price);
        expect(result.items[1].id).toEqual(invoiceProps.items[1].id.id);
        expect(result.items[1].name).toEqual(invoiceProps.items[1].name);
        expect(result.items[1].price).toEqual(invoiceProps.items[1].price);
        expect(result.total).toEqual(200);
    });
})