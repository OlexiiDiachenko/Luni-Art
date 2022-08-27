// Slider

let slideLeft = document.querySelector('#slideLeft');
let slideRight = document.querySelector('#slideRight');

let content = document.querySelector('#sliderContent');
let cells = document.querySelectorAll('.sliderCell');

let left = 0;

let sliderLength = (cells.length-3) * 300;

slideRight.addEventListener('click' , slideToRight);
slideLeft.addEventListener('click' , slideToLeft);

function slideToRight() {
    left -= 330;
    if (left < -sliderLength ){
        left = 0;
    }
    content.style.left = left + 'px';
}

function slideToLeft() {
    left += 330;
    if ( left > 0 ){
        left = 0;
    }
    content.style.left = left + 'px';
}

// Choose a material

let material = document.querySelectorAll('.card');

for ( var i = 0 ; i < material.length ; i++ ){
    material[i].addEventListener('mouseover' , choose);
    material[i].addEventListener('mouseout' , popularAdd);
    material[i].addEventListener('click' , chooseClick);
}

function choose() { 
    if ( this.classList.contains('choose') ){
        return
    }else if( this.classList.contains('popular_material') ){
        this.classList.remove('popular_material');
    }
    this.classList.add('choose');
}

function popularAdd() { 
    this.classList.remove('choose');
    if ( this.classList.contains('coal') ){
        this.classList.add('popular_material');
    }
}

function chooseClick() { 
    this.removeEventListener('mouseout' , popularAdd);
    this.classList.add('choose');
    if( this.classList.contains('popular_material') ){
        this.classList.remove('popular_material');
    }
    this.addEventListener('click' , popularRemoveCLick);
    this.removeEventListener('click' , chooseClick);
}

function popularRemoveCLick() {
    this.addEventListener('mouseout' , popularAdd);
    this.classList.remove('choose');
    if ( this.classList.contains('coal') ){
        this.classList.add('popular_material');
    }
    this.addEventListener('click' , chooseClick);
    this.removeEventListener('click' , popularRemoveCLick);
}

// Amount people

let people = document.querySelectorAll('.human');

for ( var i = 0 ; i < people.length ; i++ ) {
    var j = people[i];
    j.addEventListener('mouseover', greenHumans);
}

function greenHumans() { 
    this.removeAttribute('src');
    this.setAttribute('src' , './images/greenMan.png');
}

// Choose card size

let cardPrice = document.querySelectorAll('.choose-card-size');

for ( var i = 0 ; i < cardPrice.length ; i++ ){
    cardPrice[i].addEventListener('click' , chooseCardClick);
}

function chooseCardClick() { 
    this.classList.add('active');
    if ( this.classList.contains('choose-card-popular') ) {
        this.classList.remove('choose-card-popular');
        this.addEventListener('click' , popularReturnClick);
    }
    this.addEventListener('click' , closeCardClick);
}

function closeCardClick() {
    this.classList.remove('active');
    this.addEventListener('click' , chooseCardClick);
    this.removeEventListener('click' , closeCardClick);
}

function popularReturnClick() { 
    this.classList.add('choose-card-popular');
    this.addEventListener('click' , chooseCardClick);
    this.removeEventListener('click' , popularReturnClick);
}

// Button for sent 

let buttonSent = document.querySelector('.send');

buttonSent.addEventListener('click', sendForm);

function sendForm() {
    this.innerHTML = '<img src="./images/checked.png" alt="" />';
    this.style.backgroundColor = 'var(--green-color)';
}


