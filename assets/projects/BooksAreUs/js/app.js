"use strict";

var gBooks = getBooks();
var elTable;
var gNextId;
var currId;


function init() {
    gBooks = getBooks();
    elTable = document.querySelector('table');
    gNextId = gBooks[gBooks.length-1].id + 1;
    renderBooks(gBooks);
}

function getBooks() {
    return [
        { id : 1, title : '1984', author: 'George Orwell', price : 6.52, rate: 0 },
        { id : 2, title : 'Dune', author: 'Frank Herbert', price : 9.99, rate: 0 },
        { id : 3, title : 'Fahrenheit 451', author: 'Ray Bradbury', price : 11.99, rate: 0 },
        { id : 4, title : 'The Lord of the Rings', author: 'J.R.R. Tolkien', price : 9.99, rate: 0 },
        { id : 5, title : 'The Shining', author: 'Stephen King', price : 9.99, rate: 0 }
    ];
}

function renderBooks(books) {
    var strHtml = '';

    strHtml += makeThRow();

    books.forEach(function (book) {
       strHtml += makeRow(book);
    });

    elTable.innerHTML = strHtml;
}


function makeThRow() {
    return '<th class="active">Id</th><th><a href="" onclick="event.preventDefault(); byTitle();">Title</a></th><th>Author</th>' +
        '<th><a href="">Price</a></th><th colspan="3">Actions</th>';
}

function makeRow(book) {
    var strHtml = '';
    strHtml += '<tr>';
    strHtml += '<td>' + book.id + '</td>';
    strHtml += '<td>' + book.title + '</td>';
    strHtml += '<td>' + book.author + '</td>';
    strHtml += '<td>' + book.price + '</td>';
    strHtml += makeActionRow(book.id);
    strHtml += '</tr>';
    return strHtml;
}

function makeActionRow(id) {
    var strHtml = '';
    strHtml += '<td><button type="button" class="btn btn-primary" onclick="read(' + id + ')">Read</button></td>';
    strHtml += '<td><button type="button" class="btn btn-warning" onclick="makeUpdateForm(' + id + ')">Update</button></td>';
    strHtml += '<td><button type="button" class="btn btn-danger" onclick="deleteBook(' + id + ')">Delete</button></td>';

    return strHtml;
}

function toggleElem(elemName) {

    var elForm = document.querySelector(elemName);

    if (elForm.style.display === 'block' || elForm.style.display === 'flex') {
        elForm.style.display = 'none'
    } else {
        elForm.style.display = 'block';
    }
}

function readAndAddNewBook() {
    var elForm = document.querySelector('form.addBook');

    var title = elForm.querySelector('#input1').value;
    var author = elForm.querySelector('#input2').value;
    var price = elForm.querySelector('#input3').value;

    addBook(title, author, price);
    toggleForm('form.addBook');
    renderBooks();
}

function addBook(title, author, price) {

    var book = { id : gNextId, title : title, author: author, price : price };
    gBooks.push(book);
    gNextId++;
}

function deleteBook(bookId) {

    var idxRemove = null;

    gBooks.find(function (book,idx) {
        if (book.id === bookId) {
            idxRemove = idx;
        }
    });
    gBooks.splice(idxRemove, 1);
    renderBooks();
}

function readAndUpdateBook() {

    var elForm = document.querySelector('form.updateBook');

    var title = elForm.querySelector('#input4').value;
    var author = elForm.querySelector('#input5').value;
    var price = elForm.querySelector('#input6').value;

    updateBook(currId, title, author, price);
    renderBooks(gBooks);
    toggleForm('form.updateBook');
}

function updateBook(bookId, title, author, price) {

    gBooks[bookId-1].title = title;
    gBooks[bookId-1].author = author;
    gBooks[bookId-1].price = price;
}

function makeUpdateForm(bookId) {

    currId = bookId;

    var elForm = document.querySelector('form.updateBook');

    elForm.querySelector('#input4').value = gBooks[bookId-1].title;
    elForm.querySelector('#input5').value = gBooks[bookId-1].author;
    elForm.querySelector('#input6').value = gBooks[bookId-1].price;

    toggleForm(elForm);
}

function toggleForm(elem) {
    var $elForm = $(elem);

    if ($elForm.css('left') === '-475px') {
        $elForm.css('left', '0px');
    } else {
        $elForm.css('left', '-475px');
    }
}

function read(bookId) {

    var elInfo = document.querySelector('.book-info');
    elInfo.style.display = 'flex';

    elInfo.querySelector('img').setAttribute('src', 'img/' + bookId + '.jpg');
    elInfo.querySelector('.title').innerText = 'Title: ' + gBooks[bookId-1].title;
    elInfo.querySelector('.author').innerText = 'Author: ' + gBooks[bookId-1].author;
    elInfo.querySelector('.price').innerText = 'Price: ' + gBooks[bookId-1].price + '$';

    elInfo.querySelector('.rate').innerText = gBooks[bookId-1].rate;
    makeRatingDiv(bookId);
}

function read2(bookId) {
    var strHtml = '';
    strHtml += '<tr>';
    strHtml += '<td colspan="7"></td>';

    strHtml += '</tr>';
    var elTr = document.createElement('tr');
    elTr.style.columnSpan = '7';
    elTr.innerText = '343434';
    elTable.appendChild(elTr);
}

function getRating(bookId, sign) {

    var elRate = document.querySelector('.rate');
    var rate = gBooks[bookId-1].rate;
    if ((rate + sign) >= 0 && (rate + sign) <= 10) {
        gBooks[bookId-1].rate += sign;
        elRate.innerText = gBooks[bookId-1].rate;
    }
}

function makeRatingDiv(bookId) {

    var minus = document.querySelector('.minus');
    var plus = document.querySelector('.plus');
    minus.setAttribute('onclick', 'event.preventDefault(); getRating('+bookId+',-1);');
    plus.setAttribute('onclick', 'event.preventDefault(); getRating('+bookId+',1);');
}

function sortByColumn(colName) {

    return gBooks.sort(function(a, b){
        if(a[colName] < b[colName]) return -1;
        if(a[colName] > b[colName]) return 1;
        return 0;
    });
}

function byTitle() {
    renderBooks(sortByColumn('title'));
}

console.log(sortByColumn('title'));
console.log(sortByColumn('price'));

