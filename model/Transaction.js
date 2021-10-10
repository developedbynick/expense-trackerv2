class Transaction {
    constructor(category, name, price, isIncome, id) {
        this.category = category;
        this.name = name;
        this.price = price
        this.isIncome = isIncome;
        this.id = id;
    }
}

export default Transaction;