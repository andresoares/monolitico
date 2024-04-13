import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUsecase from "./find-product.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Description 1",
    salesPrice: 105
});

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
    };
}

describe("find product usecase unit test", () => {

    it("should find product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUsecase(productRepository);

        const result = await usecase.execute({ id: "1" });

        expect(productRepository.find).toHaveBeenCalled();
        expect(result.id).toBe(product.id.id);
        expect(result.name).toBe(product.name);
        expect(result.description).toBe(product.description);
        expect(result.salesPrice).toBe(product.salesPrice);
    });

});