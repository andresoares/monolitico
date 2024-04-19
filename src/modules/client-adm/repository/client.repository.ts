import Address from "../../@shared/domain/entity/value-object/address.value-object";
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientAdmModel } from "./client.model";

export default class ClientRepository implements ClientGateway {

  async add(entity: Client): Promise<void> {

    await ClientAdmModel.create({
      id: entity.id.id,
      name: entity.name,
      email: entity.email,
      document: entity.document,
      street: entity.address.street,
      number: entity.address.number,
      complement: entity.address.complement,
      city: entity.address.city,
      state: entity.address.state,
      zipcode: entity.address.zipCode,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }

  async find(id: string): Promise<Client> {

    const client = await ClientAdmModel.findOne({ where: { id } })

    if (!client) {
      throw new Error("Client not found")
    }

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      address: new Address(
        client.street,
        client.city,
        client.state,
        client.zipcode,
        client.number,
        client.complement,
      ),
      createdAt: client.createdAt,
      updatedAt: client.createdAt
    })
  }
}