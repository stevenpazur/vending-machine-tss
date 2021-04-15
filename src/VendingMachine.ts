import Item from '../src/Item';

export default class VendingMachine {
    public items: Array<Item>;
    public totalMoney: number;
    public moneyInsideMachine: number;
    public bills: Array<number>;

    constructor(itemsArr: Array<Item>){
        this.items = itemsArr;
        this.totalMoney = 0;
        this.bills = [4, 1, 1, 1, 1];
        this.moneyInsideMachine = this.bills[0] * 10 + this.bills[1] * 20 + this.bills[2] * 50 + this.bills[3] * 100 + this.bills[4] * 500;
    }

    showVendingMachine(){
        let toString: string = '';

        for(let i = 0; i < this.items.length; i++){
            toString += this.items[i].name + " " + this.items[i].price + "\n";
        }

        return toString;
    }

    insertMoney(money: number){
        this.totalMoney += money;
        this.moneyInsideMachine += money;

        switch(money){
            case 10:
                this.bills[0]++;
                break;
            case 20:
                this.bills[1]++;
                break;
            case 50:
                this.bills[2]++;
                break;
            case 100:
                this.bills[3]++;
                break;
            case 500:
                this.bills[4]++;
                break;
        }

        return this.totalMoney;
    }

    checkFunds(item: Item): boolean{
        return !(this.totalMoney < item.price && item.quantity > 0);
    }

    checkAvailability(item: Item): boolean{
        return !(item.quantity <= 0);
    }

    isChangePossible(item: Item) : boolean{
        let requiredChange: number = this.totalMoney - item.price;

        let changeMachineCanDo: number = (requiredChange % this.bills[4]) * 500 +
        (requiredChange % this.bills[3]) * 100 +
        (requiredChange % this.bills[2]) * 50 +
        (requiredChange % this.bills[1]) * 20 +
        (requiredChange % this.bills[0]) * 10;

        return !(changeMachineCanDo < requiredChange);
    }

    change(item: Item){
        this.moneyInsideMachine -= this.totalMoney - item.price;
        return this.totalMoney - item.price;
    }

    cancel(){
        this.moneyInsideMachine -= this.totalMoney;
        return this.totalMoney;
    }
}
