let userAnswer = null;
let guessNumber = null;

while(true) {
   
    guessNumber = Math.floor(Math.random() * 1000);
    console.log('guessNumber', guessNumber);
    
    userAnswer = prompt('Введите число от 0 до 999 или нажмите "Отмена" выхода.');
    console.log('userAnswer:', userAnswer);

    if (userAnswer === null) {
        
        break;
    }

    if ((userAnswer === '') || isNaN(+userAnswer) ) {
        alert('Необходимо ввести число от 0 до 999 вкючительно.');
        continue;
    }

    userAnswer = +userAnswer;
    
    if (userAnswer < 0 || userAnswer > 999)
        {
            alert('Число должно быть в диапазоне от 0 до 999 включительно.')
            continue;     
        }

        if (guessNumber === userAnswer) {
            alert('Число угадано!')
        }
        else {
            alert(`Не угадали. Загаданное число: ${guessNumber}.`)
        }
}
  