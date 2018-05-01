import { Order } from './order';

export class Notification {
    id: number;
    seen: boolean;
    text: string;
    createdAt: Date;
    order: Order;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
