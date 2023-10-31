let num = 44
let firstname = 'Vlad'
const isPorgress = 'true'

let num2 = num + 11

console.log(num2)

const resultElement = document.getElementById( 'result')
const input1 = document.getElementById( 'input1')
const input2 = document. getElementById( 'input2')
const submitBtn = document.getElementById('submit')
const minusBTN = document.getElementById('minus')
const plusBTN = document.getElementById('plus')

// console.log(resultElement. textContent)
// resultElement. textContent = (42 - 2) / num
// console.log(typeof sum)
minusBTN.onclick = function (){
    action = '-'
}

plusBTN.onclick = function (){
    action = '+'
}

submitBtn.onclick = function () {
    if (action === '+'){
        const sum = Number(input1. value) + Number(input2.value)
        resultElement. textContent = sum
    }
    else if (action === '-'){
        const sum = Number(input1. value) - Number(input2.value)
        resultElement. textContent = sum
    }
}



