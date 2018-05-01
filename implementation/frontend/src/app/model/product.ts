export class Product {
    id: number;
    name: string;
    price: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
