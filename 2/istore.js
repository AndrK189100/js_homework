//fixture============
let goods = [];
let shoppingCart = [];

for(let i = 1; i < 6; i++) {
    good = {
        id: i,
        name: 'name' + i,
        description: 'discription' + i,
        sizes: [i, i * 2],
        price: i * 3,
        available: true,
    }

    goods[i-1] = good;
}

shoppingCart[0] = {good: goods[0].id, amount: 5,}
shoppingCart[1] = {good: goods[1].id, amount: 10,}
//====================================


function addToCart(id, amount) {
    
    for(let i = 0; i < goods.length; i++) {
        if((goods[i].id === id) && (goods[i].available)) {
            
            for(let j =0; j < shoppingCart.length; j++){
                if(shoppingCart[j].good === goods[i].id){
                    shoppingCart[j].amount += amount;
                    return true;
                }
            }
            
            shoppingCart[shoppingCart.length] = {good: goods[i].id, amount: amount,};
            return true;  
            
        }
        
    }
    return false; 
}

function totalAmountPrice() {

    let totalAmount = 0;
    let totalPrice = 0;

    for(let i = 0; i < shoppingCart.length; i++) {
        totalAmount += shoppingCart[i].amount;
        
        for(let j = 0; j < goods.length; j++){
            if(goods[j].id === shoppingCart[i].good) {
                totalPrice += (goods[j].price * shoppingCart[i].amount);
                break;
            }
        } 

    }

    return {totalAmount: totalAmount, totalPrice: totalPrice,}
}

function delFromCart(id) {
    for(let i=0; i < shoppingCart.length; i++) {
        if (shoppingCart[i].good  === id) {
            shoppingCart.splice(i, 1);
            return true;
        }
    }
    return false;
}

function emptyCart() {
    shoppingCart.length = 0;
    return true;
}

//main======================================

console.log('товары: ', goods);
console.log('============');
console.log('Корзина:', shoppingCart);
console.log('============');

addToCart(4, 5);
console.log('Добавлен новый товар в корзину:', shoppingCart);
console.log('============');

addToCart(4, 2);
console.log('Увлечиенно количество товара в корзине:', shoppingCart);
console.log('============');

console.log('Общее количество и стоимость: ',totalAmountPrice());
console.log('============');

delFromCart(2);
console.log('Удален товар из корзины:', shoppingCart);
console.log('============');

emptyCart();
console.log('Корзина очищена: ', shoppingCart);
true;