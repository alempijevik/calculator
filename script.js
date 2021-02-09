let calculator = document.querySelector('#calculator');
let buttonWrapper = document.querySelector('.buttonWrapper');
let screen = document.querySelector('.screen');
let resultScreen = document.querySelector('.result');
let equasionScreen = document.querySelector('.equasion');
let values = ['On/Off', 'CE', 'C', '÷', 7, 8, 9, '×', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', 'Mode', '='];
let equasion = [];
let equasionString = '';
let resultString = '';
let numBtns;
let funcBtns;
let isOn = false;

function addition (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function generateClass (value) {
    if (typeof value === 'number') { // !isNaN(value)
        return 'numBtn';
    } else {
        return 'funcBtn';
    }
}

function generateButton (value, eClass) {
    return `<button class="btn ${eClass}">${value}</button>`;
}

function addResultValue (value) {
    if (resultString == '0') {
        resultString = value;
    } else {
        resultString += value;
    }
}

function addEquasionValue (value) {
    let result = equasionString.split('<br>');
    if (result.length === 3 && equasionString[equasionString.length - 1] === '0') {
        equasionString = equasionString.slice(0, equasionString.length - 1)
    }
    equasionString += value;
}

function displayValue (elem, value) {
    elem.innerHTML = value;
}

function handleOperations (operation) {
    let result = equasionString.split('<br>');
    if (result.length === 3) {
        equals(equasionString);
    } else {
        if (equasionString[equasionString.length - 1] === '.') {
            equasionString = equasionString.slice(0, equasionString.length - 1)
        }
        if (equasionString !== '') {
            equasionString += `<br>${operation}<br>0`;
        } else {
            equasionString += `0<br>${operation}<br>0`;
        }
        resultString = '0';
        displayValue(resultScreen, resultString);
    }
}

function reset () {
    if (isOn == false) {
        resultString = '';
    } else {
        resultString = '0';
    }
    equasionString = '';
    displayValue(resultScreen, resultString);
    displayValue(equasionScreen, equasionString);
}

function onOff () {
    isOn = !isOn;
    reset();
}

function equals (equasion) {
    equasion = equasion.split('<br>');
    let a = Number(equasion[0]);
    let b = Number(equasion[2]);
    switch (equasion[1]) {
        case '÷':
            resultString = `${divide(a, b)}`;
            break;
        case '×':
            resultString = `${multiply(a, b)}`;
            break;
        case '-':
            resultString = `${subtract(a, b)}`;
            break;
        case '+':
            resultString = `${addition(a, b)}`;
            break;
    }
    equasionString = `${resultString}`;
    displayValue(resultScreen, resultString);
    displayValue(equasionScreen, equasionString);
}

function decimal () {
    if(!resultString.includes('.')) {
        resultString += '.';
        if (equasionString === '') {
            equasionString += '0.';

        } else {
            equasionString += '.';
        }
    }
    displayValue(resultScreen, resultString);
    displayValue(equasionScreen, equasionString);
}

function ce () {
    let result = equasionString.split('<br>');
    if (result.length === 3) {
        equasionString = `${result[0]}<br>${result[1]}<br>0`
    } else {
        equasionString = '';
    }
    resultString = '0';
    displayValue(resultScreen, resultString);
    displayValue(equasionScreen, equasionString);
}

function classSwitch (elem, class1, class2){
    elem.classList.toggle(class1);
    elem.classList.toggle(class2);
}

function darkLight () {
    classSwitch(calculator, 'dark_mode', 'light_mode');
}

displayValue(resultScreen, resultString);

for (let i = 0; i < values.length; i++) {
    buttonWrapper.innerHTML += generateButton(values[i], generateClass(values[i]));
}

numBtns = Array.from(document.querySelectorAll('.numBtn'));
funcBtns = Array.from(document.querySelectorAll('.funcBtn'));

for (let i = 0; i < funcBtns.length; i++) {
    funcBtns[i].addEventListener('click', function () {
        if (i === 0) {
            onOff();
        }
        if (isOn === true) {
            if (i > 2 && i < 7) {
                handleOperations(funcBtns[i].innerText);
                displayValue(equasionScreen, equasionString);
            }
            if (i === 1) {
                ce();
            }
            if (i === 2) {
                reset();
            }
            if (i === 7) {
                decimal();
            }
            if (i === 8) {
                darkLight();
            }
            if (i === funcBtns.length - 1) {
                equals(equasionString);
            }
        }
    })
}

for (let i = 0; i < numBtns.length; i++) {
    numBtns[i].addEventListener('click', function () {
        if (isOn === true) {
            addResultValue(this.innerHTML);
            addEquasionValue(this.innerHTML);
            displayValue(resultScreen, resultString);
            displayValue(equasionScreen, equasionString);
        }
    })
}
