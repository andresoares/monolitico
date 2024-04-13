import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientModel from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeFactory from "../factory/client.factory";


describe("ClientAdmFacade test", () => {
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
        
        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Product 1",
            email: "a@a.com",
            address: "Address 1"
        };

        await facade.add(input);

        const clientDb = await ClientModel.findOne({
            where: {
                id: input.id
            }
        });

        expect(clientDb).toBeDefined();
        expect(input.id).toEqual(clientDb.id);
        expect(input.name).toEqual(clientDb.name);
        expect(input.address).toEqual(clientDb.address);
        expect(input.email).toEqual(clientDb.email);
    });

    it("should find a client", async () => {
        
        const facade = ClientAdmFacadeFactory.create();

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

        const client = await facade.find({ id: "1" });

        expect(clientProps.id.id).toBe(client.id);
        expect(clientProps.name).toBe(client.name);
        expect(clientProps.email).toBe(client.email);
        expect(clientProps.address).toBe(client.address);
    });
})