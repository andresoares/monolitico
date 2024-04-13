import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import ClientModel from "./client.model";
import Client from "../domain/client.entity";
import ClientRepository from "./client.repository";


describe("ClientRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });


    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        
        const clientRepository = new ClientRepository();

        const clientProps = {
            id: new Id("1"),
            name: "Product 1",
            email: "a@a.com",
            address: "Address 1"
        }
        const client = new Client(clientProps);

        await clientRepository.add(client);

        const clientDb = await ClientModel.findOne({
            where: {
                id: clientProps.id.id
            }
        });

        expect(clientProps.id.id).toBe(clientDb.id);
        expect(clientProps.name).toBe(clientDb.name);
        expect(clientProps.address).toBe(clientDb.address);
        expect(clientProps.email).toBe(clientDb.email);
        expect(client.createdAt).toStrictEqual(clientDb.createdAt);
        expect(client.updatedAt).toStrictEqual(clientDb.updatedAt);
    });

    it("should find a client", async () => {
        
        const clientRepository = new ClientRepository();

        const clientProps = {
            id: new Id("1"),
            name: "Product 1",
            email: "a@a.com",
            address: "Address 1"
        }

        await ClientModel.create({
            id: clientProps.id.id,
            name: clientProps.name,
            email: clientProps.email,
            address: clientProps.address,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const clientDb = await clientRepository.find("1");

        expect(clientProps.id.id).toBe(clientDb.id.id);
        expect(clientProps.name).toBe(clientDb.name);
        expect(clientProps.email).toBe(clientDb.email);
        expect(clientProps.address).toBe(clientDb.address);
        
    });
})