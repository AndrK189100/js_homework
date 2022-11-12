
function getSimpleNumbers(countNumbers=10) {
    
    if (countNumbers === 1) {
        return [1,];
    }

    if (countNumbers === 2) {
        return [1, 2,];
    }

    let numbers = [1, 2, 3,];
    let flag = true;
    let num = 0;
    
    while(numbers.length < countNumbers) {

        if(flag) {
        num = numbers.at(-1) + 2;
        }
        else {
            num += 2;
        }
        
        for(let i = 1; i < numbers.length; i++) {
            
            if( Math.sqrt(numbers[i]) > num) {
                numbers[numbers.length] = num;
                flag = true;
                break;
            }
            else if(!(num % numbers[i])) {
                flag = false;
                break;
            }
            else if(i === numbers.length -1 ) {
                numbers[numbers.length] = num;
                flag = true;
                break;

            }

        }
        
    }

    return numbers;
}

let countNumbers = +process.argv[2];

if(isNaN(countNumbers) || (countNumbers < 1)) {
    console.log('(((');
    return;
}

console.log(getSimpleNumbers(countNumbers));
return 0;