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
} //Choose a material


var cardMaterial = document.querySelectorAll('.card');

for (var i = 0; i < cardMaterial.length; i++) {
  cardMaterial[i].addEventListener('mouseover', choose);
  cardMaterial[i].addEventListener('mouseout', popularAdd);
  cardMaterial[i].addEventListener('click', chooseClick);
}

function choose() {
  if (this.classList.contains('popular_material')) {
    this.classList.remove('popular_material');
  }
}

function popularAdd() {
  if (this.classList.contains('coal')) {
    this.classList.add('popular_material');
  }
}

function chooseClick() {
  for (var i = 0; i < cardMaterial.length; i++) {
    if (cardMaterial[i].querySelector('input').checked) {
      cardMaterial[i].classList.add('choose');
    } else {
      cardMaterial[i].classList.remove('choose');
    }
  }
} // Choose card size


var popular = document.querySelectorAll('.choose-item');
var popularLabel = document.querySelectorAll('.choose-label');

for (var i = 0; i < popular.length; i++) {
  popular[i].addEventListener('click', chooseSize);

  if (popular[i].parentElement.classList.contains('popular-size')) {
    popular[i].parentElement.addEventListener('mouseover', popularUnactive);
  }
}

function chooseSize() {
  if (this.type == "radio" && this.checked) {
    for (var j = 0; j < popularLabel.length; j++) {
      if (popularLabel[j].previousElementSibling.checked) {
        this.nextElementSibling.classList.remove('unactive');
      } else {
        popularLabel[j].classList.add('unactive');
      }
    }
  }
}

function popularUnactive() {
  this.classList.remove('popular-size');
  this.addEventListener('mouseout', popularActive);
}

function popularActive() {
  this.classList.add('popular-size');
} // Button for sent 


var buttonSent = document.querySelector('.send');
buttonSent.addEventListener('click', sendForm);

function sendForm() {
  this.innerHTML = '<img src="./images/checked.png" alt="" />';
  this.style.backgroundColor = 'var(--green-color)';
}