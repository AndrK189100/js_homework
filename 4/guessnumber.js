
const rl = require('readline').createInterface(process.stdin, process.stdout);
let fs = require('fs');

function gameStart(){
    //console.clear();
    let count = 1;
    const fileName = 'guessNumber.log';
    
    rl.question('Сыграем? Y/n ', (answer) => {

        if (answer.toLowerCase() === 'y' || answer === ''){
            rl.write('Угадайте число от [1; 10]\n');
            guessNumber = Math.floor(Math.random() * 10) + 1;
            console.log('Число: ', guessNumber);
            fs.writeFile(fileName, `Старт игры.\nЗагаданное число: ${guessNumber}\n`, 'utf-8', (err) => {/*Обработка ошибки)))*/})
            game();
            
        }
        else if (answer.toLowerCase() === 'n') {
            rl.close();
            console.clear();
            fs.appendFile(fileName, 'Выход из игры.', 'utf-8', (err) => {/*Обработка ошибки)))*/});
            return;
        }
        else {
            console.clear();
            rl.write('Неверный ввод!\n')
            gameStart();
         }
    })
    
    function game() {
    
        rl.write(`Поытка: ${count}\n`)
        rl.question('Введите целое число от 1 до 10 или q для выхода: ', (answer) => {
            if(!Number.isInteger(Number(answer))) {
                if(answer.toLowerCase() === 'q') {
                    fs.appendFile(fileName, 'Выход из игры.', 'utf-8', (err) => {/*Обработка ошибки)))*/})
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
                fs.appendFile(fileName, `Попытка: ${count}. Введено число: ${answer} - меньше загаданного.\n`, 'utf-8', (err) => {/*Обработка ошибки)))*/})
                rl.write('Введенное число меньше\n');
                count++;
                game();
                return;
            }
            else if(Number(answer) > guessNumber) {
                fs.appendFile(fileName, `Попытка: ${count}. Введено число: ${answer} - больше загаданного.\n`, 'utf-8', (err) => {/*Обработка ошибки)))*/})
                rl.write('Введенное число больше\n');
                count++;
                game();
                return;
            }
            else {
                fs.appendFile(fileName, `Попытка: ${count}. Введено число: ${answer} - равно загаданному.\n Всего попыток: ${count}\n=========\n`,
                                'utf-8', (err) => {/*Обработка ошибки)))*/});
                rl.write(`Число угадано. Количество попыток: ${count}\n`);
                rl.question('Нажми ввод:', (answer) => {gameStart();})
            }
        })
    }
}

gameStart();






