
function getSimpleNumbers(countNumbers=10) {
    
    if (countNumbers === 1) {
        return [1,];
    }

    if (countNumbers === 2) {
        return [1, 2,];
    }

    let numbers = [1, 2, 3,];
    let i = 0;
    let flag = true;
    let num = 0;
    
    while(numbers.length < countNumbers) {

        if(flag) {
        num = numbers.at(-1) + 2;
        }
        else {
            num += 2;
        }
        
        i = 1;
        
        for(i; i < numbers.length; i++) {

            if( (Math.sqrt(numbers[i]) > num) || !(num % numbers[i])) {
                flag = false;
                break;
            }
        }
        
        if(i === numbers.length) {
            flag = true;
            numbers[numbers.length] = num;
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