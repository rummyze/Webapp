let action;
const resultElement = document.getElementById('result');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const submitBtn = document.getElementById('submit');

document.querySelectorAll('.btn').forEach(button => {
    button.onclick = function() {
        action = this.getAttribute('data-action');
    };
});

function printResult(result){
    if (result !== null) {
        if (result < 0 ){
            resultElement.style.color = 'red';
        } else {
            resultElement.style.color = 'green';
        }
        resultElement.textContent = result;
    }
}

function computeNumbersWithAction(inp1, inp2, actionSymbol) {
    const num1 = Number(inp1.value);
    const num2 = Number(inp2.value);

    switch(actionSymbol) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 !== 0) {
                return num1 / num2;
            } else {
                alert('Division by zero is not allowed');
                return null;
            }
        default:
            console.error('Unknown action symbol:', actionSymbol);
            return null;
    }
}

submitBtn.onclick = function () {
    const result = computeNumbersWithAction(input1, input2, action);
    printResult(result);
};
