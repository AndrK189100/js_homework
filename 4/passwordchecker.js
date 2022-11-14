
function getPasswordChecker(rightPassword) {
    rightPassword = rightPassword;
    
    return (checkPassord) => { return (rightPassword === checkPassord) ? true:false};

}


let checkPassord1 = getPasswordChecker('123');
let checkPassord2 = getPasswordChecker('abc')

console.log(checkPassord1('123'));
console.log(checkPassord1('1235'));

console.log('=============================\n');

console.log(checkPassord2('abc'));
console.log(checkPassord2('bca'));


