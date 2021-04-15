export default class Item{
    name: string;
    price: number;
    quantity: number;

    constructor(str: string, pri: number, quan: number){
        this.name = str;
        this.price = pri;
        this.quantity = quan;
    }

    setQuantity(quan: number){
        this.quantity = quan;
    }
}