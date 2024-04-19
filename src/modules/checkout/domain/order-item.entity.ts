import BaseEntity from "../../@shared/domain/entity/entity/base.entity";
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import Product from "./product.entity";

type OrderItemProps = {
    id?: Id;
    name: string;
    salesPrice: number;
    product: Product;
}

export default class OrderItem extends BaseEntity {
    private _name: string;
    private _salesPrice: number;
    private _product: Product;

    constructor(props: OrderItemProps) {
        super(props.id);
        this._name = props.name;
        this._salesPrice = props.salesPrice;
        this._product = props.product;
    }

    get salesPrice(): number { return this._salesPrice; }

    get product(): Product { return this._product; }

    get name(): string { return this._name; }

}