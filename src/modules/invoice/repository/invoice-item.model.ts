import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
    tableName: 'invoice_items',
    timestamps: false
})
export default class InvoiceItemModel extends Model {
    
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;
    
    @Column({ allowNull: false })
    name: string;
    
    @Column({ allowNull: false })
    price: number;
    
    @BelongsTo(() => InvoiceModel)
    order: Awaited<InvoiceModel>;

    @ForeignKey(() => InvoiceModel)
    @Column({allowNull: false})
    declare invoice_id: string;
}