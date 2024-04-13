import Address from "../../../@shared/domain/entity/value-object/address.value-object";
import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import Invoice from "../../domain/invoice";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";


export default class GenerateInvoiceUseCase implements UseCaseInterface {

    constructor(private invoiceGateway: InvoiceGateway) {}

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

        const props = {
            id: new Id(),
            name: input.name,
            document: input.document,
            address: new Address(input.street, input.city, input.state, input.zipCode, input.number, input.complement),
            items: input.items.map((item) => {
                return {
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price
                }
            })
        }

        const invoice = new Invoice(props);
        this.invoiceGateway.generate(invoice);
        const address = invoice.address;

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: address.street,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            number: address.number,
            complement: address.complement,
            total: invoice.total,
            items: invoice.items.map((item) => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                }
            })

        }
    }
}