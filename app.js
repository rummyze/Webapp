let num = 44
let firstname = 'Vlad'
const isPorgress = 'true'

let num2 = num + 11

console.log(num2)

const resultElement = document.getElementById('result')
const input1 = document.getElementById('input1')
const input2 = document.getElementById('input2')
const submitBtn = document.getElementById('submit')
const minusBTN = document.getElementById('minus')
const plusBTN = document.getElementById('plus')

function printResult(result) {
    if (result < 0) {
        resultElement.style.color = 'red'
    } else {
        resultElement.style.color = 'green'
    }
    resultElement.textContent = result
}

minusBTN.onclick = function () {
    action = '-'
}

plusBTN.onclick = function () {
    action = '+'
}

function computeNumbersWithAction(inp1, inp2, actionSymbol) {
    const num1 = Number(inp1.value)
    const num2 = Number(inp2.value)
    return actionSymbol === '+' ? num1 + num2 : num1 - num2
}

submitBtn.onclick = function () {
    const result = computeNumbersWithAction(input1, input2, action)
    printResult(result)
}
//test-tes


