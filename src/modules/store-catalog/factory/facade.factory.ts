import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory {

    static create(): StoreCatalogFacade {

        const productRepository = new ProductRepository();
        const findAllProductUseCase = new FindAllProductsUsecase(productRepository);
        const findProductUseCase = new FindProductUsecase(productRepository);;

        const storeCatalogFacade = new StoreCatalogFacade({
            findProductUseCase: findProductUseCase,
            findAllProductUseCase: findAllProductUseCase
        });

        return storeCatalogFacade;
    }
}