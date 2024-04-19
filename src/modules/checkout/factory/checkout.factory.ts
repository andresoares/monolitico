import ClientAdmFacadeFactory from "../../client-adm/factory/client.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacade from "../../store-catalog/facade/store-catalog.facade";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import InvoiceFacade from "../facade/checkout.facade";
import CheckoutFacade from "../facade/checkout.facade";
import ClientAdmFacade from "../facade/checkout.facade";
import CheckoutRepository from "../repository/checkout.repository";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";



export default class CheckoutFacadeFactory {

    static create(): ClientAdmFacade {
        const repository = new CheckoutRepository();
        const clientFacade = ClientAdmFacadeFactory.create();
        const productFacade = ProductAdmFacadeFactory.create();
        const storeCatalogFacade = StoreCatalogFacadeFactory.create();
        const invoiceFacade = InvoiceFacadeFactory.create();
        const paymentFacade = PaymentFacadeFactory.create();

        const placeOrderUseCase = new PlaceOrderUseCase(clientFacade, productFacade, storeCatalogFacade, repository, invoiceFacade, paymentFacade);
        
        return new CheckoutFacade({
            placeOrderUseCase: placeOrderUseCase
        });
    }
}