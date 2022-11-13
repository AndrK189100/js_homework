
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
        for(let i = 0; i < this.#goods.length; i++) {
            if (this.#goods[i].id === id) {
                return this.#goods[i];
            }
        }
        return false;
    }

    setAvailable(id, available) {
        for(let i = 0; i < this.#goods.length; i++) {
            if (this.#goods[i].id === id) {
                this.#goods[i].available = available;
                break;
            }    
        }
        
    }

    add(good) {
        this.#goods[this.#goods.length] = good;
    }

    remove(id) {
        for(let i=0; i < this.#goods.length; i++) {
            if (this.#goods[i].id === id) {
                this.#goods.splice(i, 1);
                break;
            }
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
            for(let i=0; i < this.basketGoods.length; i++) {
                if (this.basketGoods[i].id === good.id) {
                    this.basketGoods[i].amount += amount;
                    return true;
                }
            }
            this.basketGoods[this.basketGoods.length] = new BasketGood(good, amount);
            return true;
        }
        return false;
    }

    remove (good, amount) {
        for(let i=0; i < this.basketGoods.length; i++) {
            if (this.basketGoods[i].id === good.id) {
                this.basketGoods[i].amount -= amount;
                if (this.basketGoods[i].amount < 1) {
                    this.basketGoods.splice(i, 1);
                }
                return true;
            }
        }
        return false;
    }

    clear() {
        this.basketGoods.length =0;
        return true;
    }

    removeUnavaliable(goods) {
        let buffer = goods.filter(good => !good.available);
        for(let i=0; i < buffer.length; i++) {
            for(let j=0; j < this.basketGoods.length; j++){
                if (buffer[i].id === this.basketGoods[j].id) {
                    this.basketGoods.splice(j,1);
                    break;
                }
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





