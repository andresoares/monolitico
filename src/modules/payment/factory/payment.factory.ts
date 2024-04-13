import PaymentFacade from "../facade/payment.facade";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";

export default class PaymentFacadeFactory {

    static create(): PaymentFacade {
        const transactionRepository = new TransactionRepository();
        const processPaymentUseCase = new ProcessPaymentUseCase( transactionRepository ); 

        return new PaymentFacade({
            paymentUseCase: processPaymentUseCase
        });
    }
}