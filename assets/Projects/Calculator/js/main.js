const display = document.getElementById('display-area');
const buttons = document.querySelectorAll('.calculator-row button');
let currentInput = '';

function updateDisplay(value) {
    display.textContent = value;
}

document.getElementById('clear').addEventListener('click', () => {
    currentInput = '';
    updateDisplay('0');
});

document.getElementById('delete').addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
});

document.getElementById('equals').addEventListener('click', () => {
    try {
        let result = currentInput
            .replace('×', '*')
            .replace('÷', '/');
        currentInput = eval(result).toString();
        updateDisplay(currentInput);
    } catch {
        updateDisplay('Error');
        currentInput = '';
    }
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!isNaN(value) || value === '.') {
            currentInput += value;
        } else if (value === '×' || value === '÷' || value === '+' || value === '-' || value === '(' || value === ')') {
            currentInput += value;
        }

        updateDisplay(currentInput);
    });
});