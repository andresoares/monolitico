import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUsecase from "./find-all-products.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Description 1",
    salesPrice: 105
});

const product2 = new Product({
    id: new Id("2"),
    name: "Product 2",
    description: "Description 2",
    salesPrice: 110
});

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
    };
}

describe("find all products usecase unit test", () => {

    it("should find all products", async () => {
        const productRepository = MockRepository();
        const usecase = new FindAllProductsUsecase(productRepository);

        const result = await usecase.execute();

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe(product.id.id);
        expect(result.products[1].id).toBe(product2.id.id);
    });

});