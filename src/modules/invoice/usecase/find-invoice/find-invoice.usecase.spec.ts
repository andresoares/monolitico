import Address from "../../../@shared/domain/entity/value-object/address.value-object";
import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import FindInvoiceUseCase from "./find-invoice.usecase";

const props = {
    id: new Id("1"),
    name: "Invoice 1",
    document: "1234",
    address: new Address("Street", "City", "State", "Zip", "Number", "Complement"),
    items: [
        {
            id: new Id("1"),
            name: "Item 1",
            price: 100,
        },
        {
            id: new Id("2"),
            name: "Item 2",
            price: 50,
        }
    ]
}

const invoice = new Invoice(props);

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
};

describe("Find Invoice Usecase unit test", () => {
    it("should find a invoice", async () => {

        const repository = MockRepository();
        const usecase = new FindInvoiceUseCase(repository);

        const input = {
            id: "1",
        }

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(props.name);
        expect(result.document).toEqual(props.document);
        expect(result.address.street).toEqual(props.address.street);
        expect(result.address.number).toEqual(props.address.number);
        expect(result.address.complement).toEqual(props.address.complement);
        expect(result.address.city).toEqual(props.address.city);
        expect(result.address.state).toEqual(props.address.state);
        expect(result.address.zipCode).toEqual(props.address.zipCode);
        expect(result.items.length).toBe(props.items.length);
        expect(result.items[0].id).toEqual(props.items[0].id.id);
        expect(result.items[0].name).toEqual(props.items[0].name);
        expect(result.items[0].price).toEqual(props.items[0].price);
        expect(result.items[1].id).toEqual(props.items[1].id.id);
        expect(result.items[1].name).toEqual(props.items[1].name);
        expect(result.items[1].price).toEqual(props.items[1].price);
        expect(result.total).toEqual(150);
        
    });
})