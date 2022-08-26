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

let material = document.querySelectorAll('.popular_material');

for ( var i = 0 ; i < material.length ; i++ ){
    material[i].addEventListener('mouseover' , popular);
    material[i].addEventListener('mouseout' , popularAdd);
}

function popular() {
    this.classList.remove('popular_material');
}

function popularAdd() {
    this.classList.add('popular_material')
}

// Button for sent 

let buttonSent = document.querySelector('.send');

buttonSent.addEventListener('click', sendForm);

function sendForm() {
    this.innerHTML = '<img src="./images/checked.png" alt="" />';
    this.style.backgroundColor = 'var(--green-color)';
}