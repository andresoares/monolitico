import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import TransactionModel from "./transaction.model";
import TransactionRepository from "./transaction.repository";
import Transaction from "../domain/transaction";



describe("TransactionRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });


    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a transaction", async () => {
        
        const repository = new TransactionRepository();

        const props = {
            id: new Id("1"),
            amount: 100,
            orderId: "1",
        }
        
        const transaction = new Transaction(props);
        transaction.approve();

        const result = await repository.save(transaction);

        const transactionDb = await TransactionModel.findOne({
            where: {
                id: props.id.id
            }
        });

        expect(result.id.id).toBe(transactionDb.id);
        expect(result.amount).toBe(transactionDb.amount);
        expect(result.orderId).toBe(transactionDb.orderId);
        expect(result.status).toBe(transactionDb.status);
        expect(result.createdAt).toStrictEqual(transactionDb.createdAt);
        expect(result.updatedAt).toStrictEqual(transactionDb.updatedAt);
    });

})