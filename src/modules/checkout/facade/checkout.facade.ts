import UseCaseInterface from "../../@shared/domain/usecase/use-case.interface";
import CheckoutFacadeInterface, { PlaceOrderFacadeInputDto, PlaceOrderFacadeOutputDto } from "./checkout.facade.interface";

export interface UseCaseProps{
    placeOrderUseCase: UseCaseInterface;
}

export default class CheckoutFacade implements CheckoutFacadeInterface {
    
    private _placeOrderUseCase: UseCaseInterface;

    constructor(props: UseCaseProps) {
        this._placeOrderUseCase = props.placeOrderUseCase;
    }

    async addOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto> {
        const response = await this._placeOrderUseCase.execute(input);
        return response;
    }

}