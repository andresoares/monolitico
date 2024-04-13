import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto";


export default class FindInvoiceUseCase implements UseCaseInterface {

    constructor(private invoiceGateway: InvoiceGateway) {}

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {

        const invoice = await this.invoiceGateway.find(input.id);
        const address = invoice.address;

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: address.street,
                number: address.number,
                complement: address.complement,
                city: address.city,
                state: address.state,
                zipCode: address.zipCode,
            },
            items: invoice.items.map((item) => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                }
            }),
            total: invoice.total,
            createdAt: invoice.createdAt,
        }
    }
}