import VendingMachine from '../src/VendingMachine';
import Item from '../src/Item';

const items : Array<Item> = [];

let item1: Item = new Item("Butterfinger", 10, 1);
let item2: Item = new Item("M&Ms", 20, 1);
let item3: Item = new Item("Snickers", 50, 1);
let item4: Item = new Item("Granola Bar", 500, 1);
let item5: Item = new Item("Chips", 100, 0);

items.push(item1);
items.push(item2);
items.push(item3);
items.push(item4);
items.push(item5);

test('show items in vending machine', () => {
    const machine = new VendingMachine(items);
    expect(machine.showVendingMachine()).toMatch("Butterfinger 10\nM&Ms 20\nSnickers 50\nGranola Bar 500\nChips 100\n");
})

test('deposit and show money', () => {
    const machine = new VendingMachine(items);
    machine.insertMoney(100);
    expect(machine.totalMoney).toEqual(100);
})

test('deposit and show money updated', () => {
    const machine = new VendingMachine(items);
    machine.insertMoney(100);
    machine.insertMoney(10);
    expect(machine.totalMoney).toEqual(110);
})

test('test item availability', () => {
    const machine = new VendingMachine(items);
    machine.insertMoney(500);
    expect(machine.checkAvailability(item5)).toBeFalsy();
})

test('test funds', () => {
    item5.setQuantity(1);
    const machine = new VendingMachine(items);
    machine.insertMoney(10);
    expect(machine.checkFunds(item5)).toBeFalsy();
})

test('give change', () => {
    const machine = new VendingMachine(items);
    machine.insertMoney(100);
    expect(machine.change(item3)).toEqual(50);
})

test('test cancel button', () => {
    const machine = new VendingMachine(items);
    machine.insertMoney(100);
    machine.insertMoney(100);
    machine.insertMoney(100);
    machine.insertMoney(100);
    expect(machine.cancel()).toEqual(400);
})

test('test insufficient change', () => {
    const machine = new VendingMachine(items);
    machine.insertMoney(100);
    expect(machine.isChangePossible(item3)).toBeFalsy();
})
