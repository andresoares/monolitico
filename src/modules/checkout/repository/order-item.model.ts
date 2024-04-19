import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";
import ProductModel from "./product.model";

@Table({ tableName: "order-items", timestamps: false })
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  salesPrice: number;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: true })
  orderId: string;

  @BelongsTo(() => OrderModel)
  order: OrderModel;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: true })
  productId: string;

  @BelongsTo(() => ProductModel)
  product: ProductModel;
}