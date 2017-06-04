'use strict';

console.log('Minesweeper');


var gBoard;
var  gInterval;
var gState;

var gLevel = {
    SIZE: 4,
    MINES: 2
};


function getState() {
    return {
        isGameOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    };
}

function setSizeOfGame(el) {
    switch (+el.value) {
        case 1:
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
            break;
        case 2:
            gLevel.SIZE = 6;
            gLevel.MINES = 5;
            break;
        case 3:
            gLevel.SIZE = 8;
            gLevel.MINES = 15;
            break;
        default:
            break;
    }
    initGame();
}

function initGame() {

    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard,'table');
    gState = getState();
    gState.isGameOn = true;

    var elTimer = document.querySelector('.text');
    elTimer.innerText = gState.secsPassed;
    var elMinesCount = document.querySelector('.count');
    elMinesCount.innerText = gLevel.MINES;
    var elRes = document.querySelector('.resultPanel');
    elRes.innerText = '';
    clearInterval(gInterval);
}

function buildBoard(boardSize) {

    var board = [];

    for (var i = 0; i < boardSize; i++) {
        var row = [];
        for (var j = 0; j < boardSize; j++) {
            row.push({value : null, isClicked : false, isMine : false, isMarked : false});
        }
        board.push(row);
    }
    board = setMines(board);
    return setMinesNegsCount(board);
}

function setMines(board) {
    var minesCount = gLevel.MINES;

    while (minesCount > 0) {
        var cellI = getRandomIntInclusive(0, gLevel.SIZE - 1);
        var cellJ = getRandomIntInclusive(0, gLevel.SIZE -1);

        if (!board[cellI][cellJ].isMine) {
            board[cellI][cellJ].value = 'x';
            board[cellI][cellJ].isMine = true;
            minesCount--;
        }
    }
    return board;
}

function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if(!board[i][j].isMine) {
                    board[i][j].value = +countNegs(board, i, j);
               }
        }
    }
    return board;
}

function countNegs(board, cellI, cellJ) {
    var negsCount = 0;
    for (var i = cellI-1; i <= cellI+1 ; i++) {
        for (var j = cellJ-1; j <= cellJ+1 ; j++) {

            if (i === cellI && j === cellJ)      continue;
            if (i < 0 || i >= board.length)      continue;
            if (j < 0 || j >= board.length)      continue;

            var cell = board[i][j].value;
            if (cell && cell ==='x') {
                negsCount++;
            }
        }
    }
    return negsCount;
}

function renderBoard(board,selectorTbl) {
    var strHtml = '';
    board.forEach(function (row, i) {

        strHtml += '<tr>';
        row.forEach(function (cell, j) {
            var elClass = ' class="cell-' + i + '-' + j + '"';
            strHtml += '<td'+ elClass + ' onclick="cellClicked(this,'+i+',' + j +')"; ' +
                'oncontextmenu="cellMarked(this,'+i+',' + j +')">';
            strHtml += '</td>';
        });
        strHtml += '</tr>';
    });
    var elTable = document.querySelector(selectorTbl);
    elTable.innerHTML = strHtml;
    return elTable;
}

function cellClicked(elCell,i,j) {

    if (gState.isGameOn) {
        expandShown(i, j);
    }
}

function cellMarked(elCell, i, j) {

    if (gBoard[i][j].isClicked || !gState.isGameOn) return;

    var imgFlag = '<img src="img/flag.png" />';
    var elClass = makeElClass(i, j);

    if (gBoard[i][j].isMarked) {

        elCell.innerHTML = '';
        gBoard[i][j].isMarked = false;
        gState.markedCount--;

    } else {
        elCell.innerHTML = imgFlag;
        gBoard[i][j].isMarked = true;
        gState.markedCount++;
    }

    if (gState.markedCount === gLevel.MINES
        && gState.shownCount === Math.pow(gLevel.SIZE, 2) - gLevel.MINES) {
        winGame();
    }

    var elMinesCount = document.querySelector('.count');
    elMinesCount.innerText = gLevel.MINES - gState.markedCount;
}

function expandShown(i, j) {

    var elClass = makeElClass(i, j);

    var elCell = document.querySelector(elClass);

    if (gBoard[i][j].isClicked || gBoard[i][j].isMarked) return;

    if (gBoard[i][j].isMine) {
        loseGame(i, j);
    } else {
        gState.shownCount++;
        if (gState.shownCount === 1) {
            gInterval = setInterval(function () {
                gState.secsPassed++;
                var elTimer = document.querySelector('.text');
                elTimer.innerText = gState.secsPassed;
            }, 1000);
        }
        elCell.style.backgroundColor = 'lightgrey';
        elCell.innerText = (gBoard[i][j].value !== 0) ? gBoard[i][j].value : '';
        elCell.style.color = getColorForDigit(gBoard[i][j].value);
        gBoard[i][j].isClicked = true;

        if (gBoard[i][j].value === 0) {

            for (var k = i-1; k <= i+1 ; k++) {
                for (var l = j-1; l <= j+1 ; l++) {
                    if (k === i && l === j)               continue;
                    if (k < 0 || k >= gBoard.length)      continue;
                    if (l < 0 || l >= gBoard.length)      continue;

                    expandShown(k,l);
                }
            }
        }
        if (gState.shownCount === Math.pow(gLevel.SIZE, 2) - gLevel.MINES
            && gState.markedCount === gLevel.MINES) {
            winGame();
        }
    }
}

function getColorForDigit(digit) {

    var colors = ['black', 'blue', 'green', 'white', 'orange', 'purple'];

    return colors[digit];
}

function winGame() {
    gState.isGameOn = false;
    var elRes = document.querySelector('.resultPanel');
    elRes.innerText = 'You win!!';
    clearInterval(gInterval);
}

function loseGame(row, col) {

    gState.isGameOn = false;
    clearInterval(gInterval);
    var elRes = document.querySelector('.resultPanel');
    elRes.innerText = 'You lose!!';

    var imgMine = '<img src="img/bomb-25.png">';
    var imgFlag = '<img src="img/flag.png">';
    var imgNoMine = '<img src="img/no-bomb-25.png">';

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {

            var elClass = makeElClass(i, j);
            var elCell = document.querySelector(elClass);



            if (i === row && j === col) {
                elCell.style.backgroundColor = 'red';
                elCell.innerHTML = imgMine;
            } else if (!gBoard[i][j].isMine && gBoard[i][j].isMarked) {

                elCell.innerHTML = 'x';
            } else if (!gBoard[i][j].isMine) {
                continue ;
            } else {
                elCell.innerHTML = imgMine;
            }
        }
    }
}

function makeElClass(i, j) {
    return '.cell-' + i + '-' + j;
}










