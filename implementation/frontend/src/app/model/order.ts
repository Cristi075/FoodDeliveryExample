import { Address } from './address';
import { ProductOrder } from './product-order';

export class Order {
    id: number;
    address: Address;
    productOrders: ProductOrder[];
    status: string;
    price: number;
}
