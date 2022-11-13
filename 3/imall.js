
class Good {
    
    constructor(id, name, description, sizes, price, available=true) {
        this.id = id;
        this.name = name;
        this. description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    
    setAvailable(available) {
        this.available = available;
        return true;
    }
}

class GoodsList {
    #goods;
    constructor(goods= [], filter=/.*/, sortPrice=true, sortDir=true) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {

        let buffer = this.#goods.filter(good => this.filter.test(good.name));
        
        if (this.sortPrice) {
            if(this.sortDir) {
                buffer.sort((x, y) => x.price-y.price);
            }
            else {
                buffer.sort((x, y) => y.price-x.price);
            }
            
        }

        return buffer;
    }

    getGood(id) {

        let index = this.#goods.findIndex(good => good.id === id);
        if (index === -1){
            return false;
        }
        else{
            return this.#goods[index];
        }
    }

    setAvailable(id, available) {

        let index = this.#goods.findIndex(good => good.id === id);
        if (index === -1){
            return false;
        }
        else {
            this.#goods[index].available = available;
            return true;
        }
    }

    add(good) {
        this.#goods[this.#goods.length] = good;
    }

    remove(id) {

        let index = this.#goods.findIndex(good => good.id === id);
        if (index === -1){
            return false;
        }
        else {
            this.#goods.splice(index, 1);
            return true;
        }
     }

}

class BasketGood extends Good {

    constructor(good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available)
        this.amount = amount;
        
    }
}

class Basket {
    constructor(basketGoods=[]) {
        this.basketGoods = basketGoods;
    }

    get totalAmount() {

        return this.basketGoods.reduce((pBasketGood, cBasketGood) => pBasketGood.amount + cBasketGood.amount);
    }

    get totalSum() {
        let totalSum = 0;
        this.basketGoods.forEach(basketGood => totalSum += basketGood.amount * basketGood.price);
        return totalSum;
    }

    add(good, amount) {
        if(good.available) {

            let index = this.basketGoods.findIndex(basketGood => basketGood.id === good.id);
            if (index === -1) {
                this.basketGoods[this.basketGoods.length] = new BasketGood(good, amount);
            return true;
            }
            else {
                this.basketGoods[index].amount += amount;
                return true;
            }
        }
        return false;
        
    }

    remove (good, amount) {

        let index = this.basketGoods.findIndex(basketGood => basketGood.id === good.id);
        if (index === -1) {
            return false;
        }
        else {
            this.basketGoods[index].amount -= amount;
            if (this.basketGoods[index].amount < 1) {
                this.basketGoods.splice(index, 1);
            }
            return true; 
        }
    }

    clear() {
        this.basketGoods.length =0;
        return true;
    }

    removeUnavaliable(goods) {
        let buffer = goods.filter(good => !good.available);
        for(let i=0; i < buffer.length; i++) {
            let index = this.basketGoods.findIndex(good => good.id === buffer[i].id);
            if (index !== -1) {
                this.basketGoods.splice(index, 1);
            }
        }
        return true;
    }
    
}

//main============================

let catalog  = new GoodsList();
let basket = new Basket();

let good;
 
for(let i=1; i < 6; i++) {
    good = new Good(i, `Name${i}`, `Description${i}`, [i, i + 6], Math.round(Math.random()*100), true);
    catalog.add(good);
}

catalog.filter = /Name1/;
console.log('Фильтрация:', catalog.list);
console.log('=====================================================\n')
catalog.filter = /.*/;

console.log('Сортировка по возростанию : ', catalog.list);
console.log('=====================================================\n')

catalog.sortDir = false;
console.log('Сортировка по убыванию:', catalog.list);
console.log('=====================================================\n')

catalog.remove(3);
console.log('Удаление элемента: ', catalog.list)
console.log('=====================================================\n')

catalog.setAvailable(1, false);
console.log('Установка доступности: ', catalog.list);
console.log('=====================================================\n');
catalog.setAvailable(1, true);


basket.add(catalog.getGood(1), 2);
basket.add(catalog.getGood(2), 5);
console.log('Новые товары в корзине: ', basket);
console.log('=====================================================\n');

basket.add(catalog.getGood(1), 1);
console.log('Добавлено количество к товару в корзине: ', basket);
console.log('=====================================================\n');

console.log('Общее количество: ', basket.totalAmount);
console.log('Общая цена: ', basket.totalSum);
console.log('=====================================================\n');

basket.remove(catalog.getGood(1), 1);
console.log('Уменьшено количество товара: ', basket);
console.log('=====================================================\n');

basket.remove(catalog.getGood(1), 2);
console.log('Удален товар: ', basket);
console.log('=====================================================\n');

basket.add(catalog.getGood(1), 2);
catalog.setAvailable(2, false);
catalog.filter = /.*/;
basket.removeUnavaliable(catalog.list);
console.log('Удаление недоступных: ', basket);
console.log('=====================================================\n');

basket.clear();
console.log('Корзин очищена:', basket);
console.log('=====================================================\n');


true;





