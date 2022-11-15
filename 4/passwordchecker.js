
function getPasswordChecker(rightPassword) {
    rightPassword = rightPassword;
    
    return (checkPassword) => { return (rightPassword === checkPassword) ? true:false};

}


const PasswordChecker1 = getPasswordChecker('123');
const PasswordChecker2 = getPasswordChecker('abc')

console.clear()

console.log(PasswordChecker1('123'));
console.log(PasswordChecker1('1235'));

console.log('=============================\n');

console.log(PasswordChecker2('abc'));
console.log(PasswordChecker2('bca'));


