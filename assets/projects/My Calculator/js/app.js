'use strict'

console.log('My calculator2');

var gStrNum = '';
var gNumAcc = null;
var gOp = undefined;
var gPrevNum = null;

function takeDigit(digit) {

    gStrNum += digit;
    printOnPanel(gStrNum, '.panel');
}

function removeDigit() {

    gStrNum = (gStrNum) ? gStrNum.slice(0,-1) : '0';
    printOnPanel(+gStrNum, '.panel');
}

function printOnPanel(value, dest) {

    var elPanel = document.querySelector(dest);
    elPanel.innerHTML = value;
}

function takeOp(op) {
    gOp = op;
    if (!gNumAcc) {
        gNumAcc = +gStrNum;
    }
    printOnPanel(gNumAcc + ' ' + op, '.sub-panel');
    gStrNum = '';
}

function isInt(num) {
    return num % 1 === 0;
}

function calcImmRes(op) {
    switch (op) {
        case 'plusmn':
            gStrNum = +gStrNum * -1;
            break;
        case 'x^2':
            gStrNum = Math.pow(+gStrNum,2);
            break;
        case 'sqrt':
            gStrNum = Math.sqrt(+gStrNum);
            break;
        case '1/x':
            gStrNum = 1 / +gStrNum;
            break;
        default:
            break;
    }
    printOnPanel(parseFloat((gStrNum).toFixed(4)), '.panel');
}

function calcResult() {

    var byZero = false;

    switch (gOp) {
        case '+':
            gNumAcc += +gStrNum;
            break;
        case '-':
            gNumAcc -= +gStrNum;
            break;
        case '*':
            gNumAcc *= +gStrNum;
            break;
        case '/':
            if (+gStrNum === 0) {
                byZero = true;
            } else {
                gNumAcc = gNumAcc / (+gStrNum);
            }
            break;
        case '%':
            gNumAcc %= +gStrNum;
            break;
        default:
            break;
    }

    if (byZero) {
        printOnPanel('Oops!', '.panel');
    } else {
        printOnPanel(parseFloat((gNumAcc).toFixed(4)), '.panel');
    }

    printOnPanel('', '.sub-panel');
    gStrNum = '';
}

function clearAll() {

    printOnPanel('0', '.panel');
    printOnPanel('', '.sub-panel');
    gStrNum = '';
    gNumAcc = 0;
}
