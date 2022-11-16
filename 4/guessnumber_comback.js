
const rl = require('readline').createInterface(process.stdin, process.stdout);

const questionPromise = function(query) {
    return new Promise ((resolve) => {rl.question(query, (data) => {resolve(data);})})
}

async function gameStart() {
    let count = 1;
    let guessNumber = 0;
    while(true) {
        const answer =await questionPromise('Сыграем ? Y/n ');
        
        if (answer.toLowerCase() === 'n') {
            console.clear();
            rl.write('Пока');
            rl.close();
            return;
        }
        else if (answer.toLowerCase() !== 'y') {
            console.log(answer);
            if (answer !== '') {
                console.clear();
                rl.write('Неверный ввод.\n');
                continue;
            }
        }

        rl.write('Угадайте число от [1; 10]\n');
        guessNumber = Math.floor(Math.random() * 10) + 1;
        console.log('Число: ', guessNumber);
        game();
    }

    async function game() {
        rl.write(`Поытка: ${count}\n`);
        const answer = await questionPromise('Введите целое число от 1 до 10 или q для выхода: ');
        
        if(!Number.isInteger(Number(answer))) {
            if(answer.toLowerCase() === 'q') {
                rl.close(); 
                console.clear();
                return;
            }
            rl.write('Неверный ввод\n ');
            game();
            return;
        }

        if(Number(answer) > 10 || Number(answer) < 1) {
            rl.write('Неверный ввод\n ');
            game();
            return;
        }

        if(Number(answer) < guessNumber) {
            rl.write('Введенное число меньше\n');
            count++;
            game();
            return;
        }
        else if(Number(answer) > guessNumber) {
            rl.write('Введенное число больше\n');
            count++;
            game();
            return;
        }
        else {
            rl.write(`Число угадано. Количество попыток: ${count}\n`);
            await questionPromise('Нажми ввод');
            gameStart();
            return;
        }
    }    
}


gameStart();