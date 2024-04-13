import UseCaseInterface from "../../@shared/domain/usecase/use-case.interface";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./payment.facade.interface";


export interface UseCasesProps {
    paymentUseCase: UseCaseInterface;
}

export default class PaymentFacade implements PaymentFacadeInterface {
    
    private _paymentUseCase: UseCaseInterface;

    constructor(usecasesProps: UseCasesProps) {
        this._paymentUseCase = usecasesProps.paymentUseCase;
    }

    process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return this._paymentUseCase.execute(input);
    }
    
}