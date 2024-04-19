import { Column, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import ClientModel from "./client.model";
import OrderItemModel from "./order-item.model";

@Table({ tableName: "orders", timestamps: false })
export default class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @HasOne(() => ClientModel)
  client: ClientModel;

  @HasMany(() => OrderItemModel)
  items: OrderItemModel[];

  @Column({ allowNull: false })
  status: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}