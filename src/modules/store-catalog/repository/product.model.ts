import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    modelName: 'product-store-table',
    tableName: 'products',
    timestamps: false
})
export default class StoreProductModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false})
    id: string;

    @Column({ allowNull: false})
    name: string;

    @Column({ allowNull: false})
    description: string;

    @Column({ allowNull: false})
    salesPrice: number;

}