const rl = require('readline').createInterface(process.stdin, process.stdout);

const questionPromise = function(query) {
    return new Promise ((resolve) => {rl.question(query, (data) => {resolve(data);})})
}


async function game() {
    let count = 0;
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
        count = 1;
        console.log('Число: ', guessNumber);
        while(true) {
            rl.write(`Поытка: ${count}\n`);
            const answer = await questionPromise('Введите целое число от 1 до 10 или q для выхода: ');
        
            if(!Number.isInteger(Number(answer))) {
                if(answer.toLowerCase() === 'q') {
                    rl.close(); 
                    console.clear();
                    return;
                }
                rl.write('Неверный ввод\n ');
                continue;
            }
            if(Number(answer) > 10 || Number(answer) < 1) {
                rl.write('Неверный ввод\n ');
                continue;
            }
            if(Number(answer) < guessNumber) {
                rl.write('Введенное число меньше\n');
                count++;
                continue;
            }
            else if(Number(answer) > guessNumber) {
                rl.write('Введенное число больше\n');
                count++;
                continue;
            }
            else {
                rl.write(`Число угадано. Количество попыток: ${count}\n`);
                break;
            }
            
        }
        await questionPromise('Нажми ввод');
        console.clear();

    }

}

game();