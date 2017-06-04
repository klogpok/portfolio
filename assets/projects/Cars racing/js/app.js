'use strict';

console.log('Car racing');

var gCars;
var gElRoad;

var gStat = {
    raceOn : false
};


function init() {
    gCars = getCars();
    gElRoad = document.querySelector('.road');
}

function getCars() {
    return [
        {name: 'car1', left: 0, nextKey: 0, keys : [49, 50]},
        {name: 'car2', left: 0, nextKey: 0, keys : [38, 40]}
    ];
}

function startRace() {
    init();
    initCars();
    gStat.raceOn = true;
}

function initCars() {
    gCars.forEach(function (car) {
        var elCar = document.querySelector('.' + car.name);
        elCar.style.transform = 'translateX(0px)';
    })
}

function moveCar(car) {

    if (car.left >= gElRoad.offsetWidth - 90) {
        isVictory(car);
    } else {
        var elCar = document.querySelector('.' + car.name);
        elCar.style.transform = 'translateX(' + car.left + 'px)';
    }
}

function keyWasPressed(e) {

    if (!gStat.raceOn) { return; }

    gCars.forEach(function(car){

       if(car.keys[car.nextKey] === e.keyCode){
           car.left += 20;
           car.nextKey += 1;
           car.nextKey %= 2;
           moveCar(car);
       }
    });
}

function isVictory(car) {
    var elPopup = document.querySelector('.popup');
    elPopup.style.display = 'block';
    var popupText = elPopup.querySelector('h1');
    popupText.innerText = car.name + ' is winner!';
    gStat.raceOn = false;
}

function closePopup() {
    var elPopup = document.querySelector('.popup');
    elPopup.style.display = 'none';
}


