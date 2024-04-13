import AggregateRoot from "../../@shared/domain/entity/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/entity/base.entity";
import Address from "../../@shared/domain/entity/value-object/address.value-object";
import Id from "../../@shared/domain/entity/value-object/id.value-object";
import InvoiceItem from "./invoice-item";

type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: Address;
    items: {
        id?: Id
        name: string
        price: number
    }[];
    createdAt?: Date;
    updatedAt?: Date;
};

export default class Invoice extends BaseEntity implements AggregateRoot {

    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: InvoiceItem[];

    constructor(props: InvoiceProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items.map(item => {
            return new InvoiceItem(item);
        });
    }

    get name(): string { return this._name; }

    get document(): string { return this._document; }

    get address(): Address { return this._address }

    get items(): InvoiceItem[] { return this._items; }

    get total(): number { return this._items.map(item => item.price).reduce((total, item) => total + item )}

}