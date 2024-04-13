import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUsecase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";


export interface UseCasesProps {
    findAllProductUseCase: FindAllProductsUsecase;
    findProductUseCase: FindProductUsecase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    
    private _findAllProductUseCase: FindAllProductsUsecase;
    private _findProductUseCase: FindProductUsecase;

    constructor(usecasesProps: UseCasesProps) {
        this._findProductUseCase = usecasesProps.findProductUseCase;
        this._findAllProductUseCase = usecasesProps.findAllProductUseCase;
    }
    
    find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        //Caso o DTO do useCase for diferente do dto da facade, deve converter o dto da facade para o do caso de uso
        return this._findProductUseCase.execute(input);
    }
    findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return this._findAllProductUseCase.execute();
    }
    
}