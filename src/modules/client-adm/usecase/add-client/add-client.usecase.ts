import Address from "../../../@shared/domain/entity/value-object/address.value-object";
import Id from "../../../@shared/domain/entity/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase {

  private _clientRepository: ClientGateway

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository
  }

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {

    const props = {
      id: new Id(input.id) || new Id(),
      name: input.name,
      email: input.email,
      document: input.document,
      address: new Address(
        input.address.street,
        input.address.city,
        input.address.state,
        input.address.zipCode,
        input.address.number,
        input.address.complement,
      )
    }

    const client = new Client(props)
    await this._clientRepository.add(client)

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      address: new Address(
        client.address.street,
        client.address.city,
        client.address.state,
        client.address.zipCode,
        client.address.number,
        client.address.complement,
      ),
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    }
  }
}