"use strict";

// Slider
var slideLeft = document.querySelector('#slideLeft');
var slideRight = document.querySelector('#slideRight');
var content = document.querySelector('#sliderContent');
var cells = document.querySelectorAll('.sliderCell');
var left = 0;
var sliderLength = (cells.length - 3) * 300;
slideRight.addEventListener('click', slideToRight);
slideLeft.addEventListener('click', slideToLeft);

function slideToRight() {
  left -= 330;

  if (left < -sliderLength) {
    left = 0;
  }

  content.style.left = left + 'px';
}

function slideToLeft() {
  left += 330;

  if (left > 0) {
    left = 0;
  }

  content.style.left = left + 'px';
} // Choose a material


var material = document.querySelectorAll('.popular_material');

for (var i = 0; i < material.length; i++) {
  material[i].addEventListener('mouseover', popular);
  material[i].addEventListener('mouseout', popularAdd);
}

function popular() {
  this.classList.remove('popular_material');
}

function popularAdd() {
  this.classList.add('popular_material');
} // Amount people


var people = document.querySelectorAll('.human');

for (var i = 0; i < people.length; i++) {
  var j = people[i];
  j.addEventListener('mouseover', greenHumans);
}

function greenHumans() {
  this.removeAttribute('src');
  this.setAttribute('src', './images/greenMan.png');
} // Choose card size


var cardPrice = document.querySelectorAll('.choose-card-size');

for (var i = 0; i < cardPrice.length; i++) {
  cardPrice[i].addEventListener('click', chooseCardClick);
}

function chooseCardClick() {
  this.classList.add('active');

  if (this.classList.contains('choose-card-popular')) {
    this.classList.remove('choose-card-popular');
    this.addEventListener('click', popularReturnClick);
  }

  this.addEventListener('click', closeCardClick);
}

function closeCardClick() {
  this.classList.remove('active');
  this.addEventListener('click', chooseCardClick);
  this.removeEventListener('click', closeCardClick);
}

function popularReturnClick() {
  this.classList.add('choose-card-popular');
} // Button for sent 


var buttonSent = document.querySelector('.send');
buttonSent.addEventListener('click', sendForm);

function sendForm() {
  this.innerHTML = '<img src="./images/checked.png" alt="" />';
  this.style.backgroundColor = 'var(--green-color)';
}