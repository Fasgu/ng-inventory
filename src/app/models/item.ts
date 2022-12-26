export class Item {
    id: number = 0;
    code: string = '';
    name: string = '';
    description: string = '';
    purchase_price: number | null = null;
    sale_price: number | null = null;
    active: boolean = true;
}