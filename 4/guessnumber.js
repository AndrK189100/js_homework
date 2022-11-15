
const rl = require('readline').createInterface(process.stdin, process.stdout);

function getIncr(i = 0) {
    
    return function () {return i +=1;}
}

function gameStart(){
    
    let count = getIncr();
    
    rl.question('Сыграем? Y/n ', (answer) => {

        if (answer.toLowerCase() === 'y' || answer === ''){
            rl.write('Угадайте число от [1; 10]\n');
            guessNumber = Math.floor(Math.random() * 10) + 1;
            console.log('Число: ', guessNumber);
            game(count);
            
        }
        else if (answer.toLowerCase() === 'n') {rl.close(); return;}
        else {
            console.clear();
            rl.write('Неверный ввод!\n')
            //rl.close();
            gameStart();
        
        }
        
        }
        

    )
    function game() {

    

        rl.question('Введите целое число от 1 до 10 или q для выхода: ', (answer) => {
            if(!Number.isInteger(Number(answer))) {
                if(answer.toLowerCase() === 'q') {rl.close(); return;}
                rl.write('Неверный ввод1\n ');
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
                count();
                game();
                return;
            }
            else if(Number(answer) > guessNumber) {
                rl.write('Введенное число больше\n');
                count();
                game();
                return;
            }
            else {
                rl.write(`Число угадано. Количество попыток: ${count()}\n`);
                rl.question('Нажми ввод:', (answer) => {gameStart();})
            }
    
        })
        
    
    }

}

gameStart();






