let firstNum = "";
let secondNum = "";
let currentOperation = null;
let resetScreen = false;

const lastOperationScreen = document.getElementById("current-operation");
const currentOperationScreen = document.getElementById("last-operation");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtn = document.querySelectorAll(".operator");
const equalBtn = document.getElementById("equal");
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const pointBtn = document.getElementById("dot");

equalBtn.addEventListener("click", evaluate);
clearBtn.addEventListener("click", clear);
deleteBtn.addEventListener("click", deleteNum);
pointBtn.addEventListener("click", addDot);

digitBtns.forEach(function (e) {
    e.addEventListener("click", () => addNum(e.value));
});

operatorBtn.forEach(function (e) {
    e.addEventListener("click", () => addOperator(e.value));
});

function addNum(num) {
    if (currentOperationScreen.textContent === '0' || resetScreen) {
        reset();
        currentOperationScreen.textContent = "";
    }
    currentOperationScreen.textContent += num;
}

function addOperator(operator) {
    if (currentOperation !== null) evaluate();
    firstNum = currentOperationScreen.textContent;
    currentOperation = operator;
    lastOperationScreen.textContent = `${firstNum} ${currentOperation}`;
    resetScreen = true;
}

function reset() {
    currentOperationScreen.textContent = 0;
    resetScreen = false;
}

function clear() {
    currentOperationScreen.textContent = "0";
    lastOperationScreen.textContent = "";
    firstNum = "";
    secondNum = "";
    currentOperation = null;
}

function addDot() {
    if (resetScreen) {
        reset();
    }
    if (currentOperationScreen.textContent === '') {
        currentOperationScreen.textContent = '0';
    }
    if (currentOperationScreen.textContent.includes('.')) return;
    currentOperationScreen.textContent += '.';
}

function deleteNum() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1);
}

function evaluate() {
    if (currentOperation === null || resetScreen) return;
    if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
        alert("You can't divide by 0!");
        return;
    }
    secondNum = currentOperationScreen.textContent;
    currentOperationScreen.textContent = operate(currentOperation, parseFloat(firstNum), parseFloat(secondNum));
    lastOperationScreen.textContent = `${firstNum} ${currentOperation} ${secondNum} =`;
    currentOperation = null;
}

function operate(operator, x, y) {
    switch (operator) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            return divide(x, y);
        default:
            return null;
    }
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}