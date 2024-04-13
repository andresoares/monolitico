import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Description 1",
    purchasePrice: 100,
    stock: 10
})

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    };
}


describe("CheckStock usecase unit tests", () => {

    it("should get stock of a product", async () => {

        const productRepository = MockRepository();
        const usecase = new CheckStockUseCase(productRepository);

        const input = {
            productId: "1"
        }

        const output = await usecase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(output.productId).toBeDefined();
        expect(output.stock).toBe(product.stock);
        expect(output.productId).toBe(product.id.id);
        

    });
});